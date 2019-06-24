// @flow

import { combineReducers } from "redux";
import block from "../../block/block-reducer";
import blocks from "../../blocks/blocks-reducer";
import address from "../../address/address-reducer";
import nav from "../nav/nav-reducer";
import app from "../../app-container";
import consensus from "../../consensus-metrics/consensus-metrics-reducer";
import delegates from "../../delegates/delegates-reducer";
import marketDashboard from "../../blockchain-explorer/market-dashboard-reducer";
import lineChart from "../../blockchain-explorer/line-chart-reducer";
import stakingDashboard from "../../staking-dashboard/staking-dashboard-reducer";
import action from "../../action/action-reducer";

export type Reducer = (state: any, action: any) => any;

export function noopReducer(state: any = {}, action: any) {
  return state;
}

export const rootReducer = combineReducers({
  base: noopReducer,
  nav,
  marketDashboard,
  lineChart,
  stakingDashboard,
  app,
  block,
  blocks,
  address,
  consensus,
  delegates,
  action
});
