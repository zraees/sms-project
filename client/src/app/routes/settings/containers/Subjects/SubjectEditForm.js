import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';

import { Field, reduxForm } from 'redux-form'
import StarRating from 'react-rating'
import moment from 'moment'

import {RFField} from '../../../../components/ui'

import {required, email}  from '../../../../components/forms/validation/CustomValidation'
import AlertMessage from '../../../../components/common/AlertMessage'
import mapForCombo, {getWebApiRootUrl, instanceAxios} from '../../../../components/utils/functions'

import {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'
import Msg from '../../../../components/i18n/Msg' 

class SubjectEditForm extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
        editDataLoaded: false 
        }
    }

  componentWillReceiveProps(nextProps) { 
    const {subjectId} = nextProps;
 
    if(subjectId>0 && !this.state.editDataLoaded){
      this.setState({editDataLoaded:true});
      this.handleInitialize(subjectId);
    }
  
}

    componentDidMount(){ 
        //LoaderVisibility(true);
        //console.log('componentDidMount --> SubjectEditForm');
    }

    handleInitialize(subjectId) { 
        instanceAxios.get('/api/subjects/' + subjectId)
            .then(res=>{                                  
            
            const initData = {
                "subjectId": subjectId,
                "code": res.data.Code,
                "name": res.data.Name,
                "nameAr": res.data.NameAr
            }

            this.props.initialize(initData);  

            })
            .catch(function (error) {
            console.log(error);
            alert('f', '');
            });   
    } 
 
  render() {
    const { subjectId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    
    return (
            <form id="form-subject" className="smart-form" 
                onSubmit={handleSubmit}>
 
                <fieldset>
                    
                    <div className="row">
                    <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
                        <Field name="code" labelClassName="input" 
                            labelIconClassName="icon-append fa fa-barcode"
                            validate={required} component={RFField} 
                            maxLength="10" type="text" placeholder="" 
                            label="CodeText" />    
                    </section>

                    <section className="remove-col-padding col-sm-9 col-md-9 col-lg-9">
                        
                    </section>
                    </div>

                    <div className="row">
                    <section className="remove-col-padding col-sm-6 col-md-6 col-lg-6">
                        <Field name="name" labelClassName="input" 
                            labelIconClassName="icon-append fa fa-file-text-o"
                            validate={required} component={RFField} 
                            maxLength="100" type="text" placeholder="" 
                            label="NameText" />
                    </section>

                    <section className="remove-col-padding col-sm-6 col-md-6 col-lg-6">
                        <Field name="nameAr" labelClassName="input" 
                            labelIconClassName="icon-append fa fa-file-text-o"
                            validate={required} component={RFField} 
                            maxLength="100" type="text" placeholder="" 
                            label="NameArText" />
                    </section> 
                    </div>

                </fieldset>

                {(error!==undefined && <AlertMessage type="w" icon="alert-danger" message={error} />)}

                <footer>
                    <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary">                    
                    { subjectId > 0 ? <Msg phrase="UndoChangesText" /> : <Msg phrase="ResetText"/> }
                    </button>
                    <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
                        <Msg phrase="SaveText"/>
                    </button>
                </footer>
            </form>
    )
  }
}
       
const afterSubmit = function(result, dispatch) { 
    dispatch(reset('SubjectEditForm'));
}

export default reduxForm({
  form: 'SubjectEditForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(SubjectEditForm)