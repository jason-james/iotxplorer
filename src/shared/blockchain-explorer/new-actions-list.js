import React, { Component } from "react";
import { publicKeyToAddress } from "iotex-antenna/lib/crypto/crypto";
import TimeAgo from "react-timeago";
import { LoadingMessage } from "../common/message";
import { Link } from "react-router";
import { fromRau } from "iotex-client-js/dist/account/utils";
import { get } from "dottie";
import decamelize from "decamelize";

export class NewActionsList extends Component {
  render() {
    return (
      <div className='card'>
        <header className='card-header'>
          <p className='card-header-title'>Recent Actions</p>
        </header>
        <div className='card-content' style={{ marginBottom: "-18px" }}>
          <RecentAction actions={this.props.actions} />
        </div>
        <hr />
      </div>
    );
  }
}

export class RecentAction extends Component {
  formatTime = timeAgo => {
    if (timeAgo.contains("seconds")) {
      let myString = timeAgo;
      myString = myString.substring(0, myString.indexOf("s") + 1);
      return myString;
    }
    if (timeAgo.contains("minutes")) {
      let myString = timeAgo;
      myString = myString.substring(0, myString.indexOf("m") + 1);
      return myString;
    }
  };

  getAddress = ActionInfo => {
    const addr =
      get(ActionInfo, "action.core.transfer.recipient") ||
      get(ActionInfo, "action.core.execution.contract") ||
      get(ActionInfo, "action.core.createDeposit.recipient") ||
      get(ActionInfo, "action.core.settleDeposit.recipient") ||
      get(ActionInfo, "action.core.plumCreateDeposit.recipient") ||
      get(ActionInfo, "action.core.plumTransfer.recipient") ||
      get(ActionInfo, "action.core.createPlumChain.contract") ||
      "";
    if (!addr) {
      return ["-", "-"];
    }
    return [addr, `${addr.substr(0, 9)}..`];
  };

  getAmount = ActionInfo => {
    const amount =
      get(ActionInfo, "action.core.execution.amount") ||
      get(ActionInfo, "action.core.grantReward.amount") ||
      get(ActionInfo, "action.core.transfer.amount") ||
      get(ActionInfo, "action.core.createDeposit.amount") ||
      get(ActionInfo, "action.core.settleDeposit.amount") ||
      get(ActionInfo, "action.core.createPlumChain.amount") ||
      get(ActionInfo, "action.core.plumCreateDeposit.amount") ||
      "";
    if (!amount) {
      return "-";
    }
    return `${Number(fromRau(amount, "IOTX")).toFixed(2)} ⬡`;
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

  getIcon = actionType => {
    if (actionType === "grant reward") {
      return <i className='fas fa-coins' style={{ fontSize: "28px" }} />;
    } else if (actionType === "execution") {
      return (
        <i className='fas fa-file-signature' style={{ fontSize: "28px" }} />
      );
    } else if (actionType === "transfer") {
      return <i className='fas fa-exchange-alt' style={{ fontSize: "28px" }} />;
    } else {
      return <i className='fas fa-code-branch' style={{ fontSize: "28px" }} />;
    }
  };

  render() {
    if (!this.props.actions) {
      return <LoadingMessage fakeRows={false} />;
    }
    return (
      <section
        style={{
          paddingRight: "28px",
          paddingLeft: "28px",
          marginTop: "-30px"
        }}
      >
        {this.props.actions.slice(0, 8).map(currentElement => (
          <section
            style={{ borderBottom: "1px solid #dadee6", marginBottom: "6px" }}
          >
            <div className='columns blocks-detail is-vcentered'>
              <div className='column is-one-third '>
                <div
                  className='columns is-vcentered'
                  style={{ marginRight: "1px" }}
                >
                  <div className='column is-4' style={{ marginRight: "7px" }}>
                    {this.getIcon(this.getActionType(currentElement))}
                  </div>
                  <div className='column'>
                    <div
                      className='columns subtitle is-6'
                      style={{ color: "#363636", fontSize: "16px" }}
                    >
                      <Link to={`/actions/${currentElement.actHash}`}>
                        {currentElement.actHash.substr(0, 8)}..
                      </Link>
                    </div>
                    <div
                      className='columns'
                      style={{ color: "#00d1b2", fontSize: "14px" }}
                    >
                      {this.getActionType(currentElement)}
                    </div>
                  </div>
                </div>
              </div>
              <div className='column is-one-third'>
                <div className='columns is-vcentered' style={{ margin: "1px" }}>
                  <div className='column'>
                    <div
                      className='columns subtitle is-6'
                      style={{ color: "#363636", fontSize: "16px" }}
                    >
                      <i
                        class='fas fa-long-arrow-alt-right'
                        style={{
                          fontSize: "24px",
                          marginRight: "14px",
                          color: "#00d1b2"
                        }}
                      />
                      {(() => {
                        if (this.getAddress(currentElement)[0] === "-") {
                          return <span>-</span>;
                        } else
                          return (
                            <Link
                              to={`/address/${
                                this.getAddress(currentElement)[0]
                              }`}
                            >
                              {this.getAddress(currentElement)[1]}
                            </Link>
                          );
                      })()}
                    </div>
                    <div className='columns'>
                      <i
                        class='fas fa-long-arrow-alt-left'
                        style={{
                          fontSize: "24px",
                          marginRight: "14px",
                          color: "red"
                        }}
                      />
                      {(() => {
                        if (
                          publicKeyToAddress(
                            Buffer.from(currentElement.action.senderPubKey)
                          ).toString("Hex") === "-"
                        ) {
                          return <span>-</span>;
                        } else
                          return (
                            <Link
                              to={`/address/${publicKeyToAddress(
                                Buffer.from(currentElement.action.senderPubKey)
                              ).toString("Hex")}`}
                            >
                              {publicKeyToAddress(
                                Buffer.from(currentElement.action.senderPubKey)
                              )
                                .toString("Hex")
                                .substr(0, 9)}
                              ..
                            </Link>
                          );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
              <div className='column is-one-sixth'>
                <div className='columns is-vcentered' style={{ margin: "1px" }}>
                  <div className='column'>
                    {(() => {
                      if (this.getAmount(currentElement) === "-") {
                        return this.getAmount(currentElement);
                      } else
                        return (
                          <span
                            class='tag is-dark is-small'
                            style={{ marginLeft: "0" }}
                          >
                            {this.getAmount(currentElement)}
                          </span>
                        );
                    })()}
                  </div>
                </div>
              </div>
              <div className='column is-one-sixth'>
                <div className='columns is-vcentered' style={{ margin: "1px" }}>
                  <div className='column' style={{ paddingRight: "0" }}>
                    <span style={{ color: "6f7788", fontSize: "12px" }}>
                      <TimeAgo date={currentElement.timestamp.seconds * 1000} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </section>
    );
  }
}
