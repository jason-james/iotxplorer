import { styled } from "styletron-inferno";
import Component from "inferno-component";
import { Link } from "inferno-router";

import { EducationHeader } from "../education-header";

export class UnderstandingIoTeX extends Component {
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
                          style={{ backgroundColor: "#00d1b2", color: "#fff" }}
                        >
                          0. Understanding IoTeX
                        </Link>
                      </li>
                    </EducationButton>
                    <EducationButton>
                      <li>
                        <Link
                          to='/education/usingthetestnet/'
                          className='is-active'
                        >
                          1. Using the testnet
                        </Link>
                      </li>
                    </EducationButton>
                    <EducationButton>
                      <li>
                        <Link
                          to='/education/votingdelegating/'
                          className='is-active'
                        >
                          2. Voting and Delegating
                        </Link>
                      </li>
                    </EducationButton>
                  </ul>
                  <p className='menu-label'>Contents</p>
                  <ul className='menu-list'>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='#general'
                      >
                        General
                      </a>
                    </li>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='#official'
                      >
                        Official
                      </a>
                    </li>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='#iotxplorer'
                      >
                        iotxplorer
                      </a>
                    </li>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='#community-forums'
                      >
                        Community Forums
                      </a>
                    </li>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='#developer-groups'
                      >
                        Developer Groups
                      </a>
                    </li>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='#wallets'
                      >
                        Wallets
                      </a>
                    </li>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='#related-content'
                      >
                        IoTeX related content
                      </a>
                    </li>
                  </ul>
                </aside>
              </div>
              <div className='column is-9'>
                <div className='content is-medium'>
                  <h3 className='title is-3'>Understanding IoTeX</h3>
                  <div className='box'>
                    <h4 id='general' className='title is-4'>
                      General
                    </h4>
                    <ul>
                      <li>
                        <a href='https://www.youtube.com/watch?v=QX3M8Ka9vUA'>
                          The Third Industrial Revolution: A Radical New Sharing
                          Economy
                        </a>
                      </li>
                      <li>
                        <a href='https://www.youtube.com/watch?v=sDNN0uH2Z3o'>
                          Why blockchain matters
                        </a>
                      </li>
                      <li>
                        <a href='https://www.youtube.com/watch?v=QSIPNhOiMoE'>
                          How the internet of things works
                        </a>
                      </li>
                      <li>
                        <a href='https://www.youtube.com/watch?v=7whuMYkNnLY'>
                          IoTeX at CES: Data Privacy + IoT
                        </a>
                      </li>
                    </ul>
                    <h4 id='official' className='title is-4'>
                      Official
                    </h4>
                    <ul>
                      <li>
                        <a href='https://www.youtube.com/watch?v=gIVskvgzG9M'>
                          Introduction to IoTeX
                        </a>
                      </li>
                      <li>
                        <a href='https://iotex.io'>IoTeX Website</a>
                      </li>
                      <li>
                        <a href='https://medium.com/iotex'>IoTeX Medium</a>
                      </li>
                      <li>
                        <a href='https://www.youtube.com/channel/UCdj3xY3LCktuamvuFusWOZw'>
                          IoTeX Youtube
                        </a>
                      </li>
                      <li>
                        <a href='https://forum.iotex.io/'>IoTeX Forum</a>
                      </li>
                      <li>
                        <a href='https://reddit.com/r/iotex'>IoTeX Subreddit</a>
                      </li>
                      <li>
                        <a href='https://github.com/iotexproject'>
                          IoTeX Github
                        </a>
                      </li>
                      <li>
                        <a href='https://s3.amazonaws.com/web-iotex-static/home/IoTeX_Whitepaper_1.5_EN.pdf'>
                          IoTeX Whitepaper
                        </a>
                      </li>
                      <li>
                        <a href='https://s3.amazonaws.com/web-iotex-static/home/IoTeX_DKSAP_IOT_EN.pdf'>
                          Dual Key Stealth Address for IoT Academic Paper
                        </a>
                      </li>
                      <li>
                        <a href='https://iotex.io/academics-pbft.pdf'>
                          Scalable Practical Byzantine Fault Tolerance Academic
                          Paper
                        </a>
                      </li>
                      <li>
                        <a href='https://iotex.io/yellow-paper'>
                          Roll DPoS yellow paper
                        </a>
                      </li>
                      <li>
                        <a href='https://www.youtube.com/watch?v=wQR3zoqd4EM'>
                          Blockchain for Smart Homes: Proof of Concept
                        </a>
                      </li>
                    </ul>
                    <h4 id='iotxplorer' className='title is-4'>
                      iotxplorer
                    </h4>
                    <ul>
                      <li>
                        <a href='https://twitter.com/iotxplorer'>Twitter</a>
                      </li>
                      <li>
                        <a href='https://t.me/iotxplorer'>Telegram group</a>
                      </li>
                      <li>
                        <a href='https://www.iotxplorer.io'>Block explorer</a>
                      </li>
                      <li>
                        <a href='https://medium.com/@iotxplorer'>Medium </a>
                      </li>
                      <li>
                        <a href='https://member.iotex.io/delegate/5c736ba72d01e727d88b9dea'>
                          Voting profile
                        </a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href='https://medium.com/@iotxplorer/who-we-are-an-introduction-to-iotxplorer-35005c020867'>
                          Who we are: an introduction to iotxplorer
                        </a>
                      </li>
                      <li>
                        <a href='https://medium.com/@iotxplorer/iotex-the-people-behind-the-project-iotxplorer-education-e51ce2570ef6'>
                          IoTeX: the people behind the project
                        </a>
                      </li>
                    </ul>
                    <h4 id='community-forums' className='title is-4'>
                      Community Forums
                    </h4>
                    <ul>
                      <li>
                        <a href='https://twitter.com/iotxplorer'>
                          IoTeX subreddit
                        </a>
                      </li>
                      <li>
                        <a href='https://forum.iotex.io/'>IoTeX forum</a>
                      </li>
                      <li>
                        <a href='https://t.me/iotexgroup'>
                          IoTeX official Telegram channel
                        </a>
                      </li>
                      <li>
                        <a href='https://t.me/iotxplorer'>
                          Iotxplorer official Telegram channel{" "}
                        </a>
                      </li>
                    </ul>
                    <h4 id='developer-groups' className='title is-4'>
                      Developer Groups
                    </h4>
                    <ul>
                      <li>
                        <a href='https://t.me/iotxplorer'>
                          Iotxplorer official Telegram Channel
                        </a>
                      </li>
                      <li>
                        <a href='https://gitter.im/iotex-dev-community/Lobby'>
                          IoTeX official Gitter channel
                        </a>
                      </li>
                    </ul>
                    <h4 id='wallets' className='title is-4'>
                      Wallets
                    </h4>
                    <ul>
                      <li>
                        <a href='https://metamask.io/'>Metamask</a>
                      </li>
                      <li>
                        <a href='https://www.myetherwallet.com/'>
                          MyEtherWallet
                        </a>
                      </li>
                    </ul>
                    <h4 id='related-content' className='title is-4'>
                      IoTeX related content (Community/Third parties)
                    </h4>
                    <ul>
                      <li>
                        <a href='https://hackernoon.com/finding-honey-in-a-bear-market-why-im-betting-big-on-iotex-the-ultimate-iot-blockchain-solution-205c5e9c5697'>
                          Finding Honey in a Bear Market: Why IoTeX
                        </a>
                      </li>
                      <li>
                        <a href='https://www.youtube.com/watch?v=yiQfaibTLm0'>
                          Boxmining interviews IoTeX founder Raullen Chai
                        </a>
                      </li>
                      <li>
                        <a href='https://www.youtube.com/watch?v=rb-f6AAGzus'>
                          IoTeX explained #1 - Blockchains in blockchain
                        </a>
                      </li>
                      <li>
                        <a href='https://www.youtube.com/watch?v=ysdFgTt70Lw'>
                          IoTeX explained #2 - Roll DPoS
                        </a>
                      </li>
                      <li>
                        <a href='https://www.youtube.com/watch?v=KdEFfkMwnuE'>
                          IoTeX explained #3 - Built in Privacy
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </section>
      </div>
    );
  }
}

const EducationButton = styled("education-buttons", props => ({
  margin: "2px"
}));
