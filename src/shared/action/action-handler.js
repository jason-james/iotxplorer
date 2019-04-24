import {createViewRoutes} from '../view-routes';
import {rootReducer} from '../common/root/root-reducer';
import {ACTION} from '../common/site-url';

export function setActionRoutes(server) {
  function actionHandler(ctx, next) {
    ctx.isoRender({
      vDom: createViewRoutes(server.routePrefix()),
      reducer: rootReducer,
      clientScript: '/main.js',
    });
  }

  const {
    gateways: {RpcMethod},
  } = server;

  async function getAction(ctx, next) {
    try {
      const response = await RpcMethod.getActions({
        byHash: {
          actionHash: ctx.request.body.byHash.actionHash,
          checkingPending: false,
        },
      });
      const actionInfo = response.actionInfo;
      ctx.body = {
        ok: true,
        actionInfo,
      };
    } catch (error) {
      ctx.body = {
        ok: false,
        error: {code: 'FAIL_GET_ACTION', message: 'action.error.fail'},
      };
    }
  }

  server.get('action', ACTION.INDEX, actionHandler);
  server.post('getAction', ACTION.GET, getAction);
}

const FULL_ACTION_INFO = `
  actionInfo {
    actHash
    blkHash
    action {
      core {
        version
        nonce
        gasLimit
        gasPrice
        transfer {
          amount
          recipient
          payload
        }
        execution {
          amount
          contract
          data
        }
        startSubChain{
          chainID
          securityDeposit
          operationDeposit
          startHeight
          parentHeightOffset
        }
        stopSubChain {
          chainID
          stopHeight
          subChainAddress
        }
        putBlock{
          subChainAddress
          height
          roots{
            name
            value
          }
        }
        createDeposit{
          chainID
          amount
          recipient
        }
        settleDeposit{
          amount
          recipient
          index
        }
        createPlumChain{
          TBD
        }
        terminatePlumChain{
          subChainAddress
        }
        plumPutBlock{
          subChainAddress
          height
          roots
        }
        plumCreateDeposit{
          subChainAddress
          amount
          recipient
        }
        plumStartExit{
          subChainAddress
          previousTransfer
          previousTransferBlockProof
          previousTransferBlockHeight
          exitTransfer
          exitTransferBlockProof
          exitTransferBlockHeight
        }
        plumChallengeExit{
          subChainAddress
          coinID
          challengeTransfer
          challengeTransferBlockProof
          challengeTransferBlockHeight
        }
        plumResponseChallengeExit{
          subChainAddress
          coinID
          challengeTransfer
          responseTransfer
          responseTransferBlockProof
          previousTransferBlockHeight
        }
        plumFinalizeExit{
          subChainAddress
          coinID
        }
        plumSettleDeposit{
          coinID
        }
        plumTransfer{
          coinID
          denomination
          owner
          recipient
        }
        depositToRewardingFund{
          amount
          data
        }
        claimFromRewardingFund{
          amount
          data
        }
        grantReward{
          type
        }
        putPollResult{
          height
          candidates{
            candidates{
              address
              votes
              pubKey
              rewardAddress
            }
          }
        }
      }
      signature
      senderPubKey
    }
  }
`;
