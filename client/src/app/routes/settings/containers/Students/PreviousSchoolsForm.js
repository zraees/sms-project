import React from 'react'
import { reset } from 'redux-form'
import axios from 'axios'
import classNames from 'classnames'

import { Field, reduxForm } from 'redux-form'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import Datatable from '../../../../components/tables/Datatable'
 
import {RFField, RFDatePicker, RFReactSelect, RFTextArea} from '../../../../components/ui'

import {required} from '../../../../components/forms/validation/CustomValidation'
import AlertMessage from '../../../../components/common/AlertMessage'
import {submitPreviousSchool, removePreviousSchool} from './submit'
import mapForCombo, {getWebApiRootUrl, instanceAxios} from '../../../../components/utils/functions' 
import Msg from '../../../../components/i18n/Msg'

class PreviousSchoolsForm extends React.Component {
  
  constructor(props){
    super(props);
    this.state = { 
        studentId: 0,
        classOptions: [],
        languageOptions: [], 
        activeTab: "add"            
    }
  }
    
componentDidMount(){ 
    console.log('componentDidMount --> PreviousSchoolsForm');
//    LoaderVisibility(true);
    instanceAxios.get('/api/lookup/classes/')
        .then(res=>{            
            const classOptions = mapForCombo(res.data);
            this.setState({classOptions});
        });
        
    this.setState({studentId: this.props.studentId});
    this.props.change('studentId', this.props.studentId); // function provided by redux-form

    $('#previousSchoolsGrid').on('click', 'td', function(event) {
      
      if ($(this).find('#dele').length > 0) {
        
        //alert(  $(this).find('#dele').data('tid'));
        var id = $(this).find('#dele').data('tid');
        removePreviousSchool(id, $(this));

      }
    });

} 
  //
  render() {
    const { handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { studentId, activeTab, classOptions, languageOptions } = this.state;

    return (

        <WidgetGrid>

        <div className="tabbable tabs">
            
            <ul className="nav nav-tabs">
                <li id="tabAddLink" className="active">
                    <a id="tabAddPreviousSchool" data-toggle="tab" href="#A1A"><Msg phrase="AddText" /></a>
                </li>
                <li id="tabListLink">
                    <a id="tabListPreviousSchool" data-toggle="tab" href="#B1B"><Msg phrase="ListText" /></a>
                </li> 
            </ul>

            <div className="tab-content">
                <div className="tab-pane active" id="A1A">
                    
                    <form id="form-previous-schools" className="smart-form" 
                        onSubmit={handleSubmit((values)=>{submitPreviousSchool(values, studentId)})}>
                        <fieldset>

                        <div className="row"> 
                            <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                                <Field name="schoolName" labelClassName="input"
                                    labelIconClassName="icon-append fa fa-graduation-cap"
                                    validate={required} 
                                    component={RFField} 
                                    maxLength="150" type="text" 
                                    label="SchoolNameText"
                                    placeholder="Please enter school name"/>
                            </section> 
                        </div>

                        <div className="row">
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field name="startDate" label="StartDateText" component={RFDatePicker} />
                            </section> 
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field name="endDate" label="EndDateText" component={RFDatePicker} />
                            </section>
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field
                                    multi={false}
                                    name="classId"
                                    label="ClassText"
                                    options={classOptions}
                                    component={RFReactSelect} />
                            </section>
                        </div>

                        <div className="row">
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field
                                    multi={false}
                                    name="langId"
                                    label="LanguageofInstructionText"
                                    options={languageOptions}
                                    component={RFReactSelect} />
                            </section>

                            <section className="remove-col-padding col-sm-8 col-md-8 col-lg-8">
                                <Field name="location" labelClassName="input"
                                    labelIconClassName="icon-append fa fa-graduation-cap"
                                    component={RFField} 
                                    maxLength="150" type="text" 
                                    label="LastSchoolLocationText"
                                    placeholder="Please enter last school location"/>
                            </section>
                        </div>

                        <div className="row">                            
                            <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                                <Field name="otherDetails" labelClassName="input" 
                                    labelIconClassName="icon-append fa fa-book"
                                    component={RFTextArea} 
                                    maxLength="500" type="text" 
                                    label="OtherDetailsAboutLastSchoolText"
                                    placeholder="Please enter other details about last school"/>
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
                <div className="tab-pane table-responsive" id="B1B">
                    
                    <Datatable id="previousSchoolsGrid"  
                      options={{
                        ajax: {"url": getWebApiRootUrl() +'/api/StudentPreviousSchools/' + studentId, "dataSrc": ""},
                        columnDefs: [  
                            { 
                                "render": function ( data, type, row ) {
                                  return '<a id="dele" data-tid="' + data + '"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Edit</span></a>';
                                }.bind(self),
                                "className": "dt-center",
                                "sorting": false,   
                                "targets": 7
                            }
                        ],
                        columns: [ 
                          {data: "SchoolName"},
                          {data: "StartDate"},
                          {data: "EndDate"},    
                          {data: "ClassName"},  
                          {data: "LanguageName"},  
                          {data: "Location"},  
                          {data: "Duration"},  
                          {data: "StudentPreviousSchoolId"}
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
                        <th data-hide="mobile-p"><Msg phrase="SchoolNameText"/></th>
                        <th data-class="expand"><Msg phrase="StartDateText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="EndDateText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="ClassText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="LanguageofInstructionText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="LastSchoolLocationText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="DurationText"/></th>
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