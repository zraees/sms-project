import React from 'react'
import { reset } from 'redux-form'
import axios from 'axios'
import classNames from 'classnames'

import { Field, reduxForm } from 'redux-form'

import Datatable from '../../../../components/tables/Datatable'
import { RFReactSelect } from '../../../../components/ui'

import { required }  from '../../../../components/forms/validation/CustomValidation'
import AlertMessage from '../../../../components/common/AlertMessage'
import {submitTeacherSubject, removeTeacherSubject} from './submit'
import mapForCombo, {getWebApiRootUrl, instanceAxios} from '../../../../components/utils/functions'
import Msg from '../../../../components/i18n/Msg'

class TeacherSubjectForm extends React.Component  {
  
    constructor(props){
        super(props);
        this.state = {
            teacherId: 0,
            subjectOptions: [] 
        }
    }

    componentDidMount(){ 
        console.log('componentDidMount --> TeacherSubjectForm');
        
        this.setState({teacherId: this.props.teacherId});
        this.props.change('teacherId', this.props.teacherId); // function provided by redux-form

        instanceAxios.get('/api/lookup/subjects/')
            .then(res=>{            
                const subjectOptions = mapForCombo(res.data);
                this.setState({subjectOptions});
        });  
            
        $('#teacherSubjectsGrid').on('click', 'td', function(event) {
        
            if ($(this).find('#dele').length > 0) {
                
                //alert(  $(this).find('#dele').data('tid'));
                var id = $(this).find('#dele').data('tid');
                removeTeacherSubject(id, $(this));

            }
        });

    }
 
  render() {
    const { handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { teacherId, subjectOptions } = this.state;

    return (

        <div className="tabbable tabs">
            
            <ul className="nav nav-tabs">
                <li id="tabAddLink" className="active">
                    <a id="tabAddSubject" data-toggle="tab" href="#AAAA"><Msg phrase="AddText" /></a>
                </li>
                <li id="tabListLink">
                    <a id="tabListSubject" data-toggle="tab" href="#BBBB"><Msg phrase="ListText" /></a>
                </li> 
            </ul>

            <div className="tab-content padding-10">
                <div className="tab-pane active" id="AAAA">
                    
                    <form id="form-teacher-subject" className="smart-form" 
                        onSubmit={handleSubmit((values)=>{submitTeacherSubject(values, teacherId)})}>
                        <fieldset>

                        <div className="row">
                            <section className="col col-8">
                                <Field
                                    multi={true}
                                    name="subjectId"
                                    label="SubjectText"
                                    validate={required}
                                    options={subjectOptions} 
                                    component={RFReactSelect} />
                            </section>
                        </div>

                        {(error!==undefined && <AlertMessage type="w" icon="alert-danger" message={error} />)}

                        <Field component="input" type="hidden" name="teacherId"/>

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
                <div className="tab-pane table-responsive" id="BBBB">
                    
                    <Datatable id="teacherSubjectsGrid"  
                      options={{
                        ajax: {"url": getWebApiRootUrl() +'/api/TeachersSubjects/All/' + teacherId, "dataSrc": ""},
                        columnDefs: [
                            { 
                                "render": function ( data, type, row ) {
                                  //return (<a onClick={onOrderRestaurant.bind(self, this)} 
                                  //                className="btn btn-primary btn-sm">Order this restaurant
                                  //                </a>);
                                  return '<a id="dele" data-tid="' + data + '"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Edit</span></a>';
                                    //return ('<a onClick={self.handleClick.bind(self, 1)}>del</a>');
                                    //return '<a onClick={self.handleClick} className="btn btn-success">click</a>';
                                    //return '<a onClick="javascript:deleteConfirm()" className="btn btn-success"> Callback ()</a>';
                                    //return '<a data-toggle="modal" data-id="' + data + '" data-target="#teacherPopup"><i class=\"glyphicon glyphicon-edit\"></i><span class=\"sr-only\">Delete</span></a>';
                                }.bind(self),
                                "className": "dt-center",
                                "sorting": false,
                                "targets": 2
                            }
                        ],
                        columns: [
                          //{
                          //    "className":      'details-control',
                          //    "orderable":      false,
                          //    "data":           null,
                          //    "defaultContent": ''
                          //},
                          {data: "SubjectCode"},
                          {data: "SubjectName"},
                          {data: "TeacherSubjectID"}
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
                        <th data-hide="mobile-p"><Msg phrase="CodeText"/></th>
                        <th data-class="expand"><Msg phrase="SubjectText"/></th>
                        <th data-hide="mobile-p"></th>
                      </tr>
                      </thead>
                    </Datatable>

                </div> 
            </div>
        </div>
            
    )
  }
}
       
const afterSubmit = (result, dispatch) =>
  dispatch(reset('TeacherSubjectForm'));

export default reduxForm({
  form: 'TeacherSubjectForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(TeacherSubjectForm) 