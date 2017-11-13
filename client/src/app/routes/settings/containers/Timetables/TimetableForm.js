/**
 * Created by griga on 11/30/15.
 */

import React from 'react'
import axios from 'axios' 
import {SubmissionError} from 'redux-form'
import {connect} from 'react-redux'
import {reset} from 'redux-form';
import moment from 'moment'
 
import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'
 
import {Field, FieldArray, reduxForm, formValueSelector, getFormValues} from 'redux-form'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import JarvisWidget from '../../../../components/widgets/JarvisWidget'
import Datatable from '../../../../components/tables/Datatable'
import Msg from '../../../../components/i18n/Msg'

import Moment from '../../../../components/utils/Moment'
 
import TimetableDay from './TimetableDay'
import submit from './submit'
import mapForCombo, {renderDate, mapForRadioList} from '../../../../components/utils/functions'

import {required, number}  from '../../../../components/forms/validation/CustomValidation' 
import {RFField, RFReactSelect, RFLabel, RFRadioButtonList} from '../../../../components/ui'

// import {OverlayTrigger, Tooltip} from 'react-bootstrap'

class TimetableForm extends React.Component {
  
  constructor(props){
   super(props);
   this.state = {
      timetableId: 0,
      singleEditMode: 0,
      shiftOptions: [],
      classOptions: [],
      sectionOptions: [],
      teacherOptions: [],      
      subjectOptions: [] 
   }
    this.handleShiftBlur = this.handleShiftBlur.bind(this);
    this.handleClassBlur = this.handleClassBlur.bind(this);
    this.handleTeacherBlur = this.handleTeacherBlur.bind(this);
    this.handleSubjectBlur = this.handleSubjectBlur.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }
  
  componentWillMount() {
    LoaderVisibility(true);
  }
  
  componentDidMount(){ 
     
    //console.log('componentDidMount --> TeacherPage');
    //var self =this;
    $('#timetablesGrid').on('click', 'td', function(event) {
      
      if ($(this).find('#dele').length > 0) {
        
        //alert(  $(this).find('#dele').data('tid'));
        //LoaderVisibility(true);//
        var id = $(this).find('#dele').data('tid');
        remove(id, $(this));

        // console.log('outside');
        // console.log(success);
        
        // if(success){
        //   var table = $('#timetablesGrid').DataTable();                
        //   table
        //     .row( $(this).parents('tr') )
        //     .remove()
        //     .draw();
        // }
        
        
        //self._smartModEg1();

      }
    });
    
    // call before modal open
    $('#timetableDayPopup').on('show.bs.modal', function (e) {      

      //console.log('modal before call edit page');

      //LoaderVisibility(true);
      var button = $(e.relatedTarget);        // Button that triggered the modal
      //$(button).find('#edi').removeClass("glyphicon glyphicon-edit").addClass("glyphicon glyphicon-refresh glyphicon-spin");

      //console.log(button);
      var timetableId = button.data('id');             // Extract info from data-* attributes
      //console.log(button.data('single-edit'));
      this.setState({singleEditMode: button.data('single-edit')}); 
      this.setState({timetableId});    
    }.bind(this));

    // call on modal close
    $('#timetableDayPopup').on('hidden.bs.modal', function (e) {            
      this.setState({timetableId : 0});
      //console.log('close popup');
      //$('#timetablesGrid').DataTable().ajax.reload();      
          var table = $('#timetablesGrid').DataTable();                
          table.clear();
          table.ajax.reload( null, false ); // user paging is not reset on reload

    }.bind(this));
    
    axios.get('/api/lookup/shifts/')
      .then(res=>{            
          const shiftOptions = mapForCombo(res.data);
          this.setState({shiftOptions});
      }); 

    // axios.get('/api/GetTimetableGeneratedCode')
    //   .then(res=>{      
    //     console.log(res);       
    //     const initData = {
    //         "timetableId": 0,
    //         "code": res.data,
    //         "days": [
    //           {
    //             "firstName": "abc",
    //             "lastName": "123 tg"
    //           },
    //           {
    //             "firstName": "ttt",
    //             "lastName": "ddd"
    //           }
    //         ]
    //     }

    //     this.props.initialize(initData);
        
    //   });
    
      let days = [];
      let periods = [];
      periods = [{"periodStart":"08:00 AM", "periodEnd":"08:30 AM", "teacherId":"0", "subjectId":"0", "firstName": "abc 1", "lastName": "123 x"}, 
                  {"periodStart":"08:31 AM", "periodEnd":"09:00 AM", "teacherId":"0", "subjectId":"0", "firstName": "abc 1.1", "lastName": "123 1.x"},
                  // {"periodStart":"08:31 AM", "periodEnd":"09:00 AM", "teacherId":"0", "subjectId":"0", "firstName": "abc 1.1", "lastName": "123 1.x"},
                  // {"periodStart":"08:31 AM", "periodEnd":"09:00 AM", "teacherId":"0", "subjectId":"0", "firstName": "abc 1.1", "lastName": "123 1.x"},
                  // {"periodStart":"08:31 AM", "periodEnd":"09:00 AM", "teacherId":"0", "subjectId":"0", "firstName": "abc 1.1", "lastName": "123 1.x"},
                  // {"periodStart":"08:31 AM", "periodEnd":"09:00 AM", "teacherId":"0", "subjectId":"0", "firstName": "abc 1.1", "lastName": "123 1.x"},
                  {"periodStart":"08:31 AM", "periodEnd":"09:00 AM", "teacherId":"0", "subjectId":"0", "firstName": "abc 1.1", "lastName": "123 1.x"},
                  {"periodStart":"08:31 AM", "periodEnd":"09:00 AM", "teacherId":"0", "subjectId":"0", "firstName": "abc 1.1", "lastName": "123 1.x"},
                  {"periodStart":"08:31 AM", "periodEnd":"09:00 AM", "teacherId":"0", "subjectId":"0", "firstName": "abc 1.1", "lastName": "123 1.x"},
                  {"periodStart":"09:01 AM", "periodEnd":"09:30 AM", "teacherId":"0", "subjectId":"0", "firstName": "abc 1.1", "lastName": "123 1.x"}];
      days.push({"periods":periods});
      // days.push({"periods":periods});
      // days.push({"periods":periods});
      // days.push({"periods":periods});
      // days.push({"periods":periods});
      // days.push({"periods":periods});
      // days.push({"periods":periods}); 
      // days.push({"firstName": "abc 2", "lastName": "123 xx"});
      // days.push({"firstName": "abc 3", "lastName": "123 Xxx"});
      // days.push({"firstName": "abc 4", "lastName": "123 Xxx"});
      // days.push({"firstName": "abc 5", "lastName": "123 Xxx"});
      // days.push({"firstName": "abc 6", "lastName": "123 Xxx"});
      // days.push({"firstName": "abc 7", "lastName": "123 Xxx"});

      // const initData = {
      //     "timetableId": 0,
      //     // "code": '',
      //     // "days": days
      // }

      // this.props.initialize(initData);

      axios.get('/api/GetTimeTableGeneratedCode')
      .then(res=>{      
        //console.log(res);       
        const initData = {
            "timetableId": 0,
            "code": res.data
        }

        this.props.initialize(initData);
        
      });

      LoaderVisibility(false);
  }

  handleTeacherBlur(obj, value){
    // axios.get('/api/Lookup/subjectOptions/countryid/' + value)
    //   .then(res=>{
    //       const subjectOptions = mapForCombo(res.data);//res.data.map(function(item, index){
    //           //return {value: item.Id + "", label: item.Name};
    //       //});                       
    //       this.setState({subjectOptions});
    //   });
 
  }

  handleSubjectBlur(obj, value){ 
    // axios.get('/api/Lookup/cities/subjectId/' + value)
    //   .then(res=>{
    //       const cities = mapForCombo(res.data); // res.data.map(function(item, index){
    //       //     return {value: item.Id + "", label: item.Name};
    //       // });                       
    //       this.setState({cities});
    //   });
  }

  handleShiftBlur(obj, value){
    if(value!=''){
      axios.get('/api/GetClassesByShiftId/' + value)
        .then(res=>{
            const classOptions = mapForCombo(res.data);
            this.setState({classOptions});
        });
      
      axios.get('/api/shifts/' + value)
        .then(res=>{ 
            this.props.change('shiftStartTime', res.data.StartTime);
            this.props.change('shiftEndTime', res.data.EndTime);
            this.props.change('breakStartTime', res.data.BreakStartTime);
            this.props.change('breakEndTime', res.data.BreakEndTime);
        });    
    }
    else{
      this.props.change('shiftStartTime', '');
      this.props.change('shiftEndTime', '');
      this.props.change('breakStartTime', '');
      this.props.change('breakEndTime', '');

      this.setState({classOptions: []});
      this.setState({sectionOptions: []});
    }
  }

  handleClassBlur(obj, value){  
    console.log('this.props.shiftId', this.props.shiftId);
    if(this.props.shiftId && value){
      axios.get('/api/GetClassesByShiftIdClassId/' + this.props.shiftId + '/' + value)
        .then(res=>{
            const sectionOptions = mapForCombo(res.data);
            this.setState({sectionOptions});
        });
    }
    else{      
      this.setState({sectionOptions: []});
    }
  }

  handleDayChange(obj, value){
    //console.log('obj ==> ', obj); 
    $('#timetableDayPopup').modal('show'); 

  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    const { shiftOptions, classOptions, sectionOptions, timetableId } = this.state;    
    var self = this;
 
    return (
       
        <form id="form-timetable" className="smart-form" 
              onSubmit={handleSubmit((values)=>{submit(values, timetableId)})}>

          <fieldset>
                
            <div className="row">
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
                <Field
                    multi={false}
                    name="shiftId"
                    label="ShiftText"
                    validate={required}
                    options={shiftOptions}
                    onBlur={this.handleShiftBlur}
                    component={RFReactSelect} />
              </section>

              <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
                <Field
                    multi={false}
                    name="classId"
                    label="ClassText"
                    validate={required}
                    options={classOptions}
                    onBlur={this.handleClassBlur}
                    component={RFReactSelect} />
              </section>

              <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
                <Field
                    multi={false}
                    name="sectionId"
                    label="SectionText"
                    validate={required}
                    options={sectionOptions} 
                    component={RFReactSelect} />
              </section>

              <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
                <Field name="periodDurationMins" labelClassName="input" 
                    labelIconClassName="icon-append fa fa-list-ol"
                    validate={[required,number]} component={RFField} type="text" 
                    label="PeriodDurationMinsText"
                    placeholder="Please enter period duration in minutes"/>
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
            </div>

            {timetableId <= 0 ? <div></div> :
              <div className="row">                        
                <section className="remove-col-padding col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <p className="font-md"><Msg phrase="ManageTimetablePeriodsText"/></p>
                </section>  
                <section className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                  <span className="badge font-md padding10px"><a onClick={ () => {this.handleDayChange('1')} }><Msg phrase="Day1Text"/></a></span> 
                </section>  
                <section className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                  <span className="badge font-md padding10px"><a onClick={ () => {this.handleDayChange('2')} }><Msg phrase="Day2Text"/></a></span> 
                </section>  
                <section className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                  <span className="badge font-md padding10px"><a onClick={ () => {this.handleDayChange('3')} }><Msg phrase="Day3Text"/></a></span> 
                </section>  
                <section className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                  <span className="badge font-md padding10px"><a onClick={ () => {this.handleDayChange('4')} }><Msg phrase="Day4Text"/></a></span> 
                </section>    
                <section className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                  <span className="badge font-md padding10px"><a onClick={ () => {this.handleDayChange('5')} }><Msg phrase="Day5Text"/></a></span> 
                </section>  
                <section className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                  <span className="badge font-md padding10px"><a onClick={ () => {this.handleDayChange('6')} }><Msg phrase="Day6Text"/></a></span> 
                </section>  
                <section className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                  <span className="badge font-md padding10px"><a onClick={ () => {this.handleDayChange('7')} }><Msg phrase="Day7Text"/></a></span> 
                </section>                        
                {/* <section className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                </section>   */}
                  {/* <div className="smart-timeline"> */}
                    {/* <ul id="horizontal-list">
                      <li ><div><span className="badge bg-color-blueLight"><h1>1</h1></span></div></li>
                      <li ><span className="badge bg-color-blueLight">2</span></li>
                      <li ><span className="badge bg-color-blueLight">3</span></li>
                      <li ><span className="badge bg-color-blueLight">4</span></li>
                      <li ><span className="badge bg-color-blueLight">5</span></li>
                      <li ><span className="badge bg-color-blueLight">6</span></li>
                      <li ><span className="badge bg-color-blueLight">7</span></li>
                    </ul> */}
                  {/* </div>  */}
                    
              </div> 
            }
            
            {/* <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  
                  <div className="smart-timeline">
                    <FieldArray name="days" component={renderdays}/>                               
                  </div>  

              </div>
            </div>*/}

          </fieldset>

          <footer>
            <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary">
              { this.state.timetableId > 0 ? <Msg phrase="UndoChangesText" /> : <Msg phrase="ResetText"/> }
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
    dispatch(reset('TimetableForm'));
}

TimetableForm =  reduxForm({
  form: 'TimetableForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(TimetableForm)
 
const selector = formValueSelector('TimetableForm') // <-- same as form name
TimetableForm = connect(
  state => { 
    //const { shiftId111 } = selector(state, 'shiftId')
    return {
      shiftId: selector(state, 'shiftId')
      //shiftId111
    }
  }
)(TimetableForm)

export default TimetableForm;