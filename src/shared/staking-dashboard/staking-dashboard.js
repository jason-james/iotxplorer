import Component from "inferno-component";
import { StakingDashboardNav } from "./staking-dashboard-nav";
import Helmet from "inferno-helmet";

export class StakingDashboard extends Component {
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
        <Helmet title={`iotxplorer: Staking dashboard`} />
        <div class='columns'>
          <StakingDashboardNav activeClass='dashboard' />
          <main class='column'>
            <section>
              <div class='level'>
                <div class='level-left'>
                  <div class='level-item'>
                    <div class='title'>Dashboard</div>
                  </div>
                </div>
              </div>
              <div className='container is-fluid'>
                <div className='box'>Dashboard</div>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }
}
