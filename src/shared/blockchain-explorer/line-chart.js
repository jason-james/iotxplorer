import Component from "inferno-component";
import * as d3 from "d3";
import * as Axis from "d3-axis";
export class LineChart extends Component {

  componentDidMount() {

      let area = d3.selectAll("#area");

      area
        .attr("transform", "translate(0, 300)")
        .transition()
        .duration(1500)
        .attr("transform", "translate(0,0)");

        let line = d3.selectAll("#line");
        var totalLength = line.node().getTotalLength();
        line
          .attr("stroke-dasharray", totalLength)
          .attr("stroke-dashoffset", totalLength)
          .attr("stroke-width", 6)
          .attr("stroke", "#00d1b2")
          .transition()
          .duration(2000)
          .attr("stroke-width", 0.5)
          .attr("stroke-dashoffset", 0);
  }

  componentDidUpdate() {
    let line = d3.selectAll("#line");
    var totalLength = line.node().getTotalLength();
    line
      .attr("stroke-dasharray", totalLength)
      .attr("stroke-dashoffset", totalLength)
      .attr("stroke-width", 6)
      .attr("stroke", "#00d1b2")
      .transition()
      .duration(2000)
      .attr("stroke-width", 0.5)
      .attr("stroke-dashoffset", 0);

  }

  render() {
    
    const data = this.props.chartData

    const height = 350;
    const width = 623;

    const boxStyles = {
      width: width,
      height: height,
      borderRadius: 5,
      margin: "20 auto"
    };

    let x = d3
      .scaleLinear()
      .domain(d3.extent(data, function(d) { return d.time; }))
      .range([0, width]);

    let y = d3
      .scaleLinear()
      .domain([0, d3.max(data, function(d) { return d.close; })])
      .range([height, 0]);


    var line = d3
      .line()
      .x(function(d) {
        return x(d.time);
      })
      .y(function(d) {
        return y(d.close);
      });

    var area = d3
      .area()
      .x(function(d) {
        return x(d.time);
      })
      .y0(height)
      .y1(function(d) {
        return y(d.close);
      });


      const yTicks = y.ticks(5).map(d => (
        y(d) > 10 && y(d) < height ? 
          <g transform={`translate(${20},${y(d)})`}>  
            <text x="-12" y="5">{'$' + (d)}</text>
            <line x1='0' x1='5' y1='0' y2='0' transform="translate(-5,0)"/>
            <line className='gridline' x1='0' x1={width} y1='0' y2='0' transform="translate(-5,0)"/> 
          </g>
        : null
    ))

    return (
      <div style={boxStyles}>
        <svg height={height} width={width}>
          <defs>
            <linearGradient id="MyGradient">
              <stop offset="-10%" stop-color="#317c70" />
              <stop offset="95%" stop-color="#00d1b2" />
            </linearGradient>
          </defs>

          <g id={"yAxis"}>
          {yTicks}

            <path
              id={"line"}
              d={line(data)}
              fill={"transparent"}
              stroke={"transparent"}
            />
            <path
              id={"area"}
              d={area(data)}
              fill={"url(#MyGradient)"}
              style={{ opacity: 0.72 }}
            />
          </g>
        </svg>
        <p style={{position:'relative', bottom:'45px', textAlign:'center', fontFamily: 'Roboto,Actor,Helvetica Neue'}}>30 day performance</p>
      </div>
    );
  }
}
