import Component from "inferno-component";
import { ToolTip } from "../common/tooltip";
import { t } from "../../lib/iso-i18n";

export class CurrentProducer extends Component {
  // 1. Find current producer via getChainMeta, pass as prop

  // 2. Get delegates info from graph-ql. Compare ioOperatorAddr with producer address and extract the name

  // 3. Get the logo and website and iotex member page link from graph-ql comparing name from 2 with registeredName

  render() {
    if (this.props.tipBlockMeta) {
      let producerAddr = this.props.tipBlockMeta[15].producerAddress;
      if (
        this.props.allContractData.some(e => e.ioOperatorAddr === producerAddr)
      ) {
        let registeredName = e.name;

        if (
          this.props.memberInfo.some(i => i.registeredName === registeredName)
        ) {
          var producerName = i.name;
          var producerLogo = i.logo;
          var producerWebsite = i.website;
          var profileID = i.id;
        }
      }
    }
    profileID = "5c736ba72d01e727d88b9dea";
    producerName = "iotxplorer";
    producerWebsite = "https://www.iotxplorer.io";
    producerLogo =
      "https://imgc.iotex.io/dokc3pa1x/image/upload/v1551121446/delegates/iotxplorer/Group_2.png";
    let profile = `https://member.iotex.io/delegate/${profileID}`;

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
          <img src={producerLogo} width='200' height='200' />
        </div>
        <div className='has-text-centered'>
          <p className='title has-text-centered' style={{ fontSize: "1.8rem" }}>
            {producerName}
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
