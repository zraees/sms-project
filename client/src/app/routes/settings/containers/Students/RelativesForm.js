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
import {submitStudentRelative, removeStudentRelative} from './submit'
import mapForCombo, {isOtherOptionSelected} from '../../../../components/utils/functions'
import { upper } from '../../../../components/utils/normalize'
import Msg from '../../../../components/i18n/Msg'

class RelativesForm extends React.Component {
  
    constructor(props){
        super(props);
        this.state = { 
            classOptions: [],
            relationOptions: [],  
            activeTab: "add",
            disabledOtherRelation: true        
        }
        this.handleOtherRelationBlur = this.handleOtherRelationBlur.bind(this);
    }
    
    componentDidMount(){ 
        
        axios.get('/api/lookup/classes/')
            .then(res=>{            
                const classOptions = mapForCombo(res.data);
                this.setState({classOptions});
            });

        axios.get('/api/lookup/relations/')
            .then(res=>{            
                const relationOptions = mapForCombo(res.data);
                this.setState({relationOptions});
            });

        this.props.change('studentId', this.props.studentId); // function provided by redux-form

        $('#relativesGrid').on('click', 'td', function(event) {
        
        if ($(this).find('#dele').length > 0) {
            
            //alert(  $(this).find('#dele').data('tid'));
            var id = $(this).find('#dele').data('tid');
            removeStudentRelative(id, $(this));

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
    const { studentId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { activeTab, classOptions, relationOptions, disabledOtherRelation } = this.state;

    return (

        <WidgetGrid>

        <div className="tabbable tabs">
            
            <ul className="nav nav-tabs">
                <li id="tabAddLink" className="active">
                    <a id="tabAddRelative" data-toggle="tab" href="#A1A1A"><Msg phrase="AddText" /></a>
                </li>
                <li id="tabListLink">
                    <a id="tabListRelative" data-toggle="tab" href="#B1B1B"><Msg phrase="ListText" /></a>
                </li> 
            </ul>

            <div className="tab-content">
                <div className="tab-pane active" id="A1A1A">
                    
                    <form id="form-relative" className="smart-form" 
                        onSubmit={handleSubmit((values)=>{submitStudentRelative(values, studentId)})}>
                        <fieldset> 

                        <div className="row">
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field name="studentName" labelClassName="input" 
                                    labelIconClassName="icon-append fa fa-user"
                                    validate={required} component={RFField} normalize={upper}  
                                    maxLength="50"
                                    type="text" placeholder="" 
                                    label="RelativeStudentNameText" />
                            </section> 
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                 
                            </section>
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                
                            </section>
                        </div>
 
                        <div className="row">
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field
                                    multi={false}
                                    name="classId"
                                    validate={required} 
                                    label="ClassText"
                                    options={classOptions}
                                    component={RFReactSelect} />                                
                            </section>
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field
                                    multi={false}
                                    name="relationId"
                                    validate={required} 
                                    label="RelationText"
                                    options={relationOptions}
                                    onBlur={this.handleOtherRelationBlur}
                                    component={RFReactSelect} />
                            </section>
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field name="otherRelation" labelClassName="input"
                                    labelIconClassName="icon-append fa fa-graduation-cap"
                                    component={RFField} disabled={disabledOtherRelation} 
                                    maxLength="150" type="text" 
                                    label="OtherRelationText"
                                    placeholder=""/>
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
                <div className="tab-pane table-responsive" id="B1B1B">
                    
                    <Datatable id="relativesGrid"  
                      options={{
                        ajax: {"url":'/api/StudentsRelatives/All/' + studentId, "dataSrc": ""},
                        columnDefs: [  
                            { 
                                "render": function ( data, type, row ) {
                                  return '<a id="dele" data-tid="' + data + '"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Edit</span></a>';
                                }.bind(self),
                                "className": "dt-center",
                                "sorting": false,   
                                "targets": 3
                            }
                        ],
                        columns: [ 
                          {data: "StudentName"},
                          {data: "ClassName"},  
                          {data: "Relation"},
                          {data: "StudentRelativeID"}
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
                        <th data-hide="mobile-p"><Msg phrase="StudentNameText"/></th>     
                        <th data-hide="mobile-p"><Msg phrase="ClassText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="RelationText"/></th>                        
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
    dispatch(reset('RelativesForm')); 
} 

export default reduxForm({
  form: 'RelativesForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(RelativesForm)