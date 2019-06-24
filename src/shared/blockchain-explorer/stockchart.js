import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export class MyStockChart extends Component {
  formChartData = chartData => {
    // to avoid component using chartData prop before promise has been resolved (ie null)
    if (!chartData) {
      return [];
    }

    const data1 = [];
    const data2 = [];
    const xAxis = [];
    chartData.forEach(current => {
      data1.push(current.close);
      data2.push(current.volumeto);
      xAxis.push(new Date(current.time * 1000).toDateString().slice(3, -4));
    });
    return [xAxis, data1, data2];
  };

  render() {
    const data = {
      //   labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Volume (USD)",
          type: "line",
          data: this.formChartData(this.props.chartData)[2],
          fill: true,
          backgroundColor: "rgba(54, 54, 54, 0.2)",
          borderColor: "rgba(54, 54, 54, 1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(54, 54, 54, 1)",
          yAxisID: "y-axis-2"
        },
        {
          type: "line",
          label: "Price (USD)",
          data: this.formChartData(this.props.chartData)[1],
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
            labels: this.formChartData(this.props.chartData)[0]
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
              show: true
            }
            // ticks: {
            //   callback: function(value, index, values) {
            //       console.log(value)
            //     return
            //   }
            // }
          },
          {
            type: "linear",
            display: true,
            position: "right",
            id: "y-axis-2",
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
            // ticks: {
            //   callback: function(value, index, values) {
            //     return `$${Number(value).toLocaleString()}`;
            //   }
            // }
          }
        ]
      },
      maintainAspectRatio: true
    };

    return <Line data={data} options={options} width={650} height={440} />;
  }
}
