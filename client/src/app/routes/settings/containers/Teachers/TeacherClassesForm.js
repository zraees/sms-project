import React from 'react'
import { reset } from 'redux-form'
import axios from 'axios'
import classNames from 'classnames'

import { Field, reduxForm } from 'redux-form'

import Datatable from '../../../../components/tables/Datatable'
import { RFReactSelect } from '../../../../components/ui'

import { required }  from '../../../../components/forms/validation/CustomValidation'
import AlertMessage from '../../../../components/common/AlertMessage'
import {submitTeacherClass, removeTeacherClass} from './submit'
import mapForCombo from '../../../../components/utils/functions'
import Msg from '../../../../components/i18n/Msg'

class TeacherClassesForm extends React.Component  {
  
    constructor(props){
        super(props);
        this.state = {
            teacherId: 0,
            classOptions: [] 
        }
    }

    componentDidMount(){ 
        //console.log('componentDidMount --> TeacherClassesForm --- ', this.props.teacherId);

        this.setState({teacherId: this.props.teacherId});
        this.props.change('teacherId', this.props.teacherId); // function provided by redux-form

        axios.get('/api/lookup/classes/')
            .then(res=>{            
                const classOptions = mapForCombo(res.data);
                this.setState({classOptions});
        });  
            
        $('#TeacherClassesGrid').on('click', 'td', function(event) {
        
            if ($(this).find('#dele').length > 0) {
                
                //alert(  $(this).find('#dele').data('tid'));
                var id = $(this).find('#dele').data('tid');
                removeTeacherClass(id, $(this));

            }
        });
        //console.log('componentDidMount --> TeacherClassesForm --- completed =-- ', this.props.teacherId);
    }
 
  render() {
    const { handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { teacherId, classOptions } = this.state;

    return (

        <div className="tabbable tabs">
            
            <ul className="nav nav-tabs">
                <li id="tabAddLink" className="active">
                    <a id="tabAddClass" data-toggle="tab" href="#AAAAA"><Msg phrase="AddText" /></a>
                </li>
                <li id="tabListLink">
                    <a id="tabListClass" data-toggle="tab" href="#BBBBB"><Msg phrase="ListText" /></a>
                </li> 
            </ul>

            <div className="tab-content padding-10">
                <div className="tab-pane active" id="AAAAA">
                    
                    <form id="form-teacher-class" className="smart-form" 
                        onSubmit={handleSubmit((values)=>{submitTeacherClass(values, teacherId)})}>
                        <fieldset>

                        <div className="row">
                            <section className="col col-8">
                                <Field
                                    multi={true}
                                    name="classId"
                                    label="ClassText"
                                    validate={required}
                                    options={classOptions} 
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
                <div className="tab-pane table-responsive" id="BBBBB">
                    
                    <Datatable id="TeacherClassesGrid"  
                      options={{
                        ajax: {"url":'/api/TeachersClasses/All/' + teacherId, "dataSrc": ""},
                        columnDefs: [
                            { 
                                "render": function ( data, type, row ) { 
                                  return '<a id="dele" data-tid="' + data + '"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Edit</span></a>';
                                    
                                }.bind(self),
                                "className": "dt-center",
                                "sorting": false,
                                "targets": 2
                            }
                        ],
                        columns: [ 
                          {data: "ClassCode"},
                          {data: "ClassName"},
                          {data: "TeacherClassID"}
                        ],
                        buttons: [
                          'copy', 'excel', 'pdf'
                        ]
                      }}
                      paginationLength={true} 
                      //refresh={this.state.refresh}
                      className="table table-striped table-bordered table-hover"
                      width="100%">
                      <thead>
                      <tr>
                        <th data-hide="mobile-p"><Msg phrase="CodeText"/></th>
                        <th data-class="expand"><Msg phrase="ClassText"/></th>
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
  dispatch(reset('TeacherClassesForm'));

export default reduxForm({
  form: 'TeacherClassesForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(TeacherClassesForm) 