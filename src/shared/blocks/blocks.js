// @flow

import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router";
import { fromRau } from "iotex-client-js/dist/account/utils";
import { CommonMargin } from "../common/common-margin";
import type { TBlock } from "../../entities/explorer-types";
import { TableWrapper } from "../common/table-wrapper";
import {
  ellipsisText,
  hideColClass,
  singleColEllipsisText
} from "../common/utils";
import { t } from "../../lib/iso-i18n";
import { EmptyMessage, LoadingMessage } from "../common/message";
import type { Error } from "../../entities/common-types";
import { fromNow } from "../common/from-now";
import { fetchBlocks } from "./blocks-actions";

type PropsType = {
  statistic: {
    height: number
  }
};

export class Blocks extends Component {
  props: {
    fetchBlocks: fetchBlocks,
    statistic: {
      height: number
    },
    state: {
      items: Array<TBlock>,
      fetching: boolean,
      error: Error,
      offset: number,
      count: number,
      height: number,
      tip: number
    },
    width: number
  };

  constructor(props: any) {
    super(props);
    this.state = {
      height: 0
    };
  }

  componentWillReceiveProps(nextProps: PropsType, nextContext: any) {
    if (
      nextProps.statistic &&
      this.state.height !== nextProps.statistic.height
    ) {
      this.setState(
        state => {
          state.height = nextProps.statistic.height;
        },
        () => {
          if (this.props.state.offset === 0) {
            this.props.fetchBlocks({
              tip: this.state.height,
              offset: 0,
              count: this.props.state.count
            });
          }
        }
      );
    }
  }

  render() {
    return (
      <div className='column container'>
        <Helmet title={`${t("blocks.title")} - iotxplorer`} />
        <h1 className='title'>{t("blocks.title")}</h1>
        <TableWrapper
          fetching={this.props.state.fetching}
          error={this.props.state.error}
          offset={this.props.state.offset}
          count={this.props.state.count}
          items={this.props.state.items}
          fetch={this.props.fetchBlocks}
          tip={this.props.state.tip}
          name={t("blocks.title")}
          displayPagination={true}
        >
          {
            <BlocksSummaryList
              blocks={this.props.state.items}
              width={this.props.width}
            />
          }
        </TableWrapper>
        <CommonMargin />
      </div>
    );
  }
}

export class BlocksList extends Component {
  findProducerName = address => {
    if (this.props.tipBlockMeta) {
      var producerAddr = address;

      const newArray = this.props.allContractData.filter(function(el) {
        return el.ioOperatorAddr === producerAddr;
      });

      if (newArray !== [] && newArray[0]) {
        const registeredName = newArray[0].name;

        const prod = this.props.memberInfo.filter(function(el) {
          return el.registeredName === registeredName;
        });

        var producerName = prod[0].name;
      } else {
        var producerName = "Robot Delegate";
      }
      return producerName;
    }
  };

  render() {
    const blocks: Array<TBlock> = this.props.blocks;
    if (!blocks || !this.props.memberInfo) {
      return <LoadingMessage />;
    }

    return (
      <table className='bx--data-table-v2'>
        <thead>
          <tr>
            <th
              className={hideColClass(this.props.width) ? "" : "none-on-palm"}
            >
              Block Hash
            </th>
            <th
              className={
                hideColClass(this.props.width) ? "" : "second-to-none-header"
              }
            >
              {t("meta.height")}
            </th>
            <th
              className={hideColClass(this.props.width) ? "" : "none-on-palm"}
            >
              {t("meta.timestamp")}
            </th>
            <th>Actions</th>
            <th>Producer</th>
            <th
              className={hideColClass(this.props.width) ? "" : "none-on-palm"}
            >
              Amount Transacted
            </th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((b: TBlock) => (
            <tr className='bx--parent-row-v2' data-parent-row>
              <td
                className={hideColClass(this.props.width) ? "" : "none-on-palm"}
              >
                <Link to={`/blocks/${b.hash}`} className='link'>
                  {ellipsisText(b.hash, this.props.width)}
                </Link>
              </td>
              <td
                className={
                  hideColClass(this.props.width) ? "" : "second-to-none"
                }
              >
                {hideColClass(this.props.width) ? (
                  <Link to={`/blocks/${b.hash}`} className='link'>
                    {b.height}
                  </Link>
                ) : (
                  <Link to={`/blocks/${b.hash}`} className='link'>
                    {b.height}
                  </Link>
                )}
              </td>
              <td
                className={hideColClass(this.props.width) ? "" : "none-on-palm"}
              >
                {fromNow(b.timestamp.seconds)}
              </td>
              <td>{b.numActions}</td>
              <td>
                <Link to={`/address/${b.producerAddress}`}>
                  {this.findProducerName(b.producerAddress)}
                </Link>
              </td>
              <td
                className={hideColClass(this.props.width) ? "" : "none-on-palm"}
              >
                {fromRau(b.transferAmount, "IOTX")} ⬡
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export class BlocksListOnlyId extends Component {
  props: {
    blocks: Array<TBlock>,
    width: string,
    isHome: boolean
  };

  render() {
    let blocks: Array<TBlock> = this.props.blocks;
    const isHome = this.props.isHome;
    if (!blocks) {
      return null;
    }
    if (!Array.isArray(blocks)) {
      blocks = [blocks];
    }
    return (
      <table className='bx--data-table-v2'>
        <thead>
          <tr>
            <th className={isHome ? "single-col-header" : ""}>
              {t("block.id")}
            </th>
            {!isHome && <th>{t("meta.timestamp")}</th>}
          </tr>
        </thead>
        <tbody>
          {blocks.map((b: TBlock) => (
            <tr className='bx--parent-row-v2' data-parent-row>
              <td className='single-col-row'>
                <Link to={`/blocks/${b.ID}`} className='link'>
                  {singleColEllipsisText(
                    b.ID,
                    this.props.width,
                    this.props.isHome
                  )}
                </Link>
              </td>
              {!isHome && <td>{fromNow(b.timestamp)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export class BlocksSummaryList extends Component {
  props: {
    blocks: Array<TBlock>,
    width: string
  };

  render() {
    let blocks: Array<TBlock> = this.props.blocks;

    if (!blocks) {
      return null;
    }
    if (!Array.isArray(blocks)) {
      blocks = [blocks];
    }
    return (
      <table className='bx--data-table-v2'>
        <thead>
          <tr>
            <th>{t("block.id")}</th>
            <th>{t("meta.transactions")}</th>
            <th>{t("meta.executions")}</th>
            <th>{t("meta.timestamp")}</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((b: TBlock) => (
            <tr className='bx--parent-row-v2' data-parent-row>
              <td>
                <Link to={`/blocks/${b.ID}`} className='link'>
                  {singleColEllipsisText(b.ID, this.props.width, false)}
                </Link>
              </td>
              <td style='text-align: center'>{b.transfers}</td>
              <td style='text-align: center'>{b.executions}</td>
              <td style='text-align: center'>{fromNow(b.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
