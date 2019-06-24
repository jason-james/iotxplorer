import React, { Component } from "react";
import decamelize from "decamelize";
import { get } from "dottie";
import { fromRau } from "iotex-client-js/dist/account/utils";
import { Link } from "react-router";
import { publicKeyToAddress } from "iotex-antenna/lib/crypto/crypto";
import isBrowser from "is-browser";
import { Helmet } from "react-helmet";
import { SuggestGasPriceRequest } from "iotex-antenna/protogen/proto/api/api_pb";
import { t } from "../../lib/iso-i18n";
import { ToolTip } from "../common/tooltip";
import { fromNow } from "../common/from-now";
import { CommonMargin } from "../common/common-margin";
import { EmptyMessage, ErrorMessage, LoadingMessage } from "../common/message";
import type { Error } from "../../../src/entities/common-types";
import { SingleItemTable } from "../common/single-item-table";

export class Action extends Component {
  render() {
    return (
      <div className='column container'>
        <Helmet title={`${t("action.title")} - iotxplorer`} />
        <div>
          <h1 className='title'>{t("action.title")}</h1>
          <TransferSummary
            fetching={this.props.state.fetching}
            action={this.props.state.actionInfo}
            receipt={this.props.state.receipt}
            price={this.props.price}
            error={this.props.state.error}
            id={this.props.params.id}
            fetchAction={this.props.fetchAction}
            fetchActionReceipt={this.props.fetchActionReceipt}
          />
        </div>
        <CommonMargin />
      </div>
    );
  }
}

export class TransferSummary extends Component {
  componentDidMount() {
    if (isBrowser) {
      this.props.fetchAction({
        byHash: {
          actionHash: this.props.id,
          checkingPending: false
        }
      });

      this.props.fetchActionReceipt({ actionHash: this.props.id });
    }
  }

  buildKeyValueArray = object => {
    return Object.keys(object).map(key => {
      if (typeof object[key] === "object") {
        return {
          key,
          value: <pre>{JSON.stringify(object[key], null, 2)}</pre>
        };
      }
      return {
        key,
        value: object[key]
      };
    });
  };

  getActionType = info => {
    const actionsTypes = [
      "execution",
      "grantReward",
      "transfer",
      "depositToRewardingFund",
      "claimFromRewardingFund",
      "startSubChain",
      "stopSubChain",
      "putBlock",
      "createDeposit",
      "settleDeposit",
      "createPlumChain",
      "terminatePlumChain",
      "plumPutBlock",
      "plumCreateDeposit",
      "plumStartExit",
      "plumChallengeExit",
      "plumResponseChallengeExit",
      "plumFinalizeExit",
      "plumSettleDeposit",
      "plumTransfer",
      "putPollResult"
    ];

    for (let i = 0; i < actionsTypes.length; i++) {
      if (get(info, `action.core.${actionsTypes[i]}`)) {
        return decamelize(actionsTypes[i], " ");
      }
    }
    return "";
  };

  render() {
    let rows = [];
    const actionType = this.getActionType(this.props.action[0]);
    const action = this.props.action;
    if (this.props.fetching || !action[0] || !this.props.price) {
      return <LoadingMessage fakeRows={false} />;
    }
    if (this.props.error) {
      return <ErrorMessage error={this.props.error} />;
    }
    if (!action) {
      return <EmptyMessage item={t("meta.transfer")} />;
    }

    const pubkey = Buffer.from(action[0].action.senderPubKey).toString("Hex");
    var address = publicKeyToAddress(pubkey);

    if (actionType === "grantReward") {
      rows = [
        {
          c1: "Action Hash",
          c2: action[0].actHash
        },
        {
          c1: "Block Hash",
          c2: (
            <Link to={`/blocks/${action[0].blkHash}`} className='link'>
              {action[0].blkHash}
            </Link>
          )
        },
        {
          c1: "Sender",
          c2: (
            <Link to={`/address/${address}`} className='link'>
              {address}
            </Link>
          )
        },
        {
          c1: "Timestamp",
          c2: fromNow(action[0].timestamp.seconds)
        },
        {
          c1: "Gas Price",
          c2: action[0].action.core.gasPrice
        },
        {
          c1: "Gas Limit",
          c2: action[0].action.core.gasLimit
        },
        {
          c1: "Type",
          c2: action[0].action.core.action
        }
      ];
    } else if (actionType === "transfer") {
      rows = [
        {
          c1: "Action Hash",
          c2: action[0].actHash
        },
        {
          c1: "Block Hash",
          c2: (
            <Link to={`/blocks/${action[0].blkHash}`} className='link'>
              {action[0].blkHash}
            </Link>
          )
        },
        {
          c1: "From",
          c2: (
            <Link to={`/address/${address}`} className='link'>
              {address}
            </Link>
          )
        },
        {
          c1: "Amount",
          c2: `${fromRau(action[0].action.core.transfer.amount)} ⬡`
        },
        {
          c1: "To",
          c2: (
            <Link
              to={`/address/${action[0].action.core.transfer.recipient}`}
              className='link'
            >
              {action[0].action.core.transfer.recipient}
            </Link>
          )
        },
        {
          c1: "Timestamp",
          c2: fromNow(action[0].timestamp.seconds)
        },
        {
          c1: "Gas Price",
          c2: `${fromRau(action[0].action.core.gasPrice, "Qev")} Qev`
        },
        {
          c1: "Gas Limit",
          c2: `${action[0].action.core.gasLimit} Rau`
        },
        {
          c1: "Type",
          c2: action[0].action.core.action
        },
        {
          c1: "Payload",
          c2: (
            <pre>
              <code>
                {Buffer.from(action[0].action.core.transfer.payload).toString(
                  "Hex"
                ) || "[]"}
              </code>
            </pre>
          )
        }
      ];
    } else if (actionType === "execution") {
      rows = [
        {
          c1: "Action Hash",
          c2: action[0].actHash
        },
        {
          c1: "Block Hash",
          c2: (
            <Link to={`/blocks/${action[0].blkHash}`} className='link'>
              {action[0].blkHash}
            </Link>
          )
        },
        {
          c1: "From",
          c2: (
            <Link to={`/address/${address}`} className='link'>
              {address}
            </Link>
          )
        },
        {
          c1: "Amount",
          c2: `${fromRau(action[0].action.core.execution.amount)} ⬡`
        },
        {
          c1: "To",
          c2: (
            <div>
              Contract{" "}
              <Link
                to={`/address/${action[0].action.core.execution.contract}`}
                className='link'
              >
                {action[0].action.core.execution.contract}
              </Link>
            </div>
          )
        },
        {
          c1: "Timestamp",
          c2: fromNow(action[0].timestamp.seconds)
        },
        {
          c1: "Gas Price",
          c2: `${fromRau(action[0].action.core.gasPrice, "Qev")} Qev`
        },
        {
          c1: "Gas Limit",
          c2: `${action[0].action.core.gasLimit} Rau`
        },
        {
          c1: "Type",
          c2: action[0].action.core.action
        },
        {
          c1: "Payload",
          c2: (
            <pre>
              <code>
                {Buffer.from(action[0].action.core.execution.data).toString(
                  "Hex"
                ) || "[]"}
              </code>
            </pre>
          )
        }
      ];
    } else {
      rows = [
        {
          c1: "Action Hash",
          c2: action[0].actHash
        },
        {
          c1: "Block Hash",
          c2: (
            <Link to={`/blocks/${action[0].blkHash}`} className='link'>
              {action[0].blkHash}
            </Link>
          )
        },
        {
          c1: "Sender",
          c2: (
            <Link to={`/address/${address}`} className='link'>
              {address}
            </Link>
          )
        },
        {
          c1: "Timestamp",
          c2: fromNow(action[0].timestamp.seconds)
        },
        {
          c1: "Gas Price",
          c2: action[0].action.core.gasPrice
        },
        {
          c1: "Gas Limit",
          c2: action[0].action.core.gasLimit
        },
        {
          c1: "Type",
          c2: action[0].action.core.action
        }
      ];
    }

    if (actionType === "execution") {
      let receiptRows = [
        {
          c1: "Status",
          c2:
            this.props.receipt.status === "1" ? (
              <span className='tag is-success is-medium'>Successful</span>
            ) : (
              <span className='tag is-danger is-medium'>Failed</span>
            )
        },
        {
          c1: "Block Height",
          c2: this.props.receipt.blkHeight
        },
        {
          c1: "Gas Fee",
          c2: (
            <div>
              {this.props.receipt.gasConsumed / 1e6} ⬡
              <br />
              <div style={{ fontSize: "10pt", color: "#00d1b2" }}>
                $
                {(
                  (this.props.price.usd * this.props.receipt.gasConsumed) /
                  1e6
                ).toFixed(4)}
              </div>
            </div>
          )
        }
      ];

      return (
        <div>
          <SingleItemTable subtitle={this.props.id} rows={rows} />
          <SingleItemTable subtitle='Receipt' rows={receiptRows} />
        </div>
      );
    } else {
      return <SingleItemTable subtitle={this.props.id} rows={rows} />;
    }
  }
}
