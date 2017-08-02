import React from 'react'
import { reset } from 'redux-form'
import axios from 'axios'
import classNames from 'classnames'

import { Field, reduxForm } from 'redux-form'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import Datatable from '../../../../components/tables/Datatable'
 
import {RFField, RFReactSelect, RFRadioButtonList } from '../../../../components/ui'

import {required, email, number} from '../../../../components/forms/validation/CustomValidation'
import AlertMessage from '../../../../components/common/AlertMessage'
import {submitSiblingDetail, removeSibling} from './submit'
import mapForCombo, {mapForRadioList} from '../../../../components/utils/functions'
import { upper } from '../../../../components/utils/normalize'
import Msg from '../../../../components/i18n/Msg'

class PreviousSchoolsForm extends React.Component {
  
    constructor(props){
        super(props);
        this.state = { 
            classOptions: [],
            sectionOptions: [], 
            currentlyEnrolledOptions: [],
            activeTab: "add",
            disabledSchoolName: true        
        }
        this.handleCurrentlyEnrolledChange = this.handleCurrentlyEnrolledChange.bind(this);
    }
    
    componentDidMount(){ 
        console.log('componentDidMount --> PreviousSchoolsForm');
     
        axios.get('assets/api/common/YesNo.json')
            .then(res=>{         
                const currentlyEnrolledOptions = mapForRadioList(res.data);
                this.setState({currentlyEnrolledOptions});
            });

        axios.get('/api/lookup/classes/')
            .then(res=>{            
                const classOptions = mapForCombo(res.data);
                this.setState({classOptions});
            });

        axios.get('/api/lookup/sections/')
            .then(res=>{            
                const sectionOptions = mapForCombo(res.data);
                this.setState({sectionOptions});
            });

        this.props.change('studentId', this.props.studentId); // function provided by redux-form

        $('#siblingsGrid').on('click', 'td', function(event) {
        
        if ($(this).find('#dele').length > 0) {
            
            //alert(  $(this).find('#dele').data('tid'));
            var id = $(this).find('#dele').data('tid');
            removePreviousSchool(id, $(this));

        }
        });

    } 
        
    handleCurrentlyEnrolledChange(obj, value){ 
        if(value=="Yes"){
            this.setState({disabledSchoolName:true});
        }
        else{
            this.setState({disabledSchoolName:false});
        }
    }

  //
  render() {
    const { studentId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { activeTab, classOptions, sectionOptions, disabledSchoolName, currentlyEnrolledOptions } = this.state;

    return (

        <WidgetGrid>

        <div className="tabbable tabs">
            
            <ul className="nav nav-tabs">
                <li id="tabAddLink" className="active">
                    <a id="tabAddSibling" data-toggle="tab" href="#A11A"><Msg phrase="AddText" /></a>
                </li>
                <li id="tabListLink">
                    <a id="tabListSibling" data-toggle="tab" href="#B11B"><Msg phrase="ListText" /></a>
                </li> 
            </ul>

            <div className="tab-content">
                <div className="tab-pane active" id="A11A">
                    
                    <form id="form-previous-schools" className="smart-form" 
                        onSubmit={handleSubmit((values)=>{submitPreviousSchool(values, studentId)})}>
                        <fieldset>

                        <div className="row">  
                            <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
                                <Field name="totalFamilMembers" labelClassName="input" 
                                    labelIconClassName="icon-append fa fa-list"
                                    validate={[required,number]} component={RFField} type="text" 
                                    label="TotalFamilyMembersWithParentsText"
                                    placeholder=""/>
                            </section> 
                            <section className="remove-col-padding col-sm-9 col-md-9 col-lg-9">
                                 
                            </section>
                        </div>

                        <div className="row">
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field name="firstName" labelClassName="input" 
                                    labelIconClassName="icon-append fa fa-user"
                                    validate={required} component={RFField} normalize={upper}  
                                    maxLength="50"
                                    type="text" placeholder="" 
                                    label="FirstNameText" />
                            </section> 
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field name="surName" labelClassName="input" 
                                    labelIconClassName="icon-append fa fa-user"
                                    validate={required} component={RFField} normalize={upper}  
                                    maxLength="50"
                                    type="text" placeholder="" 
                                    label="SurNameText" />
                            </section>
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                
                            </section>
                        </div>

                        <div className="row">            
                            <section className="remove-col-padding col-sm-6 col-md-6 col-lg-6">
                                <Field component={RFRadioButtonList} name="currentlyEnrolled" 
                                    required={true} 
                                    label="CurrentlyEnrolledInOurSchoolText"
                                    onChange={this.handleCurrentlyEnrolledChange}
                                    options={currentlyEnrolledOptions} />
                            </section>                
                            <section className="remove-col-padding col-sm-6 col-md-6 col-lg-6">
                                <Field name="schoolName" labelClassName="input"
                                    labelIconClassName="icon-append fa fa-graduation-cap"
                                    component={RFField} disabled={disabledSchoolName} 
                                    maxLength="150" type="text" 
                                    label="SchoolNameText"
                                    placeholder="Please enter school name"/>
                            </section>
                        </div>

                        <div className="row">
                            <section className="remove-col-padding col-sm-6 col-md-6 col-lg-6">
                                <Field
                                    multi={false}
                                    name="classId"
                                    validate={required} 
                                    label="ClassText"
                                    options={classOptions}
                                    component={RFReactSelect} />                                
                            </section>
                            <section className="remove-col-padding col-sm-6 col-md-6 col-lg-6">
                                <Field
                                    multi={false}
                                    name="sectionId"
                                    label="SectionText"
                                    options={sectionOptions}
                                    component={RFReactSelect} />
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
                <div className="tab-pane table-responsive" id="B11B">
                    
                    <Datatable id="siblingsGrid"  
                      options={{
                        ajax: {"url":'/api/StudentSiblings/' + studentId, "dataSrc": ""},
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
                          {data: "FirstName"},
                          {data: "SurName"},
                          {data: "CurrentlyEnrolled"},    
                          {data: "SchoolName"},  
                          {data: "ClassName"},  
                          {data: "SectionName"},
                          {data: "StudentSiblingID"}
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
                        <th data-hide="mobile-p"><Msg phrase="FirstNameText"/></th>
                        <th data-class="expand"><Msg phrase="SurNameText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="CurrentlyEnrolledInOurSchoolText"/></th>                        
                        <th data-hide="mobile-p"><Msg phrase="SchoolNameText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="ClassText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="SectionText"/></th>                        
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
    dispatch(reset('PreviousSchoolsForm')); 
} 

export default reduxForm({
  form: 'PreviousSchoolsForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(PreviousSchoolsForm)