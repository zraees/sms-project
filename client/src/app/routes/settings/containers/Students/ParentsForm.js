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
import {submitStudentParent, removeStudentParent} from './submit'
import mapForCombo, {mapForRadioList} from '../../../../components/utils/functions'
import { upper } from '../../../../components/utils/normalize'
import Msg from '../../../../components/i18n/Msg'

class ParentsForm extends React.Component {
  
    constructor(props){
        super(props);
        this.state = { 
            nationalityOptions: [],
            languageOptions: [], 
            parentOptions: [],
            activeTab: "add",
            disabledGuardianRelation: true        
        }
        this.handleParentTypeChange = this.handleParentTypeChange.bind(this);
    }
    
    componentDidMount(){ 
        
        axios.get('assets/api/common/parent-options.json')
            .then(res=>{         
                const parentOptions = mapForRadioList(res.data);
                this.setState({parentOptions});
            });

        axios.get('/api/lookup/nationality/')
            .then(res=>{            
                const nationalityOptions = mapForCombo(res.data);
                this.setState({nationalityOptions});
            });

        axios.get('/api/lookup/languages/')
            .then(res=>{            
                const languageOptions = mapForCombo(res.data);
                this.setState({languageOptions});
            });

        this.props.change('studentId', this.props.studentId); // function provided by redux-form

        $('#parentsGrid').on('click', 'td', function(event) {
        
            if ($(this).find('#dele').length > 0) {                
                var id = $(this).find('#dele').data('tid');
                removeStudentParent(id, $(this));
            }

        });

    } 
        
    handleParentTypeChange(obj, value){ 
        if(value=="G"){
            this.setState({disabledGuardianRelation:false});
        }
        else{
            this.setState({disabledGuardianRelation:true});
        }
    }

  //
  render() {
    const { studentId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { activeTab, nationalityOptions, languageOptions, disabledGuardianRelation, parentOptions } = this.state;

    return (

        <WidgetGrid>

        <div className="tabbable tabs">
            
            <ul className="nav nav-tabs">
                <li id="tabAddLink" className="active">
                    <a id="tabAddParent" data-toggle="tab" href="#A1P1A"><Msg phrase="AddText" /></a>
                </li>
                <li id="tabListLink">
                    <a id="tabListParent" data-toggle="tab" href="#B1P1B"><Msg phrase="ListText" /></a>
                </li> 
            </ul>

            <div className="tab-content">
                <div className="tab-pane active" id="A1P1A">
                    
                    <form id="form-parents" className="smart-form" 
                        onSubmit={handleSubmit((values)=>{submitStudentParent(values, studentId)})}>
                        <fieldset>

                        <div className="row">            
                            <section className="remove-col-padding col-sm-6 col-md-6 col-lg-6">
                                <Field component={RFRadioButtonList} name="parentType" 
                                    required={true} 
                                    label=""
                                    onChange={this.handleParentTypeChange}
                                    options={parentOptions} />
                            </section>                
                            <section className="remove-col-padding col-sm-6 col-md-6 col-lg-6">
                                <Field name="guardianRelation" labelClassName="input"
                                    labelIconClassName="icon-append fa fa-graduation-cap"
                                    component={RFField} disabled={disabledGuardianRelation} 
                                    maxLength="150" type="text" 
                                    label="RelationWithGuardianText"
                                    placeholder=""/>
                            </section>
                        </div>
 
                        <div className="row">
                            <section className="remove-col-padding col-sm-6 col-md-6 col-lg-6">
                                <Field name="parentName" labelClassName="input" 
                                    labelIconClassName="icon-append fa fa-user"
                                    validate={required} component={RFField} normalize={upper}  
                                    maxLength="150"
                                    type="text" placeholder="" 
                                    label="ParentNameText" />
                            </section> 
                            <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
                                <Field name="idNo" labelClassName="input" 
                                    labelIconClassName="icon-append fa fa-user"
                                    validate={required} component={RFField} normalize={upper}  
                                    maxLength="20"
                                    type="text" placeholder="" 
                                    label="IdentityCardNumberText" />
                            </section>
                            <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
                                <Field name="passportNo" labelClassName="input" 
                                    labelIconClassName="icon-append fa fa-user"
                                    component={RFField} normalize={upper}  
                                    maxLength="20"
                                    type="text" placeholder="" 
                                    label="PassportNumberText" />
                            </section>
                        </div>

                        <div className="row">
                            <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
                                <Field
                                    multi={false}
                                    name="nationalityId"
                                    validate={required} 
                                    label="ClassText"
                                    options={nationalityOptions}
                                    component={RFReactSelect} />                                
                            </section>
                            <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
                                <Field
                                    multi={false}
                                    name="lang1Id"
                                    label="Language1Text"
                                    options={languageOptions}
                                    component={RFReactSelect} />
                            </section>
                            
                            <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3"> 
                                <Field
                                    multi={false}
                                    name="lang2Id"
                                    label="Language2Text"
                                    options={languageOptions}
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
                <div className="tab-pane table-responsive" id="B1P1B">
                    
                    <Datatable id="parentsGrid"  
                      options={{
                        ajax: {"url":'/api/StudentsParents/All/' + studentId, "dataSrc": ""},
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
                          {data: "parentType"},    
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
                        <th data-hide="mobile-p"><Msg phrase="parentTypeInOurSchoolText"/></th>                        
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
    dispatch(reset('ParentsForm')); 
} 

export default reduxForm({
  form: 'ParentsForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(ParentsForm)