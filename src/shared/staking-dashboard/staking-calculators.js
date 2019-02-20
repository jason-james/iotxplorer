import Component from 'inferno-component';
import {assetURL} from '../../lib/asset-url'
import {ToolTip} from '../../shared/common/tooltip'

export class StakingCalc extends Component {

    state = {
      stakeAmount: null,
      stakeDuration: null,
      tokenPrice: null,
    }

    calculateROI() {
      const totalDelegateVotes36thplace = 7575120
      const overallRedist = 1711120

      const bonusVotes = Math.log(this.state.stakeDuration)/Math.log(1.2)
      const effectiveVotes = this.state.stakeAmount * (1+(bonusVotes/100))
      const percentOfTotalVotes = (effectiveVotes / totalDelegateVotes36thplace)
      const amountGivenBack = ((percentOfTotalVotes * overallRedist) + this.state.stakeAmount)
      const ROI = ((parseInt(amountGivenBack) - this.state.stakeAmount)/this.state.stakeAmount) * 100
      const profitIOTX = amountGivenBack - this.state.stakeAmount
      const profitUSD = this.state.tokenPrice * profitIOTX

      return [ROI.toFixed(1), amountGivenBack.toFixed(1), profitUSD.toFixed(2), profitIOTX.toFixed(1)]
    }

    calculatorContent() {
        return (
            <section>
            <div className='level'>  
             <div className='level-left'>
            <img 
            src={assetURL('/one.svg')}
            width='100'
            height='100'
            />
            </div> 
            <p style={{paddingLeft:'24px'}}>Set the amount of IOTX you want to stake</p>
            <ToolTip
              iconClass={'fas fa-question-circle has-text-primary'}
              message={'testtip'}
              customPadClass={'dashboard-tooltip'}
            />
            <div className='field has-addons'>
            <div className='control'>
            <input className='input is-primary has-addons' placeholder='The higher the better.' type='number' style={{marginLeft:'32px'}} 
                  value={this.state.stakeAmount}
                  onChange={e => this.setState({ stakeAmount: parseInt(e.target.value) })}>
            </input>
            </div>
            <div className='control'>
            <a className='button' style={{marginRight:'24px'}}>IOTX</a>
            </div>
            </div>
            </div>


            <div className='level'>  
             <div className='level-left'>
             <img 
            src={assetURL('/two.svg')}
            width='100'
            height='100'
            />
            </div> 
            <p style={{paddingLeft:'24px'}}>Set your stake duration</p>
            <ToolTip
                          iconClass={'fas fa-question-circle has-text-primary'}
                          message={'testtip'}
                          customPadClass={'dashboard-tooltip'}
                        />
            <div className='field has-addons'>
            <div className='control'>
            <input className='input is-primary' placeholder='The higher the better, again.' style={{width:'80%', maxWidth:'391px', marginLeft:'97px'}}
            value={this.state.stakeDuration}
            onChange={e => this.setState({ stakeDuration: e.target.value })}>
            </input>
            </div>
            <div className='control'>
            <a className='button' style={{marginRight:'24px'}}>Days</a>
            </div>
            </div>
            </div>

            <div className='level'>  
             <div className='level-left'>
             <img 
            src={assetURL('/three.svg')}
            width='100'
            height='100'
            />
            </div> 
            <p style={{paddingLeft:'24px'}}>Enter the price of 1 IOTX</p>
            <ToolTip
              iconClass={'fas fa-question-circle has-text-primary'}
              message={'testtip'}
              customPadClass={'dashboard-tooltip'}
            />
            <div className='field has-addons'>
            <div className='control'>
            <input className='input is-primary' placeholder={`Current price is in nav bar.`} style={{width:'80%', marginLeft:'80px'}}
            value={this.state.tokenPrice}
            onChange={e => this.setState({ tokenPrice: e.target.value })}>
            </input>
            </div>
            <div className='control'>
            <a className='button' style={{marginRight:'24px'}}>USD</a>
            </div>
            </div>
            </div>


            </section>

        )
    }
    

    render() {

      const results = this.calculateROI()

        return (
            <div className='columns'>
            <div className='column is-half'>
            <div className='box'>
            Assumptions here
            </div>
            </div>

            <div className='column is-half'>
            <div className='box'>
            <div className='columns'>
        <div className='column'>
        {this.calculatorContent()}
        </div>
        <div className='columns is-quarter is-multiline'>
        <div class="column">
          <div class="box is-centered">
            <div class="heading">ROI</div>
            <div class="title">{isNaN(results[0]) ? 0 : results[0] }%</div>
            <div class="level">
              <div class="level-item">
                <div class="">
                  <div class="heading">Total IOTX returned</div>
                  <div class="title is-5">{isNaN(results[1]) ? 0 : results[1] }</div>
                </div>
              </div>
             
            </div>
          </div>
          <div class="box">
            <div class="heading">Profit per year</div>
            <div class="title">${isNaN(results[2]) ? 0 : results[2] }</div>
            <div class="level">
                <div>{isNaN(results[3]) ? 0 : results[3] } IOTX</div>
            </div>
          </div>
        </div>

        </div>
        </div>
        </div>
        </div>
        </div>
        )
    }
}
