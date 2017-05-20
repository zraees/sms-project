/**
 * Created by griga on 11/30/15.
 */

import React from 'react'

import WidgetGrid from '../../../components/widgets/WidgetGrid'
import JarvisWidget  from '../../../components/widgets/JarvisWidget'
import RFDatePicker from '../../../components/ui/RFDatePicker'

import { Field, reduxForm } from 'redux-form'

class Subjects extends React.Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <div id="content">
        <WidgetGrid>
          <div className="row">
            <article className="col-sm-6">

              <JarvisWidget >
                <header>
                  <h2><strong>Default</strong> <i>Widget</i></h2>
                </header>
                {/* widget div*/}
                <div>
                  {/* widget content */}
                  <div className="widget-body">

        <div>
            <label>date picker</label>
            <Field 
                name="date1" 
                component={RFDatePicker} />
        </div>


                    <div className="row">
                      <div className="col-md-12">
                        <form onSubmit={handleSubmit}>
                          <div>
                            <label>First Name</label>
                            <div>
                              <Field name="firstName" component="input" type="text" placeholder="First Name"/>
                            </div>
                          </div>
                          <div>
                            <label>Last Name</label>
                            <div>
                              <Field name="lastName" component="input" type="text" placeholder="Last Name"/>
                            </div>
                          </div>
                          <div>
                            <button type="submit" disabled={pristine || submitting}>Submit</button>
                            <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                          </div>
                        </form>
                      </div>
                    </div>                      

                  </div>
                  {/* end widget content */}
                </div>
                {/* end widget div */}
              </JarvisWidget>

            </article>
          </div>

        </WidgetGrid>
      </div>
    )
  }
}

export default reduxForm({
  form: 'simple'  // a unique identifier for this form
})(Subjects)