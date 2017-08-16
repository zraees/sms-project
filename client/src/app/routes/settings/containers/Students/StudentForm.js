import React from 'react'
import {reset} from 'redux-form';
import axios from 'axios';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import {connect} from 'react-redux'

import {Field, reduxForm, formValueSelector, getFormValues} from 'redux-form'
import {required, email, requiredCombo}  from '../../../../components/forms/validation/CustomValidation'

import {RFField, RFDatePicker, RFRadioButtonList, RFReactSelect, RFTextArea, RFFileUpload} from '../../../../components/ui'

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
      countryOptions: [],
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
    //this.handleCityBlur = this.handleCityBlur.bind(this);
    this.handleStudentStayWithChange = this.handleStudentStayWithChange.bind(this);
    this.handleShiftBlur = this.handleShiftBlur.bind(this);
    this.handleClassBlur = this.handleClassBlur.bind(this);
    //this.handleSectionBlur = this.handleSectionBlur.bind(this);
    this.handleNameBlur = this.handleNameBlur.bind(this);
    this.handleNameArBlur = this.handleNameArBlur.bind(this);
  }
  
  componentDidMount(){ 

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

    axios.get('/api/lookup/countries/')
      .then(res=>{            
          const countryOptions = mapForCombo(res.data);
          this.setState({countryOptions});
      }); 

      // axios.get('/api/lookup/classes/')
      //   .then(res=>{            
      //       const classOptions = mapForCombo(res.data);
      //       this.setState({classOptions});
      //   });

      // axios.get('/api/lookup/sections/')
      //   .then(res=>{            
      //       const sectionOptions = mapForCombo(res.data);
      //       this.setState({sectionOptions});
      //   });

    axios.get('/api/lookup/batches/')
      .then(res=>{            
          const batchOptions = mapForCombo(res.data);
          this.setState({batchOptions});
      });
    
    axios.get('/api/GetStudentGeneratedCode')
      .then(res=>{      
        //console.log(res);       
        const initData = {
            "studentId": 0,
            "code": res.data
        }

        this.props.initialize(initData);
        
      });

    console.log('componentDidMount --> StudentForm');
  }

  handleCountryBlur(obj, value){
    axios.get('/api/Lookup/states/countryid/' + value)
      .then(res=>{
          const states = mapForCombo(res.data);//res.data.map(function(item, index){
              //return {value: item.Id + "", label: item.Name};
          //});                       
          this.setState({states});
      });
 
  }

  handleStateBlur(obj, value){
    // axios.get('/api/cities/' + value)
    //     .then(res=>{
    //         const cities = mapForCombo(res.data); //res.data.map(function(item, index){
    //             //return {value: item.Id + "", label: item.Name};
    //         //});                       
    //         this.setState({cities});
    //     });
    axios.get('/api/Lookup/cities/stateid/' + value)
      .then(res=>{
          const cities = mapForCombo(res.data); // res.data.map(function(item, index){
          //     return {value: item.Id + "", label: item.Name};
          // });                       
          this.setState({cities});
      });
  }

  // handleCityBlur(obj, value){
  //   console.log(obj);
  //   console.log(value);
  // }

  handleStudentStayWithChange(obj, value){ 
    if(value=="Other"){
      this.setState({disabledStudentStayWithOther:false});
    }
    else{
      this.setState({disabledStudentStayWithOther:true});
    }
  }
 
  handleShiftBlur(obj, value){
    axios.get('/api/GetClassesByShiftId/' + value)
        .then(res=>{
            const classOptions = mapForCombo(res.data); // res.data.map(function(item, index){
            //     return {value: item.Id + "", label: item.Name};
            // });                       
            this.setState({classOptions});
        });
 
  }

  handleClassBlur(obj, value){ 
    //console.log('this.props.shiftId = ' ,this.props.shiftId);
    axios.get('/api/GetClassesByShiftIdClassId/' + this.props.shiftId + '/' + value)
        .then(res=>{
            const sectionOptions = mapForCombo(res.data); // res.data.map(function(item, index){
            //     return {value: item.Id + "", label: item.Name};
            // });                       
            this.setState({sectionOptions});
        });
 
  }

  // handleSectionBlur(obj, value){
  //   console.log(obj);
  //   console.log(value);
  // }
  
  handleNameBlur(obj, value){
    this.props.change("fullNamePassport", this.props.fullName)
    this.props.change("fullName", this.props.fullName)
  } 

  handleNameArBlur(obj, value){
    this.props.change("fullNameArPassport", this.props.fullNameAr)
    this.props.change("fullNameAr", this.props.fullNameAr)
  }

  render() {
    const { studentId, handleSubmit, nationalities, countries, pristine, reset, submitting, touched, error, warning } = this.props
    const { states, cities, studentStayWithOptions, disabledStudentStayWithOther, genderOptions, languageOptions, religionOptions } = this.state;
    const { shiftOptions, classOptions, sectionOptions, batchOptions, countryOptions } = this.state;    
 
    return (
            <form id="form-Student" className="smart-form" 
                onSubmit={handleSubmit}>
 
              <fieldset>

                <div className="row">
                  <section className="col col-3">
                    <Field name="code" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-credit-card-alt"
                      component={RFField} normalize={upper} validate={required} type="text" 
                      placeholder="Please enter student code" maxLength="20" readOnly="readOnly"
                      label="CodeText"/>
                  </section>
                  <section className="col col-4">
                    <Field name="studentIDNo" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-credit-card-alt"
                      component={RFField} normalize={upper} validate={required} type="text" 
                      placeholder="Please enter Identity card number" maxLength="20"
                      label="IdentityCardNumberText"/>
                  </section>
                  <section className="col col-5">
                    <Field name="fatherIdNo" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-credit-card-alt"
                      component={RFField} normalize={upper} validate={required} type="text" 
                      placeholder="Please enter Father's Identity card number" maxLength="20"
                      label="FatherIdentityCardNumberText"/>
                  </section> 
                </div>

              </fieldset>

              <fieldset>
                
                <div className="row">
                  <section className="col col-3">
                    <Field name="name1" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      validate={required} component={RFField} normalize={upper}  
                      onBlur={this.handleNameBlur} maxLength="50"
                      type="text" placeholder="Please enter name1" 
                      label="Name1Text" />    
                  </section>

                  <section className="col col-3">
                    <Field name="name2" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} normalize={upper} type="text" placeholder="Please enter name2" 
                      onBlur={this.handleNameBlur} maxLength="50"
                      label="Name2Text" />    
                  </section>

                  <section className="col col-3">
                    <Field name="name3" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} normalize={upper} type="text" placeholder="Please enter name3" 
                      onBlur={this.handleNameBlur} maxLength="50"
                      label="Name3Text" />    
                  </section>
                  
                  <section className="col col-3">
                    <Field name="name4" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} normalize={upper} type="text" placeholder="Please enter name4" 
                      onBlur={this.handleNameBlur} maxLength="50"
                      label="Name4Text" />    
                  </section>
                </div>

                <div className="row">
                  <section className="col col-3">
                    <Field name="nameAr1" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      validate={required} component={RFField} normalize={upper} type="text" placeholder="Please enter nameAr1" 
                      onBlur={this.handleNameArBlur} maxLength="50" 
                      label="NameAr1Text" />    
                  </section>

                  <section className="col col-3">
                    <Field name="nameAr2" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} normalize={upper} type="text" placeholder="Please enter nameAr2" 
                      onBlur={this.handleNameArBlur} maxLength="50" 
                      label="NameAr2Text" />    
                  </section>

                  <section className="col col-3">
                    <Field name="nameAr3" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} normalize={upper} type="text" placeholder="Please enter nameAr3" 
                      onBlur={this.handleNameArBlur} maxLength="50" 
                      label="NameAr3Text" />    
                  </section>
                  
                  <section className="col col-3">
                    <Field name="nameAr4" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                      component={RFField} normalize={upper} type="text" placeholder="Please enter nameAr4" 
                      onBlur={this.handleNameArBlur} maxLength="50" 
                      label="NameAr4Text" />    
                  </section>
                </div>

                <div className="row"> 

                  <section className="col col-9">
                    <div className="row"> 
                      <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                        <Field name="fullNamePassport" labelClassName="input" labelIconClassName="icon-append fa fa-graduation-cap"
                          validate={required} component={RFField} normalize={upper} 
                          type="text" maxLength="250" 
                          label="Name1AsPerPassportText"
                          placeholder="Please enter full name as per passport"/>
                          
                        <Field component="input" type="hidden" name="fullName"/>
                      </section>       
                    </div>
                    
                    <div className="row"> 
                      <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                        <Field name="fullNameArPassport" labelClassName="input" labelIconClassName="icon-append fa fa-graduation-cap"
                          validate={required} component={RFField} normalize={upper} type="text" 
                          label="Name2AsPerPassportText" maxLength="250"
                          placeholder="Please enter full nameAr as per passport"/>

                        <Field component="input" type="hidden" name="fullNameAr"/>
                      </section>       
                    </div>
                  </section> 
                  <section className="col col-3">
                     <Field
                        name="files"
                        component={RFFileUpload}
                      />
                  </section>                     
                    
                </div>

                <div className="row">
                  <section className="col col-3">
                    <Field
                        multi={false}
                        name="shiftId"
                        label="ShiftText"
                        options={shiftOptions}
                        onBlur={this.handleShiftBlur}
                        component={RFReactSelect} />
                  </section>

                        {/* validate={requiredCombo} */}
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
                      validate={[required,email]} component={RFField} normalize={lower} 
                       maxLength="150" type="text" placeholder="Please enter email address" 
                      label="EmailAddressText"/>
                  </section>

                  <section className="col col-6">
                    <Field component={RFRadioButtonList} name="studentStayWith" required={true} 
                      label="StudentStayWithText"
                      onChange={this.handleStudentStayWithChange}
                      options={studentStayWithOptions} />
                  </section>

                  <section className="col col-3">
                    <Field name="studentStayWithOther" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-credit-card-alt"
                      component={RFField} normalize={upper} disabled={disabledStudentStayWithOther} 
                      maxLength="50" type="text" 
                      placeholder="Please enter student stay with"
                      label="StudentStayWithOtherText"/>
                  </section>

                </div>

                <div className="row">
                  <section className="col col-3">
                    <Field name="placeOfBirth" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-credit-card-alt"
                      component={RFField} normalize={upper} 
                      maxLength="50" type="text" 
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
                      component={RFField} normalize={upper} 
                      maxLength="20" type="text" 
                      label="PhoneNumberText"
                      placeholder="Please enter phone number"/>
                  </section>

                  <section className="col col-3">
                    <Field name="mobileNo" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-mobile"
                      component={RFField} normalize={upper} 
                      maxLength="20" type="text" 
                      label="MobileNumberText"
                      placeholder="Please enter mobile number"/>
                  </section>
                </div>

                <div className="row">
                  <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                    <Field name="address" labelClassName="input" 
                      labelIconClassName="icon-append fa fa-map-marker"
                      component={RFField} normalize={upper} 
                      maxLength="500" type="text" 
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
                        options={countryOptions}
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

//export default 
StudentForm = reduxForm({
  form: 'StudentForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(StudentForm)

const selector = formValueSelector('StudentForm') // <-- same as form name
StudentForm = connect(
  state => { 
    const { name1, name2, name3, name4 } = selector(state, 'name1', 'name2', 'name3', 'name4')
    const { nameAr1, nameAr2, nameAr3, nameAr4, shiftId } = selector(state, 'nameAr1', 'nameAr2', 'nameAr3', 'nameAr4', 'shiftId')
    //const { countryId, stateId, cityId } = selector(state, 'countryId', 'stateId', 'cityId')
    //const { _shiftId, _classId, _sectionId } = selector(state, 'shiftId', 'classId', 'sectionId')
    //const {  } = selector(state)

    //console.log('countryId, stateId, cityId ==> ',countryId, stateId, cityId)
    //console.log('shiftId, classId, sectionId ==> ', _shiftId, _classId, _sectionId)
    //console.log('shiftId  ==> ', shiftId)

    return {
      fullName: `${name1 || ''}${name2?' '+name2:''}${name3?' '+name3:''}${name4?' '+name4:''}`,
      fullNameAr: `${nameAr1 || ''}${nameAr2?' '+nameAr2:''}${nameAr3?' '+nameAr3:''}${nameAr4?' '+nameAr4:''}`,
      shiftId: shiftId
      // countryId: countryId, 
      // stateId: stateId, 
      // cityId: cityId,
      //shiftId2: shiftId2//,
      // classId: _classId,
      // sectionId: _sectionId 
    }
  }
)(StudentForm)

export default StudentForm;

// export default connect(mapStateToProps, null)(StudentForm);
// //https://github.com/erikras/redux-form/issues/1987
// //http://redux-form.com/6.0.0-rc.4/examples/selectingFormValues/
// //http://redux-form.com/6.0.5/docs/api/Selectors.md/
