// @flow
import { fromRau } from "iotex-client-js/dist/account/utils";
import React, { Component } from "react";
import { styled } from "styletron-react";
import { getAntenna } from "../getAntenna";
import { Helmet } from "react-helmet";
import isBrowser from "is-browser";
import jdenticon from "jdenticon";
import { Link } from "react-router";
import { get } from "dottie";
import { publicKeyToAddress } from "iotex-antenna/lib/crypto/crypto";
import window from "global/window";
import { fromNow } from "../common/from-now";
import { CommonMargin } from "../common/common-margin";
import { ERC20Token as Token } from "../erc20/erc20Token";
import type {
  TAddressDetails,
  TTransfer,
  TVote
} from "../../entities/explorer-types";
import { EmptyMessage, ErrorMessage, LoadingMessage } from "../common/message";
import type { Error } from "../../entities/common-types";
import { t } from "../../lib/iso-i18n";
import { SingleItemTable } from "../common/single-item-table";
import type { TExecution } from "../../entities/explorer-types";
import type { TSettleDeposit } from "../../entities/wallet-types";
import type {
  fetchAddressId,
  fetchAddressTransfersId,
  fetchAddressExecutionsId,
  fetchAddressSettleDepositsId,
  fetchAddressCreateDepositsId
} from "./address-actions";
import { fetchAddressVotersId } from "./address-actions";

type PropsType = {
  id: string
};

export class Address extends Component {
  props: {
    fetchAddressId: fetchAddressId,
    fetchAddressExecutionsId: fetchAddressExecutionsId,
    fetchAddressTransfersId: fetchAddressTransfersId,
    fetchAddressVotersId: fetchAddressVotersId,
    fetchAddressSettleDepositsId: fetchAddressSettleDepositsId,
    fetchAddressCreateDepositsId: fetchAddressCreateDepositsId,
    params: {
      id: string
    },
    state: any,
    width: number
  };

  render() {
    jdenticon.config = {
      hues: [170],
      lightness: {
        color: [0.29, 0.7],
        grayscale: [0.27, 0.27]
      },
      saturation: {
        color: 0.5,
        grayscale: 0.21
      },
      backColor: "#86444400"
    };
    return (
      <div className='column container'>
        <Helmet title={`${t("address.title")} - IoTeX`} />
        <div>
          <div>
            <nav className='level' style={{ marginBottom: "0.5rem" }}>
              <div className='level-left'>
                <div className='level-item'>
                  <span
                    style={{ display: "inline-block" }}
                    dangerouslySetInnerHTML={{
                      __html: `${jdenticon.toSvg(this.props.params.id, 100)}`
                    }}
                  />
                </div>
                <div className='level-item'>
                  <h1 className='title'>{t("address.title")}</h1>
                </div>
              </div>
            </nav>

            <AddressSummary
              id={this.props.params.id}
              state={this.props.state}
              price={this.props.price}
              fetchAccount={this.props.fetchAccount}
              fetchActionsByAddress={this.props.fetchActionsByAddress}
              width={this.props.width}
              base={this.props.base}
            />
          </div>
          <CommonMargin />
        </div>
      </div>
    );
  }
}

const ACTIONS_PER_PAGE = 7;

export class AddressSummary extends Component {
  props: {
    fetchAddressId: fetchAddressId,
    fetchAddressExecutionsId: fetchAddressExecutionsId,
    fetchAddressTransfersId: fetchAddressTransfersId,
    fetchAddressVotersId: fetchAddressVotersId,
    fetchAddressSettleDepositsId: fetchAddressSettleDepositsId,
    fetchAddressCreateDepositsId: fetchAddressCreateDepositsId,
    state: {
      address: TAddressDetails,
      error: Error,
      executions: {
        items: Array<TExecution>,
        fetching: boolean,
        error: Error,
        offset: number,
        count: number
      },
      transfers: {
        items: Array<TTransfer>,
        fetching: boolean,
        error: Error,
        offset: number,
        count: number
      },
      voters: {
        items: Array<TVote>,
        fetching: boolean,
        error: Error,
        offset: number,
        count: number
      },
      settleDeposits: {
        items: Array<TSettleDeposit>,
        fetching: boolean,
        error: Error,
        offset: number,
        count: number
      },
      createDeposits: {
        items: Array<TCreateDeposit>,
        fetching: boolean,
        error: Error,
        offset: number,
        count: number
      }
    },
    fetching: boolean,
    id: string,
    width: number
  };

  constructor(props: PropsType) {
    super(props);
    this._isMounted = false;
    this.state = {
      fetchAccount: 0,
      fetchActions: 0,
      pageNumber: 1,
      maxPages: null,
      tokenInfos: {},
      fetchActionsByAddress: 0
    };
  }

  componentWillMount() {
    if (isBrowser) {
      this.props.fetchAccount({ address: this.props.id });
    }
  }

  componentDidMount() {
    this._isMounted = true;

    this.props.fetchAccount({ address: this.props.id });
    const fetchAccount = window.setInterval(() => {
      this.props.fetchAccount({ address: this.props.id });
    }, 1000);
    this._isMounted && this.pollAccount();

    window.setInterval(() => {
      this._isMounted && this.pollAccount();
    }, 10000);

    const fetchActionsByAddress = window.setInterval(() => {
      this.props.fetchActionsByAddress({
        address: this.props.id,
        start:
          this.props.state.account.numActions -
            ACTIONS_PER_PAGE * this.state.pageNumber <
          0
            ? 0
            : this.props.state.account.numActions -
              ACTIONS_PER_PAGE * this.state.pageNumber,
        count: ACTIONS_PER_PAGE
      });
    }, 1000);

    this.setState({ fetchAccount, fetchActionsByAddress });

    // setTimeout(
    //   function() {
    //     // Start the timer
    //     this.props.fetchActionsByAddress({
    //       address: this.props.id,
    //       start:
    //         this.props.state.account.numActions - ACTIONS_PER_PAGE * this.state.pageNumber < 0
    //           ? 0
    //           : this.props.state.account.numActions -
    //             ACTIONS_PER_PAGE * this.state.pageNumber,
    //       count: ACTIONS_PER_PAGE
    //     }); // After 1 second, set render to true
    //   }.bind(this),
    //   1000
    // );
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.clearInterval(this.state.fetchAccount);
    window.clearInterval(this.state.fetchActionsByAddress);
  }

  pollAccount = async () => {
    window.clearTimeout(this.pollAccountInterval);
    if (!this.props.id) {
      return;
    }
    await this.getTokensInfo();

    this.pollAccountInterval = window.setTimeout(this.pollAccount, 1000);
  };

  getTokensInfo = async () => {
    const { defaultERC20Tokens } = this.props.base;

    let tokenAddresses = [];
    tokenAddresses = [...defaultERC20Tokens, ...tokenAddresses];
    const tokenInfos = await Promise.all(
      tokenAddresses.map(addr =>
        Token.getToken(addr, getAntenna().iotx).getInfo(this.props.id)
      )
    );
    const newTokenInfos: ITokenInfoDict = {};
    tokenInfos.forEach(info => {
      if (info && info.symbol) {
        newTokenInfos[info.tokenAddress] = info;
      }
    });
    this._isMounted && this.setState({ tokenInfos: newTokenInfos.undefined });
    // dispatch(setTokens(newTokenInfos));
  };

  handlePrevClick = () => {
    if (this.state.pageNumber !== 1) {
      this.setState({ pageNumber: this.state.pageNumber - 1 }, () => {
        this.props.fetchActionsByAddress({
          address: this.props.id,
          start:
            this.props.state.account.numActions -
            ACTIONS_PER_PAGE * this.state.pageNumber,
          count: ACTIONS_PER_PAGE
        });
      });
    }
  };

  handleNextClick = () => {
    if (this.state.maxPages === null) {
      this.setState(
        {
          maxPages: Math.ceil(
            this.props.state.account.numActions / ACTIONS_PER_PAGE
          )
        },
        () => {
          if (this.state.pageNumber < this.state.maxPages) {
            this.setState({ pageNumber: this.state.pageNumber + 1 });

            this.props.fetchActionsByAddress({
              address: this.props.id,
              start:
                this.props.state.account.numActions -
                  ACTIONS_PER_PAGE * this.state.pageNumber >
                this.props.state.account.numActions
                  ? this.props.state.account.numActions - ACTIONS_PER_PAGE
                  : this.props.state.account.numActions -
                    ACTIONS_PER_PAGE * this.state.pageNumber,
              count: ACTIONS_PER_PAGE
            });
          }
        }
      );
    } else if (this.state.pageNumber < this.state.maxPages) {
      this.setState({ pageNumber: this.state.pageNumber + 1 });

      this.props.fetchActionsByAddress({
        address: this.props.id,
        start:
          this.props.state.account.numActions -
            ACTIONS_PER_PAGE * this.state.pageNumber >
          this.props.state.account.numActions
            ? this.props.state.account.numActions - ACTIONS_PER_PAGE
            : this.props.state.account.numActions -
              ACTIONS_PER_PAGE * this.state.pageNumber,
        count: ACTIONS_PER_PAGE
      });
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
    return [addr, `${addr.substr(0, 14)}..`];
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
    return `${fromRau(amount, "IOTX")} ⬡`;
  };

  getPayload = ActionInfo => {
    const payLoad =
      get(ActionInfo, "action.core.transfer.payload") ||
      get(ActionInfo, "action.core.execution.data") ||
      "";
    if (!payLoad || Buffer.from(payLoad).toString("Hex") === "") {
      return "[ ]";
    }
    return Buffer.from(payLoad).toString("Hex");
  };

  getActionType = ActionInfo => {
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
      if (get(ActionInfo, `action.core.${actionsTypes[i]}`)) {
        return actionsTypes[i];
      }
    }
    return "";
  };

  render() {
    if (this.props.fetching) {
      return <LoadingMessage fakeRows={false} />;
    }
    if (this.props.state.error) {
      return (
        <div>
          <ErrorMessage error={this.props.state.error} />
        </div>
      );
    }
    const a = this.props.state.account;
    if (!a || !this.props.price) {
      return <EmptyMessage item={t("meta.address")} />;
    }
    const rows = [
      {
        c1: t("address.totalBalance"),
        c2: <span>{fromRau(a.balance || 0)} ⬡</span>
      },
      {
        c1: "USD Value",
        c2: `$${Number(
          (this.props.price.usd * fromRau(a.balance)).toFixed(2)
        ).toLocaleString()}`
      },
      {
        c1: "Total Actions",
        c2: a.numActions || 0
      }
    ];
    return (
      <div>
        <SingleItemTable subtitle={a.address || ""} rows={rows} />
        <br />
        <div className='columns' style={{ marginTop: "-3em" }}>
          <div className='column'>
            <div
              className='card'
              style={{
                color: "#ffffff",
                backgroundColor: "#363636",
                minHeight: "400px"
              }}
            >
              <header className='card-header'>
                <p
                  className='card-header-title'
                  style={{ color: "#ffffff", fontSize: "18px" }}
                >
                  Votes
                </p>
              </header>
              <div className='card-content'>
                <div
                  className='has-text-centered is-centered'
                  style={{ fontSize: "100px", marginTop: "50px" }}
                >
                  <span className='icon has-text-primary'>
                    <i className='fab fa-linode' />
                  </span>
                  <div style={{ fontSize: "0.2em", marginTop: "-15px" }}>
                    No Votes Available
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='column'>
            <div
              className='card'
              style={{
                color: "#ffffff",
                backgroundColor: "#363636",
                minHeight: "400px"
              }}
            >
              {/* <header class='card-header'>
                <p
                  class='card-header-title'
                  style={{ color: "#ffffff", fontSize: "18px" }}
                >
                  Tokens
                </p>
              </header> */}
              <div className='card-content'>
                <div className='content'>
                  <div
                    style={{
                      marginBottom: "24px"
                    }}
                    // key={b.hash}
                  >
                    <div
                      className='columns blocks-detail '
                      style={{ marginBottom: "12px" }}
                    >
                      <BlockProdDataStyle className='column'>
                        <div
                          className='columns is-mobile is-vcentered'
                          style={{ paddingLeft: "12px", paddingTop: "7px" }}
                        >
                          <div
                            className='column is-1'
                            style={{ color: "black" }}
                          >
                            <img src='https://static.wixstatic.com/media/efb9d3_d6595e1324dd473a9d91fd1ca1b3d668~mv2.png/v1/fill/w_34,h_34,al_c,q_80,usm_0.66_1.00_0.01/vita.webp' />
                          </div>
                          <div className='column'>
                            <div
                              className='columns subtitle is-6'
                              style={{ color: "#363636", fontSize: "16px" }}
                            >
                              <Link
                                to={`/address/${
                                  this.state.tokenInfos.erc20TokenAddress
                                }`}
                              >
                                {this.state.tokenInfos.name}
                              </Link>
                            </div>
                            <div
                              className='columns'
                              style={{ color: "#00d1b2", fontSize: "14px" }}
                            >
                              XRC-20
                            </div>
                          </div>
                          <div className='column'>
                            <div
                              className='columns subtitle is-6'
                              style={{
                                color: "#363636",
                                fontSize: "16px",
                                display: "block",
                                textAlign: "right",
                                paddingRight: "20px"
                              }}
                            >
                              {this.state.tokenInfos.balanceString
                                ? `${new Intl.NumberFormat("en-US", {
                                    maximumFractionDigits: 1
                                  }).format(
                                    this.state.tokenInfos.balanceString
                                  )} `
                                : "... "}
                              VITA
                            </div>
                            <div
                              className='columns'
                              style={{
                                color: "#00d1b2",
                                fontSize: "14px",
                                display: "block",
                                textAlign: "right",
                                paddingRight: "20px"
                              }}
                            >
                              $ 0.00
                            </div>
                          </div>
                        </div>
                      </BlockProdDataStyle>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bx--data-table-container'>
          <h1 className='title'>Transactions</h1>
          <table className='bx--data-table-v2' style={{ marginBottom: "0px" }}>
            <thead>
              <tr>
                <th>
                  <span className='bx--table-header-label'>Hash</span>
                </th>
                <th>Age</th>
                <th>Block</th>
                <th>Type</th>
                <th>From</th>
                <th />
                <th>To</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {this.props.state.actions.map(currentElement => (
                <tr key={currentElement.actHash}>
                  <td>
                    <Link
                      to={`/actions/${currentElement.actHash}`}
                      className='link'
                    >
                      {currentElement.actHash.substr(0, 8)}..
                    </Link>
                  </td>
                  <td>{fromNow(currentElement.timestamp.seconds)}</td>
                  <td>
                    {" "}
                    <Link
                      to={`/blocks/${currentElement.blkHash}`}
                      className='link'
                    >
                      {currentElement.blkHeight}
                    </Link>
                  </td>
                  <td>{this.getActionType(currentElement)}</td>
                  <td>
                    <a
                      href={`/address/${publicKeyToAddress(
                        Buffer.from(currentElement.action.senderPubKey)
                      ).toString("Hex")}`}
                    >
                      {publicKeyToAddress(
                        Buffer.from(currentElement.action.senderPubKey)
                      )
                        .toString("Hex")
                        .substr(0, 14)}
                      ..
                    </a>
                  </td>
                  <td>
                    {(() => {
                      const sender = publicKeyToAddress(
                        Buffer.from(
                          currentElement.action.senderPubKey
                        ).toString("Hex")
                      );
                      if (
                        sender === this.props.id &&
                        this.getAddress(currentElement)[0] !== "-"
                      ) {
                        return <span className='tag is-warning'>OUT</span>;
                      }
                      if (sender !== this.props.id) {
                        return <span className='tag is-light'>IN</span>;
                      }
                    })()}
                  </td>
                  <td>
                    <a
                      href={`/address/${this.getAddress(currentElement)[0]}`}
                      className='link'
                    >
                      {this.getAddress(currentElement)[1]}
                    </a>
                  </td>
                  <td>{this.getAmount(currentElement)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className='level' style={{ marginTop: "12px" }}>
            <div className='level-left'>
              <div className='level-item'>
                <div>
                  {!a.numActions
                    ? ""
                    : `Page ${this.state.pageNumber} of ${Math.ceil(
                        a.numActions / ACTIONS_PER_PAGE
                      )}`}
                </div>
              </div>
            </div>
            <div className='level-right'>
              <div className='level-item'>
                <nav
                  className='pagination'
                  role='navigation'
                  aria-label='pagination'
                >
                  <button
                    className='pagination-previous is-dark is-inverse'
                    onClick={e => {
                      this.handlePrevClick();
                      console.log(this.state.pageNumber);
                    }}
                  >
                    Previous
                  </button>
                  <button
                    className='pagination-next is-dark is-inverse'
                    onClick={e => {
                      this.handleNextClick();
                    }}
                  >
                    Next page
                  </button>
                </nav>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
const BlockProdDataStyle = styled("div", props => ({
  border: "1px solid #dadee6",
  height: "70px",
  background: "linear-gradient(135deg,#fff,#f2f6fb)",
  marginBottom: "12px",
  marginTop: "12px",
  borderRadius: "4px"
}));

const BlockGasDataStyle = styled("div", props => ({
  border: "1px solid #dadee6",
  height: "70px",
  background: "linear-gradient(135deg,#fff,#f2f6fb)",
  marginBottom: "12px",
  marginTop: "12px",
  borderTopRightRadius: "4px",
  borderBottomRightRadius: "4px"
}));
