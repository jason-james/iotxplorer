// @flow

import React from "react";
import { styled } from "styletron-react";
import { t } from "../../lib/iso-i18n";
import { assetURL } from "../../lib/asset-url";
import { fonts } from "./styles/style-font";
import { colors } from "./styles/style-color";
import { colorHover } from "./color-hover";

const IOTXPLORER_LINK = "https://www.iotxplorer.io/";
const MEDIUM_LINK = "https://medium.com/iotxplorer";
const TELEGRAM_LINK = "https://t.me/iotxplorer";
const TWITTER_LINK = "https://twitter.com/iotxplorer";
const GITHUB_LINK = "https://github.com/iotxplorer";
const EDUCATION_LINK = "https://www.iotxplorer.io/education";
const WHY_US_LINK = "https://www.iotxplorer.io/staking";
const VOTING_LINK = "https://member.iotex.io/delegate/5c736ba72d01e727d88b9dea";
const DASHBOARD_LINK = "https://www.iotxplorer.io/staking/dashboard";

export function Footer() {
  return (
    <FooterStyle>
      <div className='container'>
        <div className='content has-text-centered'>
          <div className='columns'>
            <div className='column is-one-third has-text-centered'>
              <p
                className='heading'
                style={{
                  width: "60%",
                  marginLeft: "54px",
                  fontSize: "15px",
                  letterSpacing: " 0px"
                }}
              >
                Stay Updated
              </p>

              <form
                action='//iotxplorer.us20.list-manage.com/subscribe/post?u=6e080e4562ed541d1f6636917&amp;id=01b0eb8ba6'
                method='post'
                id='mc-embedded-subscribe-form'
                name='mc-embedded-subscribe-form'
                className='validate has-text-centered'
                target='_blank'
                noValidate={false}
              >
                <div className='control has-text-centered'>
                  <input
                    type='email'
                    className='input'
                    aria-label='Email'
                    id='mce-EMAIL'
                    name='EMAIL'
                    placeholder='Email <3'
                    required={true}
                    style={{ width: "180px", marginBottom: "0.7rem" }}
                  />
                </div>
                <input
                  type='hidden'
                  name='b_6e080e4562ed541d1f6636917_01b0eb8ba6'
                  tabIndex='-1'
                  value=''
                />
                <button
                  className='button is-outlined is-primary'
                  style={{ width: "180px" }}
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>
            <div className='column is-one-third'>
              <p>© 2019 iotxplorer</p>
              <img
                src={assetURL("/iotxplorer-favicon.png")}
                width='88px'
                height='100px'
                style={{ marginBottom: "0.5rem" }}
              />
              <div className='has-text-centered'>
                <LinkStyle href={MEDIUM_LINK}>
                  <FooterIcon className='fab fa-medium' />
                </LinkStyle>
                <LinkStyle href={TELEGRAM_LINK}>
                  <FooterIcon className='fab fa-telegram-plane' />
                </LinkStyle>
                <LinkStyle href={TWITTER_LINK}>
                  <FooterIcon className='fab fa-twitter-square' />
                </LinkStyle>
                <LinkStyle href={GITHUB_LINK}>
                  <FooterIcon className='fab fa-github-square' />
                </LinkStyle>
              </div>
            </div>
            <div className='column is-one-third has-text-centered'>
              <p
                className='heading has-text-centered'
                style={{
                  width: "60%",
                  marginLeft: "52px",
                  fontSize: "15px",
                  letterSpacing: " 0px"
                }}
              >
                explore
              </p>
              <p
                className=' has-text-centered'
                style={{ width: "60%", marginLeft: "52px", fontSize: "15px" }}
              >
                <LinkStyle href={VOTING_LINK}>Vote</LinkStyle>
              </p>
              <p
                className=' has-text-centered'
                style={{ width: "60%", marginLeft: "52px", fontSize: "15px" }}
              >
                <LinkStyle href={WHY_US_LINK}>Why us?</LinkStyle>
              </p>
              <p
                className=' has-text-centered'
                style={{ width: "60%", marginLeft: "52px", fontSize: "15px" }}
              >
                <LinkStyle href={EDUCATION_LINK}>Education</LinkStyle>
              </p>
              <p
                className=' has-text-centered'
                style={{ width: "60%", marginLeft: "52px", fontSize: "15px" }}
              >
                <LinkStyle href={DASHBOARD_LINK}>Dashboard</LinkStyle>
              </p>
            </div>
          </div>
        </div>
      </div>
    </FooterStyle>
  );
}

const FooterStyle = styled("div", props => ({
  ...fonts.body,
  backgroundColor: "#363636",
  color: colors.inverse01,
  padding: "3rem 1.5rem 6rem"
}));

const LinkStyle = styled("a", props => ({
  paddingLeft: "5px",
  paddingRight: "5px",
  cursor: "pointer",
  ...colorHover(colors.inverse01, colors.brand02)
}));

const FooterIcon = styled("i", props => ({
  color: "00d1b2",
  fontSize: "2em",
  cursor: "pointer",
  ...colorHover(colors.brand02, colors.brand02)
}));
