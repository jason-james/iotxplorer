// @flow

import Component from "inferno-component";
import Helmet from "inferno-helmet";
import { styled } from "styletron-inferno";
import { colors } from "../common/styles/style-color";
import { colorHover } from "../common/color-hover";
import isBrowser from "is-browser";
import window from "global";
import { CommonMargin } from "../common/common-margin";
import { EmptyMessage, LoadingMessage } from "../common/message";

import { TableWrapper } from "../common/table-wrapper";
import type { TDelegate } from "../../entities/delegate-types";

export class Delegates extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      fetchDelegateData: 0
    };
  }

  componentDidMount() {
    this.props.fetchDelegateData();
    const fetchDelegateData = window.setInterval(
      () => this.props.fetchDelegateData(),
      5000
    );

    this.setState({
      fetchDelegateData
    });
  }

  render() {
    const { delegates, width } = this.props;

    return (
      <div className='column container'>
        <Helmet title={"Delegate - iotxplorer"} />
        <div>
          <h1 className='title'>Delegates</h1>
          <DelegatesList delegates={delegates.delegateData} width={width} />
        </div>
        <CommonMargin />
      </div>
    );
  }
}

export class DelegatesList extends Component {
  props: {
    delegates: Array<TDelegate>,
    width: string,
    sortAddress: any
  };

  displayServerStatus = status => {
    if (status === "ONLINE") {
      return (
        <span>
          <i class='fas fa-signal has-text-primary' /> Online{" "}
        </span>
      );
    } else if (status === "NOT_EQUIPPED") {
      return (
        <span>
          <i class='fas fa-times-circle has-text-danger' /> Offline{" "}
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

  render() {
    const { delegates } = this.props;

    if (!delegates) {
      return <LoadingMessage />;
    }
    let percentArr = [];
    let cumulativeArr = [];
    delegates.forEach(el => {
      percentArr.push(parseFloat(el.percent));
    });

    return (
      <table className='bx--data-table-v2'>
        <thead>
          <tr>
            <th>Rank</th>
            <th />
            <th>Delegate Name</th>
            <th>Server Status</th>
            <th>Votes & Percent</th>
            <th>Cumulative Share</th>
            <th style={{ textAlign: "center" }}>Location</th>
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
                <td style={{ textAlign: "center" }}>{d.location}</td>
                <td style={{ textAlign: "center" }}>
                  {this.displayProductivity(d.productivity, d.productivityBase)}
                </td>
                <td>
                  <a className='button is-small is-primary' href={d.website}>
                    Website
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
