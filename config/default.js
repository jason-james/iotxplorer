/* eslint-disable no-process-env */
import process from "global/process";

require("dotenv").config();

module.exports = {
  project: "iotex-explorer",
  env: "development",
  server: {
    protocol: "http:",
    host: "localhost",
    port: process.env.PORT || 4004,
    staticDir: "./dist",
    routePrefix: "/"
  },
  gateways: {
    logger: {
      enabled: true,
      baseDir: "/var/log/",
      topicName: "iotex-explorer",
      level: "debug",
      kafka: {
        leafHost: "localhost",
        leafPort: 9093
      }
    },
    walletCore: {
      serverUrl: process.env.IOTEX_WALLET_URL || "localhost:42124"
    },
    iotexAntenna: "35.197.200.233:14014"
    // iotexAntenna: process.env.IOTEX_CORE_URL || "35.239.122.109:80"
  },
  analytics: {
    googleTid: process.env.GOOGLE_TID || "UA-XXXXXXXXX-1"
  },
  chains: JSON.parse(
    process.env.CHAINS ||
      '[{"id":1,"name":"mainchain","url":"http://localhost:4004/"},{"id":2,"name":"subchain","url":"http://localhost:4005/"}]'
  ),
  csp: {
    "default-src": ["none"],
    "manifest-src": ["self"],
    "style-src": [
      "self",
      "unsafe-inline",
      "http://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css",
      "http://fonts.googleapis.com/css",
      "http://use.fontawesome.com/releases/v5.0.9/css/all.css",
      "http://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
    ],
    "frame-src": ["https://www.youtube.com/", "https://s.tradingview.com/"],
    "connect-src": ["self"],
    "child-src": ["self"],
    "font-src": [
      "self",
      "data:",
      "https://fonts.gstatic.com/s/",
      "https://use.fontawesome.com/releases/v5.0.9/webfonts/"
    ],
    "img-src": ["*"],
    "media-src": ["self"],
    "object-src": ["self"],
    "script-src": [
      "self",
      "unsafe-eval",
      "https://s3.tradingview.com/tv.js",
      "https://use.fontawesome.com/releases/v5.0.9/js/all.js",
      "https://www.google-analytics.com/analytics.js",
      "https://d3js.org/d3.v4.min.js",
      "https://ethereum.github.io/solc-bin/bin/",
      "https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"
    ]
  }
};
