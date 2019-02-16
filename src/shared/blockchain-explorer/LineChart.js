import Component from "inferno-component";
import * as d3 from "d3";
import * as Axis from "d3-axis";

export class LineChart extends Component {
  constructor() {
    super();

    this.state = {
      data: [
        {
          "time": 1534723200,
          "high": 0.01178,
          "low": 0.009656,
          "open": 0.01072,
          "volumefrom": 145368076.55,
          "volumeto": 1563885.55,
          "close": 0.01127
        },
        {
          "time": 1534982400,
          "high": 0.01667,
          "low": 0.01144,
          "open": 0.01157,
          "volumefrom": 558779544.68,
          "volumeto": 7351209.11,
          "close": 0.0133
        },
        {
          "time": 1535241600,
          "high": 0.01489,
          "low": 0.01277,
          "open": 0.01317,
          "volumefrom": 114260742.74,
          "volumeto": 1588288.26,
          "close": 0.01425
        },
        {
          "time": 1535500800,
          "high": 0.01558,
          "low": 0.01316,
          "open": 0.01417,
          "volumefrom": 123433828.42,
          "volumeto": 1745174.49,
          "close": 0.01441
        },
        {
          "time": 1535760000,
          "high": 0.01658,
          "low": 0.01448,
          "open": 0.01477,
          "volumefrom": 109738345.22,
          "volumeto": 1681542.1,
          "close": 0.01578
        },
        {
          "time": 1536019200,
          "high": 0.01658,
          "low": 0.01108,
          "open": 0.01592,
          "volumefrom": 121264906.07,
          "volumeto": 1552455.85,
          "close": 0.01173
        },
        {
          "time": 1536278400,
          "high": 0.01186,
          "low": 0.01004,
          "open": 0.01154,
          "volumefrom": 77794066.13,
          "volumeto": 824531.21,
          "close": 0.01037
        },
        {
          "time": 1536537600,
          "high": 0.01247,
          "low": 0.009949,
          "open": 0.0105,
          "volumefrom": 170937068.67,
          "volumeto": 1888050.47,
          "close": 0.0109
        },
        {
          "time": 1536796800,
          "high": 0.01337,
          "low": 0.01084,
          "open": 0.01117,
          "volumefrom": 144558842.59,
          "volumeto": 1707836.93,
          "close": 0.01207
        },
        {
          "time": 1537056000,
          "high": 0.0129,
          "low": 0.01083,
          "open": 0.01203,
          "volumefrom": 131645999,
          "volumeto": 1573598.96,
          "close": 0.01219
        },
        {
          "time": 1537315200,
          "high": 0.01481,
          "low": 0.01152,
          "open": 0.01222,
          "volumefrom": 134166558.72,
          "volumeto": 1708058.69,
          "close": 0.01332
        },
        {
          "time": 1537574400,
          "high": 0.0137,
          "low": 0.01198,
          "open": 0.01323,
          "volumefrom": 106066131.47,
          "volumeto": 1324047.41,
          "close": 0.01205
        },
        {
          "time": 1537833600,
          "high": 0.01333,
          "low": 0.01172,
          "open": 0.01178,
          "volumefrom": 90126630.53,
          "volumeto": 1119722.3,
          "close": 0.01277
        },
        {
          "time": 1538092800,
          "high": 0.01457,
          "low": 0.01228,
          "open": 0.01267,
          "volumefrom": 172390176.13,
          "volumeto": 2215531.11,
          "close": 0.01285
        },
        {
          "time": 1538352000,
          "high": 0.01494,
          "low": 0.01279,
          "open": 0.01279,
          "volumefrom": 232705374.69,
          "volumeto": 3241464.91,
          "close": 0.0135
        },
        {
          "time": 1538611200,
          "high": 0.01608,
          "low": 0.01353,
          "open": 0.01369,
          "volumefrom": 157427112.48,
          "volumeto": 2304074.83,
          "close": 0.01503
        },
        {
          "time": 1538870400,
          "high": 0.01584,
          "low": 0.01439,
          "open": 0.01498,
          "volumefrom": 79383569.94,
          "volumeto": 1178733.23,
          "close": 0.01452
        },
        {
          "time": 1539129600,
          "high": 0.01481,
          "low": 0.01304,
          "open": 0.01441,
          "volumefrom": 123934468.92,
          "volumeto": 1721844.22,
          "close": 0.014
        },
        {
          "time": 1539388800,
          "high": 0.02103,
          "low": 0.01404,
          "open": 0.01404,
          "volumefrom": 343503074.77,
          "volumeto": 5776625.01,
          "close": 0.01752
        },
        {
          "time": 1539648000,
          "high": 0.01916,
          "low": 0.01518,
          "open": 0.01751,
          "volumefrom": 226854445.39,
          "volumeto": 3795720.69,
          "close": 0.01564
        },
        {
          "time": 1539907200,
          "high": 0.01745,
          "low": 0.01533,
          "open": 0.01559,
          "volumefrom": 136149164.04,
          "volumeto": 2236111.87,
          "close": 0.0168
        },
        {
          "time": 1540166400,
          "high": 0.01773,
          "low": 0.01575,
          "open": 0.01673,
          "volumefrom": 152824468.06,
          "volumeto": 2568730.04,
          "close": 0.01671
        },
        {
          "time": 1540425600,
          "high": 0.02217,
          "low": 0.01609,
          "open": 0.01661,
          "volumefrom": 956011912.35,
          "volumeto": 18227907.67,
          "close": 0.0174
        },
        {
          "time": 1540684800,
          "high": 0.02828,
          "low": 0.01728,
          "open": 0.01741,
          "volumefrom": 1877384634.29,
          "volumeto": 39586055.22,
          "close": 0.01886
        },
        {
          "time": 1540944000,
          "high": 0.02174,
          "low": 0.01858,
          "open": 0.01896,
          "volumefrom": 364813737.31,
          "volumeto": 7237743.17,
          "close": 0.02014
        },
        {
          "time": 1541203200,
          "high": 0.02021,
          "low": 0.01705,
          "open": 0.02021,
          "volumefrom": 194859355.47,
          "volumeto": 3586438.33,
          "close": 0.0175
        },
        {
          "time": 1541462400,
          "high": 0.01902,
          "low": 0.01639,
          "open": 0.0175,
          "volumefrom": 299315271.03,
          "volumeto": 5355601.05,
          "close": 0.01844
        },
        {
          "time": 1541721600,
          "high": 0.01856,
          "low": 0.01716,
          "open": 0.01824,
          "volumefrom": 104244363.79,
          "volumeto": 1835074.64,
          "close": 0.01762
        },
        {
          "time": 1541980800,
          "high": 0.01881,
          "low": 0.01303,
          "open": 0.01753,
          "volumefrom": 199337378.17,
          "volumeto": 3184392.27,
          "close": 0.01389
        },
        {
          "time": 1542240000,
          "high": 0.01384,
          "low": 0.01231,
          "open": 0.01367,
          "volumefrom": 100236799.45,
          "volumeto": 1325548.36,
          "close": 0.0132
        },
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
          "high": 0.00701,
          "low": 0.006792,
          "open": 0.006864,
          "volumefrom": 22987195.2,
          "volumeto": 157784.11,
          "close": 0.006858
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

    const height = 370;
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

    return (
      <div style={boxStyles}>
        <svg height={height} width={width}>
          <defs>
            <linearGradient id="MyGradient">
              <stop offset="-10%" stop-color="#317c70" />
              <stop offset="95%" stop-color="#00d1b2" />
            </linearGradient>
          </defs>

          <g id={"xAxis"}>
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
      </div>
    );
  }
}
