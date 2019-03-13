import Component from "inferno-component";
import { Link } from "inferno-router";
import Helmet from "inferno-helmet";

import { assetURL } from "../../lib/asset-url";

export class EducationHeader extends Component {
  render() {
    return (
      <section className='hero is-primary'>
        <Helmet
          title={`iotxplorer: education`}
          meta={[
            {
              name: "description",
              content:
                "Guides, tutorials, articles, videos and developer documentation to help you find out everything you need to know about IoTeX."
            },
            {
              property: "og:title",
              content: "iotxplorer: Education"
            },
            {
              property: "og:description",
              content:
                "Guides, tutorials, articles, videos and developer documentation to help you find out everything you need to know about IoTeX."
            },
            {
              property: "og:image",
              content: `${assetURL("/meta-image-large.png")}`
            },
            {
              name: "twitter:card",
              content: "summary_large_image"
            },
            {
              name: "twitter:site",
              content: "@iotxplorer"
            },
            {
              name: "twitter:title",
              content: "iotxplorer: Education"
            },
            {
              name: "twitter:description",
              content:
                "Guides, tutorials, articles, videos and developer documentation to help you find out everything you need to know about IoTeX."
            },
            {
              name: "twitter:image",
              content: `${assetURL("/education-meta-image.png")}`
            }
          ]}
        />
        <div className='hero-body'>
          <div className='columns'>
            <div className='column is-12'>
              <div className='container content'>
                <Link to='/education'>
                  <div
                    className='level'
                    style={{ justifyContent: "flex-start" }}
                  >
                    <img
                      src={assetURL("/iotxplorer-logo-white.png")}
                      width='90'
                      style={{ marginBottom: "1.5rem" }}
                    />
                    <i
                      className='icon is-medium fas fa-code'
                      style={{ marginLeft: "12px" }}
                    />
                  </div>
                </Link>
                <Link to='/education'>
                  <h1
                    className='title'
                    style={{ marginTop: "0em", marginBottom: "1.5rem" }}
                  >
                    iotxplorer.education
                  </h1>
                </Link>
                <h3 className='subtitle' style={{ marginTop: "-1.25rem" }}>
                  Open source guides and documentation for the IoTeX network
                </h3>
                <a
                  href='https://github.com/iotxplorer'
                  target='_blank'
                  className='button is-outlined is-light is-large'
                >
                  <span className='icon'>
                    <i className='fab fa-github' />
                  </span>
                  <span>Github</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
