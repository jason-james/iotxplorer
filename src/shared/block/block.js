// @flow

import { fromRau } from "iotex-client-js/dist/account/utils";
import Component from "inferno-component";
import Helmet from "inferno-helmet";
import isBrowser from "is-browser";
import window from "global";
import { CommonMargin } from "../common/common-margin";
import { EmptyMessage, ErrorMessage, LoadingMessage } from "../common/message";
import type { Error } from "../../../src/entities/common-types";
import type { TBlock, TTransfer, TVote } from "../../entities/explorer-types";
import { t } from "../../lib/iso-i18n";
import { SingleItemTable } from "../common/single-item-table";
import { SingleColTable } from "../common/single-col-table";
import { ExecutionsListOnlyId } from "../executions/executions";
import { TransfersListOnlyId } from "../transfers/transfers";
import { VotesListOnlyId } from "../votes/votes";
import type { TExecution } from "../../entities/explorer-types";
import { fromNow } from "../common/from-now";
import {
  fetchBlockId,
  fetchBlockExecutionsId,
  fetchBlockTransfersId,
  fetchBlockVotesId
} from "./block-actions";

type PropsType = {
  id: string
};

export class Block extends Component {
  props: {
    params: {
      id: string
    },
    state: {
      fetching: boolean,
      error: Error,
      block: TBlock,
      transfers: {
        items: Array<TTransfer>,
        fetching: boolean,
        error: Error,
        offset: number,
        count: number
      },
      executions: {
        items: Array<TExecution>,
        fetching: boolean,
        error: Error,
        offset: number,
        count: number
      },
      votes: {
        items: Array<TVote>,
        fetching: boolean,
        error: Error,
        offset: number,
        count: number
      }
    },
    fetchBlockId: fetchBlockId,
    fetchBlockExecutionsId: fetchBlockExecutionsId,
    fetchBlockTransfersId: fetchBlockTransfersId,
    fetchBlockVotesId: fetchBlockVotesId,
    width: number
  };

  render() {
    return (
      <div className='column container'>
        <Helmet title={`${t("block.title")} - iotxplorer`} />
        <div>
          <h1 className='title'>{t("block.title")}</h1>
          <BlockSummary
            id={this.props.params.id}
            fetching={this.props.block.fetching}
            error={this.props.block.error}
            blockMeta={this.props.block.blockMeta[0]}
            fetchBlockMeta={this.props.fetchBlockMeta}
            width={this.props.width}
          />
        </div>
        <CommonMargin />
      </div>
    );
  }
}

export class BlockSummary extends Component {
  props: {
    id: string,
    fetching: boolean,
    error: Error,
    block: TBlock,
    fetchBlockId: fetchBlockId,
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
    votes: {
      items: Array<TVote>,
      fetching: boolean,
      error: Error,
      offset: number,
      count: number
    },
    fetchBlockExecutionsId: fetchBlockExecutionsId,
    fetchBlockTransfersId: fetchBlockTransfersId,
    fetchBlockVotesId: fetchBlockVotesId,
    width: number,
    chainId: number
  };

  constructor(props: PropsType) {
    super(props);
    this.state = {
      fetchBlockExecutionsId: 0,
      fetchBlockTransfersId: 0,
      fetchBlockVotesId: 0
    };
  }

  componentWillMount() {
    if (isBrowser) {
      this.props.fetchBlockMeta({ blkHash: this.props.id });
    }
  }

  componentDidMount() {
    const fetchBlockExecutionsId = window.setInterval(
      () =>
        this.props.fetchBlockExecutionsId({
          id: this.props.id,
          offset: this.props.executions.offset,
          count: this.props.executions.count
        }),
      30000
    );
    this.setState({ fetchBlockExecutionsId });

    const fetchBlockTransfersId = window.setInterval(
      () =>
        this.props.fetchBlockTransfersId({
          id: this.props.id,
          offset: this.props.transfers.offset,
          count: this.props.transfers.count
        }),
      30000
    );
    this.setState({ fetchBlockTransfersId });

    const fetchBlockVotesId = window.setInterval(
      () =>
        this.props.fetchBlockVotesId({
          id: this.props.id,
          offset: this.props.votes.offset,
          count: this.props.votes.count
        }),
      30000
    );
    this.setState({ fetchBlockVotesId });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.fetchBlockExecutionsId);
    window.clearInterval(this.state.fetchBlockTransfersId);
    window.clearInterval(this.state.fetchBlockVotesId);
  }

  componentWillReceiveProps(nextProps: PropsType, nextContext: any) {
    if (this.props.id !== nextProps.id) {
      if (isBrowser) {
        this.props.fetchBlockId({ id: nextProps.id });
        this.props.fetchBlockExecutionsId({
          id: nextProps.id,
          offset: this.props.executions.offset,
          count: this.props.executions.count
        });
        this.props.fetchBlockTransfersId({
          id: nextProps.id,
          offset: this.props.transfers.offset,
          count: this.props.transfers.count
        });
        this.props.fetchBlockVotesId({
          id: this.props.id,
          offset: this.props.votes.offset,
          count: this.props.votes.count
        });
      }
    }
  }

  // eslint-disable-next-line complexity
  render() {
    if (this.props.fetching) {
      return <LoadingMessage fakeRows={false} />;
    }
    if (this.props.error) {
      return <ErrorMessage error={this.props.error} />;
    }
    const { blockMeta } = this.props;
    if (!blockMeta) {
      return <EmptyMessage item={t("meta.block")} />;
    }
    const rows = [
      {
        c1: t("meta.transactions"),
        c2: blockMeta.numActions || 0
      },
      {
        c1: t("meta.height"),
        c2: blockMeta.height || 0
      },
      {
        c1: t("block.totalAmount"),
        c2: <span>{fromRau(blockMeta.transferAmount || 0)} ⬡</span>
      },
      {
        c1: t("meta.timestamp"),
        c2: fromNow(blockMeta.timestamp.seconds) || 0
      },
      {
        c1: t("block.generatedBy"),
        c2: blockMeta.producerAddress
      }
    ];
    return (
      <div>
        <SingleItemTable subtitle={blockMeta.hash || 0} rows={rows} />
        <br />
      </div>
    );
  }
}
