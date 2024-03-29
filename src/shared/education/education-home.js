import { styled } from "styletron-react";
import React, { Component } from "react";
import { Link } from "react-router";
import { EducationHeader } from "./education-header";

export class Education extends Component {
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
                          className='is-active'
                        >
                          0. Understanding IoTeX
                        </Link>
                      </li>
                    </EducationButton>
                    <EducationButton>
                      <li>
                        <Link
                          to='/education/votingdelegating/'
                          className='is-active'
                        >
                          1. Voting and Delegating
                        </Link>
                      </li>
                    </EducationButton>
                    <EducationButton>
                      <li>
                        <Link
                          to='/education/usingthetestnet/'
                          className='is-active'
                        >
                          2. Using the testnet
                        </Link>
                      </li>
                    </EducationButton>
                  </ul>
                  <p className='menu-label'>Helpful links</p>
                  <ul className='menu-list'>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='https://guides.github.com/activities/hello-world/'
                        target='_blank'
                      >
                        Introduction to Github
                      </a>
                    </li>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='https://help.github.com/en/articles/fork-a-repo'
                        target='_blank'
                      >
                        Forking
                      </a>
                    </li>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='https://help.github.com/en/articles/creating-a-pull-request'
                        target='_blank'
                      >
                        Submitting pull requests
                      </a>
                    </li>
                  </ul>
                </aside>
              </div>
              <div className='column is-9'>
                <div className='content is-medium'>
                  <h3 className='title is-3'>
                    How to contribute to iotxplorer.education
                  </h3>
                  <div className='box'>
                    <h4 id='const' className='title is-4'>
                      Providing new content
                    </h4>
                    <p>
                      You can provide new content to the iotxplorer education
                      page via Github. If you want to ensure your content will
                      be accepted before you create it or try to edit this page,
                      you can contact us first.
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
                  <div className='box'>
                    <h4 id='let' className='title is-4'>
                      Found an error?
                    </h4>
                    <article className='message is-primary'>
                      <div className='message-body'>
                        If you see any errors or incorrect information please
                        correct them using the same method as above.
                      </div>
                    </article>
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

const EducationButton = styled("ul", props => ({
  margin: "4px"
}));
