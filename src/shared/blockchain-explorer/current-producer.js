import Component from "inferno-component";
import { ToolTip } from "../common/tooltip";
import { t } from "../../lib/iso-i18n";
import { assetURL } from "../../lib/asset-url";
import { Link } from "inferno-router";

export class CurrentProducer extends Component {
  // 1. Find current producer via getChainMeta, pass as prop

  // 2. Get delegates info from graph-ql. Compare ioOperatorAddr with producer address and extract the name

  // 3. Get the logo and website and iotex member page link from graph-ql comparing name from 2 with registeredName

  render() {
    var producerLogo = assetURL("/blocks-spinner.svg");

    if (this.props.tipBlockMeta) {
      var producerAddr = this.props.tipBlockMeta[15].producerAddress;

      var newArray = this.props.allContractData.filter(function(el) {
        return el.ioOperatorAddr === producerAddr;
      });

      if (newArray !== [] && newArray[0]) {
        let registeredName = newArray[0].name;

        var prod = this.props.memberInfo.filter(function(el) {
          return el.registeredName === registeredName;
        });

        var producerName = prod[0].name;
        var producerLogo = prod[0].logo;
        var producerWebsite = prod[0].website;
        var profile = `https://member.iotex.io/delegate/${
          prod[0].id
        }/?utm_source=iotxplorer`;
      } else {
        var producerName = `RoboDelegate`;
        var producerWebsite = "https://www.iotex.io";
        var producerLogo = assetURL("/robodelegate.png");
        var profile = `https://www.iotex.io`;
      }
    }

    return (
      <div
        className='box box-custom'
        style='width: 100%;height:100%;min-height:300px'
      >
        <div>
          <h1 className='subtitle dashboard-title' style={{ color: "#4c4c4c" }}>
            Current Producer
          </h1>
          <ToolTip
            iconClass={"fas fa-question-circle"}
            message={t("rolldpos:msg")}
            customPadClass={"rollDpos-tooltip"}
          />
        </div>
        <div className='has-text-centered'>
          <img
            src={producerLogo}
            style={{ objectFit: "contain", height: "200px", width: "200px" }}
          />
        </div>
        <div className='has-text-centered'>
          <p
            className='title has-text-centered'
            style={{ fontSize: "1.8rem", color: "#363636" }}
          >
            <a
              href={`/address/${producerAddr}`}
              target='_blank'
              style={{ color: "#363636" }}
            >
              {producerName}
            </a>
          </p>
        </div>
        <div className='has-text-centered'>
          <a
            href={producerWebsite}
            target='_blank'
            class='button is-primary'
            style={{ marginRight: "8px", marginTop: "16px" }}
          >
            Website
          </a>
          <a
            href={profile}
            target='_blank'
            class='button is-primary'
            style={{ marginLeft: "8px", marginTop: "16px" }}
          >
            Profile
          </a>
        </div>
      </div>
    );
  }
}
