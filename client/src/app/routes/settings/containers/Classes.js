/**
 * Created by griga on 11/30/15.
 */

import React from 'react'
import axios from 'axios' 
import { connect } from 'react-redux'

import WidgetGrid from '../../../components/widgets/WidgetGrid'
import JarvisWidget  from '../../../components/widgets/JarvisWidget'
import RFDatePicker from '../../../components/ui/RFDatePicker'
import Msg from '../../../components/i18n/Msg'

import { Field, reduxForm, formValueSelector  } from 'redux-form'
import { RFReactSelectSingle } from '../../../components/ui'
import mapForCombo, {renderDate, mapForRadioList} from '../../../components/utils/functions'

class Subjects extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      subjectOptions: []
    }
     
   }
   
  componentDidMount(){ 
    
        axios.get('/api/lookup/subjects/')
          .then(res => {
            const subjectOptions = mapForCombo(res.data);
            this.setState({ subjectOptions });
          });
     
      }
    
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

                         <Msg phrase="Are you sure, you want to delete this record?" />

                        <div>
                          <input id="abc" value={JSON.parse(localStorage.getItem('sm-lang')).flag}/>
                        </div>
                        
                        <div> 
                            <Field
                              name="subjectId"
                              label=""
                              options={this.state.subjectOptions}
                              component={RFReactSelectSingle} />
                        </div>

                        <div>
                          <label>First Name</label>
                          <div>
                            <Field
                              name="fname"
                              component="input"
                              type="text"                              
                            />
                          </div>
                        </div>

                        <div>
                          <label>Last Name</label>
                          <div>
                            <Field
                              name="lname"
                              component="input"
                              type="text"
                            />
                          </div>
                        </div>

                        fullName : 
                        {this.props.fullName}

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

//export default 
Subjects = reduxForm({
  form: 'Subjects',  // a unique identifier for this form
  initialValues: { min: 1, max: 10 }
})(Subjects)

// Decorate with connect to read form values
const selector = formValueSelector('Subjects') // <-- same as form name
Subjects = connect(
  state => {
    // can select values individually
    // const hasEmailValue = selector(state, 'hasEmail')
    // const favoriteColorValue = selector(state, 'favoriteColor')
    // or together as a group
    const { fname, lname } = selector(state, 'fname', 'lname')
    //console.log(fname);
    return {
      // hasEmailValue,
      // favoriteColorValue,
      fullName: `${fname || ''} ${lname || ''}`
    }
  }
)(Subjects)

export default Subjects