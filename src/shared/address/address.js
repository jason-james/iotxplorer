// @flow
import { fromRau } from "iotex-client-js/dist/account/utils";
import Component from "inferno-component";
import Helmet from "inferno-helmet";
import isBrowser from "is-browser";
import { Link } from "inferno-router";
import { get } from "dottie";
import { fromNow } from "../common/from-now";
import { publicKeyToAddress } from "iotex-antenna/lib/crypto/crypto";
import window from "global/window";
import { CommonMargin } from "../common/common-margin";
import { ExecutionsListOnlyId } from "../executions/executions";
import { TransfersListOnlyId } from "../transfers/transfers";
import type {
  TAddressDetails,
  TTransfer,
  TVote
} from "../../entities/explorer-types";
import { EmptyMessage, ErrorMessage, LoadingMessage } from "../common/message";
import type { Error } from "../../entities/common-types";
import { t } from "../../lib/iso-i18n";
import { SingleItemTable } from "../common/single-item-table";
import { SingleColTable } from "../common/single-col-table";
import { VotesListOnlyId } from "../votes/votes";
import { SettleDepositsListOnlyId } from "../deposit/settle-deposit-list";
import { CreateDepositsListOnlyId } from "../deposit/create-deposit-list";
import { isValidRawAddress } from "../wallet/validator";
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
    return (
      <div className='column container'>
        <Helmet title={`${t("address.title")} - IoTeX`} />
        <div>
          <h1 className='title'>{t("address.title")}</h1>
          <AddressSummary
            id={this.props.params.id}
            state={this.props.state}
            fetchAccount={this.props.fetchAccount}
            fetchActionsByAddress={this.props.fetchActionsByAddress}
            width={this.props.width}
          />
        </div>
        <CommonMargin />
      </div>
    );
  }
}

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
    this.state = {
      fetchAccount: 0,
      fetchActions: 0,
      pageNumber: 1,
      maxPages: null
    };
  }

  componentWillMount() {
    if (isBrowser) {
      this.props.fetchAccount({ address: this.props.id });
    }
  }

  componentDidMount() {
    const fetchAccount = window.setInterval(() => {
      this.props.fetchAccount({ address: this.props.id });
    }, 20000);
    this.setState({ fetchAccount });

    setTimeout(
      function() {
        //Start the timer
        this.props.fetchActionsByAddress({
          address: this.props.id,
          start:
            this.props.state.account.numActions - 15 * this.state.pageNumber < 0
              ? 0
              : this.props.state.account.numActions -
                15 * this.state.pageNumber,
          count: 15
        }); //After 1 second, set render to true
      }.bind(this),
      1000
    );
  }

  componentWillUnmount() {
    window.clearInterval(this.state.fetchAccount);
  }

  componentWillReceiveProps(nextProps: PropsType, nextContext: any) {
    if (this.props.id !== nextProps.id) {
      if (isBrowser) {
        this.props.fetchAddressId({ id: nextProps.id });
        this.props.fetchAddressVotersId({
          id: nextProps.id,
          offset: 0,
          count: this.props.state.voters.count
        });
        this.props.fetchAddressTransfersId({
          id: nextProps.id,
          offset: 0,
          count: this.props.state.transfers.count
        });
        this.props.fetchAddressExecutionsId({
          id: nextProps.id,
          offset: 0,
          count: this.props.state.executions.count
        });
        this.props.fetchAddressSettleDepositsId({
          id: nextProps.id,
          offset: 0,
          count: this.props.state.settleDeposits.count
        });
        this.props.fetchAddressCreateDepositsId({
          id: nextProps.id,
          offset: 0,
          count: this.props.state.createDeposits.count
        });
      }
    }
  }

  handlePrevClick = () => {
    if (this.state.pageNumber !== 1) {
      this.setState({ pageNumber: this.state.pageNumber - 1 });
      this.props.fetchActionsByAddress({
        address: this.props.id,
        start: this.props.state.account.numActions - 15 * this.state.pageNumber,
        count: 15
      });
    }
  };

  handleNextClick = () => {
    if (this.state.maxPages === null) {
      this.setState({
        maxPages: Math.ceil(this.props.state.account.numActions / 15)
      });
    }
    if (this.state.pageNumber < this.state.maxPages) {
      this.setState({ pageNumber: this.state.pageNumber + 1 });

      this.props.fetchActionsByAddress({
        address: this.props.id,
        start:
          this.props.state.account.numActions - 15 * this.state.pageNumber >
          this.props.state.account.numActions
            ? this.props.state.account.numActions - 15
            : this.props.state.account.numActions - 15 * this.state.pageNumber,
        count: 15
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
    if (!a) {
      return <EmptyMessage item={t("meta.address")} />;
    }
    const rows = [
      {
        c1: t("address.totalBalance"),
        c2: <span>{fromRau(a.balance || 0)} ⬡</span>
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
        <div className='bx--data-table-container'>
          <h1 className='title'>Transactions</h1>
          <table className='bx--data-table-v2' style={{ marginBottom: "0px" }}>
            <thead>
              <tr>
                <th>
                  <span class='bx--table-header-label'>Hash</span>
                </th>
                <th>Age</th>
                <th>Block</th>
                <th>Type</th>
                <th>From</th>
                <th />
                <th>To</th>
                <th>Value</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {this.props.state.actions.map(currentElement => (
                <tr>
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
                      {currentElement.blkHash.substr(0, 8)}..
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
                      let sender = publicKeyToAddress(
                        Buffer.from(
                          currentElement.action.senderPubKey
                        ).toString("Hex")
                      );
                      if (sender === this.props.id) {
                        return <span class='tag is-warning'>OUT</span>;
                      } else {
                        return <span class='tag is-light'>IN</span>;
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

                  <td>{this.getPayload(currentElement).substr(0, 8)}</td>
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
                        a.numActions / 15
                      )}`}
                </div>
              </div>
            </div>
            <div className='level-right'>
              <div className='level-item'>
                <nav
                  class='pagination'
                  role='navigation'
                  aria-label='pagination'
                >
                  <button
                    class='pagination-previous is-dark is-inverse'
                    onClick={e => {
                      this.handlePrevClick();
                      console.log(this.state.pageNumber);
                    }}
                  >
                    Previous
                  </button>
                  <button
                    class='pagination-next is-dark is-inverse'
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
