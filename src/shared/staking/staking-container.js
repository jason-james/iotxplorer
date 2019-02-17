import {connect} from 'inferno-redux';

import {Staking} from './staking';
// import * as actions from './staking-actions';

export const StakingContainer = connect(
  function mapStateToProps(state) {
    return {
      state: state.staking || null,
    };
  },
  dispatch => ({

  }),
)(Staking);
