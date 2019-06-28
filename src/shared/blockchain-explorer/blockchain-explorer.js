// @flow

import React, { Component } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet";
import window from "global";
import { CommonMargin } from "../common/common-margin";
import { PlasmaBall } from "../common/plasma-ball";
import type { Error } from "../../entities/common-types";
import type {
  TBlock,
  TCoinStatistic,
  TTransfer,
  TVote
} from "../../entities/explorer-types";
import { t } from "../../lib/iso-i18n";
import { SingleColTable } from "../common/single-col-table";
import { BlocksList } from "../blocks/blocks";
import { fetchConsensusMetrics } from "../consensus-metrics/consensus-metrics-actions";
import type { TConsensusMetrics } from "../../entities/explorer-types";
import { ToolTip } from "../common/tooltip";
import type { TExecution } from "../../entities/explorer-types";
import { TitleContainer } from "../common/iotex-explorer-title";
import { assetURL } from "../../lib/asset-url";
import { ChartistGraph } from "../chart-helper/chart-helper";
import { Dashboard } from "./dashboard";
import { SearchBar } from "./search-bar";
import { Tabs } from "./tabs";
import { Tab } from "./tab";
import { MarketDashboard } from "./market-dashboard";
import { LineChart } from "./line-chart";
import { CurrentProducer } from "./current-producer";
import { NewBlocksList } from "./new-blocks-list";
import { NewActionsList } from "./new-actions-list";
import { MyStockChart } from "./stockchart";

type PropsType = {
  statistic: TCoinStatistic
};

export class BlockchainExplorer extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      fetchConsensusMetricsId: 0,
      fetchElectionStats: 0,
      fetchMarketData: 0,
      fetchChartData: 0,
      fetchDelegateData: 0,
      fetchbpCandidatesOnContract: 0,
      fetchBlockMetasByIndex: 0,
      fetchActionsByIndex: 0,
      height: 0,
      activeTab: "Market"
    };
    this.formStats = this.formStats.bind(this);
  }

  componentDidMount() {
    this.props.fetchConsensusMetrics();
    this.props.fetchElectionStats();
    this.props.fetchMarketData();
    this.props.fetchDelegateData();
    this.props.fetchbpCandidatesOnContract();

    const fetchBlockMetasByIndex = window.setInterval(() => {
      if (this.props.consensus.metrics.height) {
        this.props.fetchBlockMetasByIndex({
          start: this.props.consensus.metrics.height - 4,
          count: 5
        });
      }
    }, 500);

    const fetchActionsByIndex = window.setInterval(() => {
      if (this.props.consensus.metrics.numActions) {
        this.props.fetchActionsByIndex({
          start: this.props.consensus.metrics.numActions - 20,
          count: 21
        });
      }
    }, 1000);

    const fetchDelegateData = window.setInterval(
      () => this.props.fetchDelegateData(),
      5000
    );
    const fetchbpCandidatesOnContract = window.setInterval(
      () => this.props.fetchbpCandidatesOnContract(),
      5000
    );
    const fetchChartData = this.props.fetchChartData();
    const fetchConsensusMetricsId = window.setInterval(
      () => this.props.fetchConsensusMetrics(),
      5000
    );
    const fetchElectionStats = window.setInterval(
      () => this.props.fetchElectionStats(),
      5000
    );
    const fetchMarketData = window.setInterval(
      () => this.props.fetchMarketData(),
      10000
    );

    this.setState({
      fetchConsensusMetricsId,
      fetchMarketData,
      fetchChartData,
      fetchElectionStats,
      fetchbpCandidatesOnContract,
      fetchDelegateData,
      fetchBlockMetasByIndex,
      fetchActionsByIndex
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.fetchConsensusMetricsId);
    window.clearInterval(this.state.fetchMarketData);
    window.clearInterval(this.state.fetchBlockMetasByIndex);
    window.clearInterval(this.state.fetchActionsByIndex);
    window.clearInterval(this.state.fetchDelegateData);
    window.clearInterval(this.state.fetchElectionStats);

    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  changeActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  formChartData = chartData => {
    // to avoid component using chartData prop before promise has been resolved (ie null)
    if (!chartData) {
      return [];
    }

    const axes = {
      labels: [],
      series: [[]]
    };

    chartData.forEach(current => {
      const date = new Date(current.time * 1000).toDateString();
      const parsedDate = date.slice(3, -4);
      axes.labels.push(parsedDate);
      axes.series[0].push(current.close);
    });
    axes.labels[7] = "";
    return axes;
  };

  formMarketStats = (marketData, daily) => {
    if (!marketData || !daily) {
      return [
        {
          title: t("marketDashboard.marketCap"),
          subtitle: "Loading...",
          icon: "fas fa-question-circle",
          msg: "marketDashboard.marketCapMsg"
        }
      ];
    }

    const retval = [];
    retval.push({
      title: t("marketDashboard.marketCap"),
      subtitle: `$ ${marketData.marketCap} USD`,
      icon: "fas fa-question-circle has-text-primary",
      msg: "marketDashboard.marketCapMsg"
    });
    retval.push({
      title: t("marketDashboard.supply"),
      subtitle: `${marketData.supply} ⬡`,
      icon: "fas fa-question-circle has-text-primary",
      msg: "marketDashboard.supplyMsg"
    });
    retval.push({
      title: t("marketDashboard.volume"),
      subtitle: `$ ${marketData.volume} USD`,
      icon: "fas fa-question-circle has-text-primary",
      msg: "marketDashboard.volumeMsg"
    });
    retval.push({
      title: t("marketDashboard.close"),
      subtitle: `$ ${daily[7].close} USD`,
      icon: "fas fa-question-circle has-text-primary",
      msg: "marketDashboard.closeMsg"
    });
    retval.push({
      title: t("marketDashboard.High"),
      subtitle: `$ ${daily[7].high} USD`,
      icon: "fas fa-question-circle has-text-primary",
      msg: "marketDashboard.HighMsg"
    });
    return retval;
  };

  formStats(stats, supply) {
    if (!stats) {
      return [
        {
          title: t("dashboard.epochs"),
          subtitle: "Data could not be displayed",
          icon: "fas fa-question-circle",
          msg: "dashboard.epochsMsg"
        }
      ];
    }

    // Sets empty array return value to hold dashboard info. Dashboard is the info to the right of plasmaball
    const retval = [];
    if (!stats.electionStats) {
      var percentStaked = 0;
      var totalVotes = "Cannot Fetch";
    } else {
      var percentStaked =
        (parseFloat(stats.electionStats.totalVotedStakes) /
          parseFloat(supply.replace(/,/g, ""))) *
        100;

      var totalVotes = Math.round(
        Number(stats.electionStats.totalVotes)
      ).toLocaleString();
    }
    retval.push({
      title: t("dashboard.blocks"),
      subtitle: Number(stats.metrics.height || 0).toLocaleString(),
      icon: "fas fa-question-circle",
      msg: "dashboard.blocksMsg"
    });
    retval.push({
      title: t("dashboard.epochs"),
      subtitle: stats.metrics.epoch.num,
      icon: "fas fa-question-circle",
      msg: "dashboard.epochsMsg"
    });
    retval.push({
      title: t("dashboard.votes"),
      subtitle: totalVotes,
      icon: "fas fa-question-circle",
      msg: "dashboard.votesMsg"
    });
    retval.push({
      title: t("dashboard.staked"),
      subtitle: `${percentStaked.toFixed(1)}%`,
      icon: "fas fa-question-circle",
      msg: "dashboard.StakedMsg"
    });

    retval.push({
      title: t("dashboard.faps"),
      subtitle: Number(stats.metrics.tps || 0).toLocaleString(),
      icon: "fas fa-question-circle",
      msg: "dashboard.fapsMsg"
    });

    return retval;
  }

  renderContent() {
    const type = "Line";
    const options2 = {
      width: 650,
      height: 440,
      showPoint: false,
      showArea: true,
      fullWidth: true,
      axisY: {
        labelInterpolationFnc: function skipLabels(value, index) {
          return index % 2 === 0 ? `$${value.toFixed(4)}` : null;
        }
      }
    };

    const responsiveOptions = [
      [
        "screen and (max-width: 640px)",
        {
          width: 350,
          height: 270
        }
      ],
      [
        "screen and (max-width: 2270px)",
        {
          width: 555,
          height: 460
        }
      ]
    ];

    const tabList = [
      {
        name: "Market"
      },
      {
        name: "Blockchain"
      }
    ];

    const blocksTable = (
      <BlocksList
        blocks={this.props.consensus.blockMetas}
        width={this.props.width}
        tipBlockMeta={this.props.consensus.blockMetas}
        allContractData={this.props.consensus.bpCandidatesOnContract}
        memberInfo={this.props.delegateData}
      />
    );

    if (this.state.activeTab === "Market") {
      return (
        <section>
          <Helmet
            title={"iotxplorer: iotex search engine"}
            meta={[
              {
                name: "description",
                content:
                  "IoTeX network explorer and proud delegate #AlwaysAddValue"
              },
              {
                property: "og:title",
                content: "iotxplorer: iotex search engine"
              },
              {
                property: "og:description",
                content:
                  "IoTeX network explorer and proud delegate #AlwaysAddValue"
              },
              {
                property: "og:image",
                content: `${assetURL("/meta-image-large.png")}`
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
                content: "iotxplorer: iotex search engine"
              },
              {
                name: "twitter:description",
                content:
                  "IoTeX network explorer and proud delegate #AlwaysAddValue"
              },
              {
                name: "twitter:image",
                content:
                  "https://www.iotxplorer.io/homepage-meta-image-twitter.png"
              }
            ]}
          />
          <div
            className='hero is-medium hero-bg-image'
            style={{ padding: "0rem", margin: "0rem" }}
          >
            <div className='hero-body' style={{ paddingTop: "7rem" }}>
              <div className='container'>
                <TitleContainer />
              </div>
              <div className='container is-fluid'>
                <SearchBar router={this.props.router} />
              </div>
            </div>
          </div>
          <div class='box cta'>
            <p class='has-text-centered'>
              <span class='tag is-primary' style={{ marginRight: "8px" }}>
                New
              </span>
              Check out our <Link to='/delegates'>Delegate Insights</Link> page
              to take a peek into your delegate's data and find out what you
              should be earning. Includes productivity, total rewards, voter
              buckets, and soon, you'll be able to track their rewards accuracy.
            </p>
          </div>
          <div className='section' style={{ padding: "0px", margin: "0rem" }}>
            <div className='container' style={{ marginTop: "42px" }}>
              <div className='card homepage-card'>
                <Tabs
                  tabList={tabList}
                  activeTab={this.state.activeTab}
                  changeActiveTab={this.changeActiveTab.bind(this)}
                />

                <div className='card-content' style={{ paddingTop: "3px" }}>
                  <div className='column' style={{ padding: "0px" }}>
                    <div className='columns'>
                      <div
                        className='column is-half'
                        style={{ paddingLeft: "0px" }}
                      >
                        <MyStockChart
                          chartData={this.props.chartData}
                          width={this.props.width}
                        />
                      </div>
                      <MarketDashboard
                        stats={this.formMarketStats(
                          this.props.marketData,
                          this.props.chartData
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <CommonMargin />
            </div>
          </div>
          <br />
          <div
            className='section'
            style={{ padding: "24px", margin: "0rem", paddingTop: "0" }}
          >
            <div className='container'>
              <div className='columns'>
                <div className='column is-half'>
                  <NewBlocksList
                    blocks={this.props.consensus.blockMetas}
                    tipBlockMeta={this.props.consensus.blockMetas}
                    allContractData={
                      this.props.consensus.bpCandidatesOnContract
                    }
                    memberInfo={this.props.delegateData}
                    width={this.props.width}
                  />
                </div>
                <div className='column is-half'>
                  <NewActionsList
                    actions={this.props.consensus.actions}
                    width={this.props.width}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section>
          <Helmet
            title={"iotxplorer: iotex search engine"}
            meta={[
              {
                name: "description",
                content:
                  "IoTeX network explorer and proud delegate #AlwaysAddValue"
              },
              {
                property: "og:title",
                content: "iotxplorer: iotex search engine"
              },
              {
                property: "og:description",
                content:
                  "IoTeX network explorer and proud delegate #AlwaysAddValue"
              },
              {
                property: "og:image",
                content: `${assetURL("/meta-image-large.png")}`
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
                content: "iotxplorer: iotex search engine"
              },
              {
                name: "twitter:description",
                content:
                  "IoTeX network explorer and proud delegate #AlwaysAddValue"
              },
              {
                name: "twitter:image",
                content:
                  "https://www.iotxplorer.io/homepage-meta-image-twitter.png"
              }
            ]}
          />
          <div
            className='hero is-medium hero-bg-image'
            style={{ padding: "0rem", margin: "0rem" }}
          >
            <div className='hero-body' style={{ paddingTop: "7rem" }}>
              <div className='container'>
                <TitleContainer />
              </div>
              <div className='container is-fluid'>
                <SearchBar router={this.props.router} />
              </div>
            </div>
          </div>
          <div class='box cta'>
            <p class='has-text-centered'>
              <span class='tag is-primary' style={{ marginRight: "8px" }}>
                New
              </span>
              Check out our <Link to='/delegates'>Delegate Insights</Link> page
              to take a peek into your delegate's data and find out what you
              should be earning. Includes productivity, total rewards, voter
              buckets, and soon, you'll be able to track their rewards accuracy.
            </p>
          </div>
          <div className='section' style={{ padding: "0px", margin: "0rem" }}>
            <div className='container' style={{ marginTop: "42px" }}>
              <div className='card homepage-card'>
                <Tabs
                  tabList={tabList}
                  activeTab={this.state.activeTab}
                  changeActiveTab={this.changeActiveTab.bind(this)}
                />

                <div className='card-content' style={{ paddingTop: "3px" }}>
                  <div className='column' style={{ padding: "0px" }}>
                    <div className='columns'>
                      <div
                        className='column is-half'
                        style={{ paddingLeft: "0px" }}
                      >
                        <CurrentProducer
                          tipBlockMeta={this.props.consensus.blockMetas}
                          allContractData={
                            this.props.consensus.bpCandidatesOnContract
                          }
                          memberInfo={this.props.delegateData}
                        />
                      </div>
                      <Dashboard
                        stats={this.formStats(
                          this.props.consensus,
                          this.props.marketData.supply
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <CommonMargin />
            </div>
          </div>
          <br />
          <div
            className='section'
            style={{ padding: "24px", margin: "0rem", paddingTop: "0" }}
          >
            <div className='container'>
              <div className='columns'>
                <div className='column is-half'>
                  <NewBlocksList
                    blocks={this.props.consensus.blockMetas}
                    tipBlockMeta={this.props.consensus.blockMetas}
                    allContractData={
                      this.props.consensus.bpCandidatesOnContract
                    }
                    memberInfo={this.props.delegateData}
                    width={this.props.width}
                  />
                </div>
                <div className='column is-half'>
                  <NewActionsList
                    actions={this.props.consensus.actions}
                    width={this.props.width}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}
