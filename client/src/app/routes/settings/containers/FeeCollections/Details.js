import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';

import { Field, reduxForm } from 'redux-form'
// import StarRating from 'react-rating'
// import moment from 'moment'

// import {RFField, RFDatePicker, RFRadioButtonList, RFReactSelect, RFTextArea} from '../../../../components/ui'

// import {required, email}  from '../../../../components/forms/validation/CustomValidation'
// import AlertMessage from '../../../../components/common/AlertMessage'
// import mapForCombo from '../../../../components/utils/functions'

// import {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'
// import Msg from '../../../../components/i18n/Msg' 

class Details extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    console.log('componentDidMount Details ...');
  }

  render() {

    return (<div>Details ...</div>);
  }
}

const afterSubmit = function(result, dispatch) {
    //console.log('hello edit');
    //console.log(result);
    dispatch(reset('Details'));
}

export default reduxForm({
  form: 'Details',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false
  // ,
  // asyncValidate,
  // asyncBlurFields: ['email']
})(Details)