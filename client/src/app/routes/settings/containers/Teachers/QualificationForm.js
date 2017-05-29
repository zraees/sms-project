import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';

import { Field, reduxForm } from 'redux-form'

import RFDatePicker from '../../../../components/ui/RFDatePicker'
import RFReactSelect from '../../../../components/ui/RFReactSelect'
import RFRadioButtonList from '../../../../components/ui/RFRadioButtonList'
import RFField from '../../../../components/ui/RFField'
import RFTextArea from '../../../../components/ui/RFTextArea'

import {required, email}  from '../../../../components/forms/validation/CustomValidation'
import asyncValidate from './asyncValidate'
import AlertMessage from '../../../../components/common/AlertMessage'
import alert from '../../../../components/utils/alerts'


class QualificationForm extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        // educationDurationTypes: [
        //     {"label":"Weeks", "value":"Weeks"},
        //     {"label":"Months", "value":"Months"},
        //     {"label":"Years", "value":"Years"}],
        qualificationTypes: [],
        qualificationScoreTypes: [
            {"label":"CGPA", "value":"CGPA"},
            {"label":"Percentage", "value":"Percentage"}]
            
    }

  }
    
componentDidMount(){ 
    this.props.change('teacherId', this.props.teacherId); // function provided by redux-form

    axios.get('/api/QualificationTypes/')
        .then(res=>{
            const qualificationTypes = res.data.map(function(item, index){
                return {value: item.QualificationTypeId + "", label: item.QualificationType};
            });                       
            this.setState({qualificationTypes});
        });
 
}

  render() {
    const { teacherId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { qualificationScoreTypes, qualificationTypes } = this.state;

    return (

        <div className="tabbable tabs-below">
            <div className="tab-content padding-10">
                <div className="tab-pane active" id="AA">
                    
                    <form id="form-teacher-qualification" className="smart-form" 
                        onSubmit={handleSubmit}>
                        <fieldset>

                        <div className="row">
                            <section>
                                <Field name="qualification" labelClassName="input" labelIconClassName="icon-append fa fa-graduation-cap"
                                    validate={required} component={RFField} type="text" placeholder="Qualification Title"/>    
                            </section>
                        </div>

                        <div className="row">
                            <section className="col col-4">
                                <Field name="startDate" placeholder="Start Date" component={RFDatePicker} />
                            </section>
                            <section className="col col-4">
                                <Field name="endDate" placeholder="End Date" component={RFDatePicker} />
                            </section>
                            <section className="col col-4">
                                <Field name="duration" labelClassName="input" labelIconClassName="icon-append fa fa-clock-o"
                                    validate={required} component={RFField} type="text" placeholder="Qualification Duration"/>
                            </section>
                        </div>

                        <div className="row">
                            <section className="col col-6">
                                <Field
                                    multi={false}
                                    name="qualificationTypeId"
                                    placeholder="Qualification Type"
                                    options={qualificationTypes}
                                    component={RFReactSelect} />
                            </section>

                            <section className="col col-3">
                                <Field
                                    multi={false}
                                    name="scoreType"
                                    placeholder="CGPA / Percentage"
                                    options={qualificationScoreTypes}
                                    component={RFReactSelect} />
                            </section>
                            
                            <section className="col col-3">
                                <Field name="score" labelClassName="input" labelIconClassName="icon-append fa fa-list"
                                    validate={required} component={RFField} type="number" placeholder="Score"/>
                            </section>
                        </div>

                        <div className="row">                            
                            <section>
                                <Field name="majors" labelClassName="input" labelIconClassName="icon-append fa fa-book"
                                    component={RFField} type="text" placeholder="Majors"/>    
                            </section>
                        </div>

                        {(error!==undefined && <AlertMessage type="w" icon="alert-danger" message={error} />)}

                        <Field component="input" type="hidden" name="teacherId"/>

                        <footer>
                            <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary">
                            { teacherId > 0 ? "Undo Changes" : "Reset" }
                            </button>
                            <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
                            Save
                            </button>
                        </footer>
                        </fieldset>
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
  dispatch(reset('QualificationForm'));

export default reduxForm({
  form: 'QualificationForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false
  // ,
  // asyncValidate,
  // asyncBlurFields: ['email']
})(QualificationForm) 