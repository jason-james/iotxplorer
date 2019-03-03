import Component from 'inferno-component'
import {assetURL} from '../../lib/asset-url'

export class EducationHeader extends Component {

    render() {
        return (
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="columns">
                    <div className="column is-12">
                        <div className="container content">
                            <div className='level' style={{justifyContent:'flex-start'}}>
                                <img 
                                    src={assetURL('/iotxplorer-logo-white.png')}
                                    width='90'
                                    />
                                <i className="icon is-medium fas fa-code" style={{marginLeft:'12px'}}></i>
                            </div>
                        <h1 className="title" style={{marginTop:'0em'}}>iotxplorer.education</h1>
                        <h3 className="subtitle">
                        Open source guides and documentation for the IoTeX network
                        </h3>
                        <a href="https://github.com/iotxplorer" target="_blank" className="button is-outlined is-light is-large">
                            <span className="icon">
                            <i className="fab fa-github"></i>
                            </span>
                            <span>Github</span>
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        )
    }
}