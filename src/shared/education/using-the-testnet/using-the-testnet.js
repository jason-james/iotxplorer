import { styled } from "styletron-react";
import React, { Component } from "react";
import { Link } from "react-router";
import { EducationHeader } from "../education-header";

export class UsingTheTestnet extends Component {
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
                          to='/education/votingdelegating/'
                          style={{ backgroundColor: "#00d1b2", color: "#fff" }}
                        >
                          1. Voting and Delegating
                        </Link>
                      </li>
                    </EducationButton>
                    <EducationButton>
                      <li>
                        <Link
                          to='/education/usingthetestnet/'
                          style={{ backgroundColor: "#00d1b2", color: "#fff" }}
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
                        href='#docker-unix'
                      >
                        Launching a testnet node
                      </a>
                    </li>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='#interactingwithiotex'
                      >
                        Interacting with IoTeX blockchain
                      </a>
                    </li>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='#running-the-testnet'
                      >
                        Getting elected
                      </a>
                    </li>
                  </ul>
                </aside>
              </div>
              <div className='column is-9'>
                <div className='content is-medium'>
                  <h3 className='title is-3'>Using the testnet</h3>
                  <div id='#docker-unix' className='box'>
                    <UsingTestnetUnix />
                  </div>
                  <div id='#interactingwithiotex' className='box'>
                    <InteractingWithIoTeX />
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

const EducationButton = styled("ul", props => ({
  margin: "4px"
}));

class UsingTestnetUnix extends Component {
  render() {
    return (
      <section>
        <h4 className='title is-4'>IoTeX testnet via MacOS/Linux</h4>
        <hr />
        <article className='message is-primary'>
          <div className='message-body'>
            If you don't already have Docker installed on your machine, you can
            download it{" "}
            <a
              href='https://hub.docker.com/search/?type=edition&offering=community'
              target='_blank'
            >
              here
            </a>
          </div>
        </article>
        <p>
          First, download the testnet software from the official IoTeX github.
          You can achieve this by opening cmd and running:
        </p>
        <pre>
          <code className='language-bash'>
            git clone https://github.com/iotexproject/iotex-testnet
          </code>
        </pre>
        <p>
          Or if you don't have Git installed, you can simply{" "}
          <a
            href='https://github.com/iotexproject/iotex-testnet'
            target='_blank'
          >
            {" "}
            download the .zip{" "}
          </a>
          and extract it.
        </p>
        <h5 className='title is-5'>Configuring your node</h5>
        <p>
          Open the <code>config.yaml</code> file and add your external IP
          address next to the <code>externalHost</code> parameter. You can find
          your external IP address by simply searching the words "IP address" in
          Google.
        </p>
        <p>
          The first 6 lines of the config file should look something like this:{" "}
        </p>
        <pre>
          <code>
            network:
            <br />
            externalHost: xx.xx.xxx.xxx
            <br />
            externalPort: 4689
            <br />
            bootstrapNodes:
            <br />-
            '/dns4/bootnode-0.testnet.iotex.one/tcp/4689/ipfs/12D3KooWCb1nZdLsR6WBgXqmGnzRvhxASQJaAB3NgwTNk3JE43Wj'
            <br />-
            '/dns4/a12f5c5ca34a211e9809c02f3dedec74-0c7145ef4e7091ef.elb.us-west-2.amazonaws.com/tcp/4689/ipfs/12D3KooWEgPtefxSeWQHjXFdrze1NicjzqKyVmMgyxqRBRByqi2Q'
          </code>
        </pre>
        <h5 className='title is-5'>Using the config</h5>
        <p>
          We can now use that edited config file to tell our docker container
          how to run and where to store blockchain data. In your terminal, do
          the following:
        </p>
        <pre>
          <code>
            cd iotex-testnet
            <br />
            mkdir -p $IOTEX_HOME/data
            <br />
            mkdir -p $IOTEX_HOME/log
            <br />
            mkdir -p $IOTEX_HOME/etc
            <br />
            cp config.yaml $IOTEX_HOME/etc/
            <br />
            cp genesis.yaml $IOTEX_HOME/etc/
          </code>
        </pre>
        <h5 className='title is-5'>Start-up</h5>
        <p>
          We're already ready to run our testnet node! Open your terminal and
          run:
        </p>
        <pre>
          <code>
            docker run -d --name iotxplorer-testnet-tutorial \
            <br />
            -p 4689:4689 \
            <br />
            -p 14014:14014 \
            <br />
            -p 8080:8080 \
            <br />
            -v=$IOTEX_HOME/data:/var/data:rw \
            <br />
            -v=$IOTEX_HOME/log:/var/log:rw \
            <br />
            -v=$IOTEX_HOME/etc/config.yaml:/etc/iotex/config_override.yaml:ro \
            <br />
            -v=$IOTEX_HOME/etc/genesis.yaml:/etc/iotex/genesis.yaml:ro \
            <br />
            iotex/iotex-core:v0.5.0-rc5-hotfix1 \
            <br />
            iotex-server \<br />
            -config-path=/etc/iotex/config_override.yaml \<br />
            -genesis-path=/etc/iotex/genesis.yaml \<br />
            -plugin=gateway
          </code>
        </pre>
        <article className='message is-warning'>
          <div className='message-body'>
            NOTE: You have to replace v0.5.0-rc5-hotfix1 in the above block to
            be the correct name of the current testnet version. At the time of
            writing this guide, the version is v0.5.0-rc5-hotfix1.
          </div>
        </article>{" "}
        <h5 className='title is-5'>Is it working?</h5>
        <p>
          To check that it's all working correctly let's ask docker. In your
          terminal, type <code>docker container ls</code>. This will bring up a
          list of all running containers. You should see a container id, image
          name, and iotxplorer-testnet-tutorial in the entry.
        </p>
        <p>
          Now that we've confirmed the container is running, lets check the
          logs. Logs tell us everything going on in the blockchain. First open
          terminal. You have two choices, you can run
        </p>
        <pre>
          <code>docker logs -f iotxplorer-testnet-tutorial</code>
        </pre>
        <p>
          but that will get you some unformatted/hard to follow logs. For a
          prettier logging experience, we use
        </p>
        <pre>
          <code>
            docker logs -f --tail 20 IoTeX-Node | sed
            's/,"errorVerbose":"[^"]*"//g' | jq
          </code>
        </pre>
        <p>which puts the responses in a readable JSON format.</p>
        <h5 className='title is-5'>Ok, so I started a node. What now?</h5>
        Read the next section on 'Interacting with the IoTeX network' to find
        out.
      </section>
    );
  }
}

class InteractingWithIoTeX extends Component {
  render() {
    return (
      <div>
        <h4 className='title is-4'>Interacting with the IoTeX blockchain</h4>
        <hr />
        <h5 className='title is-5'>ioctl</h5>

        <p>
          ioctl is a command-line interface for interacting with IoTeX
          blockchains. With it, we can do things like check our delegate status,
          claim rewards, make accounts, wallets, post smart contracts, etc.
        </p>

        <h5 className='title is-5'>Installation</h5>
        <p>
          ioctl can actually be used outside of the container we just ran! You
          can use it anywhere on your computer after installing it. To install,
          open terminal and run:
        </p>
        <pre>
          <code>
            curl
            https://raw.githubusercontent.com/iotexproject/iotex-core/master/install-cli.sh
            | sh
          </code>
        </pre>
        <p>Then make sure ioctl is pointing to the testnet to get its data:</p>
        <pre>
          <code>ioctl config set endpoint api.testnet.iotex.one:80</code>
        </pre>
        <p>
          After it has finished downloading, simply type <code>ioctl</code>. You
          should then see some welcoming introductory text:
        </p>
        <p>
          <pre>
            <code>
              ioctl is a command-line interface for interacting with IoTeX
              blockchain.
              <br />
              <br />
              Usage:
              <br />
              ioctl [command]
              <br />
              <br />
              Available Commands:
              <br />
              {"  "}account{"     "}Deal with accounts of IoTeX blockchain
              <br />
              {"  "}action{"      "}Deal with actions of IoTeX blockchain
              <br />
              {"  "}bc{"          "}Deal with block chain of IoTeX blockchain
              <br />
              {"  "}config{"      "}Set or get configuration for ioctl
              <br />
              {"  "}help{"        "}Help about any command
              <br />
              {"  "}version{"     "}Print the version number of ioctl
              <br />
              {"  "}wallet{"      "}Manage accounts
              <br />
              <br />
              Flags:
              <br />
              {"  "}-h, --help{"   "}help for ioctl
              <br />
              Use "ioctl [command] --help" for more information about a command.
            </code>
          </pre>
        </p>
        <p>
          This is help text for ioctl, it is fairly self explanatory, but lets
          do one test for clarity.
        </p>
        <h5 className='title is-5'>Making an iotex account</h5>
        <p>
          One use of ioctl is making accounts. To see how this works, type{" "}
          <code>ioctl account create</code> and bam! Like magic, you will get a
          response object containing a public and private key which you can use
          to do whatever you wish.
        </p>
        <p>
          The other commands all work in a similar fashion, be encouraged to try
          out all the commands and explore the different things you can do
          alone. The next section will be all about how to get elected and use
          the testnet as a delegate.
        </p>
      </div>
    );
  }
}
