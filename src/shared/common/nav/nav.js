// @flow

import React, { Component } from "react";
import { Link } from "react-router";
import { styled } from "styletron-react";
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
                  <Link className='navbar-item small-nav-logo' to={SITE_URL}>
                    <img
                      src={assetURL("/dark-iotxplorer-logo.png")}
                      alt='IoTeX Explorer'
                      width='120'
                      height='29'
                    />
                  </Link>
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
                    <Link
                      className='navbar-item is-hoverable'
                      to={DELEGATES.INDEX}
                      style={{ marginRight: "12px" }}
                    >
                      <div className='columns' style={{ marginTop: "0" }}>
                        Delegate
                      </div>
                      <div
                        className='columns'
                        style={{ fontSize: "14px", marginTop: "0" }}
                      >
                        insights
                      </div>
                    </Link>
                    <div className='navbar-item has-dropdown is-hoverable'>
                      <Link
                        className='navbar-link is-arrowless'
                        to={STAKING_DASHBOARD.INDEX}
                      >
                        Dashboard
                      </Link>
                      <div
                        className='navbar-dropdown'
                        style={{ paddingTop: "0px", borderTop: "0px" }}
                      >
                        <Link
                          className='navbar-item nav-dropdown-item'
                          to={STAKING_DASHBOARD.INDEX}
                        >
                          Member's Portal
                        </Link>
                        <Link
                          className='navbar-item nav-dropdown-item'
                          to={HOW_TO_STAKE.INDEX}
                        >
                          How To
                        </Link>
                        <Link
                          className='navbar-item nav-dropdown-item'
                          to={STAKING_DASHBOARD.CALCULATORS}
                        >
                          Calculators
                        </Link>
                      </div>
                    </div>
                    <div className='navbar-item has-dropdown is-hoverable'>
                      <Link
                        className='navbar-link is-arrowless'
                        to={EDUCATION.INDEX}
                      >
                        Education
                      </Link>
                      <div
                        className='navbar-dropdown'
                        style={{ paddingTop: "0px", borderTop: "0px" }}
                      >
                        <Link
                          className='navbar-item nav-dropdown-item'
                          to={EDUCATION.UNDERSTANDING_IOTEX}
                        >
                          Understanding IoTeX
                        </Link>
                        <Link
                          className='navbar-item nav-dropdown-item'
                          to={EDUCATION.VOTING_AND_DELEGATING}
                        >
                          Voting and Delegating
                        </Link>
                        <Link
                          className='navbar-item nav-dropdown-item'
                          to={EDUCATION.USING_THE_TESTNET}
                        >
                          Using the Testnet
                        </Link>
                      </div>
                    </div>
                    <div className='navbar-item has-dropdown is-hoverable'>
                      <Link
                        className='navbar-link is-arrowless'
                        to={STAKING.INDEX}
                      >
                        Stake With Us &lt;3
                      </Link>
                      <div
                        className='navbar-dropdown'
                        style={{ paddingTop: "0px", borderTop: "0px" }}
                      >
                        <Link
                          className='navbar-item nav-dropdown-item'
                          to={STAKING.INDEX}
                        >
                          Why Us?
                        </Link>
                        <Link
                          className='navbar-item nav-dropdown-item'
                          to='https://member.iotex.io/delegate/5c736ba72d01e727d88b9dea'
                          target='_blank'
                        >
                          Voting Profile
                        </Link>
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
                <Link className='navbar-item small-nav-logo' to={SITE_URL}>
                  <img
                    src={assetURL("/dark-iotxplorer-logo.png")}
                    alt='IoTeX Explorer'
                    width='120'
                    height='29'
                  />
                </Link>
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
                  <Link
                    className='navbar-item  is-hoverable'
                    to={DELEGATES.INDEX}
                    style={{ marginRight: "12px" }}
                  >
                    <div className='columns' style={{ marginTop: "0" }}>
                      Delegate
                    </div>
                    <div
                      className='columns'
                      style={{ fontSize: "14px", marginTop: "0" }}
                    >
                      insights
                    </div>
                  </Link>
                  <div className='navbar-item has-dropdown is-hoverable'>
                    <Link
                      className='navbar-link is-arrowless'
                      to={STAKING_DASHBOARD.INDEX}
                    >
                      Dashboard
                    </Link>
                    <div
                      className='navbar-dropdown'
                      style={{ paddingTop: "0px", borderTop: "0px" }}
                    >
                      <Link
                        className='navbar-item nav-dropdown-item'
                        to={STAKING_DASHBOARD.INDEX}
                      >
                        Member's Portal
                      </Link>
                      <Link
                        className='navbar-item nav-dropdown-item'
                        to={HOW_TO_STAKE.INDEX}
                      >
                        How To
                      </Link>
                      <Link
                        className='navbar-item nav-dropdown-item'
                        to={STAKING_DASHBOARD.CALCULATORS}
                      >
                        Calculators
                      </Link>
                    </div>
                  </div>
                  <div className='navbar-item has-dropdown is-hoverable'>
                    <Link
                      className='navbar-link is-arrowless'
                      to={EDUCATION.INDEX}
                    >
                      Education
                    </Link>
                    <div
                      className='navbar-dropdown'
                      style={{ paddingTop: "0px", borderTop: "0px" }}
                    >
                      <Link
                        className='navbar-item nav-dropdown-item'
                        to={EDUCATION.UNDERSTANDING_IOTEX}
                      >
                        Understanding IoTeX
                      </Link>
                      <Link
                        className='navbar-item nav-dropdown-item'
                        to={EDUCATION.VOTING_AND_DELEGATING}
                      >
                        Voting and Delegating
                      </Link>
                      <Link
                        className='navbar-item nav-dropdown-item'
                        to={EDUCATION.USING_THE_TESTNET}
                      >
                        Using the Testnet
                      </Link>
                    </div>
                  </div>
                  <div className='navbar-item has-dropdown is-hoverable'>
                    <Link
                      className='navbar-link is-arrowless'
                      to={STAKING.INDEX}
                    >
                      Stake With Us &lt;3
                    </Link>
                    <div
                      className='navbar-dropdown'
                      style={{ paddingTop: "0px", borderTop: "0px" }}
                    >
                      <Link
                        className='navbar-item nav-dropdown-item'
                        to={STAKING.INDEX}
                      >
                        Why Us?
                      </Link>
                      <Link
                        className='navbar-item nav-dropdown-item'
                        to='https://member.iotex.io/delegate/5c736ba72d01e727d88b9dea'
                        target='_blank'
                      >
                        Voting Profile
                      </Link>
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
