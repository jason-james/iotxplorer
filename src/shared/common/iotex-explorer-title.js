// @flow

import Component from 'inferno-component';
import {connect} from 'inferno-redux';
import document from 'global/document';
import window from 'global/window';
import {assetURL} from '../../lib/asset-url';


class IotexExplorerTitle extends Component {

  render() {
    return (
      <div className='column container landing-image' style={{textAlign: 'center'}}>
        <img
          src={assetURL('/light-iotxplorer-logo.png')}
          alt='iotxplorer'
          width='552'
          height='132'
        /><br/>
        <small className='version-text'>{`version ${this.props.version}`}</small>
      </div>
    );
  }
}

export const TitleContainer = connect(
  function mapStateToProps(state) {
    return {
      version: state.base.version,
    };
  }
)(IotexExplorerTitle);
