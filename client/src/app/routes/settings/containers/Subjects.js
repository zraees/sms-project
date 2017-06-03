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
    
const lessThan = otherField =>
  (value, previousValue, allValues) => value < allValues[otherField] ? value : previousValue
const greaterThan = otherField =>
  (value, previousValue, allValues) => value > allValues[otherField] ? value : previousValue

//http://redux-form.com/6.1.1/examples/normalizing/
//https://bl.ocks.org/insin/bbf116e8ea10ef38447b
// datepicker https://github.com/Hacker0x01/react-datepicker/issues/543


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

                      <form id="form-teacher" className="smart-form"  >
                        <fieldset>
                          
                        <div>
                          <input id="abc" value={JSON.parse(localStorage.getItem('sm-lang')).key}/>
                        </div>

                        <div>
                          <label>Min</label>
                          <div>
                            <Field
                              name="min"
                              component="input"
                              type="number"
                              normalize={lessThan('max')}
                            />
                          </div>
                        </div>
                        <div>
                          <label>Max</label>
                          <div>
                            <Field
                              name="max"
                              component="input"
                              type="number"
                              normalize={greaterThan('min')}
                            />
                          </div>
                        </div>
                        
                        <div className="row">
                              <section >
                                  <Field name="dateStart" placeholder="Start Date" minDate={moment()} component={RFDatePicker} />
                              </section>
                          </div>

                          <div className="row">
                              <section >
                                <label className="textarea textarea-expandable">
                                  <textarea className="custom-scroll" rows="3" />
                                  </label>
                              </section>
                          </div> 
                          </fieldset>             
                        </form>

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
  form: 'simple',  // a unique identifier for this form
  initialValues: { min: 1, max: 10 }
})(Subjects)