import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { assetURL } from "../../lib/asset-url";

export class ProductivityChart extends Component {
  render() {
    const data = {
      //   labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          type: "line",
          steppedLine: true,

          label: "Productivity (actual/expected production)",
          data: this.props.productivity,
          fill: true,
          backgroundColor: "rgba(0, 209, 178, 0.2)",
          borderColor: "rgba(0, 209, 178, 1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(0, 209, 178, 1)",
          pointBorderColor: "#fff",
          yAxisID: "y-axis-1"
        }
      ]
    };

    const options = {
      title: {
        display: true,
        text: "Productivity (past 7 days)"
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
            display: true,
            position: "left",
            id: "y-axis-1",
            gridLines: {
              display: false
            },
            labels: {
              show: false
            },
            ticks: {
              //   callback: function(value, index, values) {
              //       console.log(value)
              //     return
              //   }
              min: 0
            }
          }
        ]
      },
      maintainAspectRatio: true
    };

    if (this.props.productivity === []) {
      return (
        <img
          src={assetURL("/blocks-spinner.svg")}
          style={{ objectFit: "contain", height: "200px", width: "200px" }}
        />
      );
    } else {
      return <Line data={data} options={options} width={650} height={310} />;
    }
  }
}
