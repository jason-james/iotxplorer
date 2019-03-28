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
          <div
            className='container is-fluid'
            style={{ marginLeft: "0px", paddingLeft: "0px" }}
          >
            <main class='column'>
              <section>
                <div
                  className='container is-fluid'
                  style={{ marginLeft: "0px", paddingLeft: "0px" }}
                >
                  <section
                    class='hero welcome is-small is-primary'
                    style={{
                      marginBottom: "26px"
                    }}
                  >
                    <div class='hero-body'>
                      <div class='container' style={{ margin: "0px" }}>
                        <h1 class='title'>Calculators</h1>
                      </div>
                    </div>
                  </section>
                  <div className='box'>
                    <StakingCalc />
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
