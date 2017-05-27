import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';

import { Field, reduxForm } from 'redux-form'
import StarRating from 'react-rating'

import RFDatePicker from '../../../../components/ui/RFDatePicker'
import RFReactSelect from '../../../../components/ui/RFReactSelect'
import RFRadioButtonList from '../../../../components/ui/RFRadioButtonList'
import RFField from '../../../../components/ui/RFField'

import {required, email}  from '../../../../components/forms/validation/CustomValidation'
import asyncValidate from './asyncValidate'
import AlertMessage from '../../../../components/common/AlertMessage'
import alert from '../../../../components/utils/alerts'

class EditGeneralInfo extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      editDataLoaded: false,
      rating: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const {teacherId} = nextProps;

    if(teacherId<=0){
      this.setState({editDataLoaded:false});
      const initData = {
          "id": 0,
          "name": "",
          "email": "",
          "gender": "male",
          "rating":0
        }        
        this.props.initialize(initData);
    }
    else if(teacherId>0 && !this.state.editDataLoaded){
      this.setState({editDataLoaded:true});
      this.handleInitialize(teacherId);
    }
  }

  handleInitialize(teacherId) { 
      axios.get('/api/teachers/' + teacherId)
          .then(res=>{            
              //var json = res.data; T00:00:00
              //console.log(res.data.DOB.replace("T00:00:00", ""));
            this.setState({rating:res.data.Rating});
            const initData = {
                "id": teacherId,
                "name": res.data.Name,
                "email": res.data.Email,
                "gender": res.data.Gender,
                "rating": res.data.Rating,
                "idNo": res.data.IDNo,
                "nationalityId": "" + res.data.NationalityId,
                "DOB": res.data.DOB.replace("T00:00:00", "")
            }
            
            this.props.initialize(initData); 
          })
          .catch(function (error) {
            console.log(error);
            alert('f', '');
          });   
  } 

  changeRate(name, value) {
    // console.log('changeRate');
    // console.log(name);
    // console.log(value);
      this.props.change(name, value); // function provided by redux-form
      this.setState({ rating: value })
  }

  render() {
    const { teacherId, handleSubmit, nationalities, pristine, reset, submitting, touched, error, warning } = this.props

    return (
            <form id="form-teacher" className="smart-form" 
                onSubmit={handleSubmit}>

              {/*<header>
                Edit Personal Information
              </header>*/}

                <fieldset>
            
                    <div className="row">
                    <section className="col col-6">
                        <Field name="name" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                        validate={required} component={RFField} type="text" placeholder="Name"/>    
                    </section>

                    <section className="col col-6">
                        <Field name="email" labelClassName="input" labelIconClassName="icon-append fa fa-envelope-o"
                        validate={[required,email]} component={RFField} type="text" placeholder="Email Address"/>
                    </section>
                    </div>

                    <div className="row">
                    <section className="col col-6">
                        <Field name="DOB" validate={required} placeholder="Date of Birth" component={RFDatePicker} />
                    </section>

                    <section className="col col-3">
                        <Field component={RFRadioButtonList} name="gender" required={true} 
                        placeholder="Gender"
                        options={[
                            { title: 'Male', value: 'male' },
                            { title: 'Female', value: 'female' }
                        ]} />
                    </section>

                    <section className="col col-3">      
                        <label>Rating</label>              
                        <div className="inline-group">
                        <StarRating onChange={(value) => { this.changeRate("rating", value) } }
                            initialRate={ this.state.rating } 
                            empty="fa fa-star-o fa-2x"
                            full="fa fa-star fa-2x"  
                            />
                        <Field component="input" type="hidden" name="rating"/>
                        </div>
                    </section>
                    </div>
                
                    <div className="row">
                    <section className="col col-6">
                        <Field name="idNo" labelClassName="input" 
                        labelIconClassName="icon-append fa fa-credit-card-alt"
                        component={RFField} type="text" placeholder="Identity Card Number"/>
                    </section>

                    <section className="col col-6">
                        <Field
                            multi={false}
                            name="nationalityId"
                            placeholder="Nationality"
                            options={nationalities}
                            component={RFReactSelect} />
                    </section>
                    </div>

                </fieldset>

                {(error!==undefined && <AlertMessage type="w" icon="alert-danger" message={error} />)}

                <footer>
                    <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary">
                    { teacherId > 0 ? "Undo Changes" : "Reset" }
                    </button>
                    <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
                    Save
                    </button>
                </footer>
            </form>
    )
  }
}
       
const afterSubmit = (result, dispatch) =>
  dispatch(reset('EditGeneralInfo'));

export default reduxForm({
  form: 'EditGeneralInfo',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false
  // ,
  // asyncValidate,
  // asyncBlurFields: ['email']
})(EditGeneralInfo)