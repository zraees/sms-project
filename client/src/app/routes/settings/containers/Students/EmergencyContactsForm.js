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
import { submitStudentEmergencyContactDetail, removeStudentEmergencyContactDetail } from './submit'
import mapForCombo, {isOtherOptionSelected} from '../../../../components/utils/functions'
import { upper, lower } from '../../../../components/utils/normalize'
import Msg from '../../../../components/i18n/Msg'

class EmergencyContactsForm extends React.Component {
  
    constructor(props){
        super(props);
        this.state = { 
            studentId: 0,
            classOptions: [],
            relationOptions: [],  
            activeTab: "add",
            disabledOtherRelation: true        
        }
        this.handleOtherRelationBlur = this.handleOtherRelationBlur.bind(this);
    }
    
    componentDidMount(){ 
        
        instanceAxios.get('/api/lookup/classes/')
            .then(res=>{            
                const classOptions = mapForCombo(res.data);
                this.setState({classOptions});
            });

        instanceAxios.get('/api/lookup/relations/')
            .then(res=>{            
                const relationOptions = mapForCombo(res.data);
                this.setState({relationOptions});
            });

        this.setState({studentId:this.props.studentId});
        this.props.change('studentId', this.props.studentId); // function provided by redux-form

        $('#emergencyContactDetailsGrid').on('click', 'td', function(event) {
        
        if ($(this).find('#dele').length > 0) {
            
            //alert(  $(this).find('#dele').data('tid'));
            var id = $(this).find('#dele').data('tid');
            removeStudentEmergencyContactDetail(id, $(this));

        }
        });

    } 
        
    handleOtherRelationBlur(obj, value){ 
        if(isOtherOptionSelected(value)){
            this.setState({disabledOtherRelation:true});
        }
        else{
            this.setState({disabledOtherRelation:false});
        }
    } 

  //
  render() {
    const { handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { studentId, activeTab, classOptions, relationOptions, disabledOtherRelation } = this.state;

    return (

        <WidgetGrid>

        <div className="tabbable tabs">
            
            <ul className="nav nav-tabs">
                <li id="tabAddLink" className="active">
                    <a id="tabAddEmergencyContactDetail" data-toggle="tab" href="#A1A1A1"><Msg phrase="AddText" /></a>
                </li>
                <li id="tabListLink">
                    <a id="tabListEmergencyContactDetail" data-toggle="tab" href="#B1B1B1"><Msg phrase="ListText" /></a>
                </li> 
            </ul>

            <div className="tab-content">
                <div className="tab-pane active" id="A1A1A1">
                    
                    <form id="form-emergency-contact-detail" className="smart-form" 
                        onSubmit={handleSubmit((values)=>{submitStudentEmergencyContactDetail(values, studentId)})}>
                        <fieldset> 

                        <div className="row">
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field name="contactPersonName" labelClassName="input" 
                                    labelIconClassName="icon-append fa fa-user"
                                    validate={required} component={RFField} normalize={upper}  
                                    maxLength="50"
                                    type="text" placeholder="" 
                                    label="NameText" />
                            </section> 
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">                                 
                                <Field name="contactPersonRelation" labelClassName="input" 
                                    labelIconClassName="icon-append fa fa-user"
                                    validate={required} component={RFField} normalize={upper}  
                                    maxLength="50"
                                    type="text" placeholder="" 
                                    label="RelationText" />
                            </section>
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">                                
                                <Field name="email" labelClassName="input" labelIconClassName="icon-append fa fa-envelope-o"
                                    validate={[required,email]} component={RFField} normalize={lower} 
                                    maxLength="150" type="text" placeholder="" 
                                    label="EmailAddressText"/>
                            </section>
                        </div>
 
                        <div className="row">
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field name="workPhoneNo" labelClassName="input" 
                                    labelIconClassName="icon-append fa fa-user"
                                    validate={required} component={RFField} normalize={upper}  
                                    maxLength="20"
                                    type="text" placeholder="" 
                                    label="WorkPhoneNoText" />                               
                            </section>
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field name="homePhoneNo" labelClassName="input" 
                                    labelIconClassName="icon-append fa fa-user"
                                    validate={required} component={RFField} normalize={upper}  
                                    maxLength="20"
                                    type="text" placeholder="" 
                                    label="HomePhoneNoText" />
                            </section>
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field name="mobileNo" labelClassName="input" 
                                    labelIconClassName="icon-append fa fa-user"
                                    validate={required} component={RFField} normalize={upper}  
                                    maxLength="20"
                                    type="text" placeholder="" 
                                    label="MobileNoText" />
                            </section> 
                        </div>

                        <div className="row">
                            <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                                <Field name="otherDetails" labelClassName="input" 
                                    labelIconClassName="icon-append fa fa-book"
                                    component={RFTextArea} 
                                    maxLength="500" type="text" 
                                    label="OtherDetailsText"
                                    placeholder="Please enter other details about contact person"/>
                            </section> 
                        </div>

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

                </div>
                <div className="tab-pane table-responsive" id="B1B1B1">
                    
                    <Datatable id="emergencyContactDetailsGrid"  
                      options={{
                        ajax: {"url": getWebApiRootUrl() +'/api/StudentsEmergencyContactDetails/All/' + studentId, "dataSrc": ""},
                        columnDefs: [  
                            { 
                                "render": function ( data, type, row ) {
                                  return '<a id="dele" data-tid="' + data + '"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Edit</span></a>';
                                }.bind(self),
                                "className": "dt-center",
                                "sorting": false,   
                                "targets": 6
                            }
                        ],
                        columns: [ 
                          {data: "ContactPersonName"},
                          {data: "ContactPersonRelation"},  
                          {data: "Email"},
                          {data: "WorkPhoneNo"},
                          {data: "HomePhoneNo"},
                          {data: "MobileNo"},
                          {data: "StudentEmergencyContactDetailId"}
                        ],
                        buttons: [
                          'copy', 'excel', 'pdf'
                        ]
                      }}
                      paginationLength={true}  
                      className="table table-striped table-bordered table-hover"
                      width="100%">
                      <thead>
                      <tr>
                        <th data-hide="mobile-p"><Msg phrase="NameText"/></th>     
                        <th data-hide="mobile-p"><Msg phrase="RelationText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="EmailAddressText"/></th>                        
                        <th data-hide="mobile-p"><Msg phrase="WorkPhoneNoText"/></th>  
                        <th data-hide="mobile-p"><Msg phrase="HomePhoneNoText"/></th>  
                        <th data-hide="mobile-p"><Msg phrase="MobileNoText"/></th>  
                        <th data-hide="mobile-p"></th>
                      </tr>
                      </thead>
                    </Datatable>

                </div> 
            </div>
        </div>
        
        
        </WidgetGrid>
    )
  }
}
       
       
const afterSubmit = function(result, dispatch) {
    dispatch(reset('EmergencyContactsForm')); 
} 

export default reduxForm({
  form: 'EmergencyContactsForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(EmergencyContactsForm)