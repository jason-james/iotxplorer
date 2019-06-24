import React from "react";

import { RouterContext } from "react-router";
import { Provider } from "react-redux";
import { Provider as StyleProvider } from "styletron-react";

export function RootServer({ store, renderProps, styletron }) {
  return (
    <Provider store={store}>
      <StyleProvider styletron={styletron}>
        <RouterContext {...renderProps} />
      </StyleProvider>
    </Provider>
  );
}
