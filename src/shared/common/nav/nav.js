// @flow

import Component from 'inferno-component';
import {styled} from 'styletron-inferno';
import serialize from 'form-serialize';
import window from 'global/window';
import isBrowser from 'is-browser';
import {assetURL} from '../../../lib/asset-url';
import {t} from '../../../lib/iso-i18n';
import {BLOCKS, SITE_URL, EXECUTIONS, TRANSFERS, VOTES, WALLET, IOTEX_URL, NAV} from '../site-url';
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
      this.setState({fetchCoinStatistic, fetchCoinPrice});
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
                      <a className='navbar-item nav-dropdown-item' href={WALLET.INDEX}>{t('meta.account')}</a>
                      <a className='navbar-item nav-dropdown-item' href={SITE_URL}>{'PLACEHOLDER'}</a> 
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
                  className='column nav-price-col'>IOTX/BTC: {this.props.price ? this.props.price.btc : 'N/A'}</div>
                <div
                  className='column nav-price-col'>IOTX/ETH: {this.props.price ? this.props.price.eth : 'N/A'}</div>
                <div
                  className='column nav-price-col'>IOTX/USD: {this.props.price ? this.props.price.usd : 'N/A'}</div>
              </div>
            </div>
          </div>
        </NavWrapper>
      </div>
    );
  }
}

const NavWrapper = styled('div', props => ({
  width: '100%',
  fontFamily: titleFont,
}));
