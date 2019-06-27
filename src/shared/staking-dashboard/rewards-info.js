import React, { Component } from "react";
import axios from "axios";
import AnimateHeight from "../../lib/height-animate";
import "babel-polyfill";
import { ChartistGraph } from "../../shared/chart-helper/chart-helper";
export class RewardsInfo extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      address: "",
      tableContent: [],
      chartData: [],
      pageNumber: 1,
      maxPages: null,
      height: 0,
      error: null
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  fetchVoterHistory = async event => {
    event.preventDefault();
    const url = `/api/getVoter/${this.state.address.toLowerCase()}?page=${
      this.state.pageNumber
    }`;
    try {
      const response = await axios.get(url);
      const tableContent = response.data.rewardHistory;
      this.setState({
        tableContent,
        pageNumber: this.state.pageNumber
      });
      return tableContent;
    } catch (err) {
      console.log(err);
    }
  };

  fetchChartData = async event => {
    event.preventDefault();
    const url = `/api/getVoter/${this.state.address.toLowerCase()}`;
    try {
      const response = await axios.get(url);
      const chartData = response.data.rewardHistory;
      this.setState({ chartData, error: false });
    } catch (err) {
      console.log(err);
      this.setState({ error: true });
    }
  };

  average = arr => {
    var sums = {},
      results = [],
      timestamp;
    for (var i = 0; i < arr.length; i++) {
      timestamp = Math.trunc(arr[i].timestamp);
      if (!(timestamp in sums)) {
        sums[timestamp] = 0;
      }
      sums[timestamp] += arr[i].rewards;
    }
    for (timestamp in sums) {
      results.push({
        timestamp: timestamp,
        rewards: sums[timestamp]
      });
    }
    return results;
  };

  totalEarned = sums => {
    var sum = 0;

    if (!sums) {
      return "...";
    }

    for (var i = 0; i < sums.length; i++) {
      sum += sums[i].rewards;
    }

    return sum;
  };

  formChartData = data => {
    var toChart = this.average(data);
    const axes = {
      labels: [],
      series: [[]]
    };
    // const toChart = data.slice(0, 8);

    toChart.forEach(current => {
      const date = new Date(current.timestamp * 1000).toDateString();
      const parsedDate = date.slice(3, -4);
      axes.labels.push(parsedDate);
      axes.series[0].push(current.rewards);
    });
    // axes.labels = axes.labels.reverse();
    // axes.series[0] = axes.series[0].reverse();
    // axes.labels[7] = "";
    return axes;
  };

  handleNextClick = e => {
    if (this.state.maxPages === null) {
      this.setState({
        maxPages: Math.ceil(this.state.tableContent.length / 8)
      });
    }
    if (this.state.pageNumber <= this.state.maxPages) {
      this.setState({ pageNumber: this.state.pageNumber + 1 });
    }
  };

  handlePrevClick = e => {
    if (this.state.pageNumber !== 1) {
      this.setState({ pageNumber: this.state.pageNumber - 1 });
    }
  };

  findChartHigh = () => {
    const arr = [];
    this.state.chartData.map(current => {
      arr.push(current.rewards);
    });
    return Math.max(...arr) * 1.5;
  };

  render() {
    const type = "Line";
    const options = {
      low: 0,
      high: this.findChartHigh(),
      width: 840,
      height: 368,
      showArea: true,
      fullWidth: true,
      chartPadding: { right: 40 }
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

    const data = this.formChartData(this.state.chartData);

    return (
      <section>
        <form
          onSubmit={e => {
            this.fetchVoterHistory(e);
            this.fetchChartData(e);
            this.setState({ height: "auto" });
          }}
          style={{ marginBottom: "4px" }}
        >
          <div className='field has-addons' style={{ height: "60px" }}>
            <div className='control' style={{ width: "100%" }}>
              <input
                className='input'
                type='text'
                placeholder='Enter your ethereum address'
                style={{ height: "50px", border: "2px solid #00d1b2" }}
                onChange={e => this.setState({ address: e.target.value })}
              />
            </div>
            <div className='control'>
              <a
                className='button is-primary'
                style={{ height: "50px" }}
                onClick={e => {
                  this.fetchVoterHistory(e);
                  this.fetchChartData(e);
                  this.setState({ height: "auto" });
                }}
              >
                Search
              </a>
            </div>
          </div>
        </form>

        <AnimateHeight duration={500} height={this.state.height}>
          {this.state.error === true ? (
            <article
              className='message is-info'
              style={{ marginBottom: "12px" }}
            >
              <div className='message-header'>
                <p>Oh, no!</p>
              </div>
              <div className='message-body'>
                You didn't enter a valid address. Either you have not yet voted
                for iotxplorer or you have not been voting long enough to be a
                part of the most recent reward cycle. To find out when your
                first reward will be, visit{" "}
                <a href='https://t.me/iotxplorer' target='_blank'>
                  t.me/iotxplorer.
                </a>
              </div>
            </article>
          ) : (
            <div
              className='columns is-multiline'
              style={{ paddingTop: "12px" }}
            >
              <div
                className='column is-6 mobile-chartist'
                style={{ paddingTop: "0px" }}
              >
                <div className='panel' style={{ height: "425px" }}>
                  <p className='panel-heading'>Rewards</p>
                  <div className='panel-block'>
                    <ChartistGraph
                      data={data}
                      options={options}
                      responsiveOptions={responsiveOptions}
                      type={type}
                      // listener={{
                      //   draw: function(data) {
                      //     let Chartist = require("chartist");

                      //     if (data.type === "line" || data.type === "area") {
                      //       data.element.animate({
                      //         d: {
                      //           begin: 2000 * data.index,
                      //           dur: 2000,
                      //           from: data.path
                      //             .clone()
                      //             .scale(1, 0)
                      //             .translate(0, data.chartRect.height())
                      //             .stringify(),
                      //           to: data.path.clone().stringify(),
                      //           easing: Chartist.Svg.Easing.easeOutQuint
                      //         }
                      //       });
                      //     }
                      //   }
                      // }}
                    />
                  </div>
                </div>
              </div>
              <div className='column is-6' style={{ paddingTop: "0px" }}>
                <div className='card'>
                  <div className='table-container'>
                    <table
                      className='table is-fullwidth is-striped is-scrollable table-container'
                      style={{ marginBottom: "0px" }}
                    >
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Votes</th>
                          <th>Share</th>
                          <th>Reward</th>
                          <th>Epochs</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.tableContent
                          .slice(0, 8)
                          .map(currentElement => (
                            <tr>
                              <td>
                                {new Date(
                                  currentElement.timestamp * 1000
                                ).toLocaleString("en-US", { timeZone: "UTC" })}
                              </td>
                              <td>{currentElement.votes.toFixed(2)}</td>
                              <td>{currentElement.rewardsShare.toFixed(2)}%</td>
                              <td>{currentElement.rewards.toFixed(2)} ⬡</td>
                              <td>
                                <span className='tag is-primary'>
                                  {currentElement.epochs}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <footer className='card-footer' style={{ padding: "0.5rem" }}>
                    <nav className='level' style={{ width: "641px" }}>
                      <div className='level-left'>
                        <div className='level-item'>
                          <nav
                            className='is-small pagination'
                            role='navigation'
                            aria-label='pagination'
                          >
                            <a
                              className='pagination-previous'
                              onClick={e => {
                                this.handlePrevClick(e);
                                this.fetchVoterHistory(e);
                                console.log(this.state.pageNumber);
                              }}
                            >
                              Previous
                            </a>
                            <a
                              className='pagination-next'
                              onClick={e => {
                                this.handleNextClick(e);
                                this.fetchVoterHistory(e);
                              }}
                            >
                              Next page
                            </a>
                          </nav>
                        </div>
                      </div>
                      <div className='level-right'>
                        <div className='level-item'>
                          <div style={{ fontSize: "12px" }}>
                            Page {this.state.pageNumber} of{" "}
                            {Math.ceil(this.state.chartData.length / 8)}
                          </div>
                        </div>
                      </div>
                    </nav>
                  </footer>
                </div>
              </div>
            </div>
          )}
          <div
            className='hero is-small is-dark'
            style={{ marginBottom: "1rem" }}
          >
            <div className='hero-body'>
              <div className='container has-text-centered'>
                <h1 className='title'>
                  {this.totalEarned(this.average(this.state.chartData)).toFixed(
                    2
                  )}{" "}
                  ⬡
                </h1>
                <h2 className='subtitle'>Total Earned</h2>
              </div>
            </div>
          </div>
        </AnimateHeight>
      </section>
    );
  }
}
