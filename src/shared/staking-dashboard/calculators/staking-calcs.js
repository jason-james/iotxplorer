import Component from "inferno-component";
import Helmet from "inferno-helmet";
import { StakingDashboardNav } from "../staking-dashboard-nav";
import { assetURL } from "../../../lib/asset-url";

export class Calculators extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      fetchDelegateData: 0,
      fetchIotxplorerDelegateData: 0,
      stakeAmount: 300000,
      stakeDuration: 28,
      weeklyReturn: "Stake",
      monthlyReturn: "With",
      yearlyReturn: "iotxplorer",
      autostake: false
    };
  }

  componentDidMount() {
    this.props.fetchDelegateData();
    this.props.fetchIotxplorerDelegateData();
  }

  calculateROI(votes, percent) {
    let effectiveVotes, overallRedist, bonusVotes, iotxplorerVotes;

    // in case api call to fetch election state has not returned yet
    if (!votes || !percent) {
      return "";
    }

    // when autostake is on, votes do not decay over time

    if (this.state.autostake === true) {
      iotxplorerVotes = votes;
      overallRedist =
        (percent / 100) * 366667 * this.state.stakeDuration * 0.87;

      bonusVotes = Math.log(this.state.stakeDuration) / Math.log(1.2);
      effectiveVotes = this.state.stakeAmount * (1 + bonusVotes / 100);
    } else {
      // when autostake is off, votes decay over time by logbase(1.2)(voteduration)
      let dailyVotes = [];
      for (var i = 0; i < this.state.stakeDuration; i++) {
        const bonusVotesPercent =
          Math.log(this.state.stakeDuration - i) / Math.log(1.2);
        let bonusVote = this.state.stakeAmount * (1 + bonusVotesPercent / 100);
        dailyVotes.push(bonusVote);
      }
      iotxplorerVotes = votes;
      overallRedist =
        (percent / 100) * 366667 * this.state.stakeDuration * 0.87;

      //sums up effective vote for every day in stake period and takes an average
      effectiveVotes =
        dailyVotes.reduce((partial_sum, a) => partial_sum + a, 0) /
        this.state.stakeDuration;
    }

    const percentOfTotalVotes = effectiveVotes / iotxplorerVotes;
    const amountGivenBack =
      percentOfTotalVotes * overallRedist + this.state.stakeAmount;

    //not used in the end, just for later reference
    const ROI =
      ((parseInt(amountGivenBack) - this.state.stakeAmount) /
        this.state.stakeAmount) *
      100;

    const profitIOTX = percentOfTotalVotes * overallRedist;

    let daily = profitIOTX / this.state.stakeDuration;
    let weekly = daily * 7;
    let monthly = daily * 31;
    let yearly = daily * 365;

    this.setState({
      weeklyReturn: Number(weekly.toFixed(0)).toLocaleString(),
      monthlyReturn: Number(monthly.toFixed(0)).toLocaleString(),
      yearlyReturn: Number(yearly.toFixed(0)).toLocaleString()
    });
  }

  render() {
    return (
      <div class='section'>
        <Helmet
          title={"iotxplorer: Calculator"}
          meta={[
            {
              name: "description",
              content: "Accurate staking calculator for IoTeX by iotxplorer."
            },
            {
              property: "og:title",
              content: "iotxplorer: Calculator"
            },
            {
              property: "og:description",
              content: "Accurate staking calculator for IoTeX by iotxplorer."
            },
            {
              property: "og:image",
              content: `${assetURL("/calculator-preview-meta.jpg")}`
            },
            {
              name: "twitter:card",
              content: "summary_large_image"
            },
            {
              name: "twitter:site",
              content: "@iotxplorer"
            },
            {
              name: "twitter:title",
              content: "iotxplorer: Calculator"
            },
            {
              name: "twitter:description",
              content: "Accurate staking calculator for IoTeX by iotxplorer."
            },
            {
              name: "twitter:image",
              content:
                "https://www.iotxplorer.io/calculator-twitter-meta-image.png"
            }
          ]}
        />
        <div class='columns calc-spacing'>
          <StakingDashboardNav activeClass='calculators' />
          <div className='column is-2 calculator-right' />

          <div className='column is-3 calculator-left'>
            <h4 className='title is-4'> Live Rewards Calculator</h4>
            <p>
              The IoTeX Foundation are rewarding Delegates 8 IOTX per block
              produced, on top of the regular block reward of 8 IOTX per block.
              In addition, all delegates placed in the Top 36 receieve a
              Foundation Bonus of 80 IOTX per epoch, and all delegates in the
              Top 100 share an average Epoch Bonus of 366,667 IOTX per day
              proportional to their vote percentage.{" "}
            </p>
            <br />

            <p>
              Iotxplorer will redistribute 87% of all epoch bonus rewards back
              to the iotxplorer community in proportion to your votes cast for
              us.
            </p>
            <br />
            <p>
              This calculator can give you an idea of what you could earn based
              on the votes you cast for iotxplorer. In the box below, enter the
              IOTX amount you will be using to vote. This calculator is live and
              will automatically lookup the current vote for iotxplorer and
              total election votes to calculate your estimated weekly, monthly
              and yearly rewards.
            </p>
            <br />
            <br />

            <div className='field has-addons'>
              <div className='control'>
                <input
                  class='input is-rounded'
                  type='text'
                  placeholder='300,000'
                  value={this.state.stakeAmount}
                  onChange={e =>
                    this.setState({ stakeAmount: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className='control'>
                <a className='button is-info is-rounded'>Amount ⬡ (IOTX)</a>
              </div>
            </div>

            <div className='field has-addons'>
              <div className='control'>
                <input
                  class='input is-rounded'
                  type='text'
                  placeholder='28'
                  value={this.state.stakeDuration}
                  onChange={e =>
                    this.setState({ stakeDuration: e.target.value })
                  }
                />
              </div>
              <div className='control'>
                <a className='button is-info is-rounded'>Days</a>
              </div>
            </div>

            <label class='switch'>
              <input
                type='checkbox'
                onClick={e => {
                  this.setState({
                    autostake: this.state.autostake === false ? true : false
                  });
                }}
              />
              <span class='slider round' />
            </label>
            <span style={{ marginLeft: "8px", marginTop: "4rem" }}>
              Auto-Stake
            </span>

            <div style={{ marginTop: "12px" }}>
              <a
                class='button is-info is-rounded'
                onClick={e => {
                  this.calculateROI(
                    this.props.delegateData[
                      this.props.iotxplorerDelegateData - 1
                    ].liveVotes,
                    this.props.delegateData[
                      this.props.iotxplorerDelegateData - 1
                    ].percent
                  );
                }}
              >
                Calculate
              </a>

              <div style={{ paddingTop: "1rem" }}>
                <p style={{ fontSize: "12px" }}>
                  *results are computed based on current votes cast and cannot
                  account for possible fluctuations in votes during stake
                  duration
                </p>
              </div>
            </div>
          </div>

          <div
            className='column is-3 is-centered has-text-centered'
            style={{ minHeight: "100%" }}
          >
            <div style={{ textAlign: "right" }}>
              <div>
                <h4 className='title is-4' style={{ paddingTop: "4rem" }}>
                  ⬡ every week
                </h4>
                <h1 className='title calculator-font'>
                  {this.state.weeklyReturn}
                </h1>
              </div>
              <div>
                <h4 className='title is-4' style={{ paddingTop: "4rem" }}>
                  ⬡ every month
                </h4>
                <h1 className='title calculator-font'>
                  {this.state.monthlyReturn}
                </h1>
              </div>
              <div>
                <h4 className='title is-4' style={{ paddingTop: "4rem" }}>
                  ⬡ every year
                </h4>
                <h1 className='title calculator-font'>
                  {this.state.yearlyReturn}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
