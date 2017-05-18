import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import {required, email}  from '../../../../components/forms/validation/CustomValidation'
import MaskedInput from '../../../../components/forms/inputs/MaskedInput'
import UiDatepicker from '../../../../components/forms/inputs/UiDatepicker'
import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";

import { Field, reduxForm } from 'redux-form'

class TeacherForm extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      editDataLoaded: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const {teacherId} = nextProps;

    if(teacherId<=0){
      this.setState({editDataLoaded:false});
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
      axios.get('/api/teachers/' + teacherId)
          .then(res=>{            
              var json = res.data;                
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

  render() {
    const { teacherId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props

    return (
            <form id="form-teacher" className="smart-form" 
                onSubmit={handleSubmit}>

              <header>
                Personal Information -- {teacherId}
              </header>

              <fieldset>
                
                <Field name="name" labelClassName="input" labelIconClassName="icon-append fa fa-user"
                  validate={required} component={renderField} type="text" placeholder="Name"/>
            
                <Field name="email" labelClassName="input" labelIconClassName="icon-append fa fa-envelope-o"
                  validate={[required,email]} component={renderField} type="text" placeholder="Email Address"/>
            
                {/*<section>
                  <label className="input"> <i className="icon-append fa fa-envelope-o"/>
                    <Field type="email" validate={[required,email]} component="input" name="email" placeholder="Email address"/>
                    <b className="tooltip tooltip-bottom-right">Needed to verify your account</b> 
                    
                  </label>
                  {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
                </section>*/}

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
    )
  }
}

  const renderField = ({input, label, type, labelClassName, labelIconClassName, placeholder, meta: {touched, error, warning}}) => (
      <section>        
        <label className={classNames(labelClassName, {'state-error':touched && error!==undefined})}>    
          {/* */}
          <i className={labelIconClassName}/>
          <input {...input} placeholder={label} type={type} placeholder={placeholder} />            
        </label>
        {touched && ((error && <span><em className="invalid">{error}</em></span>) || (warning && <span>{warning}</span>))}          
      </section>
    )
    
const afterSubmit = (result, dispatch) =>
  dispatch(reset('TeacherForm'));

export default reduxForm({
  form: 'TeacherForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false
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
