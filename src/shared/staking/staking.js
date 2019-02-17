import Component from 'inferno-component';
import Helmet from 'inferno-helmet';
import {assetURL} from '../../lib/asset-url'
import {t} from '../../lib/iso-i18n';

export class Staking extends Component {

    render() {
        return (
            <section>
            <section class="hero is-primary is-medium is-bold">
             <Helmet
                title={`IoTxplorer - the IoTeX search engine`}
            />
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title">
                    Always adding value.
                    </h1>
                    <h2 class="subtitle">
                    Add value to the IoTeX network while adding to your wallet. Stake with iotxplorer. 
                    </h2>
                </div>
            </div>
        </section>
        <div class="box cta">
            <p class="has-text-centered">
                <span class="tag is-primary">New</span> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        </div>
        <section class="container">
            <div class="columns features">
                <div class="column is-4">
                    <div class="card is-shady" style={{paddingTop:'1.5em'}}>
                        <div class="card-image has-text-centered">
                            <img 
                            src={assetURL('/undraw-safe.svg')}
                            alt='secure'
                            width='275'
                            height='275'
                            />
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <h4 style={{display: 'flex', justifyContent:'center'}}> Secure. </h4>
                                <p>Purus semper eget duis at tellus at urna condimentum mattis. Non blandit massa enim nec. Integer enim neque volutpat ac tincidunt vitae semper quis. Accumsan tortor posuere ac ut consequat semper viverra nam.</p>
                                {/* <p><a href="#">Learn more</a></p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-4">
                    <div class="card is-shady" style={{paddingTop:'1.5em'}}>
                        <div class="card-image has-text-centered">
                            <img 
                            src={assetURL('/undraw-financial-data.png')}
                            alt='profitable'
                            width='250'
                            height='250'
                            />
                        </div>
                        <div class="card-content">
                            <div class="content" >
                                <h4 style={{display: 'flex', justifyContent:'center'}}> Rewarding. </h4>
                                <p>Ut venenatis tellus in metus vulputate. Amet consectetur adipiscing elit pellentesque. Sed arcu non odio euismod lacinia at quis risus. Faucibus turpis in eu mi bibendum neque egestas cmonsu songue. Phasellus vestibulum lorem
                                sed risus.</p>
                                {/* <p><a href="#">Learn more</a></p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-4">
                    <div class="card is-shady" style={{paddingTop:'1.5em'}}>
                        <div class="card-image has-text-centered">
                            <img src={assetURL('/undraw-transparent.svg')}
                            alt='transparent'
                            width='207'
                            height='207'
                            />
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <h4 style={{display: 'flex', justifyContent:'center'}}> Transparent. </h4>
                                <p>Imperdiet dui accumsan sit amet nulla facilisi morbi. Fusce ut placerat orci nulla pellentesque dignissim enim. Libero id faucibus nisl tincidunt eget nullam. Commodo viverra maecenas accumsan lacus vel facilisis.</p>
                                {/* <p><a href="#">Learn more</a></p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>

            </section>
        )
    }
}
