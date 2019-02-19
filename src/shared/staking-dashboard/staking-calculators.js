import Component from 'inferno-component';
import {assetURL} from '../../lib/asset-url'
import {ToolTip} from '../../shared/common/tooltip'

export class StakingCalc extends Component {

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
            <input className='input is-primary' placeholder='The higher the better.' style={{width:'80%', marginLeft:'32px', marginRight:'24px'}}></input>
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
            <input className='input is-primary' placeholder='The higher the better, again.' style={{width:'80%', maxWidth:'391px', marginLeft:'32px', marginRight:'24px'}}></input>
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
            <input className='input is-primary' placeholder={`You know what we're gonna say.`} style={{width:'80%', maxWidth:'391px', marginLeft:'32px', marginRight:'24px'}}></input>
            </div>
            </section>

        )
    }
    

    render() {
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
            <div class="title">12%</div>
            <div class="level">
              <div class="level-item">
                <div class="">
                  <div class="heading">Total IOTX returned</div>
                  <div class="title is-5">250,000</div>
                </div>
              </div>
             
            </div>
          </div>
          <div class="box">
            <div class="heading">Profit per year</div>
            <div class="title">$2480 USD</div>
            <div class="level">
                <div>323220 IOTX</div>
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
