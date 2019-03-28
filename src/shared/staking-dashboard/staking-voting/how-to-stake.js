import Component from "inferno-component";
import { StakingDashboardNav } from "../staking-dashboard-nav";
import { assetURL } from "../../../lib/asset-url";

export class HowToStake extends Component {
  render() {
    return (
      <div class='section'>
        <div class='columns'>
          <StakingDashboardNav activeClass='how-to-vote' />
          <div
            className='container is-fluid'
            style={{ marginLeft: "0px", paddingLeft: "0px" }}
          >
            <main class='column'>
              <section>
                <div
                  className='container is-fluid'
                  style={{ marginLeft: "0px", paddingLeft: "0px" }}
                >
                  <section
                    class='hero welcome is-small is-primary'
                    style={{
                      marginBottom: "26px"
                    }}
                  >
                    <div class='hero-body'>
                      <div class='container' style={{ margin: "0px" }}>
                        <h1 class='title'>How To Vote</h1>
                      </div>
                    </div>
                  </section>
                  <HowToStakeContent />
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export class HowToStakeContent extends Component {
  render() {
    return (
      <div className='container'>
        <div className='content'>
          <article className='message is-primary'>
            <div className='message-body'>
              Voting is easy! There are two ways to vote, both of which will be
              outlined here. Which method you use depends on whether or not you
              have already voted for someone else (so, voting using an existing
              bucket), or if you're a completely new voter (voting using a new
              bucket).
            </div>
          </article>

          <br />
          <h5 className='title is-5' style={{ color: "#00d1b2" }}>
            Vote using an existing bucket
          </h5>

          <p>
            <ol>
              <li>
                <p>
                  Login to MetaMask and visit the{" "}
                  <span>
                    <a href='https://member.iotex.io/my-votes' target='_blank'>
                      "My Votes"
                    </a>
                  </span>{" "}
                  page on the voting website. You will see your existing
                  buckets. If you have no existing buckets, go to the “Vote
                  using a new bucket” section below.
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
                A popup window will appear. In the Name field, enter "
                <strong>iotxplorerio</strong>" and press “OK”.
              </li>

              <br />
              <div className='columns is-centered'>
                <img src='https://cdn-images-1.medium.com/max/800/1*hnV3Novrk3xb_QFDxHV6Ig.png' />
              </div>

              <article className='message is-warning'>
                <div className='message-body'>
                  Remember, our Candidate Name is <strong>iotxplorerio</strong>,
                  not iotxplorer!
                </div>
              </article>

              <li>
                You will need to confirm a smart contract transaction in the
                MetaMask popup window. If a popup does not appear, please check
                your MetaMask plugin / txn queue. Ignore the “ALERT: Transaction
                Error” and press “Confirm”.
              </li>

              <br />
              <div className='columns is-centered'>
                <img src='https://cdn-images-1.medium.com/max/800/1*G_2Bwu5Wv1ULR4S86nCxaQ.png' />
              </div>

              <article className='message is-warning'>
                <div className='message-body'>
                  Note, you do not have to adjust the gas fees, but it can save
                  you some ETH if you do. Check at the end of this article for
                  our recommended gas fees!
                </div>
              </article>

              <li>
                Wait for the smart contract to process — once confirmed, you are
                all done! Visit the “My Votes” page after a minute or so to see
                your new vote.
              </li>
            </ol>
          </p>

          <hr />

          <h5 className='title is-5' style={{ color: "#00d1b2" }}>
            Vote using a new bucket
          </h5>

          <p>
            <ol>
              <li>
                Visit the voting website. Next to "iotxplorer", click the “Vote”
                button. You will be asked to install MetaMask before voting.
              </li>

              <br />
              <div className='columns is-centered'>
                <img src={assetURL("/voting-1.png")} />
              </div>

              <li>
                A popup window will appear. Fill out the form as followed:
                <ul>
                  <li>
                    Enter "<strong>iotxplorerio</strong>" for Candidate Name.
                  </li>
                  <li>
                    Input the amount of IOTX you wish to stake (1 IOTX = 1
                    Vote).
                  </li>
                  <li>Set a stake duration to get bonus votes (optional).</li>
                  <li>
                    Turn auto-stake on/off (optional). Setting a duration and
                    turning auto-stake on gets your more rewards.
                  </li>
                </ul>
                <br />
                <div className='columns is-centered'>
                  <img src={assetURL("/voting-4.JPG")} />
                </div>
              </li>

              <li>
                You will be prompted to review and confirm the voting
                transaction details. Click “Yes, make transaction” to confirm
                after you've double-checked everything.
              </li>

              <br />
              <div className='columns is-centered'>
                <img src={assetURL("/voting-5.JPG")} />
              </div>

              <li>
                You will need to confirm two smart contract transactions in two
                MetaMask pop-up windows. If pop-ups do not appear, please check
                your MetaMask plugin / txn queue.
                <ul>
                  <li>
                    Smart Contract #1 (left): Approve the staking smart contract
                    to transfer tokens from your wallet to the smart contract
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
                <img src={assetURL("/voting-6.png")} />
              </div>

              <li>
                <strong>Congratulations!</strong> You have successfully voted.
                Thank you for your support!
              </li>
            </ol>
          </p>

          <h5 className='title is-5' style={{ color: "#00d1b2" }}>
            RECOMMENDED GAS LIMITS:
          </h5>
          <p>
            <ul>
              <li>
                <strong>Vote/Stake:</strong>
                <ul>
                  <li>
                    1st window (approve):{" "}
                    <span style={{ color: "#00d1b2" }}>50,000</span>
                  </li>
                  <li>
                    2nd window (process):{" "}
                    <span style={{ color: "#00d1b2" }}>350,000</span>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Re-stake:</strong> (extend duration or turn auto-stake
                on/off): <span style={{ color: "#00d1b2" }}>200,000</span>
              </li>
            </ul>
          </p>
        </div>
      </div>
    );
  }
}
