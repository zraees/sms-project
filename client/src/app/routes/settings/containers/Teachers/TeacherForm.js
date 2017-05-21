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
import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";
import asyncValidate from './asyncValidate'
import AlertMessage from '../../../../components/common/AlertMessage'

class TeacherForm extends React.Component {
 
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

              <header>
                Personal Information
              </header>

              <fieldset>
                
                <Field name="name" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                  validate={required} component={renderField} type="text" placeholder="Name"/>
            
                <Field name="email" labelClassName="input" labelIconClassName="icon-append fa fa-envelope-o"
                  validate={[required,email]} component={renderField} type="text" placeholder="Email Address"/>

                <Field 
                  name="DOB" validate={required} 
                  component={RFDatePicker} />

                <Field component={RFRadioButtonList} name="gender" required={true} options={[
                    { title: 'Male', value: 'male' },
                    { title: 'Female', value: 'female' }
                ]} />

                <Field name="idNo" labelClassName="input" labelIconClassName="icon-append fa fa-id-card"
                  component={renderField} type="text" placeholder="Identity Card Number"/>

                <div>
                    <label>combo</label>
                    <Field
                        multi={false}
                        name="nationality"
                        options={nationalities}
                        component={RFReactSelect} />
                </div>
                
                
                <StarRating onChange={(value) => { this.changeRate("rating", value) } }
                  initialRate={ this.state.rating } 
                  empty="fa fa-star-o fa-2x"
                  full="fa fa-star fa-2x"  
                  />
                <Field component="input" type="hidden" name="rating"/>

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

  const renderField = ({input, label, type, labelClassName, labelIconClassName, placeholder, meta: {asyncValidating, touched, error, warning}}) => (
      <section>        
        
        <label className={classNames(labelClassName, {'state-error':(touched && error!==undefined)||asyncValidating })}>    
          <i className={labelIconClassName}/>
          <input {...input} placeholder={label} type={type} placeholder={placeholder} />            
        </label>
        {touched && ((error && <span><em className="invalid">{error}</em></span>) || (warning && <span>{warning}</span>))}          
      </section>
    )
    
    
  /*const renderDateField = ({input, label, type, placeholder, dateFormat, meta: {asyncValidating, touched, error, warning}}) => (
      <section>        
        
        <label className={classNames('input', {'state-error':(touched && error!==undefined)||asyncValidating })}>    
          
          <i className="icon-append fa fa-calendar"/>
          <UiDatepicker {...input} placeholder={label} type={type} placeholder={placeholder} dateFormat={dateFormat} />
        </label>
        {touched && ((error && <span><em className="invalid">{error}</em></span>) || (warning && <span>{warning}</span>))}          
      </section>
    )
    */
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

/*
import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';

import UiValidate from '../../../../components/forms/validation/UiValidate'
import MaskedInput from '../../../../components/forms/inputs/MaskedInput'
import UiDatepicker from '../../../../components/forms/inputs/UiDatepicker'
import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";

import { Field, reduxForm } from 'redux-form'

const validationOptions = {

  // Rules for form validation
  rules: {
    name: {
      required: true
    },
    email: {
      required: true,
      email: true
    }
  },

  // Messages for form validation
  messages: {
    name: {
      required: 'Please enter your login'
    },
    email: {
      required: 'Please enter your email address',
      email: 'Please enter a VALID email address'
    }
  }

};

class TeacherForm extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      editDataLoaded: false
    }
  }

  componentDidMount(){    
   
  }

  componentWillReceiveProps(nextProps) {
    const {teacherId} = nextProps;
    //console.log("componentWillReceiveProps method " + teacherId)
    if(teacherId<=0){
      this.setState({editDataLoaded:false});
      //this.handleInitialize(teacherId);
      const initData = {
          "id": 0,
          "name": "",
          "email": ""
        }
        
        this.props.initialize(initData);

    }
    else if(teacherId>0 && !this.state.editDataLoaded){
      this.setState({editDataLoaded:true});
      this.handleInitialize(teacherId);
    }
  }

  handleInitialize(teacherId) {
    // let initData = {
    //   "name": '',
    //   "email": ''
    // };
      //console.log("handleInitialize = " + teacherId);
      axios.get('/api/teachers/' + teacherId)
          .then(res=>{            
              var json = res.data;               
              //console.log (json);

              //console.log("handleInitialize -- response= " + res.data.Name);
              const initData = {
                  "id": teacherId,
                  "name": res.data.Name,
                  "email": res.data.Email
                }
                //console.log('initData');
                //console.log(initData);
                this.props.initialize(initData);

              // this.props.initialize({
              //     "name": response.data.Name,
              //     "email": response.data.Email
              //   });

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

    // console.log('2 '+initData);
    // this.props.initialize(initData);
  }

  render() {
    const { teacherId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props

    const required = value => value ? undefined : 'Required'
    const maxLength = max => value =>
      value && value.length > max ? `Must be ${max} characters or less` : undefined
    const maxLength15 = maxLength(15)
    const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
    const minValue = min => value =>
      value && value < min ? `Must be at least ${min}` : undefined
    const minValue18 = minValue(18)
    const email = value =>
      value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
      'Invalid email address' : undefined
    const tooOld = value =>
      value && value > 65 ? 'You might be too old for this' : undefined
    const aol = value =>
      value && /.+@aol\.com/.test(value) ?
      'Really? You still use AOL for your email?' : undefined
      
    return (
          <UiValidate options={validationOptions}>
            <form id="form-teacher" className="smart-form" noValidate="novalidate" 
                onSubmit={handleSubmit}>

              <header>
                Personal Information -- {teacherId}
              </header>

              <fieldset>
                <section>
                  <label className="input"> <i className="icon-append fa fa-user"/>
                    <Field name="name" validate={required} component="input" type="text" placeholder="Name"/>
                    <b className="tooltip tooltip-bottom-right">Needed to enter the website</b> 
                    
                  </label>
                  {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
                </section>

                <section>
                  <label className="input"> <i className="icon-append fa fa-envelope-o"/>
                    <Field type="email" validate={email} component="input" name="email" placeholder="Email address"/>
                    <b className="tooltip tooltip-bottom-right">Needed to verify your account</b> 
                    
                  </label>
                  {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
                </section>

              </fieldset>

              <footer>
                <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary">
                  { teacherId > 0 ? "Undo Changes" : "Reset" }
                </button>
                <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
                  Save
                </button>
              </footer>

            </form>
          </UiValidate>
    )
  }
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('TeacherForm'));

export default reduxForm({
  form: 'TeacherForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false
})(TeacherForm)*/
