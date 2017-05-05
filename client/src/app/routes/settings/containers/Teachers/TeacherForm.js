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
  onSubmit(e) {
    e.preventDefault();
    console.log("Submit values = " + e.data);

    // axios.post('/api/teachers', values)      
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log('this is error: '+error);
    //     });      
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <UiValidate options={validationOptions}>
        <form id="smart-form-register" className="smart-form" noValidate="novalidate" 
            onSubmit={handleSubmit}>
          <header>
            Personal Information
          </header>

          <fieldset>
            <section>
              <label className="input"> <i className="icon-append fa fa-user"/>
                <Field name="name" component="input" type="text" placeholder="Name"/>
                <b className="tooltip tooltip-bottom-right">Needed to enter the website</b> </label>
            </section>


            <section>
              <label className="input"> <i className="icon-append fa fa-envelope-o"/>
                <Field type="email" component="input" name="email" placeholder="Email address"/>
                <b className="tooltip tooltip-bottom-right">Needed to verify your account</b> </label>
            </section>

          </fieldset>

          <footer>
            <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
              Validate Form
            </button>
          </footer>
        </form>
      </UiValidate>
    )
  }
}

export default reduxForm({
  form: 'simple'  // a unique identifier for this form
})(TeacherForm)