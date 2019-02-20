import {connect} from 'inferno-redux';

import {HowToStake} from './how-to-stake';
// import * as actions from './staking-actions';

export const HowToStakeContainer = connect(
  function mapStateToProps(state) {
    return {
      state: state.howToStake || null,
    };
  },
  dispatch => ({

  }),
)(HowToStake);
