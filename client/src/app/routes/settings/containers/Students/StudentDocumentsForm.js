import React from 'react'
import { reset } from 'redux-form'
import axios from 'axios'
import classNames from 'classnames'

import { Field, FieldArray, reduxForm } from 'redux-form'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import Datatable from '../../../../components/tables/Datatable'
 
import {RFField, RFReactSelect, RFRadioButtonList, RFFileUpload} from '../../../../components/ui'

import {required, email, number} from '../../../../components/forms/validation/CustomValidation'
import AlertMessage from '../../../../components/common/AlertMessage'
import {submitStudentRelative, removeStudentRelative} from './submit'
import mapForCombo, {isOtherOptionSelected} from '../../../../components/utils/functions'
import { upper } from '../../../../components/utils/normalize'
import Msg from '../../../../components/i18n/Msg'

class StudentDocumentsForm extends React.Component {
  
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

        let documents = [];        
        documents.push({"documentTitle":"Transfer Certificate", "document":""});
        documents.push({"documentTitle":"NOC", "document":""});
        const initData = {
            "documentId": 0,
            "code": '123',
            "documents": documents
        }

        this.props.initialize(initData);
    } 
        
    handleOtherRelationBlur(obj, value){ 
        if(isOtherOptionSelected(value)){
            this.setState({disabledOtherRelation:true});
        }
        else{
            this.setState({disabledOtherRelation:false});
        }
    } 

  render() {
    const { studentId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { activeTab, classOptions, relationOptions, disabledOtherRelation } = this.state;

    const renderDocumentList = ({ fields }) => (
        <ul>
            <li>
                <button type="button" onClick={() => fields.push({})}><Msg phrase="AddDocumentText" /></button>
            </li> 
            {fields.map((doc, index) =>
            <li key={index}>                
                <div className="row">  
                    <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                        <Field name={`${doc}.documentTitle`} labelClassName="input" 
                            labelIconClassName="icon-append fa fa-user"
                            validate={required} component={RFField} normalize={upper}  
                            maxLength="50"
                            type="text" placeholder="" 
                            label="" />
                    </section>  
                    <section className="remove-col-padding col-sm-6 col-md-6 col-lg-6">
                        <Field
                            name={`${doc}.document`}
                            component={RFFileUpload}
                            /> 
                    </section>                    
                    <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
                        <button type="button" title="Remove Document" onClick={() => fields.remove(index)} />                            
                    </section> 
                </div>
                
            </li> 
            )}
        </ul>
    )

    return (

        <WidgetGrid>
 
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
                            test
                    </section>
                    <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                        testtt
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

                <div className="row">
                    <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                        <FieldArray name="documents" component={renderDocumentList}/>
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
           
        </WidgetGrid>
    )
  }
}
       
       
const afterSubmit = function(result, dispatch) {
    dispatch(reset('StudentDocumentsForm')); 
} 

export default reduxForm({
  form: 'StudentDocumentsForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(StudentDocumentsForm)