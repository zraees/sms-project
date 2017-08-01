import React from 'react'
import {reset} from 'redux-form';
import axios from 'axios';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import {connect} from 'react-redux'

import {Field, reduxForm} from 'redux-form'
import {required, email, requiredCombo}  from '../../../../components/forms/validation/CustomValidation'

import {RFField, RFReactSelect} from '../../../../components/ui'

import AlertMessage from '../../../../components/common/AlertMessage'
import Msg from '../../../../components/i18n/Msg'
import mapForCombo from '../../../../components/utils/functions'
 
class ClassSectionForm extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      editDataLoaded: false, 
      shiftOptions: [],
      classOptions: [],
      sectionOptions: []
    }  
  }
  
  componentDidMount(){ 
      
    const initData = {
      "classSectionId": 0
    }        
       
    axios.get('/api/lookup/shifts/')
      .then(res=>{            
          const shiftOptions = mapForCombo(res.data);
          this.setState({shiftOptions});
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

    this.props.initialize(initData);
    console.log('componentDidMount --> ClassSectionForm');
  }
 
  render() {
    const { classSectionId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { shiftOptions, classOptions, sectionOptions } = this.state;
    
    return (
            <form id="form-Student" className="smart-form" 
                onSubmit={handleSubmit}>
   
              <fieldset>
                 
                <div className="row">
                  <section className="col col-4">
                    <Field
                        multi={false}
                        name="shiftId"
                        label="ShiftText"
                        validate={required}
                        options={shiftOptions} 
                        component={RFReactSelect} />
                  </section>

                  <section className="col col-4">
                    <Field
                        multi={false}
                        name="classId"
                        label="ClassText"
                        validate={required}
                        options={classOptions} 
                        component={RFReactSelect} />
                  </section>

                  <section className="col col-4">
                    <Field
                        multi={false}
                        name="sectionId"
                        label="SectionText"
                        validate={required}
                        options={sectionOptions} 
                        component={RFReactSelect} />
                  </section>
                </div>

              </fieldset>
              
              {(error!==undefined && <AlertMessage type="w" 
                          icon="alert-danger" message={error} />)}

              <footer>
                <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary">
                  { classSectionId > 0 ? <Msg phrase="UndoChangesText" /> : <Msg phrase="ResetText"/> }
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
    console.log('result = ', result);
    dispatch(reset('ClassSectionForm'));
}

//export default 
ClassSectionForm = reduxForm({
  form: 'ClassSectionForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(ClassSectionForm)
 
export default ClassSectionForm;
 