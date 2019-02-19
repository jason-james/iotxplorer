import Component from 'inferno-component';
import { StakingCalculators } from './staking-calculators';

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
          <li><a class="is-active">Dashboard</a></li>
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
          <li>
            <a class="">Calculators</a>
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
      
      <div class="columns">
      <div className='column is-half'>
      <div className='box'>
            <div className='columns'>
        <div className='column is-three-quarters'>
        <div className='box'>Calculations go here</div>
        </div>
        <div className='columns is-multiline'>
        <div class="column">
          <div class="box">
            <div class="heading">Top Seller Total</div>
            <div class="title">56,950</div>
            <div class="level">
              <div class="level-item">
                <div class="">
                  <div class="heading">Sales $</div>
                  <div class="title is-5">250,000</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Overall $</div>
                  <div class="title is-5">750,000</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Sales %</div>
                  <div class="title is-5">25%</div>
                </div>
              </div>
            </div>
          </div>
          <div class="box">
            <div class="heading">Revenue / Expenses</div>
            <div class="title">55% / 45%</div>
            <div class="level">
              <div class="level-item">
                <div class="">
                  <div class="heading">Rev Prod $</div>
                  <div class="title is-5">30%</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Rev Serv $</div>
                  <div class="title is-5">25%</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Exp %</div>
                  <div class="title is-5">45%</div>
                </div>
              </div>
            </div>
          </div>
          <div class="box">
            <div class="heading">Feedback Activity</div>
            <div class="title">78% &uarr;</div>
            <div class="level">
              <div class="level-item">
                <div class="">
                  <div class="heading">Positive</div>
                  <div class="title is-5">1560</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Negative</div>
                  <div class="title is-5">368</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Pos/Neg %</div>
                  <div class="title is-5">77% / 23%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
        </div>
      </div>  
      </div>   
      </div>
      </section>
    </main>
    </div>
</div>
        )
    }
}