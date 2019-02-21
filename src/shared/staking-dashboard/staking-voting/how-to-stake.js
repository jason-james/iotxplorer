import Component from 'inferno-component'
import {StakingDashboardNav} from '../staking-dashboard-nav'

export class HowToStake extends Component {

    howToStakeContent() {
        return (
            <div>Complete voting guides have not yet been released by the IoTeX foundation. Check the Official IoTeX telegram or return here soon for complete details after they've been released.</div>
        )
    }

    render() {
        return (
            <div class="section">
                <div class="columns">
                <StakingDashboardNav activeClass='how-to-stake'/>
                <main class="column">
                <section>
                <div class="level">
                    <div class="level-left">
                    <div class="level-item">
                        <div class="title">How To Stake</div>
                    </div>
                    </div>
                </div>
                    <div className='container is-fluid'>
                    {this.howToStakeContent()}
                    </div>
                </section>
                </main>
                </div>
            </div>
        )
    }
}