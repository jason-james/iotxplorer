import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { ToolTip } from "../common/tooltip";

export class BucketInfoTable extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      buckets: []
    };

    this.shareTemplate = this.shareTemplate.bind(this);
  }

  componentDidMount() {
    window.setInterval(
      () =>
        this.getVoterPercentages(this.props.bucketsInfo, this.props.totalVotes),
      3000
    );
  }

  getVoterPercentages = (buckets, totalVotes) => {
    buckets.forEach(curr => {
      curr["percent"] = ((curr.votes / totalVotes) * 100).toFixed(3);
    });
    this.setState({
      buckets
    });
  };

  shareTemplate(rowData, column) {
    return (
      <span className='p-column-title'>
        Share (%){" "}
        <ToolTip
          iconClass={"fas fa-question-circle"}
          message="You can find out roughly how much IOTX (⬡) you should be getting every day by multiplying your share by the daily delegate rewards from the chart above, according to your delegate's reward structure."
          customPadClass={"rollDpos-tooltip"}
        />
      </span>
    );
  }

  findUniqueAddresses = buckets => {
    let uniqueArray = [];
    buckets.forEach(bucket => {
      if (!uniqueArray.includes(bucket.voter)) {
        uniqueArray.push(bucket.voter);
      }
    });
    return uniqueArray.length;
  };

  export = () => {
    this.dt.exportCSV();
  };

  render() {
    var header = (
      <nav class='level'>
        <div class='level-left'>
          <div class='level-item'>
            <p>Buckets (Current Epoch)</p>
          </div>
        </div>

        <div class='level-right'>
          <a class='button is-primary is-outlined' onClick={this.export}>
            <i class='fas fa-download' />
          </a>
        </div>
      </nav>
    );

    <nav class='level'>
      <div class='level-left'>
        <div class='level-item'>
          <p>Buckets (Current Epoch)</p>
        </div>
      </div>

      <div class='level-right'>
        <a class='button is-primary is-outlined' onClick={this.export}>
          <i class='fas fa-download' />
        </a>
      </div>
    </nav>;

    var footer = `Total buckets: ${
      this.state.buckets.length
    }    Unique addresses: ${this.findUniqueAddresses(this.state.buckets)}`;

    return (
      <DataTable
        value={this.state.buckets}
        header={header}
        footer={footer}
        paginator={true}
        rows={10}
        responsive={true}
        ref={el => {
          this.dt = el;
        }}
      >
        <Column
          field='voter'
          header='Voter'
          filter={true}
          filterMatchMode='contains'
          filterPlaceholder='Search an address'
        />
        <Column field='votes' header='Stake' sortable={true} />
        <Column field='weightedVotes' header='Votes' sortable={true} />
        <Column field='percent' header={this.shareTemplate()} sortable={true} />

        <Column
          field='remainingDuration'
          header='Remaining Stake Duration'
          sortable={true}
        />
      </DataTable>
    );
  }
}

export class RewardsChart extends Component {
  formChartData = chartData => {
    // to avoid component using chartData prop before promise has been resolved (ie null)
    if (!chartData) {
      return [];
    }

    const data1 = [];
    const data2 = [];
    const data3 = [];

    chartData.forEach(current => {
      data1.push((current.foundationBonus / 1e18).toFixed(0));
      data2.push((current.epochReward / 1e18).toFixed(0));
      data3.push((current.blockReward / 1e18).toFixed(0));
    });
    console.log([data1, data2, data3]);
    return [data1.reverse(), data2.reverse(), data3.reverse()];
  };

  render() {
    const data = {
      //   labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Foundation Bonus (⬡)",
          type: "line",
          data: this.formChartData(this.props.rewards)[0],
          fill: true,
          backgroundColor: "rgba(255, 217, 0, 0.8)",
          borderColor: "rgba(255, 217, 0, 1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(255, 217, 0, 1)"
        },
        {
          type: "line",
          label: "Epoch Bonus (⬡)",
          data: this.formChartData(this.props.rewards)[1],
          fill: true,
          backgroundColor: "rgba(54, 54, 54, 0.8)",
          borderColor: "rgba(54, 54, 54, 1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(54, 54, 54, 0.2)",
          pointBorderColor: "#fff"
        },
        {
          type: "line",
          label: "Block Rewards (⬡)",
          data: this.formChartData(this.props.rewards)[2],
          fill: true,
          backgroundColor: "rgba(0, 209, 178, 0.8)",
          borderColor: "rgba(0, 209, 178, 1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(0, 209, 178, 1)",
          pointBorderColor: "#fff"
        }
      ]
    };

    const options = {
      title: {
        display: true,
        text: "Total Rewards (past 7 days)"
      },
      responsive: true,
      tooltips: {
        mode: "label"
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            },
            labels: [1, 2, 3, 4, 5, 6, 7]
          }
        ],
        yAxes: [
          {
            type: "linear",
            stacked: true,
            display: true,
            position: "left",
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
            // ticks: {
            //   callback: function(value, index, values) {
            //       console.log(value)
            //     return
            //   }
            // }
          }
        ]
      },
      maintainAspectRatio: true
    };

    return (
      <Line
        data={data}
        options={options}
        width={this.props.width < 720 ? null : 1280}
        height={440}
      />
    );
  }
}
