import { createViewRoutes } from "../view-routes";
import { rootReducer } from "../common/root/root-reducer";
import { ADDRESS } from "../common/site-url";

export function setAddressRoutes(server) {
  const {
    gateways: { RpcMethod }
  } = server;

  function addressHandler(ctx, next) {
    ctx.isoRender({
      vDom: createViewRoutes(server.routePrefix()),
      reducer: rootReducer,
      clientScript: "/main.js"
    });
  }

  async function getAddressId(ctx, next) {
    const { id } = ctx.request.body;

    try {
      ctx.body = { ok: true, address: await iotexCore.getAddressDetails(id) };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: {
          code: "FAIL_GET_ADDRESS",
          message: "address.error.failGetAddress",
          data: { id }
        }
      };
    }
  }

  async function getAddressExecutionsId(ctx, next) {
    try {
      ctx.body = {
        ok: true,
        executions: await iotexCore.getExecutionsByAddress(
          ctx.request.body.id,
          ctx.request.body.offset,
          ctx.request.body.count
        ),
        offset: ctx.request.body.offset,
        count: ctx.request.body.count
      };
    } catch (error) {
      ctx.body = { ok: false, error };
    }
  }

  async function getAddressTransfersId(ctx, next) {
    const { id, offset, count } = ctx.request.body;

    try {
      ctx.body = {
        ok: true,
        transfers: await iotexCore.getTransfersByAddress(id, offset, count),
        offset: ctx.request.body.offset,
        count: ctx.request.body.count
      };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: {
          code: "FAIL_GET_ADDRESS_TRANSFERS",
          message: "address.error.failGetTransfers",
          data: { id }
        }
      };
    }
  }

  function cleanVotes(votes) {
    const res = [];
    if (votes) {
      let prevId = "";
      for (let i = 0; i < votes.length; i++) {
        if (votes[i] !== undefined) {
          if (prevId !== votes[i].id) {
            votes[i].out = true;
          }
          prevId = votes[i].id;
          res.push(votes[i]);
        }
      }
    }
    return res;
  }

  async function getAddressSettleDepositsId(ctx, next) {
    const { id, offset, count } = ctx.request.body;

    try {
      ctx.body = {
        ok: true,
        settleDeposits: await iotexCore.getSettleDepositsByAddress(
          id,
          offset,
          count
        ),
        offset: ctx.request.body.offset,
        count: ctx.request.body.count
      };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: {
          code: "FAIL_GET_SETTLE_DEPOSITS",
          message: "address.error.failGetSettleDeposits",
          data: { id }
        }
      };
    }
  }

  async function getAddressCreateDepositsId(ctx, next) {
    const { id, offset, count } = ctx.request.body;

    try {
      ctx.body = {
        ok: true,
        createDeposits: await iotexCore.getCreateDepositsByAddress(
          id,
          offset,
          count
        ),
        offset: ctx.request.body.offset,
        count: ctx.request.body.count
      };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: {
          code: "FAIL_GET_CREATE_DEPOSITS",
          message: "address.error.failGetCreateDeposits",
          data: { id }
        }
      };
    }
  }

  async function getAddressVotersId(ctx, next) {
    const { id, offset, count } = ctx.request.body;

    try {
      const votes = await iotexCore.getVotesByAddress(id, offset, count);
      ctx.body = {
        ok: true,
        voters: cleanVotes(votes),
        offset,
        count
      };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: {
          code: "FAIL_GET_ADDRESS_VOTES",
          message: "address.error.failGetVotes",
          data: { id }
        }
      };
    }
  }

  async function getAccount(ctx, next) {
    try {
      const response = await RpcMethod.getAccount({
        address: ctx.request.body.address
      });
      const account = response.accountMeta;
      ctx.body = {
        ok: true,
        account,
        address: ctx.request.body.address
      };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: { code: "FAIL_GET_ACCOUNT", message: "account.error.fail" }
      };
    }
  }

  async function getActionsByAddress(ctx, next) {
    try {
      const response = await RpcMethod.getActions({
        byAddr: {
          address: ctx.request.body.address,
          count: ctx.request.body.count,
          start: ctx.request.body.start
        }
      });
      const actions = response.actionInfo;
      ctx.body = {
        ok: true,
        actions,
        address: ctx.request.body.address,
        count: ctx.request.body.count,
        start: ctx.request.body.start
      };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: { code: "FAIL_GET_ACTIONS", message: "actions.error.fail" }
      };
    }
  }

  const routes = [
    {
      method: "get",
      name: "address",
      endPoint: ADDRESS.INDEX,
      handler: addressHandler
    },
    {
      method: "post",
      name: "getAccount",
      endPoint: ADDRESS.GET_ADDRESS,
      handler: getAccount
    },
    {
      method: "post",
      name: "getActionsAddress",
      endPoint: ADDRESS.GET_ACTIONS,
      handler: getActionsByAddress
    },
    {
      method: "post",
      name: "getAddressTransfersId",
      endPoint: ADDRESS.GET_TRANSFERS,
      handler: getAddressTransfersId
    },
    {
      method: "post",
      name: "getAddressExecutionsId",
      endPoint: ADDRESS.GET_EXECUTIONS,
      handler: getAddressExecutionsId
    },
    {
      method: "post",
      name: "getAddressVotersId",
      endPoint: ADDRESS.GET_VOTERS,
      handler: getAddressVotersId
    },
    {
      method: "post",
      name: "getAddressSettleDepositsId",
      endPoint: ADDRESS.GET_SETTLE_DEPOSITS,
      handler: getAddressSettleDepositsId
    },
    {
      method: "post",
      name: "getAddressCreateDepositsId",
      endPoint: ADDRESS.GET_CREATE_DEPOSITS,
      handler: getAddressCreateDepositsId
    }
  ];

  routes.map(route => {
    if (route.method === "get") {
      server.get(route.name, route.endPoint, route.handler);
    } else if (route.method === "post") {
      server.post(route.name, route.endPoint, route.handler);
    }
  });
}
