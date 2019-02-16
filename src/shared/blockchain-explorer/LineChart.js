import Component from "inferno-component";
import * as d3 from "d3";
import * as Axis from "d3-axis";
//TODO: Create API call for data and pass into state to use here, instead of static array below
export class LineChart extends Component {
  constructor() {
    super();

    this.state = {
      data: [
        {
          "time": 1542499200,
          "high": 0.01348,
          "low": 0.008795,
          "open": 0.01331,
          "volumefrom": 181435250.79,
          "volumeto": 1879369.43,
          "close": 0.009417
        },
        {
          "time": 1542758400,
          "high": 0.01043,
          "low": 0.009165,
          "open": 0.009737,
          "volumefrom": 199515747.16,
          "volumeto": 1916533.84,
          "close": 0.009686
        },
        {
          "time": 1543017600,
          "high": 0.008929,
          "low": 0.007872,
          "open": 0.008595,
          "volumefrom": 175775910.19,
          "volumeto": 1476472.89,
          "close": 0.008326
        },
        {
          "time": 1543276800,
          "high": 0.01032,
          "low": 0.008181,
          "open": 0.008411,
          "volumefrom": 294613656.89,
          "volumeto": 2783887.82,
          "close": 0.01007
        },
        {
          "time": 1543536000,
          "high": 0.009864,
          "low": 0.00842,
          "open": 0.009423,
          "volumefrom": 322475503.73,
          "volumeto": 3017353.3,
          "close": 0.00978
        },
        {
          "time": 1543795200,
          "high": 0.009408,
          "low": 0.00826,
          "open": 0.009137,
          "volumefrom": 169735618.46,
          "volumeto": 1482892.77,
          "close": 0.008297
        },
        {
          "time": 1544054400,
          "high": 0.008051,
          "low": 0.006773,
          "open": 0.007737,
          "volumefrom": 163820483.86,
          "volumeto": 1231238.35,
          "close": 0.007234
        },
        {
          "time": 1544313600,
          "high": 0.007761,
          "low": 0.00687,
          "open": 0.007509,
          "volumefrom": 94261353.89,
          "volumeto": 690209.7,
          "close": 0.007006
        },
        {
          "time": 1544572800,
          "high": 0.007355,
          "low": 0.006471,
          "open": 0.00718,
          "volumefrom": 200704689.16,
          "volumeto": 1346285.33,
          "close": 0.006633
        },
        {
          "time": 1544832000,
          "high": 0.007806,
          "low": 0.006627,
          "open": 0.006627,
          "volumefrom": 457019169.1,
          "volumeto": 3270523.65,
          "close": 0.007735
        },
        {
          "time": 1545091200,
          "high": 0.009392,
          "low": 0.007697,
          "open": 0.008101,
          "volumefrom": 762755253.71,
          "volumeto": 6538978.58,
          "close": 0.009268
        },
        {
          "time": 1545350400,
          "high": 0.009021,
          "low": 0.008226,
          "open": 0.008733,
          "volumefrom": 265353063.27,
          "volumeto": 2312179.46,
          "close": 0.008777
        },
        {
          "time": 1545609600,
          "high": 0.009266,
          "low": 0.007785,
          "open": 0.008939,
          "volumefrom": 296118124.6,
          "volumeto": 2544911.12,
          "close": 0.008044
        },
        {
          "time": 1545868800,
          "high": 0.008567,
          "low": 0.007511,
          "open": 0.00762,
          "volumefrom": 408559852.44,
          "volumeto": 3316581.25,
          "close": 0.008088
        },
        {
          "time": 1546128000,
          "high": 0.008377,
          "low": 0.00745,
          "open": 0.008299,
          "volumefrom": 329900229.17,
          "volumeto": 2598454.74,
          "close": 0.007877
        },
        {
          "time": 1546387200,
          "high": 0.008324,
          "low": 0.007672,
          "open": 0.008041,
          "volumefrom": 401067913.65,
          "volumeto": 3211897.31,
          "close": 0.007981
        },
        {
          "time": 1546646400,
          "high": 0.008452,
          "low": 0.007826,
          "open": 0.007942,
          "volumefrom": 357887775.12,
          "volumeto": 2895872.26,
          "close": 0.008141
        },
        {
          "time": 1546905600,
          "high": 0.008324,
          "low": 0.006713,
          "open": 0.008122,
          "volumefrom": 511430015.93,
          "volumeto": 3923538.86,
          "close": 0.006896
        },
        {
          "time": 1547164800,
          "high": 0.007292,
          "low": 0.006463,
          "open": 0.006898,
          "volumefrom": 500744224.76,
          "volumeto": 3500152.18,
          "close": 0.006534
        },
        {
          "time": 1547424000,
          "high": 0.007142,
          "low": 0.006591,
          "open": 0.006815,
          "volumefrom": 265391373.06,
          "volumeto": 1838236.4,
          "close": 0.007033
        },
        {
          "time": 1547683200,
          "high": 0.008366,
          "low": 0.007076,
          "open": 0.007113,
          "volumefrom": 697594152.12,
          "volumeto": 5549621.68,
          "close": 0.007758
        },
        {
          "time": 1547942400,
          "high": 0.008177,
          "low": 0.007171,
          "open": 0.007421,
          "volumefrom": 229818199.08,
          "volumeto": 1776195.5,
          "close": 0.007852
        },
        {
          "time": 1548201600,
          "high": 0.00818,
          "low": 0.007237,
          "open": 0.007787,
          "volumefrom": 198657805.8,
          "volumeto": 1502913.14,
          "close": 0.007345
        },
        {
          "time": 1548460800,
          "high": 0.007553,
          "low": 0.006665,
          "open": 0.007373,
          "volumefrom": 113291563.57,
          "volumeto": 814640.03,
          "close": 0.006941
        },
        {
          "time": 1548720000,
          "high": 0.007628,
          "low": 0.006491,
          "open": 0.006871,
          "volumefrom": 205045084.58,
          "volumeto": 1431232.97,
          "close": 0.006628
        },
        {
          "time": 1548979200,
          "high": 0.007052,
          "low": 0.006577,
          "open": 0.006681,
          "volumefrom": 53759038.68,
          "volumeto": 362442.89,
          "close": 0.006623
        },
        {
          "time": 1549238400,
          "high": 0.006862,
          "low": 0.006314,
          "open": 0.006588,
          "volumefrom": 72998072.81,
          "volumeto": 481362.75,
          "close": 0.00645
        },
        {
          "time": 1549497600,
          "high": 0.007759,
          "low": 0.006346,
          "open": 0.006413,
          "volumefrom": 119603549.52,
          "volumeto": 820413.18,
          "close": 0.00683
        },
        {
          "time": 1549756800,
          "high": 0.007018,
          "low": 0.006681,
          "open": 0.006891,
          "volumefrom": 82333408.59,
          "volumeto": 565408.11,
          "close": 0.006873
        },
        {
          "time": 1550016000,
          "high": 0.006935,
          "low": 0.006707,
          "open": 0.006851,
          "volumefrom": 62880390.87,
          "volumeto": 427086.8,
          "close": 0.006792
        },
        {
          "time": 1550275200,
          "high": 0.007002,
          "low": 0.006785,
          "open": 0.006857,
          "volumefrom": 23966213.86,
          "volumeto": 164336.33,
          "close": 0.006851
        }
      ]
    };
  }

  componentDidMount() {
    fetch(
      "https://min-api.cryptocompare.com/data/histominute?fsym=IOTX&tsym=USD&limit=60&aggregate=3&e=CCCAGG"
    )
      .then(res => res.json())
      .then(res =>
        this.setState({
          data: res.Data
        })
      );
      let area = d3.selectAll("#area");

      area
        .attr("transform", "translate(0, 300)")
        .transition()
        .duration(3000)
        .attr("transform", "translate(0,0)");
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
    let { data } = this.state;

    const height = 350;
    const width = 625;

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
              style={{ opacity: 0.8 }}
            />
          </g>
        </svg>
        <p style={{position:'relative', bottom:'45px', textAlign:'center', fontFamily: 'Roboto,Actor,Helvetica Neue'}}>30 day performance</p>
      </div>
    );
  }
}
