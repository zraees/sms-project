import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { Field, reduxForm } from 'redux-form'
import StarRating from 'react-rating'

import {required, email}  from '../../../../components/forms/validation/CustomValidation'
import MaskedInput from '../../../../components/forms/inputs/MaskedInput'
import UiDatepicker from '../../../../components/forms/inputs/UiDatepicker'
import RFDatePicker from '../../../../components/ui/RFDatePicker'
import RFReactSelect from '../../../../components/ui/RFReactSelect'
import RFRadioButtonList from '../../../../components/ui/RFRadioButtonList'
import RFField from '../../../../components/ui/RFField'
import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";
import asyncValidate from './asyncValidate'
import AlertMessage from '../../../../components/common/AlertMessage'

class TeacherForm extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      editDataLoaded: false,
      rating: 0,
      states: [],
      cities: []
    }
    this.handleCountryBlur = this.handleCountryBlur.bind(this);
    this.handleStateBlur = this.handleStateBlur.bind(this);
    this.handleCityBlur = this.handleCityBlur.bind(this);
  }
  
  componentDidMount(){ 

    console.log('componentDidMount --> TeacherForm');
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
              //var json = res.data;                
              const initData = {
                  "id": teacherId,
                  "name": res.data.Name,
                  "email": res.data.Email
                } 
                this.props.initialize(initData); 
          })
          .catch(function (error) {
            console.log(error);
            smallBox({
              title: "System Alert",
              content: "<i class='fa fa-clock-o'></i> <i>Something went wrong, please contact system administrator</i>",
              color: "#C46A69",
              iconSmall: "fa fa-times fa-2x fadeInRight animated",
              timeout: 5000
            });
          });   
  } 

  handleCountryBlur(obj, value){
    axios.get('/api/states/' + value)
        .then(res=>{
            const states = res.data.map(function(item, index){
                return {value: item.Id + "", label: item.Name};
            });                       
            this.setState({states});
        });
 
  }

  handleStateBlur(obj, value){
    axios.get('/api/cities/' + value)
        .then(res=>{
            const cities = res.data.map(function(item, index){
                return {value: item.Id + "", label: item.Name};
            });                       
            this.setState({cities});
        });
 
  }


  handleCityBlur(obj, value){
    console.log(obj);
    console.log(value);
  }

  changeRate(name, value) {
      this.props.change(name, value);
      this.setState({ rating: value })
  }

  render() {
    const { teacherId, handleSubmit, nationalities, countries, pristine, reset, submitting, touched, error, warning } = this.props
    const { states, cities } = this.state;

    return (
            <form id="form-teacher" className="smart-form" 
                onSubmit={handleSubmit}>

              {/*<header>
                Personal Information
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
                    <Field name="dob" validate={required} placeholder="Date of Birth" component={RFDatePicker} />
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
              
              {(error!==undefined && <AlertMessage type="w" 
                          icon="alert-danger" message={error} />)}

              
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
  dispatch(reset('TeacherForm'));

export default reduxForm({
  form: 'TeacherForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false
  // ,
  // asyncValidate,
  // asyncBlurFields: ['email']
})(TeacherForm)
