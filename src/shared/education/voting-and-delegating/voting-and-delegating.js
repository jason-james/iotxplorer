import {styled} from 'styletron-inferno';
import Component from 'inferno-component';
import {Link} from 'inferno-router';
import {assetURL} from '../../../lib/asset-url';
import {EducationHeader} from '../education-header';

export class VotingAndDelegating extends Component {
  render() {
    return (
      <div>
        <EducationHeader />
        <section className='section'>
          <div className='container'>
            <div className='columns'>
              <div className='column is-3'>
                <aside className='is-medium menu'>
                  <p className='menu-label'>categories</p>
                  <ul className='menu-list education-buttons'>
                    <EducationButton>
                      <li className='is-right'>
                        <Link
                          to='/education/understandingiotex/'
                          style={{backgroundColor: '#00d1b2', color: '#fff'}}
                        >
                          0. Understanding IoTeX
                        </Link>
                      </li>
                    </EducationButton>
                    <EducationButton>
                      <li>
                        <Link
                          to='/education/votingdelegating/'
                          style={{backgroundColor: '#00d1b2', color: '#fff'}}
                        >
                          1. Voting and Delegating
                        </Link>
                      </li>
                    </EducationButton>
                    <EducationButton>
                      <li>
                        <Link
                          to='/education/usingthetestnet/'
                          className='is-active'
                        >
                          2. Using the testnet
                        </Link>
                      </li>
                    </EducationButton>
                  </ul>
                  <p className='menu-label'>Contents</p>
                  <ul className='menu-list'>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='#voters-handbook'
                      >
                        Voter's Handbook
                      </a>
                    </li>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='#how-to-vote'
                      >
                        How to Vote
                      </a>
                    </li>
                  </ul>
                </aside>
              </div>
              <div className='column is-9'>
                <div className='content is-medium'>
                  <h3 className='title is-3'>Voting and Delegating</h3>
                  <div className='box'>
                    <h4 id='voters-handbook' className='title is-4'>
                      Voter's Handbook
                    </h4>
                    <hr />
                    <VotersHandbook />
                  </div>
                  <div className='box'>
                    <h4 id='how-to-vote' className='title is-4'>
                      How to Vote
                    </h4>
                    <hr />
                    <HowToStakeContent />
                  </div>
                </div>
              </div>
            </div>{' '}
          </div>
        </section>
      </div>
    );
  }
}

const EducationButton = styled('education-buttons', props => ({
  margin: '2px',
}));

class VotersHandbook extends Component {
  render() {
    return (
      <section>
        <h5>IoTeX Delegate Program Overview</h5>
        <h6 style={{color: '#00d1b2'}}>What is the role of a Voter?</h6>
        <p>
          IoTeX is a digital democracy where token holders vote for{' '}
          <strong>Delegates</strong> to maintain and grow the network.
        </p>
        <p>
          The top 36 voted delegates are <strong>Consensus Delegates</strong>{' '}
          that manage consensus on behalf of the entire IoTeX network and so are
          responsible for:
          <ul>
            <li>Maintaining servers and network</li>
            <li>Creating and validating blocks</li>
            <li>Processing smart contracts and transactions</li>
          </ul>
        </p>
        <h6 style={{color: '#00d1b2'}}>How to become a Voter?</h6>
        <div className='columns is-centered'>
          <img
            src='https://cdn-images-1.medium.com/max/800/1*0HrnSl0R7r70Ihw5ae2cgg.png'
            className='is-centered'
          />
        </div>
        <p>
          Any token holder who stakes IOTX and votes for an IoTeX delegate is a
          "Voter". A delegate is someone who stakes over 1.2 million IOTX and
          receives over 2 million total votes.
        </p>
        <h5>Voter Requirements</h5>
        <p>
          Voters have 3 requirements:
          <ol>
            <li>
              <strong>Delegates website</strong>
            </li>
            <ul>
              <li>
                Voters will use the IoTeX delegates website to view all delegate
                candidates and vote
              </li>
              <li>
                There is a smart contract integrated into the website which
                voters must use to access the MetaMask web tool
              </li>
            </ul>
            <li>
              <strong>MetaMask webtool</strong>
            </li>
            <ul>
              <li>
                Install MetaMask - it is the bridge between your wallet and the
                IoTeX voting smart contract
              </li>
            </ul>
            <li>
              <strong>IOTX tokens</strong>
            </li>
            <ul>
              <li>
                To stake/vote, you will need IoTeX ERC-20 tokens (IOTX) which
                you can purchase on exchanges
              </li>
            </ul>
          </ol>
        </p>

        <h6 style={{color: '#00d1b2'}}>Staking</h6>
        <p>
          There are two concepts that voters need to be aware of:
          <ol>
            <li>Staking IOTX to generate voting power</li>
            <ul>
              <li>
                Token holders stake IOTX tokens to get votes. 1 IOTX = 1 Vote
              </li>
              <li>
                Setting a stake duration generates bonus votes based on the
                formula Bonues votes = log<sub>1.2</sub>*(Stake duration)
              </li>
            </ul>
            <li>Auto-staking to maintain bonus votes</li>
            <ul>
              <li>
                Bonus votes will reduce over time if not auto-staked. They
                diminish every day and trend towards 0 at the end of the stake
                duration. To maintain bonus votes (i.e. no dimishing bonuses),
                you can auto-stake for a specific duration.
              </li>
            </ul>
          </ol>
        </p>
        <div className='columns is-centered'>
          <img
            src='https://cdn-images-1.medium.com/max/800/0*EooVt2Rb06XHWORK'
            className='is-centered'
          />
        </div>

        <h6 style={{color: '#00d1b2'}}>Voting</h6>
        <p>
          To vote for a delegate, you must use a voting smart contract. One
          wallet can create multiple "buckets" which means you can vote for
          multiple delegates. One bucket per delegate.
        </p>
        <p>
          You can redirect your votes to a new delegate and extend your stake
          duration at any time.
        </p>
        <p>
          If you don't set a stake duration, you can unstake at any time, but
          you won't receive any bonus voting power.
        </p>

        <h6 style={{color: '#00d1b2'}}>Ranking</h6>
        <p>
          Delegates are rank-ordered in real time based on their total votes
        </p>
        <p>
          A Delegate’s total votes includes votes for oneself (self-stake) and
          votes from other token holders.
        </p>
        <p>
          The top 36 voted Delegates are the Consensus Delegates for the current
          epoch, and of these 36, 24 are randomly
        </p>

        <h6 style={{color: '#00d1b2'}}>Rewards for Delegates</h6>
        <p>Delegates are rewarded in IOTX tokens every epoch</p>
        <p>
          Rewards are distributed from the rewards pool, consisting of:
          <ul>
            <li>Reserved mining tokens (1.2 million IOTX)</li>
            <li>
              Transaction fees (all gas fees from IoTeX network transactions)
            </li>
            <li>
              Other contributions (donations from IoTeX foundation or other
              parties)
            </li>
          </ul>
        </p>

        <h6 style={{color: '#00d1b2'}}>Rewards for Voters</h6>
        <p>
          Rewards for voters will vary based upon which delegate the voter has
          voted for.
        </p>
        <div className='columns is-centered'>
          <img src='https://i.imgur.com/efifhdj.png' />
        </div>
        <p>
          Generally, delegates will split their delegate rewards into roughly 3
          sections:
          <ul>
            <li>Hardware/infrastructure costs</li>
            <li>Community/development funds</li>
            <li>Rewards for voters</li>
          </ul>
        </p>
        <p>
          For iotxplorer in particular, we have pledged to give 87% of all our
          reward bonuses to our voters. The majority of the remaining funds will
          be spent on dApp development and adding value to the network, and some
          will be used to cover hardware costs.
        </p>
      </section>
    );
  }
}

function HowToStakeContent() {
  return (
    <section>
      <article className='message is-primary'>
        <div className='message-body'>
          Voting is easy! There are two ways to vote, both of which will be
          outlined here. Which method you use depends on whether or not you have
          already voted for someone else (so, voting using an existing bucket),
          or if you're a completely new voter (voting using a new bucket).
        </div>
      </article>

      <br />
      <h5 className='title is-5' style={{color: '#00d1b2'}}>
        Vote using an existing bucket
      </h5>

      <p>
        <ol>
          <li>
            <p>
              Login to MetaMask and visit the{' '}
              <span>
                <a href='https://member.iotex.io/my-votes' target='_blank'>
                  "My Votes"
                </a>
              </span>{' '}
              page on the voting website. You will see your existing buckets. If
              you have no existing buckets, go to the “Vote using a new bucket”
              section below.
            </p>
          </li>
          <br />
          <li>
            To vote using an existing bucket, click the “Vote Now!” button.
          </li>

          <br />
          <div className='columns is-centered'>
            <img src='https://cdn-images-1.medium.com/max/800/1*C4vrGXEgaGypUgWn7JtGVA.png' />
          </div>

          <li>
            A popup window will appear. In the Name field, enter the Candidate
            Name of the delegate you want to vote for and press “OK”. Note
            Candidate Name and delegate name aren't always the same. For
            example, our delegate name is "iotxplorer" but our Candidate Name is
            "<strong>iotxplorerio</strong>"
          </li>

          <br />
          <div className='columns is-centered'>
            <img src='https://cdn-images-1.medium.com/max/800/1*hnV3Novrk3xb_QFDxHV6Ig.png' />
          </div>

          <li>
            You will need to confirm a smart contract transaction in the
            MetaMask popup window. If a popup does not appear, please check your
            MetaMask plugin / txn queue. Ignore the “ALERT: Transaction Error”
            and press “Confirm”.
          </li>

          <br />
          <div className='columns is-centered'>
            <img src='https://cdn-images-1.medium.com/max/800/1*G_2Bwu5Wv1ULR4S86nCxaQ.png' />
          </div>

          <article className='message is-warning'>
            <div className='message-body'>
              Note, you do not have to adjust the gas fees, but it can save you
              some ETH if you do. Check at the end of this article for our
              recommended gas fees!
            </div>
          </article>

          <li>
            Wait for the smart contract to process — once confirmed, you are all
            done! Visit the “My Votes” page after a minute or so to see your new
            vote.
          </li>
        </ol>
      </p>

      <hr />

      <h5 className='title is-5' style={{color: '#00d1b2'}}>
        Vote using a new bucket
      </h5>

      <p>
        <ol>
          <li>
            Visit the voting website. Next to the delegate you want to vote for,
            click the “Vote” button. You will be asked to install MetaMask
            before voting.
          </li>

          <br />
          <div className='columns is-centered'>
            <img src={assetURL('/voting-1.png')} />
          </div>

          <li>
            A popup window will appear. Fill out the form as followed:
            <ul>
              <li>
                Enter their Candidate Name. Note, the delegate name may not be
                the same as their Candidate name, for example ours is iotxplorer
                but our Candidate Name is "<strong>iotxplorerio</strong>".
              </li>
              <li>
                Input the amount of IOTX you wish to stake (1 IOTX = 1 Vote).
              </li>
              <li>Set a stake duration to get bonus votes (optional).</li>
              <li>
                Turn auto-stake on/off (optional). Setting a duration and
                turning auto-stake on gets your more rewards.
              </li>
            </ul>
            <br />
            <div className='columns is-centered'>
              <img src={assetURL('/voting-4.JPG')} />
            </div>
          </li>

          <li>
            You will be prompted to review and confirm the voting transaction
            details. Click “Yes, make transaction” to confirm after you've
            double-checked everything.
          </li>

          <br />
          <div className='columns is-centered'>
            <img src={assetURL('/voting-5.JPG')} />
          </div>

          <li>
            You will need to confirm two smart contract transactions in two
            MetaMask pop-up windows. If pop-ups do not appear, please check your
            MetaMask plugin / txn queue.
            <ul>
              <li>
                Smart Contract #1 (left): Approve the staking smart contract to
                transfer tokens from your wallet to the smart contract
              </li>
              <li>
                Smart Contract #2 (right): Confirm the actual smart contract
                transaction — please ignore the “ALERT: Transaction Error”
                dialog.
              </li>
            </ul>
          </li>

          <br />
          <div className='columns is-centered'>
            <img src={assetURL('/voting-6.png')} />
          </div>

          <li>
            <strong>Congratulations!</strong> You have successfully voted. Well
            done for playing your part in securing the IoTeX network.
          </li>
        </ol>
      </p>

      <h5 className='title is-5' style={{color: '#00d1b2'}}>
        RECOMMENDED GAS LIMITS:
      </h5>
      <p>
        <ul>
          <li>
            <strong>Vote/Stake:</strong>
            <ul>
              <li>
                1st window (approve):{' '}
                <span style={{color: '#00d1b2'}}>50,000</span>
              </li>
              <li>
                2nd window (process):{' '}
                <span style={{color: '#00d1b2'}}>350,000</span>
              </li>
            </ul>
          </li>
          <li>
            <strong>Re-stake:</strong> (extend duration or turn auto-stake
            on/off): <span style={{color: '#00d1b2'}}>200,000</span>
          </li>
        </ul>
      </p>
    </section>
  );
}
