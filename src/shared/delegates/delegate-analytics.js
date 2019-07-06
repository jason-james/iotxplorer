import React, { Component } from "react";
import { LoadingMessage } from "../common/message";
import { ProductivityChart } from "./productivity-chart";
import { BucketInfoTable, RewardsChart } from "./insights-visualisation";

export class DelegateAnalytics extends Component {
  secureLogo = logoURL => {
    return "https:" + logoURL.split(":")[1];
  };

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
            <p className='card-header-title'>Insights </p>
          </div>
          <div className='card-content'>
            <div className='columns'>
              <div className='column'>
                <div className='card' style={{ boxShadow: "none" }}>
                  <div className='card-header' style={{ boxShadow: "none" }}>
                    <p className='card-header-title is-centered'>
                      <div className='columns'>
                        <img
                          src={this.secureLogo(delegate.logo)}
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
                  <div className='card-content' style={{ paddingTop: "1rem" }}>
                    <div className='columns'>
                      <div className='column is-centered'>
                        <p className='has-text-centered'>{delegate.blurb}</p>
                      </div>
                    </div>

                    <nav class='level'>
                      <div class='level-item has-text-centered'>
                        <div>
                          <p class='heading'>Rank</p>
                          <p class='title'> {delegate.rank}</p>
                        </div>
                      </div>
                      <div class='level-item has-text-centered'>
                        <div>
                          <p class='heading'>Votes</p>
                          <p class='title'>
                            {" "}
                            {Number(delegate.liveVotes).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div class='level-item has-text-centered'>
                        <div>
                          <p class='heading'>Percent</p>
                          <p class='title'>{delegate.percent}%</p>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div className='columns'>
              <ProductivityChart
                productivity={this.props.productivity}
                width={this.props.width}
              />
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
