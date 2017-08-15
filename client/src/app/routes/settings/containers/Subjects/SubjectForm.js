import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { Field, reduxForm } from 'redux-form'

import {required}  from '../../../../components/forms/validation/CustomValidation' 
import {RFField} from '../../../../components/ui'

import AlertMessage from '../../../../components/common/AlertMessage'
import Msg from '../../../../components/i18n/Msg' 

class SubjectForm extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      editDataLoaded: false 
    } 
  }
  
  componentDidMount(){ 
      
    const initData = {
        "subjectId": 0
      }        

    this.props.initialize(initData); 
  } 

  render() {
    const { subjectId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props    

    return (
            <form id="form-subject" className="smart-form" 
                onSubmit={handleSubmit}>

              <fieldset>
                    
                <div className="row">
                  <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
                    <Field name="code" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-barcode"
                      validate={required} component={RFField} 
                      maxLength="10" type="text" placeholder="" 
                      label="CodeText" />    
                  </section>

                  <section className="remove-col-padding col-sm-9 col-md-9 col-lg-9">
                    
                  </section>
                </div>

                <div className="row">
                  <section className="remove-col-padding col-sm-6 col-md-6 col-lg-6">
                    <Field name="name" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-file-text-o"
                      validate={required} component={RFField} 
                      maxLength="100" type="text" placeholder="" 
                      label="NameText" />
                  </section>

                  <section className="remove-col-padding col-sm-6 col-md-6 col-lg-6">
                    <Field name="nameAr" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-file-text-o"
                      validate={required} component={RFField} 
                      maxLength="100" type="text" placeholder="" 
                      label="NameArText" />
                  </section> 
                </div>

              </fieldset>
              
              {(error!==undefined && <AlertMessage type="w" 
                          icon="alert-danger" message={error} />)}

              <footer>
                <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary">
                  { subjectId > 0 ? <Msg phrase="UndoChangesText" /> : <Msg phrase="ResetText"/> }
                </button>
                <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
                  <Msg phrase="SaveText"/>
                </button>
              </footer>

            </form>
    )
  }
}
       
const afterSubmit = function(result, dispatch) {
    console.log('hello');
    console.log(result);
    dispatch(reset('SubjectForm'));
}

export default reduxForm({
  form: 'SubjectForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false
  // ,
  // asyncValidate,
  // asyncBlurFields: ['email']
})(SubjectForm)
