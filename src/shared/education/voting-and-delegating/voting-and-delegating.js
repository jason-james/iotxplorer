import { styled } from "styletron-inferno";
import Component from "inferno-component";
import { Link } from "inferno-router";

import { EducationHeader } from "../education-header";

export class VotingAndDelegating extends Component {
  render() {
    return (
      <div>
        <EducationHeader />
        <section className='section'>
          <div className='container'>
            <div className='columns'>
              <div className='column is-3'>
                <aside className='is-medium menu'>
                  <p className='menu-label'>categories</p>
                  <ul className='menu-list education-buttons'>
                    <EducationButton>
                      <li className='is-right'>
                        <Link
                          to='/education/understandingiotex/'
                          style={{ backgroundColor: "#00d1b2", color: "#fff" }}
                        >
                          0. Understanding IoTeX
                        </Link>
                      </li>
                    </EducationButton>
                    <EducationButton>
                      <li>
                        <Link
                          to='/education/usingthetestnet/'
                          style={{ backgroundColor: "#00d1b2", color: "#fff" }}
                        >
                          1. Using the testnet
                        </Link>
                      </li>
                    </EducationButton>
                    <EducationButton>
                      <li>
                        <Link
                          to='/education/votingdelegating/'
                          style={{ backgroundColor: "#00d1b2", color: "#fff" }}
                        >
                          2. Voting and Delegating
                        </Link>
                      </li>
                    </EducationButton>
                  </ul>
                  <p className='menu-label'>Contents</p>
                  <ul className='menu-list'>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='https://guides.github.com/activities/hello-world/'
                        target='_blank'
                      >
                        Work in progress
                      </a>
                    </li>
                  </ul>
                </aside>
              </div>
              <div className='column is-9'>
                <div className='content is-medium'>
                  <h3 className='title is-3'>Voting and Delegating</h3>
                  <div className='box'>
                    <h4 id='const' className='title is-4'>
                      Work in progress
                    </h4>
                    <p>
                      The content for this page is currently being written. If
                      you'd like to help, join us on telegram!
                    </p>
                    <pre>
                      <code className='language-javascript'>
                        contactDetails = {"{"}
                        <br />
                        {"  "}telegram: t.me/iotxplorer,
                        <br />
                        {"  "}email: contact@iotxplorer.io
                        <br />
                        {"}"}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </section>
      </div>
    );
  }
}

const EducationButton = styled("education-buttons", props => ({
  margin: "2px"
}));
