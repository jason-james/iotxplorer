import Component from "inferno-component";
import { t } from "../../lib/iso-i18n";
import { ToolTip } from "../common/tooltip";
import { publicKeyToAddress } from "iotex-antenna/lib/crypto/crypto";

import {
  BLOCKS,
  DASHBOARD,
  SITE_URL,
  EXECUTIONS,
  TRANSFERS,
  VOTES,
  WALLET,
  IOTEX_URL,
  NAV
} from "../common/site-url";
import { fetchPost } from "../../lib/fetch-post";
import serialize from "form-serialize";
import window from "global/window";

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

  // handleSubmit(e: { preventDefault: any }) {
  //   e.preventDefault();

  //   const formData = serialize(this._form, { hash: true });
  //   this.setState({ fetching: true });
  //   if (formData.search !== "") {
  //     fetchPost(NAV.FUZZY_SEARCH, { hashStr: `${formData.search}` }).then(
  //       res => {
  //         if (res.ok === true) {
  //           if (res.result.block) {
  //             window.location = `/blocks/${formData.search}`;
  //             return;
  //           }

  //           if (res.result.transfer) {
  //             window.location = `/transfers/${formData.search}`;
  //             return;
  //           }

  //           if (res.result.vote) {
  //             window.location = `/votes/${formData.search}`;
  //             return;
  //           }

  //           if (res.result.execution) {
  //             window.location = `/executions/${formData.search}`;
  //             return;
  //           }
  //         } else {
  //           this.setState({ error: true });
  //         }
  //       }
  //     );
  //   }
  // }

  searchInput = e => {
    e.preventDefault();

    let { value } = this.state;
    const height = parseInt(value, 10);
    value = value.trim();

    if (value.startsWith("io")) {
      window.location = `/address/${value}`;
    } else if (value.length === 130) {
      window.location = `/address/${publicKeyToAddress(value)}`;
    } else if (height) {
      fetchPost(DASHBOARD.BLOCK_METAS, {
        start: +value,
        count: 1
      }).then(res => {
        window.location = `/blocks/${res.blockMetas[0].hash}`;
      });

      //block by hash
    } else {
      try {
        fetchPost(DASHBOARD.BLOCK_META, { blkHash: value }).then(res => {
          const validBlockHash = res.blockMeta[0].hash;
          if (validBlockHash) {
            window.location = `blocks/${validBlockHash}`;
          }
        });
      } catch (err) {
        try {
          //actions by hash
        } catch (err) {
          window.location = "/notfound";
        }
      }

      // } else {
      //   try {
      //     const validAction = await client.query({
      //       query: GET_ACTIONS,
      //       variables: {
      //         byHash: {
      //           actionHash: value,
      //           checkingPending: true
      //         }
      //       }
      //     });
      //     if (validAction) {
      //       window.location = `/action/${value}`
      //     }
      //   } catch (error) {
      //     try {
      //       const validBlock = await client.query({
      //         query: GET_ACTIONS,
      //         variables: {
      //           byBlk: {
      //             blkHash: value,
      //             start: 0,
      //             count: 1
      //           }
      //         } as GetActionsRequest
      //       });

      //       if (validBlock) {
      //         history.push(`/blocks/${value}`);
      //       }
      //     } catch (error) {
      //       history.push(`/notfound`);
      //     }
      //   }
    }
  };

  render() {
    return (
      <form onSubmit={e => this.searchInput(e)}>
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
              placeholder='Search an address, block hash, block height or action hash'
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
