// @flow

import React, { Component } from "react";
import AnimateHeight from "../../lib/height-animate";

import { Helmet } from "react-helmet";
import { styled } from "styletron-react";
import { colors } from "../common/styles/style-color";
import { colorHover } from "../common/color-hover";
import isBrowser from "is-browser";
import window from "global";
import { CommonMargin } from "../common/common-margin";
import { EmptyMessage, LoadingMessage } from "../common/message";
import { TableWrapper } from "../common/table-wrapper";
import type { TDelegate } from "../../entities/delegate-types";
import { DelegateAnalytics } from "./delegate-analytics";

export class Delegates extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      fetchDelegateData: 0,
      fetchConsensusMetrics: 0,
      height: 0
    };
  }

  componentDidMount() {
    this.props.fetchConsensusMetrics();
    this.props.fetchDelegateData();
    const fetchDelegateData = window.setInterval(
      () => this.props.fetchDelegateData(),
      5000
    );

    const fetchConsensusMetrics = window.setInterval(
      () => this.props.fetchConsensusMetrics(),
      5000
    );

    this.setState({
      fetchDelegateData,
      fetchConsensusMetrics
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.fetchDelegateData);
    window.clearInterval(this.state.fetchConsensusMetrics);
  }

  render() {
    const { delegates, width, consensus } = this.props;

    return (
      <div className='column container'>
        <Helmet title={"Delegate - iotxplorer"} />
        <div>
          <h1 className='title'>Delegates</h1>
          <DelegatesList
            delegates={delegates.delegateData}
            width={width}
            consensus={consensus}
            fetchProductivity={this.props.fetchProductivity}
            fetchBuckets={this.props.fetchBuckets}
            bucketsInfo={this.props.bucketInfo}
            productivity={this.props.productivity}
            rewards={this.props.rewards}
          />
        </div>
        <CommonMargin />
      </div>
    );
  }
}

export class DelegatesList extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      height: 0,
      selectedDelegate: null
    };
  }

  displayServerStatus = status => {
    if (status === "ONLINE") {
      return (
        <span>
          <i className='fas fa-signal has-text-primary' /> Online{" "}
        </span>
      );
    } else if (status === "NOT_EQUIPPED") {
      return (
        <span>
          <i className='fas fa-times-circle has-text-danger' /> Offline{" "}
        </span>
      );
    } else {
      return <span>Pinging...</span>;
    }
  };

  displayProductivity = (prod, base) => {
    if (!prod || !base) {
      return "";
    } else if (base === 0 || base === "0") {
      return "Not Selected";
    } else if (base === null) {
      return "";
    } else {
      return `${prod}/${base}`;
    }
  };

  handleClick = (e, d) => {
    window.scrollTo(0, 0);

    this.setState({
      height: "auto",
      selectedDelegate: d
    });
    this.props.fetchProductivity({
      name: d.registeredName,
      startEpoch: this.props.consensus.metrics.epoch.num
    });
    this.props.fetchBuckets({
      name: d.registeredName,
      currentEpoch: this.props.consensus.metrics.epoch.num
    });
  };

  render() {
    const { delegates, consensus } = this.props;

    if (!delegates) {
      return <LoadingMessage />;
    }
    let percentArr = [];
    let cumulativeArr = [];
    delegates.forEach(el => {
      percentArr.push(parseFloat(el.percent));
    });

    return (
      <section>
        <AnimateHeight duration={500} height={this.state.height}>
          <DelegateAnalytics
            delegate={this.state.selectedDelegate}
            consensus={consensus}
            fetchProductivity={this.props.fetchProductivity}
            productivity={this.props.productivity}
            fetchBuckets={this.props.fetchBuckets}
            bucketsInfo={this.props.bucketsInfo}
            rewards={this.props.rewards}
          />
        </AnimateHeight>
        <table className='bx--data-table-v2'>
          <thead>
            <tr>
              <th>Rank</th>
              <th />
              <th>Delegate Name</th>
              <th>Server Status</th>
              <th>Votes & Percent</th>
              <th>Cumulative Share</th>
              <th style={{ textAlign: "center" }}>Blocks in Epoch</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {delegates.map((d, i, arr) => {
              percentArr.reduce(function(a, b, i) {
                return (cumulativeArr[i] = a + b);
              }, 0);
              return (
                <tr className='bx--parent-row-v2' data-parent-row>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={d.logo}
                      style={{
                        objectFit: "contain",
                        height: "40px",
                        width: "40px"
                      }}
                    />
                  </td>
                  <td>{d.name}</td>
                  <td>{this.displayServerStatus(d.serverStatus)}</td>
                  <td>
                    {Number(d.liveVotes).toLocaleString()}
                    <div style={{ color: "#00d1b2", fontSize: "0.8rem" }}>
                      {d.percent}%
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        position: "relative"
                      }}
                    >
                      <div
                        className='cumulative-table-fill'
                        style={{
                          width: `${cumulativeArr[i]}%`
                        }}
                      />
                    </div>
                    <div
                      style={{
                        textAlign: "right",
                        position: "absolute",
                        paddingLeft: "120px"
                      }}
                    >
                      <p>{cumulativeArr[i].toFixed(2)}%</p>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {this.displayProductivity(
                      d.productivity,
                      d.productivityBase
                    )}
                  </td>
                  <td>
                    <a
                      className='button is-small is-primary'
                      onClick={e => this.handleClick(e, d)}
                    >
                      Click to Expand
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  }
}
