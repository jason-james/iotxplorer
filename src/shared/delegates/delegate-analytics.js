import React, { Component } from "react";
import { LoadingMessage } from "../common/message";
import { ProductivityChart } from "./productivity-chart";
import { BucketInfoTable, RewardsChart } from "./insights-visualisation";

export class DelegateAnalytics extends Component {
  render() {
    const { delegate } = this.props;

    if (
      !delegate ||
      this.props.productivity === [] ||
      this.props.rewards === [] ||
      this.props.bucketsInfo === []
    ) {
      return <LoadingMessage />;
    }

    return (
      <section style={{ marginBottom: "18px" }}>
        <div className='card'>
          <div className='card-header'>
            <p className='card-header-title'>Delegate: Insights </p>
          </div>
          <div className='card-content'>
            <div className='columns'>
              <div className='column is-half'>
                <div className='card'>
                  <div className='card-header'>
                    <p className='card-header-title is-centered'>
                      <div className='columns'>
                        <img
                          src={delegate.logo}
                          style={{
                            objectFit: "contain",
                            height: "80px",
                            width: "80px",
                            paddingTop: "18px"
                          }}
                        />
                      </div>
                      <div className='columns' style={{ marginLeft: "28px" }}>
                        {delegate.name}
                      </div>
                    </p>
                  </div>
                  <div className='card-content'>
                    <div className='columns'>
                      <div className='column'>
                        <p>{delegate.blurb}</p>
                      </div>
                    </div>

                    <div className='columns ' style={{ marginBottom: "0" }}>
                      <p className='title ' style={{ margin: "6px" }}>
                        <span style={{ fontSize: "18px" }}>Rank: </span>
                        {delegate.rank}
                      </p>
                    </div>
                    <div className='columns ' style={{ marginBottom: "0" }}>
                      <p className='title ' style={{ margin: "6px" }}>
                        <span style={{ fontSize: "18px" }}>Votes: </span>
                        {Number(delegate.liveVotes).toLocaleString()}
                      </p>
                    </div>
                    <div className='columns '>
                      <p className='title ' style={{ margin: "6px" }}>
                        <span style={{ fontSize: "18px" }}>Percent: </span>
                        {delegate.percent}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='column is-half'>
                <ProductivityChart productivity={this.props.productivity} />
              </div>
            </div>
            <div className='columns'>
              <div className='column'>
                <RewardsChart
                  rewards={this.props.rewards}
                  width={this.props.width}
                />
              </div>
            </div>
            <div className='columns'>
              <div className='column'>
                <BucketInfoTable
                  bucketsInfo={this.props.bucketsInfo}
                  totalVotes={delegate.liveVotes}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
