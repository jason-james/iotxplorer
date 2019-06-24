import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { Provider as StyleProvider } from "styletron-react";
import createBrowserHistory from "history/lib/createBrowserHistory";

export const browserHistory = createBrowserHistory();

export function RootBrowser({ store, children, styletron }) {
  return (
    <StyleProvider value={styletron}>
      <Provider store={store}>
        <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
          {children}
        </Router>
      </Provider>
    </StyleProvider>
  );
}
