import Component from "inferno-component";
import { StakingCalc } from "./staking-calcs-list";
import { StakingDashboardNav } from "../staking-dashboard-nav";
import Helmet from "inferno-helmet";

export class Calculators extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      fetchDelegateData: 0
    };
  }

  componentDidMount() {
    const fetchDelegateData = this.props.fetchDelegateData();
    this.setState({ fetchDelegateData });
  }

  render() {
    return (
      <div class='section'>
        <Helmet title={`iotxplorer: Staking calculators`} />
        <div class='columns'>
          <StakingDashboardNav activeClass='calculators' />
          <main class='column'>
            <section>
              <div class='level'>
                <div class='level-left'>
                  <div class='level-item'>
                    <div class='title'>Calculators</div>
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
    );
  }
}