import React from 'react'
import {reset} from 'redux-form';
import axios from 'axios';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import {connect} from 'react-redux'

import {Field, reduxForm, formValueSelector, getFormValues} from 'redux-form'
import {required, email, requiredCombo}  from '../../../../components/forms/validation/CustomValidation'

import {RFField, RFDatePicker, RFRadioButtonList, RFReactSelect, RFTextArea} from '../../../../components/ui'

import asyncValidate from './asyncValidate'
import AlertMessage from '../../../../components/common/AlertMessage'
import Msg from '../../../../components/i18n/Msg'
import mapForCombo, {mapForRadioList} from '../../../../components/utils/functions'
import {upper, lower} from '../../../../components/utils/normalize'

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
      shiftOptions: [],
      classOptions: [],
      sectionOptions: [],
      batchOptions: [],
      studentStayWithOptions: [],
      disabledStudentStayWithOther: true
    }
    this.handleCountryBlur = this.handleCountryBlur.bind(this);
    this.handleStateBlur = this.handleStateBlur.bind(this);
    this.handleCityBlur = this.handleCityBlur.bind(this);
    this.handleStudentStayWithChange = this.handleStudentStayWithChange.bind(this);
    this.handleShiftBlur = this.handleShiftBlur.bind(this);
    this.handleClassBlur = this.handleClassBlur.bind(this);
    this.handleSectionBlur = this.handleSectionBlur.bind(this);
    this.handleName1Blur = this.handleName1Blur.bind(this);
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

      axios.get('/api/lookup/batches/')
        .then(res=>{            
            const batchOptions = mapForCombo(res.data);
            this.setState({batchOptions});
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

  handleShiftBlur(obj, value){
    axios.get('/api/states/' + value)
        .then(res=>{
            const states = res.data.map(function(item, index){
                return {value: item.Id + "", label: item.Name};
            });                       
            this.setState({states});
        });
 
  }

  handleClassBlur(obj, value){
    axios.get('/api/cities/' + value)
        .then(res=>{
            const cities = res.data.map(function(item, index){
                return {value: item.Id + "", label: item.Name};
            });                       
            this.setState({cities});
        });
 
  }

  handleSectionBlur(obj, value){
    console.log(obj);
    console.log(value);
  }
  
  handleName1Blur(obj, value){
     //const selector = formValueSelector('StudentForm')
     //const formValues= getFormValues('myForm')(state)
    //const value1 = selector(state, 'name1')
console.log(this.state.name1);
    //   console.log(formValues);

    //console.log('name 1 blur', this.state.name1)
    //const values = selector(state, 'name1', 'name2', 'name3', 'name4')
    //this.props.change("nameAsPerPassport", values.name1 || '' + ' ' + values.name2 || '' + ' ' + values.name3 || '' + ' ' + values.name4 || '');
  }

 

  render() {
    const { studentId, handleSubmit, nationalities, countries, pristine, reset, submitting, touched, error, warning } = this.props
    const { states, cities, studentStayWithOptions, disabledStudentStayWithOther, genderOptions, languageOptions, religionOptions } = this.state;
    const { shiftOptions, classOptions, sectionOptions, batchOptions } = this.state;    
 
  
    return (
            <form id="form-Student" className="smart-form" 
                onSubmit={handleSubmit}>
 
              <fieldset>

                <div className="row">
                  <section className="col col-2">
                    <Field name="studentCode" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-credit-card-alt"
                      component={RFField} normalize={upper} validate={required} type="text" 
                      placeholder="Please enter student code"
                      label="CodeText"/>
                  </section>
                  <section className="col col-5">
                    <Field name="idNo" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-credit-card-alt"
                      component={RFField} normalize={upper} validate={required} type="text" 
                      placeholder="Please enter Identity card number"
                      label="IdentityCardNumberText"/>
                  </section>
                  <section className="col col-5">
                    <Field name="fatherIdNo" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-credit-card-alt"
                      component={RFField} normalize={upper} validate={required} type="text" 
                      placeholder="Please enter Father's Identity card number"
                      label="FatherIdentityCardNumberText"/>
                  </section> 
                </div>

              </fieldset>

              <fieldset>
                
                <div className="row">
                  <section className="col col-3">
                    <Field name="name1" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      validate={required} component={RFField} normalize={upper}  
                      onBlur={this.handleName1Blur} 
                      type="text" placeholder="Please enter name1" 
                      label="Name1Text" />    
                  </section>

                  <section className="col col-3">
                    <Field name="name2" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} normalize={upper} type="text" placeholder="Please enter name2" 
                      label="Name2Text" />    
                  </section>

                  <section className="col col-3">
                    <Field name="name3" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} normalize={upper} type="text" placeholder="Please enter name3" 
                      label="Name3Text" />    
                  </section>
                  
                  <section className="col col-3">
                    <Field name="name4" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} normalize={upper} type="text" placeholder="Please enter name4" 
                      label="Name4Text" />    
                  </section>
                </div>

                <div className="row"> 
                    <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                        <Field name="nameAsPerPassport" labelClassName="input" labelIconClassName="icon-append fa fa-graduation-cap"
                            validate={required} component={RFField} normalize={upper} type="text" 
                            label="Name1AsPerPassportText"
                            placeholder="Please enter full name as per passport"/>
                    </section>
                    {/*</section>*/}
                </div>

                <div className="row">
                  <section className="col col-3">
                    <Field name="nameAr1" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      validate={required} component={RFField} normalize={upper} type="text" placeholder="Please enter nameAr1" 
                      label="NameAr1Text" />    
                  </section>

                  <section className="col col-3">
                    <Field name="nameAr2" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} normalize={upper} type="text" placeholder="Please enter nameAr2" 
                      label="NameAr2Text" />    
                  </section>

                  <section className="col col-3">
                    <Field name="nameAr3" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} normalize={upper} type="text" placeholder="Please enter nameAr3" 
                      label="NameAr3Text" />    
                  </section>
                  
                  <section className="col col-3">
                    <Field name="nameAr4" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} normalize={upper} type="text" placeholder="Please enter nameAr4" 
                      label="NameAr4Text" />    
                  </section>
                </div>

                <div className="row">
                    <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                        <Field name="nameArAsPerPassport" labelClassName="input" labelIconClassName="icon-append fa fa-graduation-cap"
                            validate={required} component={RFField} normalize={upper} type="text" 
                            label="Name2AsPerPassportText"
                            placeholder="Please enter full nameAr as per passport"/>
                    </section>
                    {/*</section>*/}
                </div>

                <div className="row">
                  <section className="col col-3">
                    <Field
                        multi={false}
                        name="shiftId"
                        label="ShiftText"
                        validate={requiredCombo}
                        options={shiftOptions}
                        onBlur={this.handleShiftBlur}
                        component={RFReactSelect} />
                  </section>

                  <section className="col col-3">
                    <Field
                        multi={false}
                        name="classId"
                        label="ClassText"
                        options={classOptions}
                        onBlur={this.handleClassBlur}
                        component={RFReactSelect} />
                  </section>

                  <section className="col col-3">
                    <Field
                        multi={false}
                        name="sectionId"
                        label="SectionText"
                        options={sectionOptions}
                        onBlur={this.handleSectionBlur}
                        component={RFReactSelect} />
                  </section>
                  
                  <section className="col col-3">
                    <Field
                        multi={false}
                        name="batchId"
                        label="BatchText"
                        options={batchOptions} 
                        component={RFReactSelect} />
                  </section>

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
                        label="Religion1Text"
                        options={religionOptions} 
                        component={RFReactSelect} />
                  </section>

                  <section className="col col-3">
                    <Field component={RFRadioButtonList} name="gender" required={true} 
                      label="GenderText"
                      options={genderOptions} />
                  </section>

                </div>
               
                <div className="row">
                  
                  <section className="col col-3">
                    <Field name="email" labelClassName="input" labelIconClassName="icon-append fa fa-envelope-o"
                      validate={[required,email]} component={RFField} normalize={lower} type="text" placeholder="Please enter email address" 
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
                      component={RFField} normalize={upper} disabled={disabledStudentStayWithOther} type="text" 
                      placeholder="Please enter student stay with"
                      label="StudentStayWithOtherText"/>
                  </section>

                </div>

                <div className="row">
                  <section className="col col-3">
                    <Field name="birthPlace" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-credit-card-alt"
                      component={RFField} normalize={upper} type="text" 
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
                      component={RFField} normalize={upper} type="text" 
                      label="PhoneNumberText"
                      placeholder="Please enter phone number"/>
                  </section>

                  <section className="col col-3">
                    <Field name="mobileNo" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-mobile"
                      component={RFField} normalize={upper} type="text" 
                      label="MobileNumberText"
                      placeholder="Please enter mobile number"/>
                  </section>
                </div>

                <div className="row">
                  <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                    <Field name="address" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-map-marker"
                      component={RFField} normalize={upper} type="text" 
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


connect(
  state => ({
    name1: selector(state, 'name1'),
    name2: selector(state, 'name2')
  })
)(StudentForm)

// const selector = (form, ...other) => (formValueSelector('StudentForm'))(...other);

// const mapStateToProps = (state, initialProps) => {
//   return {
//     name1: selector('StudentForm', state, 'name1'),
//   };
// };

// export default connect(mapStateToProps, null)(StudentForm);
// //https://github.com/erikras/redux-form/issues/1987
// //http://redux-form.com/6.0.0-rc.4/examples/selectingFormValues/
// //http://redux-form.com/6.0.5/docs/api/Selectors.md/
