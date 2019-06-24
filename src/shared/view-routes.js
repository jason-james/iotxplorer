import React from "react";
import { Route, IndexRoute } from "react-router";
import window from "global/window";
import { AppContainer } from "./app-container";
import { NotFound } from "./common/not-found";
import { BlockchainExplorerContainer } from "./blockchain-explorer/blockchain-explorer-container";
import { AddressContainer } from "./address/address-container";
import { BlockContainer } from "./block/block-container";
import { BlocksContainer } from "./blocks/blocks-container";
import {
  SITE_URL,
  BLOCK,
  BLOCKS,
  ADDRESS,
  STAKING,
  STAKING_DASHBOARD,
  HOW_TO_STAKE,
  EDUCATION,
  ACTION,
  DELEGATES
} from "./common/site-url";
import { StakingContainer } from "./staking/staking-container";
import { StakingDashboardContainer } from "./staking-dashboard/staking-dashboard-container";
import { HowToStakeContainer } from "./staking-dashboard/staking-voting/how-to-stake-container";
import { EducationContainer } from "./education/education-container";
import { UnderstandingIoTeXContainer } from "./education/understanding-iotex/understanding-iotex-container";
import { UsingTheTestnetContainer } from "./education/using-the-testnet/using-the-testnet-container";
import { VotingAndDelegatingContainer } from "./education/voting-and-delegating/voting-and-delegating-container";
import { CalculatorsContainer } from "./staking-dashboard/calculators/staking-calcs-container";
import { ActionContainer } from "./action/action-container";
import { DelegatesContainer } from "./delegates/delegates-container";

export function createViewRoutes(routePrefix = "/") {
  return (
    <Route onEnter={onEnter} path={routePrefix} component={AppContainer}>
      <IndexRoute onEnter={onEnter} component={BlockchainExplorerContainer} />

      <RoutePage path={BLOCKS.INDEX} component={BlocksContainer} />

      <RoutePage path={BLOCK.INDEX} component={BlockContainer} />

      <RoutePage path={ADDRESS.INDEX} component={AddressContainer} />

      <RoutePage path={STAKING.INDEX} component={StakingContainer} />

      <RoutePage
        path={STAKING_DASHBOARD.INDEX}
        component={StakingDashboardContainer}
      />

      <RoutePage path={HOW_TO_STAKE.INDEX} component={HowToStakeContainer} />

      <RoutePage path={EDUCATION.INDEX} component={EducationContainer} />

      <RoutePage
        path={EDUCATION.UNDERSTANDING_IOTEX}
        component={UnderstandingIoTeXContainer}
      />

      <RoutePage
        path={EDUCATION.USING_THE_TESTNET}
        component={UsingTheTestnetContainer}
      />

      <RoutePage
        path={EDUCATION.VOTING_AND_DELEGATING}
        component={VotingAndDelegatingContainer}
      />

      <RoutePage
        path={STAKING_DASHBOARD.CALCULATORS}
        component={CalculatorsContainer}
      />

      <RoutePage path={ACTION.INDEX} component={ActionContainer} />

      <RoutePage path={DELEGATES.INDEX} component={DelegatesContainer} />

      <RoutePage component={NotFound} />
    </Route>
  );
}

function RoutePage(props) {
  return <Route onEnter={onEnter} {...props} />;
}

function onEnter() {
  // eslint-disable-next-line no-unused-expressions
  window && window.ga && window.ga("send", "pageview");
  scrollTop();
}

function scrollTop() {
  if (window && window.scrollTo) {
    window.scrollTo(0, 0);
  }
}
