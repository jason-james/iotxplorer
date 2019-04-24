import {styled} from 'styletron-inferno';
import Component from 'inferno-component';
import inferno from 'inferno-component';
import {Link} from 'inferno-router';

import {EducationHeader} from '../education-header';
import {assetURL} from '../../../lib/asset-url';

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
                          className='is-active'
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
                        href='#overview'
                      >
                        Overview
                      </a>
                    </li>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='#use-cases'
                      >
                        Example Use Cases
                      </a>
                    </li>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='#important-links'
                      >
                        Important Links
                      </a>
                    </li>
                  </ul>
                </aside>
              </div>
              <div className='column is-9'>
                <div className='content is-medium'>
                  <h3 className='title is-3'>Understanding IoTeX</h3>
                  <div className='box'>
                    <h4 id='overview'>Overview</h4>
                    <hr />
                    <Introduction />
                  </div>

                  <div className='box'>
                    <h4 id='use-cases'>Example Use Cases</h4>
                    <hr />
                    <UseCases />
                  </div>

                  <div className='box'>
                    <h4 id='important-links' className='title is-4'>
                      Important Links
                    </h4>
                    <hr />
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
                          Iotxplorer official Telegram channel{' '}
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

function Introduction() {
  return (
    <div>
      <h5 style={{color: '#00d1b2'}}>What is IoTeX?</h5>
      <p>
        IoTeX is the auto-scalable and privacy-centric blockchain infrastructure
        for the Internet of Things (IoT). IoTeX is developing several in-house
        innovations to push the frontier of blockchain 3.0, including a
        blockchain-in-blockchain architecture for heterogeneous computing,
        lightning fast Roll-DPoS consensus mechanism, and lightweight
        privacy-preserving techniques. IoTeX is bringing machine-to-machine
        interaction and autonomous device coordination to the masses by
        “connecting the physical world, block by block.”
      </p>

      <h5 style={{color: '#00d1b2'}}>Who is the IoTeX team?</h5>
      <p>
        IoTeX’s global team is comprised of leading cryptography research
        scientists, top tier engineers (Google, Facebook, Uber, Intel, Bosch),
        and experienced ecosystem builders. The founding team consists of:
        <ul>
          <li>
            <a href='https://www.linkedin.com/in/raullenchai/' target='_blank'>
              Raullen Chai
            </a>{' '}
            - Ph.D in Cryptography and Research Scientist at University of
            Waterloo. Former Head of Cryptography R&D at Uber and Security
            Engineer at Google. 8+ years of experience in cryptography and
            blockchain.
          </li>
          <li>
            <a href='https://www.linkedin.com/in/donguo/' target='_blank'>
              Qevan Guo
            </a>{' '}
            - Ph.D in Machine Learning and Computer Vision at National
            University of Singapore. Former Engineering Manager and Research
            Scientist at Facebook. Investor and advisor to several startups. 20+
            publications and patents.
          </li>
          <li>
            <a
              href='https://www.linkedin.com/in/xinxin-fan-crypto/'
              target='_blank'
            >
              Xinxin Fan
            </a>{' '}
            - Ph.D in Cryptography at University of Waterloo. Senior Research
            Engineer at Bosch, with 14 years of research and industry experience
            in information security and cryptography. 40+ publications and
            patents.
          </li>
          <li>
            <a href='https://www.linkedin.com/in/cbetasun/' target='_blank'>
              Jing Sun
            </a>{' '}
            - Founding partner of Sparkland Capital. Led 40+ investments in
            blockchain, security, and IoT. Board director on numerous companies,
            with extensive experience in startups, investments, and building
            ecosystems.
          </li>
        </ul>
      </p>

      <h5 style={{color: '#00d1b2'}}>
        What is IoTeX trying to solve and how is it different from other
        projects?
      </h5>
      <p>
        Despite its rapid evolution, IoT is still far from achieving mass
        adoption and lacks “killer applications” that would draw new users to
        the ecosystem, due to issues such as low scalability, high operating
        costs, privacy concerns, and a lack of functional values. IoTeX is
        tackling these problems by combining cryptoeconomic incentives with a
        blockchain platform from scratch, tailor fit for IoT. The ultimate
        vision is to serve as the underlying infrastructure for all IoT devices,
        and to truly enable machine-to-machine interaction and autonomous device
        coordination.
      </p>
      <div className='column is-centered'>
        <img src={assetURL('/architecture.JPG')} />
      </div>
      <p>
        IoTeX is a long term, "technology first" project that is pushing the
        frontier of blockchain 3.0 with innovations in blockchain privacy,
        scalability, and speed. IoTeX is working on similar problems /
        innovations as other blockchain platforms; however, all design decisions
        (e.g., not sacrificing privacy for throughout) are made thoughtfully
        with the future in mind. The team's main innovations include:
        <ul>
          <li>
            <span style={{color: '00d1b2'}}>
              <strong>Blockchain-in-blockchain architecture</strong>
            </span>{' '}
            - utilization of a permissionless root chain and flexible sub-chains
            that enable private networks of connected device data, while also
            allowing for interoperability and secure cross-chain transfers of
            value and data.
          </li>
          <li>
            <span style={{color: '00d1b2'}}>
              <strong>Privacy-preserving techniques</strong>
            </span>{' '}
            - innovative and lightweight cryptography schemes, such as
            lightweight stealth addresses, bulletproofs, and constant size ring
            signatures, are utilized in sub-chains to hide sender, receiver, and
            transaction value, while still allowing for massive throughput.
          </li>
          <li>
            <span style={{color: '00d1b2'}}>
              <strong>Roll-DPoS consensus mechanism</strong>
            </span>{' '}
            - a randomized, delegated proof of stake consensus mechanism that
            provides lightning fast consensus and a more democratic governance
            model than other DPoS schemes.
          </li>
        </ul>
      </p>
      <p>Visit the links below to learn more!</p>
    </div>
  );
}

function UseCases() {
  return (
    <section>
      <h4 style={{color: '#00d1b2'}}>Smart Homes</h4>
      <p>
        In the existing smart home market, many IoT device manufacturers are
        still using out-of-date technologies to develop their products. They
        need a large amount of development work on their cloud. The cost of
        development and maintenance is high, and performance is low because of
        the round trip required to the cloud. Deploying their products onto
        IoTeX blockchain will largely reduce operating cost on engineering and
        cloud computing, and at the same time, largely increase the performance
        of their devices. In a simple smart light bulb example, with cloud
        technology, it takes two trips from user instruction to changing the
        state of a light bulb. Manufacturers are not cloud experts so often
        their service is not optimal. The round trip can take one to three
        seconds. This forces them to use cloud service by big IT companies.
        There are two downsides of using these cloud services:
        <ol>
          <li>
            Manufacturers can’t fully control the availability of cloud
            services.
          </li>
          <li>
            They need to continuously pay for the cloud service despite their
            one-time charge on selling their IoT devices.
          </li>
          <li>
            There are risks of their cloud, client side, or intranet being
            hacked causing user data to be stolen or home security problems.
          </li>
        </ol>
      </p>

      <p>
        In contrast, IoTeX blockchain manages the devices locally and interact
        with public chain on the internet when necessary. The public chain is
        maintained by community. There is no maintenance cost for IoT
        manufacturers. IoTeX blockchain has privacy protection that can prevent
        leaking data or control being hacked even if the intranet is not safe.
      </p>

      <div className='column is-centered'>
        <img src={assetURL('/smart-home.JPG')} />
      </div>

      <p>
        In addition to allowing IoT manufacturers to deploy their IoT devices on
        IoTeX blockchain, IoTeX will partner with IoT chip makers to develop
        IoTeX blockchainenabled chips to accelerate the design and manufacture
        cycles of IoT devices. IoT 34 manufacturers will simply integrate the
        chip to get their devices supported by IoTeX blockchain.
      </p>

      <h4 style={{color: '#00d1b2'}}>Shared Economies</h4>
      <p>
        In recent years, many companies have focused on shared economies, from
        rides sharing such as Uber/Lyft/Didi, home sharing such as Airbnb, bikes
        sharing such as Mobike/ ofo, to small item level sharing like battery
        banks, umbrellas, etc. They all provide people with a better living,
        although some of them are suffering from their business models. It is a
        different topic to discuss their business models; here we mainly focus
        on their technological architecture. Among all shared economies, ride
        sharing is the one that can’t avoid human operation. It is not an IoT
        powered economy, however, in the future, when autonomous car technology
        becomes mature and popular, ride sharing will be powered by IoT.
      </p>

      <p>
        All IoT powered shared economies share some similarities: they all
        require a lock that can be opened by a deposit and rental fee. It's very
        possible and also efficient to power the whole sharing and returning
        process using an IoT device. In centralized world, the economies are
        powered by a centralized cloud. There are various drawbacks:
        <ol>
          <li>
            A large deposit is held by a company that may not be trustworthy.
            Recently, there have been many cases worldwide where companies that
            offer bike sharing services can’t pay back deposits to its users.
          </li>
          <li>
            The shared economies are not completely driven by community. Many
            shared things are owned by a company. This has caused a waste of
            society resource. Take shared bikes as example. When the shared
            bikes companies are out of business, the bikes are disposed.
          </li>
          <li>
            Due to the centralized nature, the user data will be stored and
            controlled by one company. There are risk that either the cloud or
            the client can be hacked to obtain user data.
          </li>
        </ol>
      </p>

      <p>
        IoTeX, could be utilized to power these applications without the issues
        above and make shared economies decentralized and more efficient.
        Concretely, an IoTeX-powered shared economy provides the following
        benefits:
      </p>

      <div className='column is-centered'>
        <img src={assetURL('/sharing-economy.JPG')} />
      </div>

      <p>
        <ol>
          <li>
            The deposit is completely settled via smart contract. With no one
            holding back the money, returning of the deposit is always
            guaranteed. Users don’t have to trust a company to use the service.
          </li>
          <li>
            Each shared thing realizes its value and mission in an autonomous
            way. In the ecosystem, it doesn’t matter who owns the shared things
            in question. Everyone can own and contribute to the ecosystem. The
            economy can be run by community. As a result, companies can play a
            role of maintaining the IoT lock and manage the community. It is
            much lighter business model that companies can fast expand and serve
            more people.
          </li>
          <li>
            Again, users don’t have to trust the company to maintain their data.
            Their data is kept in the chain with privacy protection.
          </li>
        </ol>
      </p>
    </section>
  );
}
