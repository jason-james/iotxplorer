import Component from "inferno-component";
import { cloneVNode } from "inferno-clone-vnode";
import { Children } from "inferno-compat";

export class ChartistGraph extends Component {
  componentWillReceiveProps(newProps) {
    this.updateChart(newProps);
  }

  componentWillUnmount() {
    if (this.chartist) {
      try {
        this.chartist.detach();
      } catch (err) {
        throw new Error("Internal chartist error", err);
      }
    }
  }

  componentDidMount() {
    this.updateChart(this.props);
  }

  updateChart(config) {
    let Chartist = require("chartist");

    let { type, data } = config;
    let options = config.options || {};
    let responsiveOptions = config.responsiveOptions || [];
    let event;

    if (this.chartist) {
      this.chartist.update(data, options, responsiveOptions);
    } else {
      this.chartist = new Chartist[type](
        this.chart,
        data,
        options,
        responsiveOptions
      );

      if (config.listener) {
        for (event in config.listener) {
          if (config.listener.hasOwnProperty(event)) {
            this.chartist.on(event, config.listener[event]);
          }
        }
      }
    }

    return this.chartist;
  }

  render() {
    const { className, style, children, data, type } = this.props;
    const childrenWithProps =
      children &&
      Children.map(children, child =>
        cloneVNode(child, {
          type,
          data
        })
      );
    return (
      <div
        className={`ct-chart ${className || ""}`}
        ref={ref => (this.chart = ref)}
        style={style}
      >
        {childrenWithProps}
      </div>
    );
  }
}
