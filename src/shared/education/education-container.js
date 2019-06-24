import { connect } from "react-redux";

import { Education } from "./education-home";
// import * as actions from './education-actions';

export const EducationContainer = connect(
  function mapStateToProps(state) {
    return {
      state: state.education || null
    };
  },
  dispatch => ({})
)(Education);
