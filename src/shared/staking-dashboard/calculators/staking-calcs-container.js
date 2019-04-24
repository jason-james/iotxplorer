import {connect} from 'inferno-redux';

import {Calculators} from '../calculators/staking-calcs';
// import * as actions from './staking-actions';

export const CalculatorsContainer = connect(
  function mapStateToProps(state) {
    return {
      state: state.calculators || null,
    };
  },
  dispatch => ({})
)(Calculators);
