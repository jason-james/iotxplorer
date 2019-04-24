import Component from 'inferno-component';
import Helmet from 'inferno-helmet';
import {StakingDashboardNav} from '../staking-dashboard-nav';
import {StakingCalc} from './staking-calcs-list';

export class Calculators extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      fetchDelegateData: 0,
    };
  }

  render() {
    return (
      <div class='section'>
        <Helmet title={'iotxplorer: Staking calculators'} />
        <div class='columns' style={{paddingRight: '6rem'}}>
          <StakingDashboardNav activeClass='calculators' />
          <main class='column'>
            <section>
              <section
                class='hero welcome is-small is-primary'
                style={{
                  marginBottom: '26px',
                }}
              >
                <div class='hero-body'>
                  <div class='container' style={{margin: '0px'}}>
                    <h1 class='title'>Calculators</h1>
                  </div>
                </div>
              </section>
              <div className='box'>
                <StakingCalc />
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }
}
