import Component from 'inferno-component'
import {styled} from 'styletron-inferno';


export class EducationMenu extends Component {

    render() {
        return (
            <div className="columns">
            <div className="column is-3">
            <aside className="is-medium menu">
        <p className="menu-label">
            categories
        </p>
        <ul className="menu-list education-buttons">
            <EducationButton><li className="is-right"><a href="#const" className="is-active">0. Understanding IoTeX</a></li></EducationButton>
            <EducationButton><li><a href="#let" className="is-active">1. Using the testnet</a></li></EducationButton>
            <EducationButton><li><a href="#let" className="is-active">2. Voting and Delegating</a></li></EducationButton>
        </ul>
            <p className="menu-label">
                Helpful links
            </p>
            <ul className="menu-list">
                <li><a className="button is-light education-tag" href='https://guides.github.com/activities/hello-world/' target='_blank'>Introduction to Github</a></li>
                <li><a className="button is-light education-tag" href='https://help.github.com/en/articles/fork-a-repo' target='_blank'>Forking</a></li>
                <li><a className="button is-light education-tag" href='https://help.github.com/en/articles/creating-a-pull-request' target='_blank'>Submitting pull requests</a></li>
            </ul>
            </aside>
        </div>
        <div className="column is-9">
            <div className="content is-medium">
                <h3 className="title is-3">How to contribute to iotxplorer.education</h3>
                    <div className="box">
                        <h4 id="const" className="title is-3">Providing new content</h4>
                        <article className="message is-primary">
                        <div className="message-body">
                            You can provide new content to the iotxplorer education page via Github. If you want to ensure your content will be accepted before you create it or try to edit this page, you can contact us first.
                        </div>
                        </article>
                        <pre>
                    <code className="language-javascript">
                    contactDetails = {'{'} 
                        <br></br>   
                        {'  '}telegram: t.me/iotxplorer
                        <br></br>
                        {'  '}email: contact@iotxplorer.io 
                        <br></br>                    
                    {'}'}
                    </code>
                    </pre>
                    </div>
                    <div className="box">
                    <h4 id="let" className="title is-3">Found an error?</h4>
                    <article className="message is-primary">
                        <div className="message-body">
                        If you see any errors or incorrect information please correct them using the same method as above.
                        </div>
                    </article>
                </div>
    </div>
    </div>
    </div>
        )
    }

}

const EducationButton = styled('education-buttons', props => ({
    margin: '2px',
  }));