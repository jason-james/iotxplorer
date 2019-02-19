import Component from 'inferno-component';
import { StakingCalc } from './staking-calculators';

export class StakingDashboard extends Component {
    render() {
        return (

<div class="section">
  <div class="columns">
    <aside class="column is-2">
      <nav class="menu">
        <p class="menu-label">
          General
        </p>
        <ul class="menu-list">
          <li><a class="is-active">Calculators</a></li>
        </ul>
        <p class="menu-label">
          Voting/Staking
        </p>
        <ul class="menu-list">
          <li>
            <a>How To Stake</a>
            <ul>
              <li><a>Definitions</a></li>
              <li><a>FAQ</a></li>
            </ul>
         </li> 
        </ul>
      </nav>
    </aside>
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