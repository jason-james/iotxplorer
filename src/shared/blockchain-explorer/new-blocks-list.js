import React, { Component } from "react";
import jdenticon from "jdenticon";
import { styled } from "styletron-react";
import { LoadingMessage } from "../common/message";
import { fromNow } from "../common/from-now";
import { Link } from "react-router";
import { fromRau } from "iotex-client-js/dist/account/utils";
import { singleColEllipsisText } from "../common/utils";
import TimeAgo from "react-timeago";

export class NewBlocksList extends Component {
  render() {
    return (
      <div
        className='card'
        style={{ maxHeight: this.props.width <= 680 ? "" : "873px" }}
      >
        <header className='card-header'>
          <p className='card-header-title'>Recent Blocks</p>
        </header>
        <div className='card-content' style={{ marginBottom: "-45px" }}>
          <RecentBlock
            blocks={this.props.blocks}
            tipBlockMeta={this.props.tipBlockMeta}
            allContractData={this.props.allContractData}
            memberInfo={this.props.memberInfo}
            width={this.props.width}
          />
        </div>
      </div>
    );
  }
}

class RecentBlock extends Component {
  ellipsisText = (s, width) => {
    if (s.length >= 40) {
      const length = s.length;
      const newLen = Math.floor(width / length) - 5;
      return `${s.substr(0, 5)}...${s.substr(length - 5, 5)}`;
    }

    if (width > NARROW_WIDTH_HOME) {
      return s;
    }
    const length = s.length;
    const newLen = Math.floor(width / length) - 5;
    const subLen = newLen >= MIN_SUB_LENGTH ? newLen : MIN_SUB_LENGTH;
    if (length > 13) {
      return `${s.substring(0, subLen)}...${s.substring(
        length - subLen,
        length
      )}`;
    }
    return s;
  };

  findProducerName = address => {
    if (!this.props.tipBlockMeta || !this.props.allContractData) {
      return;
    }

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
      var producerName = this.ellipsisText(producerAddr, this.props.width);
    }
    return producerName;
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

    const blocks: Array<TBlock> = this.props.blocks;
    if (!blocks || !this.props.memberInfo) {
      return <LoadingMessage />;
    }

    return (
      <section
        style={{
          paddingRight: "28px",
          paddingLeft: "28px"
        }}
      >
        {blocks.map(b => (
          <section
            style={{ borderBottom: "1px solid #dadee6", marginBottom: "24px" }}
            key={b.hash}
          >
            <div className='columns'>
              <TopBarStyle>
                <div
                  className='columns top-bar'
                  style={{
                    marginLeft: 0,
                    marginRight: 0,
                    paddingBottom: "8px",
                    paddingTop: "8px"
                  }}
                >
                  <div className='level' style={{ minWidth: "100%" }}>
                    {/* <!-- Left side --> */}
                    <div className='level-left'>
                      <div className='level-item'>
                        <i
                          className='fas fa-cube'
                          style={{ fontSize: "24px", marginRight: "12px" }}
                        />
                        <p className='subtitle is-6'>
                          <strong>
                            <Link to={`/blocks/${b.hash}`} className='link'>
                              #{b.height}
                            </Link>
                          </strong>
                        </p>
                      </div>
                    </div>

                    {/* <!-- Right side --> */}
                    <div className='level-right'>
                      <p className='level-item'>
                        <i
                          className='fas fa-clock'
                          style={{ fontSize: "14px", marginRight: "8px" }}
                        />
                        <span style={{ color: "6f7788" }}>
                          <TimeAgo date={b.timestamp.seconds * 1000} />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </TopBarStyle>
            </div>

            <div
              className='columns blocks-detail '
              style={{ marginBottom: "12px" }}
            >
              <BlockProdDataStyle className='column is-one-third '>
                <div className='columns is-mobile is-vcentered'>
                  <div className='column is-4'>
                    <span
                      style={{ display: "inline-block" }}
                      dangerouslySetInnerHTML={{
                        __html: `${jdenticon.toSvg(b.producerAddress, 40)}`
                      }}
                    />
                  </div>
                  <div className='column'>
                    <div
                      className='columns subtitle is-6'
                      style={{ color: "#363636", fontSize: "16px" }}
                    >
                      <Link to={`/address/${b.producerAddress}`}>
                        {this.findProducerName(b.producerAddress)}
                      </Link>
                    </div>
                    <div
                      className='columns'
                      style={{ color: "#00d1b2", fontSize: "14px" }}
                    >
                      Producer
                    </div>
                  </div>
                </div>
              </BlockProdDataStyle>
              <BlockTxDataStyle
                className='column is-one-third'
                width={this.props.width}
              >
                <div
                  className='columns is-mobile is-vcentered'
                  style={{ margin: "1px" }}
                >
                  <div className='column is-4'>
                    <i
                      className='fas fa-exchange-alt'
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div className='column'>
                    <div
                      className='columns subtitle is-6'
                      style={{ color: "#363636", fontSize: "16px" }}
                    >
                      {b.numActions}
                    </div>
                    <div
                      className='columns'
                      style={{ color: "#00d1b2", fontSize: "14px" }}
                    >
                      Transactions
                    </div>
                  </div>
                </div>{" "}
              </BlockTxDataStyle>
              <BlockGasDataStyle className='column is-one-third'>
                <div
                  className='columns is-mobile is-vcentered'
                  style={{ margin: "1px" }}
                >
                  <div className='column is-4'>
                    <i className='fas fa-fire' style={{ fontSize: "24px" }} />
                  </div>
                  <div className='column'>
                    <div
                      className='columns subtitle is-6'
                      style={{ color: "#363636", fontSize: "16px" }}
                    >
                      {Number(fromRau(b.transferAmount, "IOTX")).toFixed(2)} ⬡
                    </div>
                    <div
                      className='columns'
                      style={{ color: "#00d1b2", fontSize: "14px" }}
                    >
                      Transferred
                    </div>
                  </div>
                </div>{" "}
              </BlockGasDataStyle>
            </div>
          </section>
        ))}
      </section>
    );
  }
}

const TopBarStyle = styled("div", props => ({
  marginBottom: "12px",
  marginTop: "12px",
  minWidth: "100%"
}));

const BlockProdDataStyle = styled("div", props => ({
  border: "1px solid #dadee6",
  height: "70px",
  background: "linear-gradient(135deg,#fff,#f2f6fb)",
  marginBottom: "12px",
  marginTop: "12px",
  borderTopLeftRadius: "4px",
  borderBottomLeftRadius: "4px"
}));

const BlockTxDataStyle = styled("div", props => ({
  borderTop: "1px solid #dadee6",
  borderBottom: "1px solid #dadee6",
  height: "70px",
  background: "linear-gradient(135deg,#fff,#f2f6fb)",
  marginBottom: "12px",
  marginTop: "12px",
  border: props.width <= 680 ? "1px solid #dadee6" : ""
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
