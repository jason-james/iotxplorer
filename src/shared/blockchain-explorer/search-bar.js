import Component from "inferno-component";
import { t } from "../../lib/iso-i18n";
import { ToolTip } from "../common/tooltip";
import {
  BLOCKS,
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
      error: false
    };
  }

  handleSubmit(e: { preventDefault: any }) {
    e.preventDefault();

    const formData = serialize(this._form, { hash: true });
    this.setState({ fetching: true });
    if (formData.search !== "") {
      fetchPost(NAV.FUZZY_SEARCH, { hashStr: `${formData.search}` }).then(
        res => {
          if (res.ok === true) {
            if (res.result.block) {
              window.location = `/blocks/${formData.search}`;
              return;
            }

            if (res.result.transfer) {
              window.location = `/transfers/${formData.search}`;
              return;
            }

            if (res.result.vote) {
              window.location = `/votes/${formData.search}`;
              return;
            }

            if (res.result.execution) {
              window.location = `/executions/${formData.search}`;
              return;
            }
          } else {
            this.setState({ error: true });
          }
        }
      );
    }
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)} ref={r => (this._form = r)}>
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
              // placeholder={t('nav.fuzzy.search.placeholder')}
              placeholder='Search the IoTeX network by block/transaction/execution/vote.'
              onChange={() => {
                this.setState({ error: false });
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
