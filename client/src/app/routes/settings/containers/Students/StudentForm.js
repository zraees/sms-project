import React from 'react'
import {reset} from 'redux-form';
import axios from 'axios';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import {Field, reduxForm} from 'redux-form'
import {required, email}  from '../../../../components/forms/validation/CustomValidation'

import {RFField, RFDatePicker, RFRadioButtonList, RFReactSelect, RFTextArea} from '../../../../components/ui'

import asyncValidate from './asyncValidate'
import AlertMessage from '../../../../components/common/AlertMessage'
import Msg from '../../../../components/i18n/Msg'
import mapForCombo, {mapForRadioList} from '../../../../components/utils/functions'

class StudentForm extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      editDataLoaded: false,
      states: [],
      cities: [],
      genderOptions: [],
      languageOptions: [],
      religionOptions: [],
      studentStayWithOptions: [],
      disabledStudentStayWithOther: true
    }
    this.handleCountryBlur = this.handleCountryBlur.bind(this);
    this.handleStateBlur = this.handleStateBlur.bind(this);
    this.handleCityBlur = this.handleCityBlur.bind(this);
    this.handleStudentStayWithChange = this.handleStudentStayWithChange.bind(this);
  }
  
  componentDidMount(){ 
      
    const initData = {
        "studentId": 0
      }        
      
      axios.get('assets/api/students/student-stay-with.json')
        .then(res=>{
            //console.log('student-stay-with');            
            const studentStayWithOptions = mapForRadioList(res.data);
            this.setState({studentStayWithOptions});
        });

      axios.get('assets/api/common/gender.json')
        .then(res=>{           
            const genderOptions = mapForRadioList(res.data); 
            this.setState({genderOptions});
        });

      axios.get('/api/lookup/languages/')
        .then(res=>{            
            const languageOptions = mapForCombo(res.data);
            this.setState({languageOptions});
        });

      axios.get('/api/lookup/religions/')
        .then(res=>{            
            const religionOptions = mapForCombo(res.data);
            this.setState({religionOptions});
        });

    this.props.initialize(initData);
    console.log('componentDidMount --> StudentForm');
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

  handleStudentStayWithChange(obj, value){ 
    if(value=="Other"){
      this.setState({disabledStudentStayWithOther:false});
    }
    else{
      this.setState({disabledStudentStayWithOther:true});
    }
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

  render() {
    const { studentId, handleSubmit, nationalities, countries, pristine, reset, submitting, touched, error, warning } = this.props
    const { states, cities, studentStayWithOptions, disabledStudentStayWithOther, genderOptions, languageOptions, religionOptions } = this.state;

    return (
            <form id="form-Student" className="smart-form" 
                onSubmit={handleSubmit}>
 
              <fieldset>

                <div className="row">
                  <section className="col col-2">
                    <Field name="studentCode" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-credit-card-alt"
                      component={RFField} validate={required} type="text" 
                      placeholder="Please enter student code"
                      label="CodeText"/>
                  </section>
                  <section className="col col-5">
                    <Field name="idNo" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-credit-card-alt"
                      component={RFField} validate={required} type="text" 
                      placeholder="Please enter Identity card number"
                      label="IdentityCardNumberText"/>
                  </section>
                  <section className="col col-5">
                    <Field name="fatherIdNo" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-credit-card-alt"
                      component={RFField} validate={required} type="text" 
                      placeholder="Please enter Father's Identity card number"
                      label="FatherIdentityCardNumberText"/>
                  </section> 
                </div>

              </fieldset>

              <fieldset>
                
                <div className="row">
                  <section className="col col-3">
                    <Field name="name1" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      validate={required} component={RFField} type="text" placeholder="Please enter name1" 
                      label="Name1Text" />    
                  </section>

                  <section className="col col-3">
                    <Field name="name2" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} type="text" placeholder="Please enter name2" 
                      label="Name2Text" />    
                  </section>

                  <section className="col col-3">
                    <Field name="name3" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} type="text" placeholder="Please enter name3" 
                      label="Name3Text" />    
                  </section>
                  
                  <section className="col col-3">
                    <Field name="name4" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} type="text" placeholder="Please enter name4" 
                      label="Name4Text" />    
                  </section>
                </div>

                <div className="row">
                    <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                        <Field name="nameAsPerPassport" labelClassName="input" labelIconClassName="icon-append fa fa-graduation-cap"
                            validate={required} component={RFField} type="text" 
                            label="Name1AsPerPassportText"
                            placeholder="Please enter full name as per passport"/>
                    </section>
                    {/*</section>*/}
                </div>

                <div className="row">
                  <section className="col col-3">
                    <Field name="nameAr1" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      validate={required} component={RFField} type="text" placeholder="Please enter nameAr1" 
                      label="NameAr1Text" />    
                  </section>

                  <section className="col col-3">
                    <Field name="nameAr2" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} type="text" placeholder="Please enter nameAr2" 
                      label="NameAr2Text" />    
                  </section>

                  <section className="col col-3">
                    <Field name="nameAr3" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} type="text" placeholder="Please enter nameAr3" 
                      label="NameAr3Text" />    
                  </section>
                  
                  <section className="col col-3">
                    <Field name="nameAr4" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} type="text" placeholder="Please enter nameAr4" 
                      label="NameAr4Text" />    
                  </section>
                </div>

                <div className="row">
                    <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                        <Field name="nameArAsPerPassport" labelClassName="input" labelIconClassName="icon-append fa fa-graduation-cap"
                            validate={required} component={RFField} type="text" 
                            label="Name2AsPerPassportText"
                            placeholder="Please enter full nameAr as per passport"/>
                    </section>
                    {/*</section>*/}
                </div>

              </fieldset>

              <fieldset>
                
                <div className="row">
                  <section className="col col-3">
                    <Field name="dob" validate={required} 
                      label="DOBText" 
                      component={RFDatePicker} />
                  </section>

                  <section className="col col-3">
                    <Field component={RFRadioButtonList} name="gender" required={true} 
                      label="GenderText"
                      options={genderOptions} />
                  </section>

                  <section className="col col-3">      
                    <Field
                        multi={false}
                        name="lang1Id"
                        label="Language1Text"
                        options={languageOptions}
                        component={RFReactSelect} />
                  </section>                  

                  <section className="col col-3">
                    <Field
                        multi={false}
                        name="religionId"
                        label="ReligionText"
                        options={religionOptions}
                        component={RFReactSelect} />
                  </section>

                </div>
            
                <div className="row">
                  
                  <section className="col col-3">
                    <Field name="email" labelClassName="input" labelIconClassName="icon-append fa fa-envelope-o"
                      validate={[required,email]} component={RFField} type="text" placeholder="Please enter email address" 
                      label="EmailAddressText"/>
                  </section>

                  <section className="col col-6">
                    <Field component={RFRadioButtonList} name="studentStayWith" required={true} 
                      label="StudentStayWithText"
                      onChange={this.handleStudentStayWithChange}
                      options={studentStayWithOptions}
                      />
                  </section>

                  <section className="col col-3">
                    <Field name="studentStayWithOther" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-credit-card-alt"
                      component={RFField} disabled={disabledStudentStayWithOther} type="text" 
                      placeholder="Please enter student stay with"
                      label="StudentStayWithOtherText"/>
                  </section>

                </div>

                <div className="row">
                  <section className="col col-3">
                    <Field name="birthPlace" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-credit-card-alt"
                      component={RFField} type="text" 
                      placeholder="Please enter place of birth"
                      label="BirthPlaceText"/>
                  </section>

                  <section className="col col-3">
                    <Field
                        multi={false}
                        name="nationalityId"
                        label="NationalityText"
                        options={nationalities}
                        component={RFReactSelect} />
                  </section> 

                  <section className="col col-3">
                    <Field name="phoneNo" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-phone"
                      component={RFField} type="text" 
                      label="PhoneNumberText"
                      placeholder="Please enter phone number"/>
                  </section>

                  <section className="col col-3">
                    <Field name="mobileNo" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-mobile"
                      component={RFField} type="text" 
                      label="MobileNumberText"
                      placeholder="Please enter mobile number"/>
                  </section>
                </div>

                <div className="row">
                  <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                    <Field name="address" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-map-marker"
                      component={RFField} type="text" 
                      label="StreetAddressText"
                      placeholder="Please enter street address"/>
                  </section> 
                </div>
                
                <div className="row">
                  <section className="col col-4">
                    <Field
                        multi={false}
                        name="countryId"
                        label="CountryText"
                        options={countries}
                        onBlur={this.handleCountryBlur}
                        component={RFReactSelect} />
                  </section>

                  <section className="col col-4">
                    <Field
                        multi={false}
                        name="stateId"
                        label="StateText"
                        options={states}
                        onBlur={this.handleStateBlur}
                        component={RFReactSelect} />
                  </section>

                  <section className="col col-4">
                    <Field
                        multi={false}
                        name="cityId"
                        label="CityText"
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
                  { studentId > 0 ? <Msg phrase="UndoChangesText" /> : <Msg phrase="ResetText"/> }
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
    dispatch(reset('StudentForm'));
}

export default reduxForm({
  form: 'StudentForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(StudentForm)
