import { styled } from "styletron-inferno";
import Component from "inferno-component";
import { Link } from "inferno-router";

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
                        href='#docker-windows'
                      >
                        via Docker for Windows
                      </a>
                    </li>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='#docker-bash'
                      >
                        via Docker for Mac/Linux
                      </a>
                    </li>
                    <li>
                      <a
                        className='button is-light education-tag'
                        href='#running-the-testnet'
                      >
                        Exploring with ioctl
                      </a>
                    </li>
                  </ul>
                </aside>
              </div>
              <div className='column is-9'>
                <div className='content is-medium'>
                  <h3 className='title is-3'>Using the testnet</h3>
                  <div id='#docker-windows' className='box'>
                    <InstallingDockerWindows />
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

class InstallingDockerWindows extends Component {
  render() {
    return (
      <section>
        <h4 className='title is-4'>IoTeX testnet via Docker for Windows</h4>
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
          The first 7 lines of the config file should look something like this:{" "}
        </p>
        <pre>
          <code>
            network:
            <br />
            # If you have external IP, put it here and config the port you want
            to map from docker to host
            <br />
            externalHost: 'xx.xx.xxx.xxx'
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
        <h5 className='title is-5'>Start-up</h5>
        <p>We're already ready to run our testnet node! Open cmd and run:</p>
        <pre>
          <code>
            docker run --name iotxplorer-testnet-tutorial ^
            <br />
            -p 14014:14014 ^
            <br />
            -p 8080:8080 ^
            <br />
            -p 7788:7788 ^
            <br />
            -p 4689:4689 ^
            <br />
            -v=C:/Users/iotxplorer:/var/data:rw ^
            <br />
            -v=C:/Users/iotxplorer/iotex-testnet/config.yaml:/etc/iotex/config_override.yaml:ro
            ^
            <br />
            -v=C:/Users/iotxplorer/iotex-testnet/testnet_actions.yaml:/etc/iotex/testnet_actions_override.yaml:ro
            ^
            <br />
            -v=C:/Users/iotxplorer/iotex-testnet/genesis.yaml:/etc/iotex/genesis.yaml:ro
            ^
            <br />
            iotex/iotex-core:v0.5.0-rc2 ^
            <br />
            iotex-server -config-path=/etc/iotex/config_override.yaml
            -genesis-path=/etc/iotex/genesis.yaml
          </code>
        </pre>
        <article className='message is-warning'>
          <div className='message-body'>
            NOTE: You have to replace C:/Users/iotxplorer in the above block to
            the path where you installed your testnet file. Chances are it will
            be something like C:/Users/YOURNAME.
          </div>
        </article>{" "}
        <h5 className='title is-5'>Is it working?</h5>
        <p>
          To check that it's all working correctly you should see a lot of
          logging going on in the console. If you can't tell, hit{" "}
          <code>Ctrl+C</code> to stop following the logs, then run:{" "}
          <pre>
            <code>docker exec -i -t iotxplorer-testnet-tutorial /bin/bash</code>
          </pre>
          After, start the IoTeX command line tool by doing:{" "}
          <pre>
            <code>ioctl</code>
          </pre>
          You should then see some welcoming introductory text:
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
          This is help text for ioctl, the IoTeX command line tool. It's used to
          explore the testnet and do things like account creation, wallet
          creation, data fetching etc. We will explore it more in depth in the
          following sections.
        </p>
      </section>
    );
  }
}
