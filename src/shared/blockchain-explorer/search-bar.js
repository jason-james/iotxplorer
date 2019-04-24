import Component from "inferno-component";
import { publicKeyToAddress } from "iotex-antenna/lib/crypto/crypto";
import window from "global/window";
import { t } from "../../lib/iso-i18n";

import { DASHBOARD, ACTION } from "../common/site-url";
import { fetchPost } from "../../lib/fetch-post";

export class SearchBar extends Component {
  _form: any;
  props: {
    chains: Array<{
      name: string,
      url: string
    }>
  };

  constructor(props: any) {
    super(props);
    this.state = {
      error: false,
      value: ""
    };
  }

  handleSearch = e => {
    e.preventDefault();

    let { value } = this.state;
    value = value.trim();

    if (value.startsWith("io")) {
      window.location = `/address/${value}`;
    } else if (value.length === 130) {
      window.location = `/address/${publicKeyToAddress(value)}`;
    } else if (isNormalInteger(value)) {
      fetchPost(DASHBOARD.BLOCK_METAS, {
        start: Number(value),
        count: 1
      }).then(res => {
        window.location = `/blocks/${res.blockMetas[0].hash}`;
      });
    } else {
      // block by hash
      fetchPost(DASHBOARD.BLOCK_META, { blkHash: value }).then(res => {
        try {
          const validBlockHash = res.blockMeta[0].hash;
          if (validBlockHash) {
            window.location = `blocks/${validBlockHash}`;
          }
        } catch (err) {
          // actions by hash
          fetchPost(ACTION.GET, {
            byHash: {
              actionHash: value,
              checkingPending: true
            }
          }).then(res => {
            try {
              const actionInfo = res.actionInfo[0];
              if (actionInfo) {
                window.location = `actions/${actionInfo.actHash}`;
              }
            } catch (err) {
              // invalid block num/block hash/action hash/address
              console.log(err);
              window.location = "/notfound";
            }
          });
        }
      });
    }
  };

  render() {
    return (
      <form onSubmit={e => this.handleSearch(e)}>
        <div className='field has-addons'>
          <div className='container main-search-bar control'>
            <input
              name='search'
              className={`input ${
                this.state.error === true ? "is-danger" : ""
              }`}
              type='text'
              style={{
                width: "60%",
                height: "70px",
                fontSize: "20pt",
                textAlign: "center",
                lineHeight: "70px",
                borderBottomLeftRadius: "3px",
                borderTopLeftRadius: "3px"
              }}
              placeholder='Search an address, block hash, block height or action'
              onChange={e => {
                this.setState({ error: false, value: e.target.value });
              }}
            />
            <button
              className='button is-primary'
              style={{
                height: "70px",
                borderBottomRightRadius: "3px",
                borderTopRightRadius: "3px"
              }}
            >
              <span class='icon'>
                <i class='fas fa-search' />
              </span>
              <span>Search</span>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

function isNormalInteger(str) {
  const n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
}
