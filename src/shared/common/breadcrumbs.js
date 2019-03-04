// @flow

import Component from "inferno-component";
import { styled } from "styletron-inferno";
import { Link } from "inferno-router";
import window from "global/window";
import { t } from "../../lib/iso-i18n";
import { fonts } from "./styles/style-font";
import { ellipsisText } from "./utils";
import { SITE_URL, STAKING, STAKING_DASHBOARD, EDUCATION } from "./site-url";

type Breadcrumb = {
  name: string,
  address: string
};

const _paths = ["address", "blocks", "executions", "transfers", "votes"];
const _restrictedPaths = ["address"];

export function cleanPath(paths: string): Array<Breadcrumb> {
  const p = paths.split("/").filter(p => p !== "");
  const breadcrumbs = [];
  for (let i = 0; i < p.length; i++) {
    let name = p[i];
    let address = p[i];
    if (_paths.includes(p[i])) {
      name = t(`breadcrumbs.${p[i]}`);
      address = p[i];
    }
    breadcrumbs.push({ name, address });
  }
  breadcrumbs.splice(0, 0, { name: t("breadcrumbs.home"), address: "" });
  return breadcrumbs;
}

export class Breadcrumbs extends Component {
  props: {
    width: number
  };

  constructor(props: any) {
    super(props);
    this.state = {
      url: "",
      homepage: null
    };
  }

  componentDidMount() {
    this.setState({
      url: window.location.pathname
    });
  }

  componentWillReceiveProps() {
    if (this.state.url !== window.location.pathname) {
      this.setState({
        url: window.location.pathname
      });
    }
  }

  render() {
    const breadcrumbs = cleanPath(this.state.url);
    if (
      this.state.url !== SITE_URL &&
      this.state.url !== STAKING.INDEX &&
      !this.state.url.includes(STAKING_DASHBOARD.INDEX) &&
      !this.state.url.includes(EDUCATION.INDEX)
    ) {
      return (
        <BreadCrumbStyle className='container column'>
          <nav className='breadcrumb' aria-label='breadcrumbs'>
            <ul>
              {breadcrumbs.length === 0 ||
              (breadcrumbs.length === 1 && breadcrumbs[0].address === "")
                ? null
                : breadcrumbs.map((p, index) => {
                    const length = breadcrumbs.length;
                    return (
                      <li
                        key={index}
                        className={
                          notClickablePath(p.address) || index + 1 === length
                            ? "is-active"
                            : ""
                        }
                      >
                        <Link to={`/${p.address}`} className='force-teal'>
                          {ellipsisText(p.name.toLowerCase(), this.props.width)}
                        </Link>
                      </li>
                    );
                  })}
            </ul>
          </nav>
        </BreadCrumbStyle>
      );
    } else {
      return <div />;
    }
  }
}

export function notClickablePath(p: string): boolean {
  for (let i = 0; i < _restrictedPaths.length; i++) {
    if (p === _restrictedPaths[i]) {
      return true;
    }
  }
  return false;
}

const BreadCrumbStyle = styled("div", props => ({
  ...fonts.body,
  paddingTop: "50px",
  marginBottom: "0rem"
}));
