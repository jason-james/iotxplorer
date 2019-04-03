import Component from "inferno-component";
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
      height: 0,
      error: null
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  fetchVoterHistory = async event => {
    event.preventDefault();
    const url = `http://localhost:4004/api/getVoter/${
      this.state.address
    }?page=${this.state.pageNumber}`;
    try {
      const response = await axios.get(url);
      const tableContent = response.data.rewardHistory;
      this.setState({
        tableContent: tableContent,
        pageNumber: this.state.pageNumber
      });
      return tableContent;
    } catch (err) {
      console.log(err);
    }
  };

  fetchChartData = async event => {
    event.preventDefault();
    const url = `http://localhost:4004/api/getVoter/${this.state.address}`;
    try {
      const response = await axios.get(url);
      const chartData = response.data.rewardHistory;
      this.setState({ chartData, error: false });
    } catch (err) {
      console.log(err);
      this.setState({ error: true });
    }
  };

  formChartData = data => {
    const axes = {
      labels: [],
      series: [[]]
    };
    const toChart = data.slice(0, 8);
    toChart.forEach(current => {
      let date = new Date(current.timestamp * 1000).toDateString();
      var parsedDate = date.slice(3, -4);
      axes.labels.push(parsedDate);
      axes.series[0].push(current.rewards);
    });
    axes.labels = axes.labels.reverse();
    axes.series[0] = axes.series[0].reverse();
    axes.labels[7] = "";
    return axes;
  };

  handleNextClick = () => {
    if (
      this.state.pageNumber <= Math.ceil(this.state.tableContent.length / 8)
    ) {
      this.setState({ pageNumber: this.state.pageNumber + 1 });
    }
    console.log(this.state.pageNumber);
  };

  handlePrevClick = () => {
    if (this.state.pageNumber !== 1) {
      this.setState({ pageNumber: this.state.pageNumber - 1 });
    }
    console.log(this.state.pageNumber);
  };

  findChartHigh = () => {
    let arr = [];
    this.state.chartData.map(current => {
      arr.push(current.rewards);
    });
    return Math.max(...arr) * 1.5;
  };

  render() {
    var type = "Line";
    var options = {
      low: 0,
      high: this.findChartHigh(),
      width: 684,
      height: 368,
      showArea: true,
      fullWidth: true,
      chartPadding: { right: 40 }
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

    let data = this.formChartData(this.state.tableContent);

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
          <div class='field has-addons' style={{ height: "60px" }}>
            <div class='control' style={{ width: "100%" }}>
              <input
                class='input'
                type='text'
                placeholder='Enter your ethereum address'
                style={{ height: "50px", border: "2px solid #00d1b2" }}
                onChange={e => this.setState({ address: e.target.value })}
              />
            </div>
            <div class='control'>
              <a
                class='button is-primary'
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
            <article class='message is-info' style={{ marginBottom: "12px" }}>
              <div class='message-header'>
                <p>Oh, no!</p>
              </div>
              <div class='message-body'>
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
            <div class='columns is-multiline' style={{ paddingTop: "12px" }}>
              <div
                class='column is-6'
                style={{ paddingTop: "0px", marginBottom: "12px" }}
              >
                <div class='panel' style={{ height: "425px" }}>
                  <p class='panel-heading'>Rewards</p>
                  <div class='panel-block'>
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
              <div class='column is-6' style={{ paddingTop: "0px" }}>
                <div className='card'>
                  <table
                    class='table is-fullwidth is-striped is-scrollable'
                    style={{ marginBottom: "0px" }}
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Votes</th>
                        <th>Share</th>
                        <th>Reward</th>
                        <th />
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
                            <td>{currentElement.rewards.toFixed(2)} IOTX</td>
                            <td>
                              <a
                                className='button is-primary is-small'
                                href={`https://iotexscan.io/action/${
                                  currentElement.txHash
                                }`}
                                target='_blank'
                              >
                                More
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <footer class='card-footer' style={{ padding: "0.5rem" }}>
                    <nav className='level' style={{ width: "641px" }}>
                      <div className='level-left'>
                        <div className='level-item'>
                          <nav
                            class='is-small pagination'
                            role='navigation'
                            aria-label='pagination'
                          >
                            <a
                              class='pagination-previous'
                              onClick={e => {
                                this.handlePrevClick();
                                this.fetchVoterHistory(e);
                                console.log(this.state.pageNumber);
                              }}
                            >
                              Previous
                            </a>
                            <a
                              class='pagination-next'
                              onClick={e => {
                                this.handleNextClick();
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
        </AnimateHeight>
      </section>
    );
  }
}
