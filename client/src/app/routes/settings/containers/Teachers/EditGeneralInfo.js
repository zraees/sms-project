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
import mapForCombo from '../../../../components/utils/functions'

import {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'

class EditGeneralInfo extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
        editDataLoaded: false,
        rating: 0,
        //countries: [],
        states: [],
        cities: []
        }
        this.handleCountryBlur = this.handleCountryBlur.bind(this);
        this.handleStateBlur = this.handleStateBlur.bind(this);
    }
  

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps --> EditGeneralInfo 2');
    
    const {teacherId} = nextProps;

    // if (this.state.countries === undefined || this.state.countries.length == 0) {
    //     axios.get('/api/countries/')
    //         .then(res=>{
    //             const countries = mapForCombo(res.data);          
    //             this.setState({countries});
    //     });
    // }

    if(teacherId>0 && !this.state.editDataLoaded){
      this.setState({editDataLoaded:true});
      this.handleInitialize(teacherId);
    }
  
}

    componentDidMount(){ 
        //LoaderVisibility(true);
        console.log('componentDidMount --> EditGeneralInfo');
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
                "DOB": res.data.DOB.replace("T00:00:00", ""),
                "address": res.data.Address,
                "phoneNo": res.data.PhoneNo,
                "mobileNo": res.data.MobileNo,
                "countryId": res.data.CountryId+"",
                "stateId": res.data.StateId+"",
                "cityId": res.data.CityId+""
            }

            //console.log('before state');

            if(res.data.CountryId!=null){
                axios.get('/api/states/' + res.data.CountryId)
                    .then(res=>{
                        const states = mapForCombo(res.data);             
                        this.setState({states});
                });
            }

            if(res.data.StateId!=null){
                axios.get('/api/cities/' + res.data.StateId)
                    .then(res=>{
                        const cities = mapForCombo(res.data);
                        this.setState({cities});
                });
            }

            this.props.initialize(initData); 
            //this.props.change("countryId", res.data.CountryId+""); // function provided by redux-form

          })
          .catch(function (error) {
            console.log(error);
            alert('f', '');
          });   
  } 

  handleCountryBlur(obj, value){
    axios.get('/api/states/' + value)
        .then(res=>{
            const states = mapForCombo(res.data);             
            this.setState({states});
        });
 
  }

  handleStateBlur(obj, value){
    axios.get('/api/cities/' + value)
        .then(res=>{
            const cities = mapForCombo(res.data);             
            this.setState({cities});
        });
 
  }

  changeRate(name, value) {
      this.props.change(name, value); // function provided by redux-form
      this.setState({ rating: value })
  }

  render() {
    const { teacherId, handleSubmit, nationalities, countries, pristine, reset, submitting, touched, error, warning } = this.props
    const { states, cities } = this.state;

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
                        
                        
                    <div className="row">
                    <section className="col col-6">
                        <Field name="phoneNo" labelClassName="input" 
                        labelIconClassName="icon-append fa fa-phone"
                        component={RFField} type="text" placeholder="Phone Number"/>
                    </section>

                    <section className="col col-6">
                        <Field name="mobileNo" labelClassName="input" 
                        labelIconClassName="icon-append fa fa-mobile"
                        component={RFField} type="text" placeholder="Mobile Number"/>
                    </section>
                    </div>

                    <div className="row">
                    <section className="col col-8">
                        <Field name="address" labelClassName="input" 
                        labelIconClassName="icon-append fa fa-map-marker"
                        component={RFField} type="text" placeholder="Street Address"/>
                    </section>

                    <section className="col col-4">
                        
                    </section>
                    </div>
                    
                    <div className="row">
                    <section className="col col-4">
                        <Field
                            multi={false}
                            name="countryId"
                            placeholder="Country"
                            options={countries}
                            onBlur={this.handleCountryBlur}
                            component={RFReactSelect} />
                    </section>

                    <section className="col col-4">
                        <Field
                            multi={false}
                            name="stateId"
                            placeholder="State"
                            options={states}
                            onBlur={this.handleStateBlur}
                            component={RFReactSelect} />
                    </section>

                    <section className="col col-4">
                        <Field
                            multi={false}
                            name="cityId"
                            placeholder="City"
                            options={cities}
                            onBlur={this.handleCityBlur}
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