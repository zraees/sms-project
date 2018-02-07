import React from 'react'
import { reset } from 'redux-form'
import axios from 'axios'
import classNames from 'classnames'

import { Field, reduxForm } from 'redux-form'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import Datatable from '../../../../components/tables/Datatable'
 
import { RFField, RFTextArea } from '../../../../components/ui'

import { required, email, number } from '../../../../components/forms/validation/CustomValidation'
import AlertMessage from '../../../../components/common/AlertMessage'
import { submitStudentMedicalDetails } from './submit'
import mapForCombo, {getWebApiRootUrl, instanceAxios} from '../../../../components/utils/functions'
import { upper, lower } from '../../../../components/utils/normalize'
import Msg from '../../../../components/i18n/Msg'

class MedicalDetailsForm extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {   
            studentId: 0,
            activeTab: "add",
            disabledOtherRelation: true        
        }
        //this.handleOtherRelationBlur = this.handleOtherRelationBlur.bind(this);
    }
    
    componentDidMount(){ 
        
        this.setState({studentId: this.props.studentId});
        this.props.change('studentId', this.props.studentId); // function provided by redux-form

    } 
        
    // handleOtherRelationBlur(obj, value){ 
    //     if(isOtherOptionSelected(value)){
    //         this.setState({disabledOtherRelation:true});
    //     }
    //     else{
    //         this.setState({disabledOtherRelation:false});
    //     }
    // } 

  //
  render() {
    const { handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { studentId, activeTab, classOptions, relationOptions, disabledOtherRelation } = this.state;

    return (

        <WidgetGrid>
            <form id="form-emergency-contact-detail" className="smart-form" 
                onSubmit={handleSubmit((values)=>{submitStudentMedicalDetails(values, studentId)})}>
                <fieldset> 

                <div className="row">
                    <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                        <Field name="bloodGroup" labelClassName="input" 
                            labelIconClassName="icon-append fa fa-user"
                            component={RFField} normalize={upper}  
                            maxLength="5"
                            type="text" placeholder="" 
                            label="BloodGroupText" />
                    </section> 
                    <section className="remove-col-padding col-sm-8 col-md-8 col-lg-8">                                 
                        <Field name="chronicMedication" labelClassName="input" 
                            labelIconClassName="icon-append fa fa-user"
                            validate={required} component={RFField} 
                            maxLength="100"
                            type="text" placeholder="" 
                            label="ChronicMedicationText" />
                    </section> 
                </div>

                <div className="row">
                    <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                        <Field name="otherMedicalConditions" labelClassName="input" 
                            labelIconClassName="icon-append fa fa-book"
                            component={RFTextArea} 
                            maxLength="500" type="text" 
                            label="OtherMedicalConditionsText"
                            placeholder=""/>
                    </section> 
                </div>

                <div className="row">
                    <section className="remove-col-padding col-sm-6 col-md-6 col-lg-6">
                        <Field name="familyDoctorName" labelClassName="input" 
                            labelIconClassName="icon-append fa fa-user"
                            component={RFField} normalize={upper}  
                            maxLength="50"
                            type="text" placeholder="" 
                            label="FamilyDoctorNameText" />
                    </section> 
                    <section className="remove-col-padding col-sm-6 col-md-6 col-lg-6">
                        <Field name="familyDoctorContactNo" labelClassName="input" 
                            labelIconClassName="icon-append fa fa-user"
                            component={RFField} 
                            maxLength="20"
                            type="text" placeholder="" 
                            label="FamilyDoctorContactNoText" />
                    </section> 
                </div>

                {/* <div className="row">
                    <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12"> */}
                    <div>
                        <p><Msg phrase="StudentMedicalHistoryText"/></p>
                        <Datatable id="medicalConditionsGrid"  
                            options={{ 
                                columnDefs: [  
                                    { 
                                        "render": function ( data, type, row ) {
                                        return '<input id="selectRow" type="checkbox" data-tid="' + data + '"></input>';
                                        }.bind(self),
                                        "className": "dt-center",
                                        "sorting": false,   
                                        "targets": 0
                                    },
                                    { 
                                        "render": function ( data, type, row ) {
                                        return '<label class="input"><i class="icon-append fa fa-file-text-o" aria-hidden="true"></i><input id="probDetail" type="text"></input></label>';
                                        }.bind(self),
                                        "className": "dt-center",
                                        "sorting": false,   
                                        "targets": 2
                                    }
                                ],
                                bFilter: false,
                                bPaginate: false,
                                columns: [                                     
                                {data: "HealthProblemId"},
                                {data: "HealthProblem"},
                                {data: "Details"}
                                ]
                            }}
                            paginationLength={false}  
                            className="table table-striped table-bordered table-hover"
                            width="100%">
                            <thead>
                            <tr>
                                <th></th>     
                                <th><Msg phrase="HealthProblemText"/></th>
                                <th><Msg phrase="DetailsText"/></th>    
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>     
                                    <td>General Health</td>
                                    <td></td>    
                                </tr>
                            </tbody>
                        </Datatable>
                    </div>
                    {/* </section> 
                </div> */}

                {(error!==undefined && <AlertMessage type="w" icon="alert-danger" message={error} />)}

                <Field component="input" type="hidden" name="studentId" />

                <footer>
                    <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary">
                    <Msg phrase="ResetText"/>
                    </button>
                    <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
                    <Msg phrase="SaveText"/>
                    </button>
                </footer>
                </fieldset>
            </form> 
        
        
        </WidgetGrid>
    )
  }
}
       
       
const afterSubmit = function(result, dispatch) {
    dispatch(reset('MedicalDetailsForm')); 
} 

export default reduxForm({
  form: 'MedicalDetailsForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(MedicalDetailsForm)