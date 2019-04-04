import Component from "inferno-component";
import Helmet from "inferno-helmet";
import axios from "axios";
import { RewardsInfo } from "./rewards-info";
import { StakingDashboardNav } from "./staking-dashboard-nav";
import {
  ChartistGraph,
  TradingViewWidget
} from "../../shared/chart-helper/chart-helper";
import { assetURL } from "../../lib/asset-url";

export class StakingDashboard extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      fetchDelegateData: 0,
      fetchIotxplorerDelegateData: 0
    };
  }

  componentDidMount() {
    this.props.fetchDelegateData();
    this.props.fetchIotxplorerDelegateData();
    const fetchDelegateData = window.setInterval(
      () => this.props.fetchDelegateData(),
      10000
    );

    const fetchIotxplorerDelegateData = window.setInterval(
      () => this.props.fetchIotxplorerDelegateData(),
      10000
    );

    this.setState({ fetchDelegateData, fetchIotxplorerDelegateData });
  }

  rankHandler = iotxplorerDelegateData => {
    if (!iotxplorerDelegateData) {
      return "...";
    } else {
      return iotxplorerDelegateData;
    }
  };

  formDashboardStats = delegateData => {
    if (!delegateData) {
      return ["...", "..."];
    } else {
      const iotxplorerStats =
        delegateData[this.props.iotxplorerDelegateData - 1];
      const votes = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 1
      }).format(iotxplorerStats.liveVotes);

      const votePercent = parseFloat(iotxplorerStats.percent);
      return [votes, votePercent];
    }
  };

  formPieChartData = delegateData => {
    if (!delegateData) {
      return {};
    } else {
      const data = {
        labels: [],
        series: []
      };

      for (
        let i = this.props.iotxplorerDelegateData - 5;
        i < this.props.iotxplorerDelegateData + 5;
        i++
      ) {
        data.labels.push(delegateData[i].name);
        data.series.push(parseFloat(delegateData[i].percent));
      }
      return data;
    }
  };

  calculateROI() {
    if (!this.props.delegateData) {
      return "...";
    } else {
      const CONSTANT = 100000;
      const overallRedist =
        0.87 *
        366667 *
        365 *
        (this.formDashboardStats(this.props.delegateData)[1] / 100);

      const bonusVotes = Math.log(350) / Math.log(1.2);
      const effectiveVotes = CONSTANT * (1 + bonusVotes / 100);
      const percentOfTotalVotes =
        effectiveVotes /
        this.props.delegateData[this.props.iotxplorerDelegateData - 1]
          .liveVotes;
      const amountGivenBack = percentOfTotalVotes * overallRedist + CONSTANT;
      const ROI = ((parseInt(amountGivenBack) - CONSTANT) / CONSTANT) * 100;
      return ROI.toFixed(1);
    }
  }

  render() {
    var data = this.formPieChartData(this.props.delegateData);
    var options = {
      width: 684,
      height: 360,
      labelOffset: 50,
      donut: true,

      labelDirection: "explode",
      chartPadding: 30
    };

    var responsiveOptions = [
      [
        "screen and (max-width: 640px)",
        {
          width: 350,
          height: 270
        }
      ]
    ];

    var type = "Pie";

    return (
      <div class='section'>
        <Helmet
          title={`iotxplorer: Dashboard`}
          meta={[
            {
              name: "description",
              content:
                "Statistics and rewards tracking for iotxlorer supporters."
            },
            {
              property: "og:title",
              content: "iotxplorer: Dashboard"
            },
            {
              property: "og:description",
              content:
                "Statistics and rewards tracking for iotxlorer supporters."
            },
            {
              property: "og:image",
              content: `${assetURL("/dashboard-meta-image.png")}`
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
              content: "iotxplorer: iotex network explorer"
            },
            {
              name: "twitter:description",
              content:
                "An IoTeX explorer by iotxplorer. An open source collective of IoTeX community leaders, dedicated to adding value to the IoTeX network."
            },
            {
              name: "twitter:image",
              content: `${assetURL("/dashboard-meta-image-template-twit.png")}`
            }
          ]}
        />
        <div class='columns dashboard-spacing'>
          <StakingDashboardNav activeClass='dashboard' />
          <main class='column'>
            <section>
              <section
                class='hero welcome is-small is-primary'
                style={{
                  marginBottom: "12px"
                }}
              >
                <div class='hero-body'>
                  <div class='container' style={{ margin: "0px" }}>
                    <h1 class='title'>Dashboard</h1>
                    <h2 class='subtitle'>
                      version 0.1.2{" "}
                      <span
                        className='tag is-light'
                        style={{
                          paddingLeft: "0px",
                          verticalAlign: "inherit"
                        }}
                      >
                        <i className='fas fa-circle live-tag-icon' />
                        Live
                      </span>
                    </h2>
                  </div>
                </div>
              </section>

              <section>
                <RewardsInfo />
              </section>

              <section class='info-tiles'>
                <div class='tile is-ancestor has-text-centered'>
                  <div class='tile is-parent'>
                    <article class='tile is-child box'>
                      <p class='title'>
                        {this.rankHandler(this.props.iotxplorerDelegateData)}
                      </p>
                      <p class='subtitle' style={{ color: "#b5b5b5" }}>
                        Rank
                      </p>
                    </article>
                  </div>
                  <div class='tile is-parent'>
                    <article class='tile is-child box'>
                      <p class='title'>
                        {this.formDashboardStats(this.props.delegateData)[0]}
                      </p>
                      <p class='subtitle' style={{ color: "#b5b5b5" }}>
                        Votes
                      </p>
                    </article>
                  </div>
                  <div class='tile is-parent'>
                    <article class='tile is-child box'>
                      <p class='title'>
                        {this.formDashboardStats(this.props.delegateData)[1]}%
                      </p>
                      <p class='subtitle' style={{ color: "#b5b5b5" }}>
                        Vote Percent
                      </p>
                    </article>
                  </div>
                  <div class='tile is-parent'>
                    <article class='tile is-child box'>
                      <p class='title'>~{this.calculateROI()}%</p>
                      <p class='subtitle' style={{ color: "#b5b5b5" }}>
                        Live ROI
                      </p>
                    </article>
                  </div>
                </div>
              </section>

              <section>
                <div
                  class='columns is-multiline'
                  style={{ paddingTop: "16px" }}
                >
                  <div class='column is-6'>
                    <div class='panel' style={{ height: "385px" }}>
                      <p class='panel-heading'>IOTX/BTC: 24h</p>
                      <TradingViewWidget symbol='BINANCE:IOTXBTC' autosize />
                    </div>
                  </div>
                  <div class='column is-6 mobile-spacing'>
                    <div class='panel'>
                      <p class='panel-heading'>
                        Delegate Vote Percent (closest 10)
                      </p>
                      <div class='panel-block'>
                        <ChartistGraph
                          data={data}
                          options={options}
                          responsiveOptions={responsiveOptions}
                          type={type}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </main>
        </div>
      </div>
    );
  }
}
