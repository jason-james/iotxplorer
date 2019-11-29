// @flow

import React, { Component } from "react";
import { Helmet } from "react-helmet";
import window from "global";
import { CommonMargin } from "../common/common-margin";
import type { Error } from "../../entities/common-types";
import type {
  TBlock,
  TCoinStatistic,
  TTransfer,
  TVote
} from "../../entities/explorer-types";
import { t } from "../../lib/iso-i18n";
import type { TConsensusMetrics } from "../../entities/explorer-types";
import type { TExecution } from "../../entities/explorer-types";
import { TitleContainer } from "../common/iotex-explorer-title";
import { assetURL } from "../../lib/asset-url";
import { Dashboard } from "./dashboard";
import { SearchBar } from "./search-bar";
import { Tabs } from "./tabs";
import { MarketDashboard } from "./market-dashboard";
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
    }, 1000);

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

    const retval = [];
    if (!stats.electionStats) {
      [
        {
          title: "Blockchain Info",
          subtitle: "Data could not be displayed",
          icon: "fas fa-question-circle",
          msg: "Reload the page and try again"
        }
      ];
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
    const tabList = [
      {
        name: "Market"
      },
      {
        name: "Blockchain"
      }
    ];

    return (
      <section>
        <Helmet
          title={"Iotxplorer: IoTeX Block Explorer"}
          meta={[
            {
              name: "description",
              content:
                "IoTeX blockchain explorer. Search addresses, actions and blocks. View delegate analytics, calculate your staking rewards, learn about IoT, IoTeX, blockchain and their intersection."
            },
            {
              property: "og:title",
              content: "Iotxplorer: IoTeX Block Explorer"
            },
            {
              property: "og:description",
              content:
                "IoTeX blockchain explorer. Search addresses, actions and blocks. View delegate analytics, calculate your staking rewards, learn about IoT, IoTeX, blockchain and their intersection."
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
              content: "Iotxplorer: IoTeX Block Explorer"
            },
            {
              name: "twitter:description",
              content:
                "IoTeX blockchain explorer. Search addresses, actions and blocks. View delegate analytics, calculate your staking rewards, learn about IoT, IoTeX, blockchain and their intersection."
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
        <div className='section' style={{ padding: "0px", margin: "0rem" }}>
          <div className='container' style={{ marginTop: "42px" }}>
            <div className='card homepage-card'>
              <Tabs
                tabList={tabList}
                activeTab={this.state.activeTab}
                changeActiveTab={this.changeActiveTab.bind(this)}
              />
              {this.state.activeTab == "Market" ? (
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
              ) : (
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
              )}
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
                  allContractData={this.props.consensus.bpCandidatesOnContract}
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

  render() {
    return <div>{this.renderContent()}</div>;
  }
}
