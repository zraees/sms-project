import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';

import { Field, FieldArray, reduxForm, formValueSelector, getFormValues } from 'redux-form'
// import StarRating from 'react-rating'
import moment from 'moment'

import { RFField, RFTimePicker, RFRadioButtonList, RFReactSelect, RFReactSelectSingle, RFTextArea, RFLabel, RFCheckbox } from '../../../../components/ui'
import { createEmptyTimeTableDetail, submitTimetableDay } from './submit'
// import {
//   TimePicker,
// } from 'redux-form-material-ui';
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { required, number } from '../../../../components/forms/validation/CustomValidation'
import AlertMessage from '../../../../components/common/AlertMessage'
import mapForCombo from '../../../../components/utils/functions'

import Loader, { Visibility as LoaderVisibility } from '../../../../components/Loader/Loader'
import Msg from '../../../../components/i18n/Msg'
import validate from './validate'
import normalizeTime from './normalizeTime'

class TimetableDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTableDetailId: 0,
      editMode: 0,
      timeTableId: 0,
      dayId: 0,
      timeTableDetails: [],
      // locationOptions: [],
      teacherOptions: [],
      subjectOptions: [],
      subjectOptions2D: []
    }
    this.handleTeacherBlur = this.handleTeacherBlur.bind(this);
    this.populateSubjects = this.populateSubjects.bind(this); 
  }

  componentWillMount() {
    LoaderVisibility(true);
  }

  componentDidMount() {

    axios.get('/api/TeachersClasses/ByClassID/' + this.props.classId)
    .then(res => {
      const teacherOptions = mapForCombo(res.data);
      this.setState({ teacherOptions });
    });

    let teacherIds = [];

    axios.get('/api/GetTimeTableDetailByTimeTableIDDayID/' + this.props.timeTableId + '/' + this.props.dayId)
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
              "startTime": item.StartTime.substring(0,5),
              "endTime": item.EndTime.substring(0,5),
              "isBreak": item.IsBreak == 1 ? true : false,
              "locationId": item.LocationID,
              "teacherId": item.TeacherId,
              "subjectId": item.SubjectID
            });

            if (item.TeacherId) {
              teacherIds.push({"index":index, "teacherId":item.TeacherId});
            }

          });

          const initData = {
            "timeTableDetailId": 0,
            "timeTableId": localTimeTableId,
            "dayId": localDayId,
            "timeTableDetails": timeTableDetails
          } 

          this.props.initialize(initData); 
          
          for (var i = 0, len = teacherIds.length; i < len; i++) {
            //console.log('this.props.initialize(initData) ', teacherIds[i]["index"], teacherIds[i]["teacherId"]);
            this.populateSubjects(teacherIds[i]["index"], teacherIds[i]["teacherId"]);
          }
          

        }
        else {
          // show error message, there is some this went wrong 
        }

      });   

      LoaderVisibility(false);
  }

  handleTeacherBlur(index, event) {

    //console.log('handleTeacherBlur(obj, value) == ', index, event.target.value);
    this.populateSubjects(index, event.target.value);
    

  }

  populateSubjects(index, value){
    //console.log("index & value ",index, value);

    //console.log("this.state == -- == ", this.state);

    if (value) {
      axios.get('api/TeachersSubjects/All/' + value)
        .then(res => {

          //console.log('subjectOptions2D 1 -- ', subjectOptions2D);

          let subjectOptions2D = this.state.subjectOptions2D;
          const subjectOptions = mapForCombo(res.data);
          subjectOptions2D[index] = subjectOptions;
          this.setState({ subjectOptions2D });

          //console.log('subjectOptions2D 2 -- ', subjectOptions2D);
        });
    }
    else {

      let subjectOptions2D = this.state.subjectOptions2D;
      subjectOptions2D[index] = [];
      this.setState({ subjectOptions2D });
      //this.setState({ subjectOptions2D: [] });
    }
    
  }  

  render() {
    const { handleSubmit, pristine, reset, submitting, locationOptions } = this.props
    const { teacherOptions, subjectOptions, subjectOptions2D } = this.state;
    const { timeTableId, dayId } = this.state;
    var self = this;

    const renderTimeTableDetails = ({ fields, meta: { touched, error } }) => (
      <div > 
        <a onClick={() => {
          console.log('Object.keys(fields)[0].timeTableId == ', fields);
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
          })
        }}><i className="glyphicon glyphicon-plus-sign"></i>&nbsp;<Msg phrase="Add New" /></a>
        {/* <button type="button" className="btn btn-primary" onClick={() => {
                  console.log('Object.keys(fields)[0].timeTableId == ', fields);
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
                  })
                }}>
            <i className="fa fa-plus" />
            <span className="hidden-mobile"><Msg phrase="Add New" /></span>
          </button> */}
        <div className="table-responsive"> 

          <table className="table table-striped table-bordered table-hover table-responsive">
            <thead>
              <tr>
                <th>
                  <div className="row">
                    <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
                      <Msg phrase="PeriodStartTimeText" />
                    </section>
                    <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
                      <Msg phrase="PeriodEndTimeText" />
                    </section>
                    <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
                      <Msg phrase="TeacherText" />
                    </section>
                    <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
                      <Msg phrase="SubjectText" />
                    </section>
                    <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
                      <Msg phrase="LocationText" />
                    </section>
                    <section className="remove-col-padding col-sm-1 col-md-1 col-lg-1">   
                      <Msg phrase="BreakPeriodText" />                    
                    </section>
                    <section className="remove-col-padding col-sm-2 col-md-2 col-lg-1">
                    
                    </section>
                  </div>
                </th> 
              </tr>
            </thead>
            <tbody>
              {fields.map((period, index) =>
                <tr key={period}>
                  <td> 
                    <div className="row">
                      <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
                        {/* <Field name={`${period}.startTime`}
                          component={RFLabel}
                          disabled={true}
                          type="text" /> */}
                        {/* <Field
                          name={`${period}.startTime`}
                          component={TimePicker} 
                          format={(value, name) => { new Date() || null}} 
                          props={{format: "24hr"}}
                          //defaultValue={null} // TimePicker requires an object,
                          // and redux-form defaults to ''
                          hintText="At what time?"
                          validate={required}
                        />  */}
                        <Field name={`${period}.startTime`} labelClassName="input remove-col-padding "
                          labelIconClassName="icon-append fa fa-clock-o"
                          validate={required} component={RFField}
                          type="text" placeholder="hh:mm"
                          maxLength="5"
                          normalize={normalizeTime}
                        /> 
                      </section>
                      <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
                        <Field name={`${period}.endTime`} labelClassName="input remove-col-padding "
                          labelIconClassName="icon-append fa fa-clock-o"
                          validate={required} component={RFField}
                          type="text" placeholder="hh:mm"
                          maxLength="5"
                          normalize={normalizeTime}
                        /> 
                        {/* <Field name={`${period}.endTime`}
                          component={RFLabel}
                          disabled={true}
                          type="text" /> */}
                      </section>
                      <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
                        <Field 
                          name={`${period}.teacherId`}
                          label="" 
                          options={teacherOptions}
                          onChange={(e) => this.handleTeacherBlur(index, e)}
                          component={RFReactSelectSingle} />
                      </section>
                      <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
                        <Field 
                          name={`${period}.subjectId`}
                          label=""
                          options={subjectOptions2D[index] || []}
                          component={RFReactSelectSingle} />
                      </section>
                      <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
                        <Field
                          multi={false}
                          name={`${period}.locationId`}
                          label=""
                          options={locationOptions}
                          component={RFReactSelectSingle} />
                      </section>
                      <section className="remove-col-padding col-sm-1 col-md-1 col-lg-1">
                        <label className="checkbox">
                          <Field name={`${period}.isBreak`}
                            component="input" type="checkbox" />
                          <i></i></label>
                      </section>
                      <section className="remove-col-padding col-sm-1 col-md-1 col-lg-1">
                        {/* <Field name={`${index}` + 1 } component={RFLabel} disabled={true} type="text" /> */}
                        <a onClick={() => fields.remove(index)}><i className="glyphicon glyphicon-trash"></i></a>
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

{/* <div className="row">
            <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
            <div className="widget-body-toolbar">
                        <div className="row">
                            <div className="col-xs-9 col-sm-5 col-md-5 col-lg-5">

                            </div>
                            <div className="col-xs-3 col-sm-7 col-md-7 col-lg-7 text-right">
                                <button className="btn btn-primary" data-toggle="modal"
                                  data-target="#timeTablePopup">
                                    <i className="fa fa-plus"/> 
                                    <span className="hidden-mobile"><Msg phrase="Add New" /></span>
                                </button>
                            </div>
                        </div>
                    </div>
          </section>
          </div> */}
          <div className="row">
            <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
              
            </section>
          </div>

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