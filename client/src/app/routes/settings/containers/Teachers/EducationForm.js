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
  
  constructor(props){
    super(props);
    this.state = {
        // educationDurationTypes: [
        //     {"label":"Weeks", "value":"Weeks"},
        //     {"label":"Months", "value":"Months"},
        //     {"label":"Years", "value":"Years"}],
        educationScoreTypes: [
            {"label":"CGPA", "value":"CGPA"},
            {"label":"Percentage", "value":"Percentage"}],
      rating: 0
    }
  }
    
  render() {
    const { teacherId, nationalities, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { educationScoreTypes } = this.state;

    return (

        <div className="tabbable tabs-below">
            <div className="tab-content padding-10">
                <div className="tab-pane active" id="AA">
                    
                    <form id="form-teacher" className="smart-form" 
                        onSubmit={handleSubmit}>

                        <div className="row">
                            <section className="col col-6">
                                <Field
                                    multi={false}
                                    name="typeId"
                                    placeholder="Education Type"
                                    options={nationalities}
                                    component={RFReactSelect} />
                            </section>

                            <section className="col col-6">
                            </section>
                        </div>

                        <div className="row">
                            <section className="col col-12">
                                <Field name="title" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                                    validate={required} component={RFField} type="text" placeholder="Title"/>    
                            </section>
                        </div>

                        <div>
                            <section className="col col-6">
                                
                            </section>

                            <section className="col col-3">
                                <Field
                                    multi={false}
                                    name="scoreTypeId"
                                    placeholder="CGPA / Percentage"
                                    options={educationScoreTypes}
                                    component={RFReactSelect} />
                            </section>
                            
                            <section className="col col-3">
                                <Field name="score" labelClassName="input" labelIconClassName="icon-append fa fa-envelope-o"
                                    validate={required} component={RFField} type="text" placeholder="Score"/>
                            </section>
                        </div>

                        <div className="row">                            
                            <section className="col col-12">
                                <Field name="majors" labelClassName="input" labelIconClassName="icon-append fa fa-envelope-o"
                                validate={required} component={RFField} type="text" placeholder="Majors"/>
                            </section>
                        </div>

                        <div className="row">
                            <section className="col col-4">
                                <Field name="dateStart" placeholder="Start Date" minDate={moment()} component={RFDatePicker} />
                            </section>
                            <section className="col col-4">
                                <Field name="dateEnd" placeholder="End Date" component={RFDatePicker} />
                            </section>
                            <section className="col col-4">
                                <Field name="duration" labelClassName="input" labelIconClassName="icon-append fa fa-envelope-o"
                                    validate={required} component={RFField} type="text" placeholder="Duration"/>
                            </section>
                        </div>

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