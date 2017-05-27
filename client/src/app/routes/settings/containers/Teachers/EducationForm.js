import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';

import { Field, reduxForm } from 'redux-form'

import RFDatePicker from '../../../../components/ui/RFDatePicker'
import RFReactSelect from '../../../../components/ui/RFReactSelect'
import RFRadioButtonList from '../../../../components/ui/RFRadioButtonList'
import RFField from '../../../../components/ui/RFField'

import {required, email}  from '../../../../components/forms/validation/CustomValidation'
import asyncValidate from './asyncValidate'
import AlertMessage from '../../../../components/common/AlertMessage'
import alert from '../../../../components/utils/alerts'


class EducationForm extends React.Component {
 
  
  render() {
    const { teacherId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props

    return (

        <div className="tabbable tabs-below">
            <div className="tab-content padding-10">
                <div className="tab-pane active" id="AA">
                    
                    <form id="form-teacher" className="smart-form" 
                        onSubmit={handleSubmit}>

                        <fieldset>
                    
                            <div className="row">
                            <section className="col col-6">
                                <Field name="name" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                                validate={required} component={RFField} type="text" placeholder="Name"/>    
                            </section>

                            <section className="col col-6">
                                <Field name="email" labelClassName="input" labelIconClassName="icon-append fa fa-envelope-o"
                                validate={[required,email]} component={RFField} type="text" placeholder="Email Address"/>
                            </section>
                            </div>

                        </fieldset>
                        {(error!==undefined && <AlertMessage type="w" icon="alert-danger" message={error} />)}

                        <footer>
                            <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary">
                            { teacherId > 0 ? "Undo Changes" : "Reset" }
                            </button>
                            <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
                            Save
                            </button>
                        </footer>
                   
                    </form>

                </div>
                <div className="tab-pane" id="BB">
                    <p>
                    Search
                    </p>
                </div> 
            </div>
            <ul className="nav nav-tabs">
                <li className="active">
                    <a data-toggle="tab" href="#AA">Add</a>
                </li>
                <li>
                    <a data-toggle="tab" href="#BB">List</a>
                </li> 
            </ul>
        </div>
            
    )
  }
}
       
       
const afterSubmit = (result, dispatch) =>
  dispatch(reset('EducationForm'));

export default reduxForm({
  form: 'EducationForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false
  // ,
  // asyncValidate,
  // asyncBlurFields: ['email']
})(EducationForm) 