import Component from 'inferno-component';
import { StakingCalc } from './staking-calculators';
import {StakingDashboardNav} from './staking-dashboard-nav'
import Helmet from 'inferno-helmet';


export class StakingDashboard extends Component {
    render() {
        return (

<div class="section">
<Helmet
            title={`iotxplorer - the iotex search engine`}
          />
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
          <div className='box'>
          <StakingCalc />
          </div>
          </div>
      </section>
    </main>
    </div>
</div>
        )
    }
}