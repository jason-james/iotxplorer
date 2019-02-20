import Component from 'inferno-component'
import {StakingDashboardNav} from '../staking-dashboard-nav'

export class HowToStake extends Component {

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
                    </div>
                </section>
                </main>
                </div>
            </div>
        )
    }
}