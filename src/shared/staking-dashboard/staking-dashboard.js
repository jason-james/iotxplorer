import Component from 'inferno-component';
import { StakingCalc } from './staking-calculators';
import {StakingDashboardNav} from './staking-dashboard-nav'

export class StakingDashboard extends Component {
    render() {
        return (

<div class="section">
  <div class="columns">
    <StakingDashboardNav activeClass='calculators'/>
    <main class="column">
    <section>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="title">Calculators</div>
          </div>
        </div>
      </div>
          <div className='container is-fluid'>
          <StakingCalc />
          </div>
      </section>
    </main>
    </div>
</div>
        )
    }
}