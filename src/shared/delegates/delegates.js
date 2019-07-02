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
import { hideColClass } from "../common/utils";

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
        <Helmet title={"Iotxplorer - Delegate Insights"} />
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

  displayProductivity = (prod, base, d, i) => {
    if (d.rank >= i + 10) {
      return "Not enough self stake";
    } else if (!prod || !base) {
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
            width={this.props.width}
          />
        </AnimateHeight>
        <table className='bx--data-table-v2'>
          <thead>
            <tr>
              <th
                className={
                  hideColClass(this.props.width) ? "" : "second-to-none-header"
                }
              >
                Rank
              </th>
              <th
                className={hideColClass(this.props.width) ? "" : "none-on-palm"}
              />
              <th
                className={
                  hideColClass(this.props.width) ? "" : "second-to-none-header"
                }
              >
                Delegate Name
              </th>
              <th
                className={hideColClass(this.props.width) ? "" : "none-on-palm"}
              >
                Server Status
              </th>
              <th
                className={
                  hideColClass(this.props.width) ? "" : "second-to-none-header"
                }
              >
                Votes & Percent
              </th>
              <th
                className={hideColClass(this.props.width) ? "" : "none-on-palm"}
              >
                Cumulative Share
              </th>
              <th
                className={hideColClass(this.props.width) ? "" : "none-on-palm"}
                style={{ textAlign: "center" }}
              >
                Blocks in Epoch
              </th>
              <th
                className={
                  hideColClass(this.props.width) ? "" : "second-to-none-header"
                }
              />
            </tr>
          </thead>
          <tbody>
            {delegates.map((d, i, arr) => {
              percentArr.reduce(function(a, b, i) {
                return (cumulativeArr[i] = a + b);
              }, 0);
              return (
                <tr className='bx--parent-row-v2' data-parent-row>
                  <td
                    className={
                      hideColClass(this.props.width)
                        ? ""
                        : "second-to-none-header"
                    }
                    style={{
                      fontSize: d.rank >= i + 10 ? "0" : "1rem"
                    }}
                  >
                    {d.rank}
                  </td>
                  <td
                    className={
                      hideColClass(this.props.width) ? "" : "none-on-palm"
                    }
                  >
                    <img
                      src={d.logo}
                      style={{
                        objectFit: "contain",
                        height: "40px",
                        width: "40px"
                      }}
                    />
                  </td>
                  <td
                    className={
                      hideColClass(this.props.width)
                        ? ""
                        : "second-to-none-header"
                    }
                    style={{
                      textDecoration: d.rank >= i + 10 ? "line-through" : "#"
                    }}
                  >
                    {d.name}
                  </td>
                  <td
                    className={
                      hideColClass(this.props.width) ? "" : "none-on-palm"
                    }
                    style={{
                      textDecoration: d.rank >= i + 10 ? "line-through" : ""
                    }}
                  >
                    {this.displayServerStatus(d.serverStatus)}
                  </td>
                  <td
                    className={
                      hideColClass(this.props.width)
                        ? ""
                        : "second-to-none-header"
                    }
                  >
                    <div
                      style={{
                        textDecoration: d.rank >= i + 10 ? "line-through" : ""
                      }}
                    >
                      {Number(d.liveVotes).toLocaleString()}
                    </div>
                    <div style={{ color: "#00d1b2", fontSize: "0.8rem" }}>
                      {d.percent}%
                    </div>
                  </td>
                  <td
                    className={
                      hideColClass(this.props.width) ? "" : "none-on-palm"
                    }
                  >
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
                      <p
                        style={{
                          textDecoration:
                            d.rank >= i + 10 ? "line-through" : "#"
                        }}
                      >
                        {cumulativeArr[i].toFixed(2)}%
                      </p>
                    </div>
                  </td>
                  <td
                    className={
                      hideColClass(this.props.width) ? "" : "none-on-palm"
                    }
                    style={{
                      textAlign: "center",
                      fontSize: d.rank >= i + 10 ? "14px" : "1rem"
                    }}
                  >
                    {this.displayProductivity(
                      d.productivity,
                      d.productivityBase,
                      d,
                      i
                    )}
                  </td>
                  <td
                    className={
                      hideColClass(this.props.width)
                        ? ""
                        : "second-to-none-header"
                    }
                  >
                    <a
                      className='button is-small is-primary'
                      onClick={e => this.handleClick(e, d)}
                    >
                      Expand
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
