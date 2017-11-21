import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';

import { Field, FieldArray, reduxForm, formValueSelector, getFormValues } from 'redux-form'
// import StarRating from 'react-rating'
import moment from 'moment'

import { RFField, RFRadioButtonList, RFReactSelect, RFTextArea, RFLabel, RFCheckbox } from '../../../../components/ui'
import { createEmptyTimeTableDetail, submitTimetableDay } from './submit' 

import { required, number } from '../../../../components/forms/validation/CustomValidation'
import AlertMessage from '../../../../components/common/AlertMessage'
import mapForCombo from '../../../../components/utils/functions'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'
import Msg from '../../../../components/i18n/Msg'
import validate from './validate'

class TimetableDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTableDetailId: 0,
      editMode: 0,
      timeTableId: 0,
      dayId: 0,
      // locationOptions: [],
      // teacherOptions: [],
      // subjectOptions: []
    } 
    // this.handleTeacherBlur = this.handleTeacherBlur.bind(this);
    // this.handleSubjectBlur = this.handleSubjectBlur.bind(this); 
  }

  componentWillMount() {
    LoaderVisibility(true);
  }

  componentDidMount() {
 
    

      
      
       
    //console.log('modal before call edit page --> ', this.props.timeTableId, this.props.dayId);
    
    //this.props.change("timeTableId", this.props.timeTableId);
    

      axios.get('/api/GetTimeTableDetailByTimeTableIDDayID/'+ this.props.timeTableId + '/' + this.props.dayId)
        .then(res => {
          if (res.data) {
            //console.log('exists..');
            let timeTableDetails = [];
            let localTimeTableId = 0;
            let localDayId = 0;
            //console.log('res.data', res.data);

            res.data.map(function (item, index) {
              //return {title: item.Name, value: item.Id + ""};
              //console.log('teacherId =-= ', item.LocationID, item.TeacherId, item.SubjectID);
              localTimeTableId = item.TimeTableID;
              localDayId = item.DayID;
              timeTableDetails.push({
                "timeTableDetailId": item.TimeTableDetailID,
                "dayId": item.DayID,
                "timeTableId": item.TimeTableID,
                "startTime": item.StartTime,
                "endTime": item.EndTime,
                "isBreak": item.IsBreak == 1 ? true : false,
                "locationId": item.LocationID,
                "teacherId": item.TeacherId,
                "subjectId": item.SubjectID
              });

            });

            //console.log('this.props.timeTableId== ', ttid);

            const initData = {
              "timeTableDetailId": 0,
              "timeTableId": localTimeTableId,
              "dayId": localDayId,
              "timeTableDetails": timeTableDetails
            }

            // axios.get('/api/lookup/subjects/')
            //   .then(res => {
            //     const subjectOptions = mapForCombo(res.data);
            //     this.setState({ subjectOptions });
            //   });

            // axios.get('/api/lookup/locations/')
            //   .then(res => {
            //     const locationOptions = mapForCombo(res.data);
            //     this.setState({ locationOptions });
            //   });

            // axios.get('/api/TeachersClasses/ByClassID/' + this.props.classId)
            //   .then(res => {
            //     const teacherOptions = mapForCombo(res.data);
            //     this.setState({ teacherOptions });
            //   });

              this.props.initialize(initData);
              
        // console.log('locationOptions == ',this.state.locationOptions)
        // console.log('subjectOptions == ',this.state.subjectOptions)
        // console.log('teacherOptions == ',this.state.teacherOptions)

          }
          else {
            // show error message, there is some this went wrong 
          }

        });
 
 
    //   });

    LoaderVisibility(false);
  }

  // handleTeacherBlur(obj, value) {
  //   // if (value != '') {
  //   //   axios.get('/api/GetClassesByteacherId/' + value)
  //   //     .then(res => {
  //   //       const subjectOptions = mapForCombo(res.data);
  //   //       this.setState({ subjectOptions });
  //   //     });

  //   //   axios.get('/api/shifts/' + value)
  //   //     .then(res => {
  //   //       this.props.change('shiftStartTime', res.data.StartTime);
  //   //       this.props.change('shiftEndTime', res.data.EndTime);
  //   //       this.props.change('breakStartTime', res.data.BreakStartTime);
  //   //       this.props.change('breakEndTime', res.data.BreakEndTime);
  //   //     });
  //   // }
  //   // else {
  //   //   this.props.change('shiftStartTime', '');
  //   //   this.props.change('shiftEndTime', '');
  //   //   this.props.change('breakStartTime', '');
  //   //   this.props.change('breakEndTime', '');

  //   //   this.setState({ subjectOptions: [] });
  //   //   this.setState({ locationOptions: [] });
  //   // }
  // }

  // handleSubjectBlur(obj, value) {
  //   // console.log('this.props.teacherId', this.props.teacherId);
  //   // if (this.props.teacherId && value) {
  //   //   axios.get('/api/GetClassesByteacherIdsubjectId/' + this.props.teacherId + '/' + value)
  //   //     .then(res => {
  //   //       const locationOptions = mapForCombo(res.data);
  //   //       this.setState({ locationOptions });
  //   //     });
  //   // }
  //   // else {
  //   //   this.setState({ locationOptions: [] });
  //   // }
  // }
 
  addNewPeriod(fields){

  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    const { teacherOptions, subjectOptions, locationOptions } = this.props;
    const { timeTableId, dayId } = this.state;
    var self = this; 

    const renderTimeTableDetails = ({ fields, meta: { touched, error } }) => (
      <div>  
        {/* className="smart-timeline-content" */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover table-responsive">
            <tbody>

              <li>
                <button type="button" onClick={() => {console.log('Object.keys(fields)[0].timeTableId == ', fields);
                 fields.push({
                  "timeTableDetailId": 0,
                  "dayId": null,//Object.keys(fields)[0].dayId,
                  "timeTableId": null,//Object.keys(fields)[0].timeTableId,
                  "startTime": '00:00',
                  "endTime": '00:00',
                  "isBreak": false,
                  "locationId": null,
                  "teacherId": null,
                  "subjectId": null
                })}}>Add</button>
              </li> 
              {console.log('timeTableDetailId =---= ', Object.keys(fields)[0].dayId)}
              {fields.map((period, index) =>
                <tr key={index}>
                  <td> 
                     
              
                    {/* <div className="well well-sm well-light"> .filter(function(field){ return field.timeTableDetailId>=0}) */}
                      <button
            type="button"
            title="Remove Hobby"
            onClick={() => fields.remove(index)}>Remove</button>
                    {/* <div className="smart-timeline-icon">{`${index + 1}`}</div> */}
                    <div className="row">
                      <section className="remove-col-padding col-sm-1 col-md-1 col-lg-1">
                        <Field name={`${index + 1}`}
                          component={RFLabel}
                          disabled={true}
                          type="text" />
                      </section>
                      <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
                        <Field name={`${period}.startTime`}
                          component={RFLabel}
                          disabled={true}
                          type="text" />
                      </section>
                      <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
                        <Field name={`${period}.endTime`}
                          component={RFLabel}
                          disabled={true}
                          type="text" />
                      </section>
                      <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
                        <Field
                          multi={false}
                          name={`${period}.teacherId`}
                          label=""
                          options={teacherOptions}
                          component={RFReactSelect} />
                      </section>
                      <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
                        <Field
                          multi={false}
                          name={`${period}.subjectId`}
                          label=""
                          options={subjectOptions}
                          component={RFReactSelect} />
                      </section>
                      <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
                        <Field
                          multi={false}
                          name={`${period}.locationId`}
                          label=""
                          options={locationOptions}
                          component={RFReactSelect} />
                      </section>
                      <section className="remove-col-padding col-sm-1 col-md-1 col-lg-1">
                        <Field name={`${period}.isBreak`}
                          component="input" type="checkbox"
                          label="" />
                      </section>
                    </div> 

                    {/* </div> */}
                  </td>
                </tr>
              )}
              {/* {fields.error && <li className="error">{fields.error}</li>} */}

            </tbody>
          </table>
        </div>
      </div>
    )

    return (
      <form id="form-timetabledetails" className="smart-form"
        onSubmit={handleSubmit((values) => { submitTimetableDay(values) })}>
 
        <fieldset>

          {/* <div className="row">
            <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
              <Field name="code" labelClassName="input"
                labelIconClassName="icon-append fa fa-barcode"
                validate={required} component={RFField} readOnly="readOnly"
                maxLength="10" type="text" placeholder=""
                label="CodeText" />
            </section>

            <section className="remove-col-padding col-sm-9 col-md-9 col-lg-9">
              <Field name="name" labelClassName="input"
                labelIconClassName="icon-append fa fa-file-text-o"
                validate={required} component={RFField}
                maxLength="100" type="text" placeholder=""
                label="TimetableTitleText" />
            </section>
          </div>

          <div className="row">
            <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
              shift
            </section>

            <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
              class
            </section>

            <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
              section
            </section>

            <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
              <Field name="periodDurationMins" labelClassName="input"
                labelIconClassName="icon-append fa fa-list-ol"
                validate={[required, number]} component={RFField} type="text"
                label="PeriodDurationMinsText"
                placeholder="Please enter period duration in minutes" />
            </section>

          </div>

          <div className="row">
            <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
              <Field name="shiftStartTime" labelClassName="input"
                labelIconClassName="icon-append fa fa-calendar"
                component={RFField}
                type="text"
                label="ShiftStartTimeText" />
            </section>
            <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
              <Field name="shiftEndTime" labelClassName="input"
                labelIconClassName="icon-append fa fa-calendar"
                component={RFField}
                type="text"
                label="ShiftEndTimeText" />
            </section>
            <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
              <Field name="breakStartTime" labelClassName="input"
                labelIconClassName="icon-append fa fa-clock-o"
                component={RFField}
                type="text"
                label="breakStartTimeText" />
            </section>
            <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
              <Field name="breakEndTime" labelClassName="input"
                labelIconClassName="icon-append fa fa-clock-o"
                component={RFField}
                type="text"
                label="breakEndTimeText" />
            </section>
          </div> */}
 
          <div className="row">
            <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
              <FieldArray name="timeTableDetails" component={renderTimeTableDetails} />
            </section>
          </div>

        </fieldset>

        <footer>
          <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary">
            {this.state.timeTableId > 0 ? <Msg phrase="UndoChangesText" /> : <Msg phrase="ResetText" />}
          </button>
          <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
            <Msg phrase="SaveText" />
          </button>
        </footer>

      </form>
    );
  }
}

const afterSubmit = function (result, dispatch) {
  //console.log('hello edit');
  //console.log(result);
  dispatch(reset('TimetableDay'));
}

export default reduxForm({
  form: 'TimetableDay',  // a unique identifier for this form
  validate,
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false
  // ,//
  // asyncValidate,
  // asyncBlurFields: ['email']
})(TimetableDay)