// @flow

import Component from 'inferno-component';
import {styled} from 'styletron-inferno';
import serialize from 'form-serialize';
import window from 'global/window';
import isBrowser from 'is-browser';
import {assetURL} from '../../../lib/asset-url';
import {t} from '../../../lib/iso-i18n';
import {BLOCKS, SITE_URL, EXECUTIONS, TRANSFERS, VOTES, WALLET, IOTEX_URL, NAV, STAKING, STAKING_DASHBOARD, EDUCATION} from '../site-url';
import {titleFont} from '../../../shared/common/styles/style-font';
import {fetchPost} from '../../../lib/fetch-post';

function Icon() {
  return (
    <span style={{paddingRight: '8px'}}><i className='fas fa-link'/></span>
  );
}

export class Nav extends Component {
  _form: any;
  props: {
    chains: Array<{
      name: string,
      url: string,
    }>
  };

  constructor(props: any) {
    super(props);
    this.state = {
      displayDropdownMenu: false,
      fetchCoinStatistic: 0,
      fetchCoinPrice: 0,
      error: false,
      url: '',
    };

    (this: any).toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
  }

  toggleDropdownMenu() {
    this.setState({
      displayDropdownMenu: !this.state.displayDropdownMenu,
    });
  }

  componentWillMount() {
    if (isBrowser) {
      this.props.fetchCoinStatistic();
      this.props.fetchCoinPrice();
    }
  }

  componentDidMount() {
    if (isBrowser) {
      const fetchCoinStatistic = window.setInterval(() => this.props.fetchCoinStatistic(), 30000);
      const fetchCoinPrice = window.setInterval(() => this.props.fetchCoinPrice(), 30000);
      this.setState({fetchCoinStatistic, fetchCoinPrice, url: window.location.pathname,
      });
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.state.fetchCoinStatistic);
    window.clearInterval(this.state.fetchCoinPrice);
  }

  handleSubmit(e: { preventDefault: any }) {
    e.preventDefault();

    const formData = serialize(this._form, {hash: true});
    this.setState({fetching: true});
    if (formData.search !== '') {
      fetchPost(NAV.FUZZY_SEARCH, {hashStr: `${formData.search}`}).then(res => {
        if (res.ok === true) {
          if (res.result.block) {
            window.location = `/blocks/${formData.search}`;
            return;
          }

          if (res.result.transfer) {
            window.location = `/transfers/${formData.search}`;
            return;
          }

          if (res.result.vote) {
            window.location = `/votes/${formData.search}`;
            return;
          }

          if (res.result.execution) {
            window.location = `/executions/${formData.search}`;
            return;
          }

        } else {
          this.setState({error: true});
        }
      });
    }
  }

  render() {
    const {chains, href} = this.props;
    let name = '';
    let path = '';
    for (const c of chains) {
      if (href.indexOf(c.url) !== -1) {
        name = c.name;
        path = href.replace(c.url, '');
      }
    }
    if (this.state.url !== STAKING.INDEX && this.state.url !== EDUCATION.INDEX) {
    return (
      <div className='navbar is-fixed-top' role='navigation'>
        <NavWrapper>
          <nav className='navbar is-primary'>
            <div className='container'>
              <div className='navbar-brand'>
                <a className='navbar-item small-nav-logo' href={SITE_URL}>
                  <img
                    src={assetURL('/dark-iotxplorer-logo.png')}
                    alt='IoTeX Explorer'
                    width='120'
                    height='29'
                  />
                </a>
                <div
                  className={`navbar-burger burger ${this.state.displayDropdownMenu ? 'is-active' : ''}`}
                  data-target='navMenuColordark-example'
                  onClick={() => this.toggleDropdownMenu()}
                >
                  <span aria-hidden='true'/>
                  <span aria-hidden='true'/>
                  <span aria-hidden='true'/>
                </div>
              </div>
              <div
                className={`navbar-menu is-primary ${this.state.displayDropdownMenu ? 'is-active' : ''}`}
              >
                <div className='navbar-end'>
                  <div className='navbar-item has-dropdown is-hoverable'>
                    <p className='navbar-link'>Blockchain</p>
                    <div className='navbar-dropdown' style={{paddingTop: '0px', borderTop: '0px'}}>
                      <a className='navbar-item nav-dropdown-item' href={EXECUTIONS.INDEX}>{t('meta.executions')}</a>
                      <a className='navbar-item nav-dropdown-item' href={TRANSFERS.INDEX}>{t('meta.transfers')}</a>
                      <a className='navbar-item nav-dropdown-item' href={BLOCKS.INDEX}>{t('meta.blocks')}</a>
                      <a className='navbar-item nav-dropdown-item' href={VOTES.INDEX}>{t('meta.votes')}</a>
                    </div>
                  </div>
                  <div className='navbar-item has-dropdown is-hoverable'>
                    <p className='navbar-link'>Resources</p>
                    <div className='navbar-dropdown' style={{paddingTop: '0px', borderTop: '0px'}}>
                    <a className='navbar-item nav-dropdown-item' href={STAKING_DASHBOARD.INDEX}>Dashboard</a>   
                    <a className='navbar-item nav-dropdown-item' href={EDUCATION.INDEX}>Education</a>   
                    </div>
                  </div>
                  <div className='navbar-item has-dropdown is-hoverable'>
                  <a className='navbar-link is-arrowless' href={STAKING.INDEX}>Stake With Us &lt;3</a>
                  <div className='navbar-dropdown' style={{paddingTop: '0px', borderTop: '0px'}}>
                  <a className='navbar-item nav-dropdown-item' href={STAKING.INDEX}>Why Us?</a>
                  <a className='navbar-item nav-dropdown-item' href={STAKING_DASHBOARD.INDEX}>Calculators</a>
                  </div>               
                  </div>
                  <div className='navbar-item has-dropdown is-hoverable'>
                    <p className='navbar-link'>
                      <Icon/>{name}
                    </p>
                    <div className='navbar-dropdown' style={{paddingTop: '0px', borderTop: '0px'}}>
                      {chains.map((c, i) => (
                        <a target='_blank' rel='noopener noreferrer' key={i} className='navbar-item nav-dropdown-item' href={c.url + path}>
                          <Icon/>{c.name}
                        </a>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </nav>
          <div className='info-bar nav-price'>
            <div className='content has-text-centered'>
              <div className='columns is-mobile is-multiline is-centered' style={{marginTop: '0rem'}}>
                <div
                  className='column is-3 nav-price-col'>IOTX/BTC: {this.props.price ? `${this.props.price.btc} ฿` : 'N/A'}</div>
                <div
                  className='column is-2 nav-price-col' style={{paddingLeft:'65px'}}>IOTX/ETH: {this.props.price ? `${this.props.price.eth} Ξ` : 'N/A'}</div>
                <div
                  className='column is-3 nav-price-col' style={{marginLeft:'130px'}}>IOTX/USD: {this.props.price ? `$${parseFloat(this.props.price.usd).toFixed(4)}` : 'N/A'}</div>
              </div>
            </div>
          </div>
        </NavWrapper>
      </div>
    );
  }
  else {
    
    return (
      <div className='navbar is-fixed-top' role='navigation'>
        <NavWrapper>
          <nav className='navbar is-primary'>
            <div className='container'>
              <div className='navbar-brand'>
                <a className='navbar-item small-nav-logo' href={SITE_URL}>
                  <img
                    src={assetURL('/dark-iotxplorer-logo.png')}
                    alt='IoTeX Explorer'
                    width='120'
                    height='29'
                  />
                </a>
                <div
                  className={`navbar-burger burger ${this.state.displayDropdownMenu ? 'is-active' : ''}`}
                  data-target='navMenuColordark-example'
                  onClick={() => this.toggleDropdownMenu()}
                >
                  <span aria-hidden='true'/>
                  <span aria-hidden='true'/>
                  <span aria-hidden='true'/>
                </div>
              </div>
              <div
                className={`navbar-menu is-primary ${this.state.displayDropdownMenu ? 'is-active' : ''}`}
              >
                <div className='navbar-end'>
                  <div className='navbar-item has-dropdown is-hoverable'>
                    <p className='navbar-link'>Blockchain</p>
                    <div className='navbar-dropdown' style={{paddingTop: '0px', borderTop: '0px'}}>
                      <a className='navbar-item nav-dropdown-item' href={EXECUTIONS.INDEX}>{t('meta.executions')}</a>
                      <a className='navbar-item nav-dropdown-item' href={TRANSFERS.INDEX}>{t('meta.transfers')}</a>
                      <a className='navbar-item nav-dropdown-item' href={BLOCKS.INDEX}>{t('meta.blocks')}</a>
                      <a className='navbar-item nav-dropdown-item' href={VOTES.INDEX}>{t('meta.votes')}</a>
                    </div>
                  </div>
                  <div className='navbar-item has-dropdown is-hoverable'>
                    <p className='navbar-link'>Resources</p>
                    <div className='navbar-dropdown' style={{paddingTop: '0px', borderTop: '0px'}}>
                    <a className='navbar-item nav-dropdown-item' href={STAKING_DASHBOARD.INDEX}>Dashboard</a>   
                    <a className='navbar-item nav-dropdown-item' href={EDUCATION.INDEX}>Education</a>   
                    </div>
                  </div>
                  <div className='navbar-item has-dropdown is-hoverable'>
                  <a className='navbar-link is-arrowless' href={STAKING.INDEX}>Stake With Us &lt;3</a>
                  <div className='navbar-dropdown' style={{paddingTop: '0px', borderTop: '0px'}}>
                  <a className='navbar-item nav-dropdown-item' href={STAKING.INDEX}>Why Us?</a>
                  <a className='navbar-item nav-dropdown-item' href={STAKING_DASHBOARD.INDEX}>Calculators</a>
                  </div>               
                  </div>
                  <div className='navbar-item has-dropdown is-hoverable'>
                    <p className='navbar-link'>
                      <Icon/>{name}
                    </p>
                    <div className='navbar-dropdown' style={{paddingTop: '0px', borderTop: '0px'}}>
                      {chains.map((c, i) => (
                        <a target='_blank' rel='noopener noreferrer' key={i} className='navbar-item nav-dropdown-item' href={c.url + path}>
                          <Icon/>{c.name}
                        </a>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </nav>
        </NavWrapper>
      </div>
  )}
} 
}

const NavWrapper = styled('div', props => ({
  width: '100%',
  fontFamily: titleFont,
}));
