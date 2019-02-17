import Component from 'inferno-component';
import Helmet from 'inferno-helmet';

export class Staking extends Component {

    render() {
        return (
            <section>
            <section class="hero is-info is-medium is-bold">
             <Helmet
                title={`IoTxplorer - the IoTeX search engine`}
            />
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title">
                    The new standard in insert industry here
                    </h1>
                    <h2 class="subtitle">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                    <div class="card is-shady">
                        <div class="card-image has-text-centered">
                            <i class="fa fa-paw"></i>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <h4>Tristique senectus et netus et. </h4>
                                <p>Purus semper eget duis at tellus at urna condimentum mattis. Non blandit massa enim nec. Integer enim neque volutpat ac tincidunt vitae semper quis. Accumsan tortor posuere ac ut consequat semper viverra nam.</p>
                                <p><a href="#">Learn more</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-4">
                    <div class="card is-shady">
                        <div class="card-image has-text-centered">
                            <i class="fa fa-empire"></i>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <h4>Tempor orci dapibus ultrices in.</h4>
                                <p>Ut venenatis tellus in metus vulputate. Amet consectetur adipiscing elit pellentesque. Sed arcu non odio euismod lacinia at quis risus. Faucibus turpis in eu mi bibendum neque egestas cmonsu songue. Phasellus vestibulum lorem
                                sed risus.</p>
                                <p><a href="#">Learn more</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-4">
                    <div class="card is-shady">
                        <div class="card-image has-text-centered">
                            <i class="fa fa-apple"></i>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <h4> Leo integer malesuada nunc vel risus. </h4>
                                <p>Imperdiet dui accumsan sit amet nulla facilisi morbi. Fusce ut placerat orci nulla pellentesque dignissim enim. Libero id faucibus nisl tincidunt eget nullam. Commodo viverra maecenas accumsan lacus vel facilisis.</p>
                                <p><a href="#">Learn more</a></p>
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
