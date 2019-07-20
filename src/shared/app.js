import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { styled } from "styletron-react";
import window from "global";
import { assetURL } from "../lib/asset-url";
import { t } from "../lib/iso-i18n";
import { fonts } from "./common/styles/style-font";
import { colors } from "./common/styles/style-color";
import { Footer } from "./common/footer";
import { NavContainer } from "./common/nav/nav-container";
import { Breadcrumbs } from "./common/breadcrumbs";
import { TitleContainer } from "./common/iotex-explorer-title";
import { CookieConsentContainer } from "./common/cookie-consent-container";

export class App extends Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.props.updateWidth(window.innerWidth);
  }

  render() {
    const { children } = this.props;
    return (
      <RootStyle>
        <Helmet
          link={[
            {
              rel: "stylesheet",
              href:
                "//cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css"
            },
            {
              rel: "stylesheet",
              href:
                "https://cdn.jsdelivr.net/npm/bulma-switch@2.0.0/dist/css/bulma-switch.min.css"
            },
            {
              rel: "stylesheet",
              href: "//fonts.googleapis.com/css?family=Roboto|Share+Tech"
            },
            {
              rel: "stylesheet",
              href: "//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
            },
            {
              rel: "stylesheet",
              type: "text/css",
              href: `${assetURL("/stylesheets/blockchain-explorer.css")}`
            },
            {
              rel: "stylesheet",
              type: "text/css",
              href: `${assetURL("/stylesheets/primereact.css")}`
            },
            {
              rel: "stylesheet",
              type: "text/css",
              href: `${assetURL("/stylesheets/primeicons.css")}`
            },
            {
              rel: "stylesheet",
              type: "text/css",
              href: `${assetURL("/stylesheets/theme.css")}`
            },
            {
              rel: "stylesheet",
              type: "text/css",
              href: `${assetURL("/stylesheets/custom.css")}`
            }
          ]}
          script={[
            {
              defer: true,
              src: "https://use.fontawesome.com/releases/v5.3.1/js/all.js"
            },
            {
              defer: true,
              src: "//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"
            }
          ]}
        />
        <NavContainer />
        <Breadcrumbs width={this.props.width} />
        <div style={{ minHeight: "80vh", paddingTop: "50px" }}>{children}</div>
        <CookieConsentContainer
          content={t("other.cookie.content")}
          accept={t("other.cookie.accept")}
        />
        <Footer />
      </RootStyle>
    );
  }
}

const RootStyle = styled("div", props => ({
  ...fonts.body,
  backgroundColor: colors.ui02,
  color: colors.text01
}));
