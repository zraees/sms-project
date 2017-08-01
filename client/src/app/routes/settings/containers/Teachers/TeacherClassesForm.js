import React from 'react'
import { reset } from 'redux-form'
import axios from 'axios'
import classNames from 'classnames'

import { Field, reduxForm } from 'redux-form'

import Datatable from '../../../../components/tables/Datatable'
import { RFReactSelect } from '../../../../components/ui'

import { required }  from '../../../../components/forms/validation/CustomValidation'
import AlertMessage from '../../../../components/common/AlertMessage'
import {submitTeacherClasses, removeTeacherClasses} from './submit'
import mapForCombo from '../../../../components/utils/functions'
import Msg from '../../../../components/i18n/Msg'

class TeacherClassesForm extends React.Component  {
  
    constructor(props){
        super(props);
        this.state = {
            classOptions: [] 
        }
    }

    componentDidMount(){ 
        console.log('componentDidMount --> TeacherClassesForm');

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

    }
 
  render() {
    const { teacherId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { classOptions } = this.state;

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
                            <section className="col col-4">
                                <Field
                                    multi={false}
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
                        ajax: {"url":'/api/TeacherClasses/' + teacherId, "dataSrc": ""},
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
                                "targets": 6
                            }
                        ],
                        columns: [
                          //{
                          //    "className":      'details-control',
                          //    "orderable":      false,
                          //    "data":           null,
                          //    "defaultContent": ''
                          //},
                          {data: "Classes.Code"},
                          {data: "Classes.Name"},
                          {data: "TeacherClassId"}
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