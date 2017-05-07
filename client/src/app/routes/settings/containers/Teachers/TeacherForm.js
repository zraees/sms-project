import React from 'react'

import UiValidate from '../../../../components/forms/validation/UiValidate'
import MaskedInput from '../../../../components/forms/inputs/MaskedInput'
import UiDatepicker from '../../../../components/forms/inputs/UiDatepicker'

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

  render() {
    const { handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props

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
                Personal Information -- {this.props.teacherId}
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
                  Reset
                </button>
                <button type="submit" disabled={submitting} className="btn btn-primary">
                  Save
                </button>
              </footer>

            </form>
          </UiValidate>
    )
  }
}

export default reduxForm({
  form: 'TeacherForm'  // a unique identifier for this form
})(TeacherForm)