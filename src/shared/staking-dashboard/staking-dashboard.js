import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import {
  ChartistGraph,
  TradingViewWidget
} from "../../shared/chart-helper/chart-helper";
import { assetURL } from "../../lib/asset-url";
import { RewardsInfo } from "./rewards-info";
import { StakingDashboardNav } from "./staking-dashboard-nav";

export class StakingDashboard extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      fetchDelegateData: 0,
      fetchElectionStats: 0,
      fetchIotxplorerDelegateData: 0
    };
  }

  componentDidMount() {
    this.props.fetchDelegateData();
    this.props.fetchIotxplorerDelegateData();
    this.props.fetchElectionStats();
    const fetchElectionStats = window.setInterval(
      () => this.props.fetchElectionStats(),
      5000
    );
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

  componentWillUnmount() {
    window.clearInterval(this.state.fetchDelegateData);
    window.clearInterval(this.state.fetchIotxplorerDelegateData);
  }

  rankHandler = iotxplorerDelegateData => {
    if (!iotxplorerDelegateData) {
      return "...";
    }
    return iotxplorerDelegateData;
  };

  totalCandidatesHandler = electionStats => {
    if (!electionStats) {
      return "...";
    }
    return electionStats.totalCandidates;
  };

  formDashboardStats = delegateData => {
    if (!delegateData) {
      return ["...", "..."];
    }
    const iotxplorerStats = delegateData[this.props.iotxplorerDelegateData - 1];
    if (!iotxplorerStats) {
      return ["...", "..."];
    }
    const votes = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1
    }).format(iotxplorerStats.liveVotes);

    const votePercent = parseFloat(iotxplorerStats.percent);
    return [votes, votePercent];
  };

  formPieChartData = delegateData => {
    if (!delegateData) {
      return {};
    }
    const data = {
      labels: [],
      series: []
    };

    if (this.props.iotxplorerDelegateData <= 5) {
      for (let i = 0; i < 10; i++) {
        data.labels.push(delegateData[i].name);
        data.series.push(parseFloat(delegateData[i].percent));
      }
    } else {
      for (
        let i = this.props.iotxplorerDelegateData - 5;
        i < this.props.iotxplorerDelegateData + 5;
        i++
      ) {
        data.labels.push(delegateData[i].name);
        data.series.push(parseFloat(delegateData[i].percent));
      }
    }
    return data;
  };

  render() {
    const data = this.formPieChartData(this.props.delegateData);
    const options = {
      width: 684,
      height: 360,
      labelOffset: 50,
      donut: true,

      labelDirection: "explode",
      chartPadding: 30
    };

    const responsiveOptions = [
      [
        "screen and (max-width: 640px)",
        {
          width: 350,
          height: 270
        }
      ]
    ];

    const type = "Pie";

    return (
      <div className='section'>
        <Helmet
          title={"Iotxplorer: Dashboard"}
          meta={[
            {
              name: "description",
              content:
                "Statistics and rewards tracking for iotxlorer supporters."
            },
            {
              property: "og:title",
              content: "Iotxplorer: Dashboard"
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
              content: "Iotxplorer: iotex network explorer"
            },
            {
              name: "twitter:description",
              content:
                "An IoTeX explorer by iotxplorer. An open source collective of IoTeX community leaders, dedicated to adding value to the IoTeX network."
            },
            {
              name: "twitter:image",
              content:
                "https://www.iotxplorer.io/dashboard-meta-image-template-twit.png"
            }
          ]}
        />

        <div className='columns dashboard-spacing'>
          <StakingDashboardNav activeClass='dashboard' />
          <main className='column'>
            <section>
              <section
                className='hero welcome is-small is-primary'
                style={{
                  marginBottom: "12px"
                }}
              >
                <div className='hero-body'>
                  <div className='container' style={{ margin: "0px" }}>
                    <h1 className='title'>Dashboard</h1>
                    <h2 className='subtitle'>
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

              <section className='info-tiles'>
                <div className='tile is-ancestor has-text-centered'>
                  <div className='tile is-parent'>
                    <article className='tile is-child box dashboard-card'>
                      <p className='title' style={{ color: "#ffffff" }}>
                        {this.rankHandler(this.props.iotxplorerDelegateData)}
                      </p>
                      <p className='subtitle'>Rank</p>
                    </article>
                  </div>
                  <div className='tile is-parent'>
                    <article className='tile is-child box dashboard-card'>
                      <p className='title' style={{ color: "#ffffff" }}>
                        {this.formDashboardStats(this.props.delegateData)[0]}
                      </p>
                      <p className='subtitle'>Votes</p>
                    </article>
                  </div>
                  <div className='tile is-parent'>
                    <article className='tile is-child box dashboard-card'>
                      <p className='title' style={{ color: "#ffffff" }}>
                        {this.formDashboardStats(this.props.delegateData)[1]}%
                      </p>
                      <p className='subtitle'>Vote Percent</p>
                    </article>
                  </div>
                  <div className='tile is-parent'>
                    <article className='tile is-child box dashboard-card'>
                      <p className='title' style={{ color: "#ffffff" }}>
                        {this.totalCandidatesHandler(this.props.electionStats)}
                      </p>
                      <p className='subtitle'>Total Candidates</p>
                    </article>
                  </div>
                </div>
              </section>

              <section>
                <div
                  className='columns is-multiline'
                  style={{ paddingTop: "16px" }}
                >
                  <div className='column is-6'>
                    <div className='panel' style={{ height: "385px" }}>
                      <p className='panel-heading'>IOTX/BTC: 24h</p>
                      <TradingViewWidget symbol='BINANCE:IOTXBTC' autosize />
                    </div>
                  </div>
                  <div className='column is-6 mobile-spacing'>
                    <div className='panel'>
                      <p className='panel-heading'>
                        Delegate Vote Percent (closest 10)
                      </p>
                      <div className='panel-block'>
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
