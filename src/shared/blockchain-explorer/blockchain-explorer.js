// @flow

import Component from "inferno-component";
import Helmet from "inferno-helmet";
import window from "global";
import { CommonMargin } from "../common/common-margin";
import { PlasmaBall } from "../common/plasma-ball";
import { fetchExecutions } from "../executions/executions-actions";
import { fetchTransfers } from "../transfers/transfers-actions";
import { fetchBlocks } from "../blocks/blocks-actions";
import type { Error } from "../../entities/common-types";
import type {
  TBlock,
  TCoinStatistic,
  TTransfer,
  TVote
} from "../../entities/explorer-types";
import { t } from "../../lib/iso-i18n";
import { SingleColTable } from "../common/single-col-table";
import { ExecutionsListOnlyId } from "../executions/executions";
import { TransfersListOnlyId } from "../transfers/transfers";
import { BlocksListOnlyId } from "../blocks/blocks";
import { VotesListOnlyId } from "../votes/votes";
import { fetchVotes } from "../votes/votes-actions";
import { fetchConsensusMetrics } from "../consensus-metrics/consensus-metrics-actions";
import type { TConsensusMetrics } from "../../entities/explorer-types";
import { ToolTip } from "../common/tooltip";
import type { TExecution } from "../../entities/explorer-types";
import { Dashboard } from "./dashboard";
import { SearchBar } from "./search-bar";
import { TitleContainer } from "../common/iotex-explorer-title";
import { Tabs } from "./tabs";
import { Tab } from "./tab";
import { MarketDashboard } from "./market-dashboard";
import { LineChart } from "./line-chart";
import { assetURL } from "../../lib/asset-url";

type PropsType = {
  statistic: TCoinStatistic
};

export class BlockchainExplorer extends Component {
  props: {
    fetchExecutions: fetchExecutions,
    fetchTransfers: fetchTransfers,
    fetchBlocks: fetchBlocks,
    fetchVotes: fetchVotes,
    fetchConsensusMetrics: fetchConsensusMetrics,
    fetchMarketData: fetchMarketData,
    fetchChartData: fetchChartData,
    executions: {
      offset: number,
      count: number,
      fetching: boolean,
      error: Error,
      items: Array<TExecution>,
      tip: number
    },
    transfers: {
      offset: number,
      count: number,
      fetching: boolean,
      error: Error,
      items: Array<TTransfer>,
      tip: number
    },
    blocks: {
      offset: number,
      count: number,
      fetching: boolean,
      error: Error,
      items: Array<TBlock>,
      tip: number
    },
    votes: {
      offset: number,
      count: number,
      fetching: boolean,
      error: Error,
      items: Array<TVote>,
      tip: number
    },
    width: number,
    statistic: TCoinStatistic,
    consensus: {
      metrics: TConsensusMetrics
    },
    chainId: number
  };

  constructor(props: any) {
    super(props);
    this.state = {
      fetchConsensusMetricsId: 0,
      fetchMarketData: 0,
      fetchChartData: 0,
      height: 0,
      activeTab: "Market"
    };
    this.formStats = this.formStats.bind(this);
  }

  componentWillReceiveProps(nextProps: PropsType, nextContext: any) {
    if (
      nextProps.statistic &&
      this.state.height !== nextProps.statistic.height
    ) {
      this.setState(
        state => {
          state.height = nextProps.statistic.height;
        },
        () => {
          this.props.fetchExecutions({
            offset: 0,
            count: this.props.executions.count,
            tip: this.state.height
          });
          this.props.fetchTransfers({
            offset: 0,
            count: this.props.transfers.count,
            tip: this.state.height,
            showCoinBase: false
          });
          this.props.fetchBlocks({
            offset: 0,
            count: this.props.blocks.count,
            tip: this.state.height
          });
          this.props.fetchVotes({
            offset: 0,
            count: this.props.votes.count,
            tip: this.state.height
          });
        }
      );
    }
  }

  componentDidMount() {
    this.props.fetchConsensusMetrics();
    this.props.fetchMarketData();
    const fetchChartData = this.props.fetchChartData();
    const fetchConsensusMetricsId = window.setInterval(
      () => this.props.fetchConsensusMetrics(),
      5000
    );
    const fetchMarketData = window.setInterval(
      () => this.props.fetchMarketData(),
      10000
    );

    this.setState({ fetchConsensusMetricsId, fetchMarketData, fetchChartData });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.fetchConsensusMetricsId);
    window.clearInterval(this.state.fetchMarketData);

    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  changeActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  formChartData = chartData => {
    //to avoid component using chartData prop before promise has been resolved (ie null)
    if (!chartData) {
      return [];
    }

    return chartData;
  };

  formMarketStats = marketData => {
    if (!marketData) {
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
      subtitle: `${marketData.supply} IOTX`,
      icon: "fas fa-question-circle has-text-primary",
      msg: "marketDashboard.supplyMsg"
    });
    retval.push({
      title: t("marketDashboard.volume"),
      subtitle: `$ ${marketData.volume} USD`,
      icon: "fas fa-question-circle has-text-primary",
      msg: "marketDashboard.volumeMsg"
    });

    return retval;
  };

  formStats(chainId: number, latestEpoch: number, stats: TCoinStatistic) {
    const epochs = Number(latestEpoch).toLocaleString();
    if (!stats) {
      return [
        {
          title: t("dashboard.epochs"),
          subtitle: epochs,
          icon: "fas fa-question-circle",
          msg: "dashboard.epochsMsg"
        }
      ];
    }

    // Sets empty array return value to hold dashboard info. Dashboard is the info to the right of plasmaball
    const retval = [];
    retval.push({
      title: t("dashboard.blocks"),
      subtitle: Number((stats.height || 0) + 1).toLocaleString(),
      icon: "fas fa-question-circle",
      msg: "dashboard.blocksMsg"
    });
    retval.push({
      title: t("dashboard.transfers"),
      subtitle: Number(stats.transfers || 0).toLocaleString(),
      icon: "fas fa-question-circle",
      msg: "dashboard.transfersMsg"
    });
    retval.push({
      title: t("dashboard.epochs"),
      subtitle: epochs,
      icon: "fas fa-question-circle",
      msg: "dashboard.epochsMsg"
    });
    retval.push({
      title: `${t("dashboard.executions")}`,
      subtitle: Number(stats.executions || 0).toLocaleString(),
      icon: "fas fa-question-circle",
      msg: "dashboard.executionsMsg"
    });
    retval.push({
      title: t("dashboard.faps"),
      subtitle: Number(stats.aps || 0).toLocaleString(),
      icon: "fas fa-question-circle",
      msg: "dashboard.fapsMsg"
    });
    if (chainId === 1) {
      retval.push({
        title: t("dashboard.votes"),
        subtitle: Number(stats.votes || 0).toLocaleString(),
        icon: "fas fa-question-circle",
        msg: "dashboard.votesMsg"
      });
    }
    retval.push({
      title: t("dashboard.bbh"),
      subtitle: stats.bh || 0,
      icon: "fas fa-question-circle",
      msg: "dashboard.bbhMsg"
    });

    return retval;
  }

  renderContent() {
    const consensusMetrics =
      (this.props.consensus && this.props.consensus.metrics) || {};
    const delegates = consensusMetrics.latestDelegates || [];
    const currentProducer = consensusMetrics.latestBlockProducer;
    const candidates = consensusMetrics.candidates || [];
    let plasmaBall = null;
    const tabList = [
      {
        name: "Market"
      },
      {
        name: "Blockchain"
      }
    ];

    let votesTable = (
      <SingleColTable
        title={t("latestVotes.title")}
        items={this.props.votes.items}
        fetching={this.props.votes.fetching}
        error={this.props.votes.error}
        offset={this.props.votes.offset}
        count={this.props.votes.count}
        fetch={this.props.fetchVotes}
        tip={this.props.votes.tip}
        name={t("votes.title")}
        displayViewMore={true}
      >
        <VotesListOnlyId
          votes={this.props.votes.items}
          width={this.props.width}
          isHome={true}
        />
      </SingleColTable>
    );

    let blocksTable = (
      <SingleColTable
        title={t("latestBlocks.title")}
        items={this.props.blocks.items}
        fetching={this.props.blocks.fetching}
        error={this.props.blocks.error}
        offset={this.props.blocks.offset}
        count={this.props.blocks.count}
        fetch={this.props.fetchBlocks}
        tip={this.props.blocks.tip}
        name={t("blocks.title")}
        displayViewMore={true}
      >
        <BlocksListOnlyId
          blocks={this.props.blocks.items}
          width={this.props.width}
          isHome={true}
        />
      </SingleColTable>
    );

    let executionsTable = (
      <SingleColTable
        title={t("latestExecutions.title")}
        items={this.props.executions.items}
        fetching={this.props.executions.fetching}
        error={this.props.executions.error}
        offset={this.props.executions.offset}
        count={this.props.executions.count}
        fetch={this.props.executions}
        tip={this.props.executions.tip}
        name={t("meta.executions")}
        displayViewMore={true}
      >
        <ExecutionsListOnlyId
          executions={this.props.executions.items}
          width={this.props.width}
          isHome={true}
        />
      </SingleColTable>
    );

    let transfersTable = (
      <SingleColTable
        title={t("latestTransfers.title")}
        items={this.props.transfers.items}
        fetching={this.props.transfers.fetching}
        error={this.props.transfers.error}
        offset={this.props.transfers.offset}
        count={this.props.transfers.count}
        fetch={this.props.transfers}
        tip={this.props.transfers.tip}
        name={t("meta.transfers")}
        displayViewMore={true}
      >
        <TransfersListOnlyId
          transfers={this.props.transfers.items}
          width={this.props.width}
          isHome={true}
        />
      </SingleColTable>
    );

    if (this.state.activeTab === "Market") {
      return (
        <section>
          <Helmet
            title={`iotxplorer: iotex network explorer`}
            meta={[
              {
                name: "description",
                content:
                  "An open source collective by IoTeX community leaders, dedicated to adding value to the IoTeX network."
              },
              {
                property: "og:title",
                content: "iotxplorer: iotex network explorer"
              },
              {
                property: "og:description",
                content:
                  "An open source collective by IoTeX community leaders, dedicated to adding value to the IoTeX network #IoTeXDelegate"
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
                content: "iotxplorer: iotex network explorer"
              },
              {
                name: "twitter:description",
                content:
                  "An IoTeX explorer by iotxplorer. An open source collective of IoTeX community leaders, dedicated to adding value to the IoTeX network."
              },
              {
                name: "twitter:image",
                content: `${assetURL("/meta-image-large.png")}`
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
                <SearchBar />
              </div>
            </div>
          </div>
          <div class='box cta'>
            <p class='has-text-centered'>
              <span class='tag is-warning'>Note</span> Blockchain data will not
              be displayed until mainnet is released and the iotxplorer code is
              adjusted to account for the jsonRPC vs gRPC difference between
              testnet and mainnet.
            </p>
          </div>
          <div className='section' style={{ padding: "0px", margin: "0rem" }}>
            <div className='container' style={{ marginTop: "42px" }}>
              <div className='card'>
                <Tabs
                  tabList={tabList}
                  activeTab={this.state.activeTab}
                  changeActiveTab={this.changeActiveTab.bind(this)}
                />

                <div className='card-content' style={{ paddingTop: "3px" }}>
                  <div className='column'>
                    <div className='columns'>
                      <div className='column is-half'>
                        <LineChart
                          chartData={this.formChartData(this.props.chartData)}
                        />
                      </div>
                      <MarketDashboard
                        stats={this.formMarketStats(this.props.marketData)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <CommonMargin />
            </div>
          </div>
          <br />
          <div className='section' style={{ padding: "24px", margin: "0rem" }}>
            <div className='container'>
              <div className='card'>
                <div className='card-content'>
                  <div className='column'>
                    <div className='columns'>
                      <div className='column'>{blocksTable}</div>
                      <div className='column'>{executionsTable}</div>
                      <div className='column'>{transfersTable}</div>
                      <div className='column'>{votesTable}</div>
                    </div>
                  </div>
                </div>
                <CommonMargin />
              </div>
            </div>
          </div>
        </section>
      );
    } else if (this.state.activeTab === "Blockchain") {
      return (
        <section>
          <Helmet
            title={`iotxplorer: iotex network explorer`}
            meta={[
              {
                name: "description",
                content:
                  "An open source collective by IoTeX community leaders, dedicated to adding value to the IoTeX network."
              },
              {
                property: "og:title",
                content: "iotxplorer: iotex network explorer"
              },
              {
                property: "og:description",
                content:
                  "An open source collective by IoTeX community leaders, dedicated to adding value to the IoTeX network #IoTeXDelegate"
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
                content: "iotxplorer: iotex network explorer"
              },
              {
                name: "twitter:description",
                content:
                  "An IoTeX explorer by iotxplorer. An open source collective of IoTeX community leaders, dedicated to adding value to the IoTeX network."
              },
              {
                name: "twitter:image",
                content: `${assetURL("/meta-image-large.png")}`
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
                <SearchBar />
              </div>
            </div>
          </div>
          <div className='section' style={{ padding: "0px", margin: "0rem" }}>
            <div className='container' style={{ marginTop: "42px" }}>
              <div className='card'>
                <Tabs
                  tabList={tabList}
                  activeTab={this.state.activeTab}
                  changeActiveTab={this.changeActiveTab.bind(this)}
                />

                <div className='card-content' style={{ paddingTop: "3px" }}>
                  <div className='column'>
                    <div className='columns'>
                      <Dashboard
                        stats={this.formStats(
                          this.props.chainId,
                          consensusMetrics
                            ? consensusMetrics.latestEpoch || 0
                            : 0,
                          this.props.statistic
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
          <div className='section' style={{ padding: "24px", margin: "0rem" }}>
            <div className='container'>
              <div className='card'>
                <div className='card-content'>
                  <div className='column'>
                    <div className='columns'>
                      <div className='column'>{blocksTable}</div>
                      <div className='column'>{executionsTable}</div>
                      <div className='column'>{transfersTable}</div>
                      <div className='column'>{votesTable}</div>
                    </div>
                  </div>
                </div>
                <CommonMargin />
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
