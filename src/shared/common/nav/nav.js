// @flow

import Component from "inferno-component";
import { styled } from "styletron-inferno";
import serialize from "form-serialize";
import window from "global/window";
import isBrowser from "is-browser";
import { assetURL } from "../../../lib/asset-url";
import { t } from "../../../lib/iso-i18n";
import {
  BLOCKS,
  SITE_URL,
  EXECUTIONS,
  TRANSFERS,
  VOTES,
  WALLET,
  IOTEX_URL,
  NAV,
  STAKING,
  STAKING_DASHBOARD,
  EDUCATION,
  HOW_TO_STAKE,
  DASHBOARD,
  DELEGATES
} from "../site-url";
import { titleFont } from "../../../shared/common/styles/style-font";
import { fetchPost } from "../../../lib/fetch-post";

function Icon() {
  return (
    <span style={{ paddingRight: "8px" }}>
      <i className='fas fa-link' />
    </span>
  );
}

export class Nav extends Component {
  _form: any;
  props: {
    chains: Array<{
      name: string,
      url: string
    }>
  };

  constructor(props: any) {
    super(props);
    this.state = {
      displayDropdownMenu: false,
      fetchCoinStatistic: 0,
      fetchCoinPrice: 0,
      error: false,
      url: ""
    };

    (this: any).toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
  }

  toggleDropdownMenu() {
    this.setState({
      displayDropdownMenu: !this.state.displayDropdownMenu
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
      const fetchCoinStatistic = window.setInterval(
        () => this.props.fetchCoinStatistic(),
        30000
      );
      const fetchCoinPrice = window.setInterval(
        () => this.props.fetchCoinPrice(),
        30000
      );
      this.setState({
        fetchCoinStatistic,
        fetchCoinPrice,
        url: window.location.pathname
      });
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.state.fetchCoinStatistic);
    window.clearInterval(this.state.fetchCoinPrice);
  }

  render() {
    const { chains, href } = this.props;
    let name = "";
    let path = "";
    for (const c of chains) {
      if (href.indexOf(c.url) !== -1) {
        name = c.name;
        path = href.replace(c.url, "");
      }
    }
    if (
      this.state.url !== STAKING.INDEX &&
      this.state.url !== EDUCATION.INDEX
    ) {
      return (
        <div className='navbar is-fixed-top' role='navigation'>
          <NavWrapper>
            <nav className='navbar is-primary'>
              <div className='container'>
                <div className='navbar-brand'>
                  <a className='navbar-item small-nav-logo' href={SITE_URL}>
                    <img
                      src={assetURL("/dark-iotxplorer-logo.png")}
                      alt='IoTeX Explorer'
                      width='120'
                      height='29'
                    />
                  </a>
                  <div
                    className={`navbar-burger burger ${
                      this.state.displayDropdownMenu ? "is-active" : ""
                    }`}
                    data-target='navMenuColordark-example'
                    onClick={() => this.toggleDropdownMenu()}
                  >
                    <span aria-hidden='true' />
                    <span aria-hidden='true' />
                    <span aria-hidden='true' />
                  </div>
                </div>
                <div
                  className={`navbar-menu is-primary ${
                    this.state.displayDropdownMenu ? "is-active" : ""
                  }`}
                >
                  <div className='navbar-end'>
                    <a
                      className='navbar-item  is-hoverable'
                      href={DELEGATES.INDEX}
                      style={{ marginRight: "12px" }}
                    >
                      Delegates
                    </a>
                    <div className='navbar-item has-dropdown is-hoverable'>
                      <a
                        className='navbar-link is-arrowless'
                        href={STAKING_DASHBOARD.INDEX}
                      >
                        Dashboard
                      </a>
                      <div
                        className='navbar-dropdown'
                        style={{ paddingTop: "0px", borderTop: "0px" }}
                      >
                        <a
                          className='navbar-item nav-dropdown-item'
                          href={STAKING_DASHBOARD.INDEX}
                        >
                          Member's Portal
                        </a>
                        <a
                          className='navbar-item nav-dropdown-item'
                          href={STAKING_DASHBOARD.HOW_TO_STAKE}
                        >
                          How To
                        </a>
                        <a
                          className='navbar-item nav-dropdown-item'
                          href={STAKING_DASHBOARD.CALCULATORS}
                        >
                          Calculators
                        </a>
                      </div>
                    </div>
                    <div className='navbar-item has-dropdown is-hoverable'>
                      <a
                        className='navbar-link is-arrowless'
                        href={EDUCATION.INDEX}
                      >
                        Education
                      </a>
                      <div
                        className='navbar-dropdown'
                        style={{ paddingTop: "0px", borderTop: "0px" }}
                      >
                        <a
                          className='navbar-item nav-dropdown-item'
                          href={EDUCATION.UNDERSTANDING_IOTEX}
                        >
                          Understanding IoTeX
                        </a>
                        <a
                          className='navbar-item nav-dropdown-item'
                          href={EDUCATION.VOTING_AND_DELEGATING}
                        >
                          Voting and Delegating
                        </a>
                        <a
                          className='navbar-item nav-dropdown-item'
                          href={EDUCATION.USING_THE_TESTNET}
                        >
                          Using the Testnet
                        </a>
                      </div>
                    </div>
                    <div className='navbar-item has-dropdown is-hoverable'>
                      <a
                        className='navbar-link is-arrowless'
                        href={STAKING.INDEX}
                      >
                        Stake With Us &lt;3
                      </a>
                      <div
                        className='navbar-dropdown'
                        style={{ paddingTop: "0px", borderTop: "0px" }}
                      >
                        <a
                          className='navbar-item nav-dropdown-item'
                          href={STAKING.INDEX}
                        >
                          Why Us?
                        </a>
                        <a
                          className='navbar-item nav-dropdown-item'
                          href='https://member.iotex.io/delegate/5c736ba72d01e727d88b9dea'
                          target='_blank'
                        >
                          Voting Profile
                        </a>
                      </div>
                    </div>
                    {/* <div className='navbar-item has-dropdown is-hoverable'>
                      <p className='navbar-link'>
                        <Icon />
                        {name}
                      </p>
                      <div
                        className='navbar-dropdown'
                        style={{paddingTop: '0px', borderTop: '0px'}}
                      >
                        {chains.map((c, i) => (
                          <a
                            target='_blank'
                            rel='noopener noreferrer'
                            key={i}
                            className='navbar-item nav-dropdown-item'
                            href={c.url + path}
                          >
                            <Icon />
                            {c.name}
                          </a>
                        ))}
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </nav>
            <div className='info-bar nav-price'>
              <div className='content has-text-centered'>
                <div
                  className='columns is-mobile is-multiline is-centered'
                  style={{ marginTop: "0rem" }}
                >
                  <div className='column is-3 nav-price-col'>
                    IOTX/BTC:{" "}
                    {this.props.price ? `${this.props.price.btc} ฿` : "N/A"}
                  </div>
                  <div
                    className='column is-2 nav-price-col'
                    style={{ paddingLeft: "65px" }}
                  >
                    IOTX/ETH:{" "}
                    {this.props.price ? `${this.props.price.eth} Ξ` : "N/A"}
                  </div>
                  <div
                    className='column is-3 nav-price-col'
                    style={{ marginLeft: "130px" }}
                  >
                    IOTX/USD:{" "}
                    {this.props.price
                      ? `$${parseFloat(this.props.price.usd).toFixed(4)}`
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </NavWrapper>
        </div>
      );
    }
    return (
      <div className='navbar is-fixed-top' role='navigation'>
        <NavWrapper>
          <nav className='navbar is-primary'>
            <div className='container'>
              <div className='navbar-brand'>
                <a className='navbar-item small-nav-logo' href={SITE_URL}>
                  <img
                    src={assetURL("/dark-iotxplorer-logo.png")}
                    alt='IoTeX Explorer'
                    width='120'
                    height='29'
                  />
                </a>
                <div
                  className={`navbar-burger burger ${
                    this.state.displayDropdownMenu ? "is-active" : ""
                  }`}
                  data-target='navMenuColordark-example'
                  onClick={() => this.toggleDropdownMenu()}
                >
                  <span aria-hidden='true' />
                  <span aria-hidden='true' />
                  <span aria-hidden='true' />
                </div>
              </div>
              <div
                className={`navbar-menu is-primary ${
                  this.state.displayDropdownMenu ? "is-active" : ""
                }`}
              >
                <div className='navbar-end'>
                  <a
                    className='navbar-item is-hoverable is-arrowless'
                    href={DELEGATES.INDEX}
                    style={{ marginRight: "12px" }}
                  >
                    Delegates
                  </a>
                  <div className='navbar-item has-dropdown is-hoverable'>
                    <a
                      className='navbar-link is-arrowless'
                      href={STAKING_DASHBOARD.INDEX}
                    >
                      Dashboard
                    </a>
                    <div
                      className='navbar-dropdown'
                      style={{ paddingTop: "0px", borderTop: "0px" }}
                    >
                      <a
                        className='navbar-item nav-dropdown-item'
                        href={STAKING_DASHBOARD.INDEX}
                      >
                        Member's Portal
                      </a>
                      <a
                        className='navbar-item nav-dropdown-item'
                        href={STAKING_DASHBOARD.HOW_TO_STAKE}
                      >
                        How To
                      </a>
                      <a
                        className='navbar-item nav-dropdown-item'
                        href={STAKING_DASHBOARD.CALCULATORS}
                      >
                        Calculators
                      </a>
                    </div>
                  </div>
                  <div className='navbar-item has-dropdown is-hoverable'>
                    <a
                      className='navbar-link is-arrowless'
                      href={EDUCATION.INDEX}
                    >
                      Education
                    </a>
                    <div
                      className='navbar-dropdown'
                      style={{ paddingTop: "0px", borderTop: "0px" }}
                    >
                      <a
                        className='navbar-item nav-dropdown-item'
                        href={EDUCATION.UNDERSTANDING_IOTEX}
                      >
                        Understanding IoTeX
                      </a>
                      <a
                        className='navbar-item nav-dropdown-item'
                        href={EDUCATION.VOTING_AND_DELEGATING}
                      >
                        Voting and Delegating
                      </a>
                      <a
                        className='navbar-item nav-dropdown-item'
                        href={EDUCATION.USING_THE_TESTNET}
                      >
                        Using the Testnet
                      </a>
                    </div>
                  </div>
                  <div className='navbar-item has-dropdown is-hoverable'>
                    <a
                      className='navbar-link is-arrowless'
                      href={STAKING.INDEX}
                    >
                      Stake With Us &lt;3
                    </a>
                    <div
                      className='navbar-dropdown'
                      style={{ paddingTop: "0px", borderTop: "0px" }}
                    >
                      <a
                        className='navbar-item nav-dropdown-item'
                        href={STAKING.INDEX}
                      >
                        Why Us?
                      </a>
                      <a
                        className='navbar-item nav-dropdown-item'
                        href='https://member.iotex.io/delegate/5c736ba72d01e727d88b9dea'
                        target='_blank'
                      >
                        Voting Profile
                      </a>
                    </div>
                  </div>
                  {/* <div className='navbar-item has-dropdown is-hoverable'>
                      <p className='navbar-link'>
                        <Icon />
                        {name}
                      </p>
                      <div
                        className='navbar-dropdown'
                        style={{paddingTop: '0px', borderTop: '0px'}}
                      >
                        {chains.map((c, i) => (
                          <a
                            target='_blank'
                            rel='noopener noreferrer'
                            key={i}
                            className='navbar-item nav-dropdown-item'
                            href={c.url + path}
                          >
                            <Icon />
                            {c.name}
                          </a>
                        ))}
                      </div>
                    </div> */}
                </div>
              </div>
            </div>
          </nav>
        </NavWrapper>
      </div>
    );
  }
}

const NavWrapper = styled("div", props => ({
  width: "100%",
  fontFamily: titleFont
}));
