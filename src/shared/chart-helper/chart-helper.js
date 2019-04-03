import Component from "inferno-component";
import { cloneVNode } from "inferno-clone-vnode";
import { Children } from "inferno-compat";

export class ChartistGraph extends Component {
  componentWillReceiveProps(newProps) {
    this.updateChart(newProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps;
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

export const BarStyles = {
  BARS: "0",
  CANDLES: "1",
  HOLLOW_CANDLES: "9",
  HEIKIN_ASHI: "8",
  LINE: "2",
  AREA: "3",
  RENKO: "4",
  LINE_BREAK: "7",
  KAGI: "5",
  POINT_AND_FIGURE: "6"
};

export const IntervalTypes = {
  D: "D",
  W: "W"
};

export const RangeTypes = {
  YTD: "ytd",
  ALL: "all"
};

export const Themes = {
  LIGHT: "Light",
  DARK: "Dark"
};

const SCRIPT_ID = "tradingview-widget-script";
const CONTAINER_ID = "tradingview-widget";

export class TradingViewWidget extends Component {
  static defaultProps = {
    allow_symbol_change: true,
    autosize: false,
    enable_publishing: false,
    height: 610,
    hideideas: true,
    hide_legend: false,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    interval: IntervalTypes.D,
    locale: "en",
    save_image: true,
    show_popup_button: false,
    style: BarStyles.HEIKIN_ASHI,
    theme: Themes.LIGHT,
    timezone: "Etc/UTC",
    toolbar_bg: "#F1F3F6",
    widgetType: "widget",
    width: 980,
    withdateranges: false
  };

  containerId = `${CONTAINER_ID}-${Math.random()}`;

  componentDidMount = () => this.appendScript(this.initWidget);

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentDidUpdate = () => {
    this.cleanWidget();
    this.initWidget();
  };

  canUseDOM = () =>
    !!(
      typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
    );

  appendScript = onload => {
    if (!this.canUseDOM()) {
      onload();
      return;
    }

    if (this.scriptExists()) {
      /* global TradingView */
      if (typeof TradingView === "undefined") {
        this.updateOnloadListener(onload);
        return;
      }
      onload();
      return;
    }
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://s3.tradingview.com/tv.js";
    script.onload = onload;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  getScriptElement = () => document.getElementById(SCRIPT_ID);

  scriptExists = () => this.getScriptElement() !== null;

  updateOnloadListener = onload => {
    const script = this.getScriptElement();
    const oldOnload = script.onload;
    return (script.onload = () => {
      oldOnload();
      onload();
    });
  };

  initWidget = () => {
    /* global TradingView */
    if (typeof TradingView === "undefined") return;

    const { widgetType, ...widgetConfig } = this.props;
    const config = { ...widgetConfig, container_id: this.containerId };

    if (config.autosize) {
      delete config.width;
      delete config.height;
    }

    if (typeof config.interval === "number") {
      config.interval = config.interval.toString();
    }

    if (config.popup_width && typeof config.popup_width === "number") {
      config.popup_width = config.popup_width.toString();
    }

    if (config.popup_height && typeof config.popup_height === "number") {
      config.popup_height = config.popup_height.toString();
    }

    /* global TradingView */
    new TradingView[widgetType](config);
  };

  cleanWidget = () => {
    if (!this.canUseDOM()) return;
    document.getElementById(this.containerId).innerHTML = "";
  };

  getStyle = () => {
    if (!this.props.autosize) return {};
    return {
      width: "100%",
      height: "100%"
    };
  };

  render = () => <article id={this.containerId} style={this.getStyle()} />;
}
