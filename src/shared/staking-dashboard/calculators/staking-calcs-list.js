import React, { Component } from "react";
import {assetURL} from '../../../lib/asset-url';
import {ToolTip} from '../../../shared/common/tooltip';
import {nav} from '../../common/nav/nav';

export class StakingCalc extends Component {
  state = {
    stakeAmount: 300000,
    stakeDuration: 14,
    tokenPrice: null,
  };

  calculateROI() {
    const totalDelegateVotes36thplace = 7575120;
    const overallRedist = 1397220;

    const bonusVotes = Math.log(this.state.stakeDuration) / Math.log(1.2);
    const effectiveVotes = this.state.stakeAmount * (1 + bonusVotes / 100);
    const percentOfTotalVotes = effectiveVotes / totalDelegateVotes36thplace;
    const amountGivenBack =
      percentOfTotalVotes * overallRedist + this.state.stakeAmount;
    const ROI =
      ((parseInt(amountGivenBack) - this.state.stakeAmount) /
        this.state.stakeAmount) *
      100;
    const profitIOTX = amountGivenBack - this.state.stakeAmount;
    const profitUSD = this.state.tokenPrice * profitIOTX;

    return [
      ROI.toFixed(1),
      amountGivenBack.toFixed(1),
      profitUSD.toFixed(2),
      profitIOTX.toFixed(1),
    ];
  }

  calculatorContent() {
    return (
      <section>
        <div className='level'>
          <div className='level-left'>
            <img src={assetURL('/one.svg')} width='100' height='100' />
          </div>
          <p style={{paddingLeft: '24px'}}>
            Set the amount of IOTX you will stake
          </p>
          <ToolTip
            iconClass={'fas fa-question-circle has-text-primary'}
            message={
              'Set the amount of IOTX that you want to use for voting/staking. The more you stake, the greater your returns will be.'
            }
            customPadClass={'dashboard-tooltip'}
          />
          <div className='field has-addons'>
            <div className='control'>
              <input
                className='input is-primary has-addons'
                placeholder='The higher the better.'
                type='number'
                style={{marginLeft: '32px'}}
                value={this.state.stakeAmount}
                onChange={e =>
                  this.setState({stakeAmount: parseInt(e.target.value)})
                }
              />
            </div>
            <div className='control'>
              <a className='button' style={{marginRight: '24px'}}>
                IOTX
              </a>
            </div>
          </div>
        </div>

        <div className='level'>
          <div className='level-left'>
            <img src={assetURL('/two.svg')} width='100' height='100' />
          </div>
          <p style={{paddingLeft: '24px'}}>Set your stake duration</p>
          <ToolTip
            iconClass={'fas fa-question-circle has-text-primary'}
            message={
              'Enter your stake duration. This time period commits you to locking up your coins for the time specified. Longer stake periods get more bonus votes which results in greater returns.'
            }
            customPadClass={'dashboard-tooltip'}
          />
          <div className='field has-addons'>
            <div className='control'>
              <input
                className='input is-primary'
                placeholder='The higher the better, again.'
                type='number'
                style={{width: '80%', maxWidth: '391px', marginLeft: '97px'}}
                value={this.state.stakeDuration}
                onChange={e => this.setState({stakeDuration: e.target.value})}
              />
            </div>
            <div className='control'>
              <a className='button' style={{marginRight: '24px'}}>
                Days
              </a>
            </div>
          </div>
        </div>

        <div className='level'>
          <div className='level-left'>
            <img src={assetURL('/three.svg')} width='100' height='100' />
          </div>
          <p style={{paddingLeft: '24px'}}>Enter the price of 1 IOTX</p>
          <ToolTip
            iconClass={'fas fa-question-circle has-text-primary'}
            message={
              'Enter the price of 1 IOTX in USD. You can vary this number to estimate what your USD returns might look like depending on the price.'
            }
            customPadClass={'dashboard-tooltip'}
          />
          <div className='field has-addons'>
            <div className='control'>
              <input
                className='input is-primary'
                placeholder={'Current price is in nav bar.'}
                style={{width: '80%', marginLeft: '80px'}}
                value={this.state.tokenPrice}
                onChange={e => this.setState({tokenPrice: e.target.value})}
              />
            </div>
            <div className='control'>
              <a className='button' style={{marginRight: '24px'}}>
                USD
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  assumptionsContent() {
    return (
      <section>
        <div className='title is-5'>Assumptions</div>

        <div className='content'>
          <p>
            <strong>Note:</strong> The assumptions used in this calculator are
            based on data analysis from established DPoS networks, however, they
            are still just assumptions and real results may vary due to the
            difference in votes, votes distribution, number of delegates etc.
          </p>

          <ol type='i'>
            <li>
              There is 25% of the current circulating supply used to vote across
              all candidates, and as such, 630,126,001.30 IOTX is used in
              voting.
            </li>
            <li>
              Calculations are on a ‘worst case in which iotxplorer still
              receives block rewards’ basis.
            </li>
            <li>The top delegate has 2% of total votes.</li>
            <li>
              The 36th delegate (iotxplorer, for the purposes of these
              calculations) has 1.2% of total votes.
            </li>
            <li>
              iotxplorer{' '}
              <strong>redistributes 87% of the entire epoch bonus</strong>,
              keeping 13% as a ‘service fee’ to cover operating costs and fund
              IoTeX development projects and developer bounties.
            </li>
          </ol>
        </div>
      </section>
    );
  }

  render() {
    const results = this.calculateROI();

    return (
      <div>
        <div className='columns is-centered'>
          <div className='title is-4' style={{paddingTop: '16px'}}>
            Staking ROI calculator
          </div>
        </div>
        <div className='card-content'>
          <div className='columns'>
            <div className='column'>{this.assumptionsContent()}</div>
          </div>

          <div className='columns is-centered'>
            <div className='column is-7'>
              <div className='box' style={{boxShadow: 'none'}}>
                {this.calculatorContent()}
              </div>
            </div>
          </div>

          <div className='columns is-centered'>
            <div className='column is-3'>
              <div className='box box-custom'>
                <div className='heading has-text-centered'>ROI</div>
                <div className='title has-text-centered'>
                  {isNaN(results[0]) ? 0 : results[0]}%
                </div>
                <div className='level'>
                  <div className='level-item'>
                    <div className=''>
                      <div className='heading'>Total IOTX returned (yearly)</div>
                      <div className='has-text-centered'>
                        {isNaN(results[1]) ? 0 : results[1]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='column is-3'>
              <div className='box box-custom'>
                <div className='heading has-text-centered'>
                  Profit per year (USD)
                </div>
                <div className='title has-text-centered'>
                  ${isNaN(results[2]) ? 0 : results[2]}
                </div>
                <div className='level'>
                  <div className='level-item'>
                    <div className=''>
                      <div className='heading has-text-centered'>
                        Profit per year (IOTX)
                      </div>
                      <div className='has-text-centered'>
                        {isNaN(results[3]) ? 0 : results[3]} IOTX
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='columns is-centered'>
          <p style={{paddingTop: '16px', paddingBottom: '16px'}}>
            That's{' '}
            <strong>
              {' '}
              {isNaN(results[0]) ? 0 : (results[0] / 4.66).toFixed(2)}x
            </strong>{' '}
            better than EOS,{' '}
            <strong>
              {' '}
              {isNaN(results[0]) ? 0 : (results[0] / 7.85).toFixed(2)}x{' '}
            </strong>
            better than Tezos and{' '}
            <strong>
              {' '}
              {isNaN(results[0]) ? 0 : (results[0] / 3.7).toFixed(2)}x{' '}
            </strong>{' '}
            better than Cardano staking returns on average.
          </p>
        </div>
      </div>
    );
  }
}
