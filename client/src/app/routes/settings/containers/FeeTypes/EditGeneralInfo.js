import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';

import { Field, reduxForm } from 'redux-form'

import { RFReactSelect } from '../../../../components/ui'

import { required }  from '../../../../components/forms/validation/CustomValidation'
import AlertMessage from '../../../../components/common/AlertMessage'
import mapForCombo from '../../../../components/utils/functions'

import {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'
import Msg from '../../../../components/i18n/Msg' 

class EditGeneralInfo extends React.Component {
 
    constructor(props){
        super(props);
        this.state = {
            editDataLoaded: false,
            shiftOptions: [],
            classOptions: [],
            sectionOptions: []
        }
    }  

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps --> EditGeneralInfo 2');
        
        const {classSectionId} = nextProps;
    
        if(classSectionId>0 && !this.state.editDataLoaded){
            this.setState({editDataLoaded:true});
            this.handleInitialize(classSectionId);
        }
  
    }

    componentDidMount(){ 
        
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
            
        console.log('componentDidMount --> EditGeneralInfo');
    }

    handleInitialize(classSectionId) { 
      axios.get('/api/ClassesSectionsById/' + classSectionId)
          .then(res=>{        
            console.log(res.data);
            const initData = {
                "classSectionId": classSectionId,
                "shiftId": ""+ res.data.ShiftID,
                "classId": ""+ res.data.ClassID,
                "sectionId": ""+ res.data.SectionID
            } 
            this.props.initialize(initData);             
          })
          .catch(function (error) {
            console.log(error);
            alert('f', '');
          });   
    } 
  
    render() {
        const { classSectionId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
        const { shiftOptions, classOptions, sectionOptions } = this.state;

        return (
            <form id="form-classSection" className="smart-form" 
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

                {(error!==undefined && <AlertMessage type="w" icon="alert-danger" message={error} />)}

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
    dispatch(reset('EditGeneralInfo'));
}

export default reduxForm({
  form: 'EditGeneralInfo',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(EditGeneralInfo)