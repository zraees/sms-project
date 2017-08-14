import React from 'react'
import { reset } from 'redux-form'
import axios from 'axios'
import classNames from 'classnames'

import { Field, reduxForm } from 'redux-form'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import Datatable from '../../../../components/tables/Datatable'
 
import {RFField, RFRadioButtonList, RFTextArea } from '../../../../components/ui'

import {required, email, number} from '../../../../components/forms/validation/CustomValidation'
import AlertMessage from '../../../../components/common/AlertMessage'
import {submitStudentSpecialSevices, removeStudentSpecialSevices} from './submit'
import {mapForRadioList} from '../../../../components/utils/functions'
import { upper } from '../../../../components/utils/normalize'
import Msg from '../../../../components/i18n/Msg'

class SpecialServicesForm extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {  
            yesNoOptions: [],
            activeTab: "add",
            disabledDetails: true        
        }
        this.handleHasReceivedServiceChange = this.handleHasReceivedServiceChange.bind(this);
    }
    
    componentDidMount(){ 
         
        axios.get('assets/api/common/YesNo.json')
            .then(res=>{         
                const yesNoOptions = mapForRadioList(res.data);
                this.setState({yesNoOptions});
            });
 
        this.props.change('studentId', this.props.studentId); // function provided by redux-form

        $('#specialServicesGrid').on('click', 'td', function(event) {
        
        if ($(this).find('#dele').length > 0) {
            
            //alert(  $(this).find('#dele').data('tid'));
            var id = $(this).find('#dele').data('tid');
            removeStudentSpecialSevices(id, $(this));

        }
        });

    } 
        
    handleHasReceivedServiceChange(obj, value){ 
        if(value=="Yes"){
            this.setState({disabledDetails:true});
        }
        else{
            this.setState({disabledDetails:false});
        }
    }

  //
  render() {
    const { studentId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { activeTab, disabledDetails, yesNoOptions } = this.state;

    return (

        <WidgetGrid>

        <div className="tabbable tabs">
            
            <ul className="nav nav-tabs">
                <li id="tabAddLink" className="active">
                    <a id="tabAddSpecialService" data-toggle="tab" href="#A11A2"><Msg phrase="AddText" /></a>
                </li>
                <li id="tabListLink">
                    <a id="tabListSpecialService" data-toggle="tab" href="#B11B2"><Msg phrase="ListText" /></a>
                </li> 
            </ul>

            <div className="tab-content">
                <div className="tab-pane active" id="A11A2">
                    
                    <form id="form-special-services" className="smart-form" 
                        onSubmit={handleSubmit((values)=>{submitStudentSpecialSevices(values, studentId)})}>
                        <fieldset>

                        <div className="row">
                            <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                                <Field name="specialServiceName" labelClassName="input" 
                                    labelIconClassName="icon-append fa fa-book"
                                    component={RFTextArea} 
                                    maxLength="500" type="text" 
                                    label="SpecialServiceNameText"
                                    placeholder="Please enter special service that your child ever evaluated. e.g: Speech/Language therapy, counseling, wears hearing aids or others"/>
                            </section> 
                        </div> 

                        <div className="row">            
                            <section className="remove-col-padding col-sm-6 col-md-6 col-lg-6">
                                <Field component={RFRadioButtonList} name="hasReceivedService" 
                                    required={true} 
                                    label="ChooseYesIfReceivedSpeicalServiceText"
                                    onChange={this.handleHasReceivedServiceChange}
                                    options={yesNoOptions} />
                            </section>                
                            <section className="remove-col-padding col-sm-6 col-md-6 col-lg-6">
                                 
                            </section>
                        </div>

                        <div className="row">
                            <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                                <Field name="details" labelClassName="input" 
                                    labelIconClassName="icon-append fa fa-book"
                                    component={RFTextArea} 
                                    maxLength="500" type="text" 
                                    label="DetailsText"
                                    placeholder="Please enter details about the special service"/>
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
                <div className="tab-pane table-responsive" id="B11B2">
                    
                    <Datatable id="specialServicesGrid"  
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
                          {data: "SpecialServiceName"},
                          {data: "Details"},
                          {data: "StudentSpecialServiceID"}
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
                        <th data-hide="mobile-p"><Msg phrase="SpecialServiceNameText"/></th>
                        <th data-class="expand"><Msg phrase="DetailsText"/></th>                 
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
    dispatch(reset('SpecialServicesForm')); 
} 

export default reduxForm({
  form: 'SpecialServicesForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(SpecialServicesForm)