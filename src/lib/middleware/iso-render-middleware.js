// @flow
import React from "react";
import { match } from "react-router";
import JsonGlobals from "safe-json-globals";
import { Server as StyletronServer } from "styletron-engine-atomic";
import { renderToString } from "react-dom/server";
import type { Server } from "../server";
import { configureStore } from "../../shared/common/root/configure-store";
import { initAssetURL } from "../asset-url";
import { initServerI18n } from "../iso-i18n";
import { rootHtml } from "../../shared/common/root/root-html";
import { RootServer } from "../../shared/common/root/root-server";
import { initServerConsent } from "./consent-cookie";
import { createViewRoutes } from "../../shared/view-routes";

export function isoRenderMiddleware(server: Server): any {
  return async (ctx, next) => {
    ctx.isoRender = ({ vDom, reducer, clientScript }) => {
      const routes = vDom;
      const renderProps = match(
        { routes, location: ctx.url },
        (err, redirectLocation, renderProps) => {
          if (err) {
            res.status(500).send(error.message);
          } else if (redirectLocation) {
            res.redirect(
              302,
              redirectLocation.pathname + redirectLocation.search
            );
          }
        }
      );
      ctx.body = html(ctx, renderProps, reducer, clientScript);
    };
    await next();
  };
}

function html(ctx, renderProps, reducer, clientScript): string {
  initServerI18n(ctx);
  initServerConsent(ctx);
  const state = ctx.getState();
  const jsonGlobals = JsonGlobals({ state });
  initAssetURL(state.base.siteURL, state.base.routePrefix, state.base.manifest);
  const store = configureStore(state, reducer);
  const styletron = new StyletronServer({ prefix: "_" });

  const reactMarkup = renderToString(
    <RootServer store={store} renderProps={renderProps} styletron={styletron} />
  );
  return rootHtml({
    styletron,
    jsonGlobals,
    reactMarkup,
    clientScript,
    nonce: ctx.state.nonce
  });
}
