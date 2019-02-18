import Component from 'inferno-component';
import Helmet from 'inferno-helmet';
import {assetURL} from '../../lib/asset-url'
import {t} from '../../lib/iso-i18n';

//TODO: Impletment mailing list at bottom of page. Convert appropriate strings below into translatables.

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
                <span class="tag is-primary">New</span>   Check out our brand new <a>calculator</a> to estimate your potential rewards from staking with us.
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
            <div style={{textAlign:'center'}}>
            <h2 className='title' style={{marginTop:'48px', marginBottom:'1.8em'}}>The iotxplorer mission              </h2>
                <img 
                    src={assetURL('/iotxplorer-mission2.svg')}
                    alt='secure'
                    width='1400'
                    height='1400'
                />
            </div>

            <section>
            <div style={{textAlign:'center'}}>
            <h2 className='title' style={{marginTop:'48px', marginBottom:'1.8em'}}>How it works</h2>
            </div>
        <div class="container">
            <div class="columns">
                <div className='column'>
                    <div className='card'>
                    <div className='card-image'>
                    <img 
                    src={assetURL('/delegates-program.png')} 
                    alt='delegates program'
                    width='660'
                    />
                    </div>
                    <div className='card-content subtitle' style={{color:'#4c4c4c', paddingBottom:'0.5rem', marginBottom:'0', fontWeight:'600'}}>
                    <a href='https://medium.com/iotex/iotex-delegates-program-application-voting-and-rewards-5cab7e87bd20' style={{color:'inherit'}}>IoTeX Delegates Program — Requirements (Medium)</a>
                    </div>
                    <div className='card-content'>
                    <p>The governance design of the IoTeX network encodes the rules and processes that define how the network will reach consensus, incentivize network participation, and evolve sustainably over time. In this blog post we provide an overview of the IoTeX Delegates Program, focusing on application, voting and election guidelines.</p>
                    <p style={{paddingTop:'8px'}}><a href='https://medium.com/iotex/iotex-delegates-program-application-voting-and-rewards-5cab7e87bd20' target="_blank">Read more</a></p>
                    </div>
                    </div>
                </div>
                <div class="column">
                    <div className='card'>
                    <div className='card-image'>
                    <iframe width="660" height="384" src="https://www.youtube.com/embed/_4gA89Ws334" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className='card-content subtitle'  style={{color:'#4c4c4c', paddingBottom:'0.5rem', marginBottom:'0', fontWeight:'600'}}>
                    IoTeX Delegates Program — Introduction Video
                    </div>
                    <div className='card-content'>
                    <p style={{marginBottom:'6px'}}>The IoTeX Delegates Program defines the rules and processes that allow IoTeX to maintain consensus and evolve sustainably over time. IoTeX is a digital democracy, where token holders elect Delegates to produce new blocks on behalf of the entire network. In this video, we provide an overview of the staking, voting, ranking, and rewarding process of the IoTeX Delegates Program.</p>                    
                    </div>
                    </div>
                </div>
        
            </div>
        </div>

        <section class="hero is-light is-medium is-bold" style={{marginTop: '48px'}}>

            <div class="hero-body">
                <div class="container has-text-centered">
                    <h2 class="title">
                    Join our mailing list
                    </h2>
                    <h2 class="subtitle">
                    Stay up to date on all things iotxplorer by joining our mailing list.
                    </h2>
                </div>
            </div>
        </section>
    </section>

            </section>
        )
    }
}
