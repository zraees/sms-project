/**
 * Created by griga on 11/30/15.
 */

import React from 'react'
import axios from 'axios' 
import {SubmissionError} from 'redux-form'
import {connect} from 'react-redux'
import moment from 'moment'
 
import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'

import { Field, reduxForm } from 'redux-form'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import JarvisWidget from '../../../../components/widgets/JarvisWidget'
import Datatable from '../../../../components/tables/Datatable'
import Msg from '../../../../components/i18n/Msg'

import Moment from '../../../../components/utils/Moment'
 
import submit from './submit'
import mapForCombo, {renderDate, mapForRadioList} from '../../../../components/utils/functions'

import {required, number}  from '../../../../components/forms/validation/CustomValidation' 
import {RFField, RFReactSelect} from '../../../../components/ui'

// import {OverlayTrigger, Tooltip} from 'react-bootstrap'

class TimetablesPage extends React.Component {
  
  constructor(props){
   super(props);
   this.state = {
      timetableId: 0,
      singleEditMode: 0,
      shiftOptions: [],
      classOptions: [],
      sectionOptions: []
   }
    this.handleShiftBlur = this.handleShiftBlur.bind(this);
    this.handleClassBlur = this.handleClassBlur.bind(this);
  }
  
  componentWillMount() {
    LoaderVisibility(true);
  }
  
  componentDidMount(){ 

    //console.log('componentDidMount --> TeacherPage');
    //var self =this;
    $('#teachersGrid').on('click', 'td', function(event) {
      
      if ($(this).find('#dele').length > 0) {
        
        //alert(  $(this).find('#dele').data('tid'));
        //LoaderVisibility(true);//
        var id = $(this).find('#dele').data('tid');
        remove(id, $(this));

        // console.log('outside');
        // console.log(success);
        
        // if(success){
        //   var table = $('#teachersGrid').DataTable();                
        //   table
        //     .row( $(this).parents('tr') )
        //     .remove()
        //     .draw();
        // }
        
        
        //self._smartModEg1();

      }
    });
    
    // call before modal open
    $('#teacherPopup').on('show.bs.modal', function (e) {      

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
    $('#teacherPopup').on('hidden.bs.modal', function (e) {            
      this.setState({timetableId : 0});
      //console.log('close popup');
      //$('#teachersGrid').DataTable().ajax.reload();      
          var table = $('#teachersGrid').DataTable();                
          table.clear();
          table.ajax.reload( null, false ); // user paging is not reset on reload

    }.bind(this));
    
    axios.get('/api/lookup/shifts/')
      .then(res=>{            
          const shiftOptions = mapForCombo(res.data);
          this.setState({shiftOptions});
      });
    
    axios.get('/api/GetTimetableGeneratedCode')
      .then(res=>{      
        console.log(res);       
        const initData = {
            "timetableId": 0,
            "code": res.data
        }

        this.props.initialize(initData);
        
      });

      LoaderVisibility(false);
  }

  handleShiftBlur(obj, value){
    axios.get('/api/GetClassesByShiftId/' + value)
      .then(res=>{
          const classOptions = mapForCombo(res.data);
          this.setState({classOptions});
      });
 
  }

  handleClassBlur(obj, value){  
    axios.get('/api/GetClassesByShiftIdClassId/' + this.props.shiftId + '/' + value)
      .then(res=>{
          const sectionOptions = mapForCombo(res.data);
          this.setState({sectionOptions});
      }); 
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    const { shiftOptions, classOptions, sectionOptions, timetableId } = this.state;    
    var self = this;

    return (
      
      <div id="content">
        
        <WidgetGrid>

          {/* START ROW */}

          <div className="row">

            {/* NEW COL START */}
            <article className="col-sm-12 col-md-12 col-lg-12">

              {/* Widget ID (each widget will need unique ID)*/}
              <JarvisWidget colorbutton={false} editbutton={false} color="blueLight" 
                            custombutton={false} deletebutton={false} >

                <header>
                  <span className="widget-icon"> <i className="fa fa-edit"/> </span>

                  <h2><Msg phrase="TimetableText" /></h2>
                  
                </header>

                {/* widget div*/}
                <div>

                  {/* widget content */}
                  <form id="form-timetable" className="smart-form" 
                       onSubmit={handleSubmit((values)=>{submit(values, timetableId)})}>

                    <fieldset>
                          
                      <div className="row">
                        <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
                          <Field name="code" labelClassName="input" 
                            labelIconClassName="icon-append fa fa-barcode"
                            validate={required} component={RFField} 
                            maxLength="10" type="text" placeholder="" 
                            label="CodeText" />    
                        </section>

                        <section className="remove-col-padding col-sm-9 col-md-9 col-lg-9">
                          <Field name="title" labelClassName="input" 
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
                              options={shiftOptions}
                              onBlur={this.handleShiftBlur}
                              component={RFReactSelect} />
                        </section>

                        <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
                          <Field
                              multi={false}
                              name="classId"
                              label="ClassText"
                              options={classOptions}
                              onBlur={this.handleClassBlur}
                              component={RFReactSelect} />
                        </section>

                        <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
                          <Field
                              multi={false}
                              name="sectionId"
                              label="SectionText"
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

                  <Loader isLoading={this.props.isLoading} />
                  <Datatable id="teachersGrid"  
                    options={{
                      ajax: {"url":'/api/teachers', "dataSrc": ""}, 
                      columnDefs: [
                          { 
                              "type": "date",
                              "render": function ( data, type, row ) {
                                  //return moment(data).format('Do MMM YYYY' || 'llll')
                                  return renderDate(data);
                              },
                              "targets": 5 
                          },
                          {
                              // The `data` parameter refers to the data for the cell (defined by the
                              // `data` option, which defaults to the column being worked with, in
                              // this case `data: 0`.
                              "render": function ( data, type, row ) {
                                //console.log(data);
                                //console.log(type);
                                //console.log(row);
                                  //return data +' ('+ row[0]+')';
                                  //id = data;
                                  //console.log(this.state.timetableId);
                                  return '<a data-toggle="modal" data-single-edit="1"  title="Edit" data-id="' + data + '" data-target="#teacherPopup"><i id="edi" class=\"glyphicon glyphicon-edit\"></i><span class=\"sr-only\">Edit</span></a>';
                              },
                              "className": "dt-center",
                              "sorting": false,
                              "targets": 7
                          },
                          {
                              // The `data` parameter refers to the data for the cell (defined by the
                              // `data` option, which defaults to the column being worked with, in
                              // this case `data: 0`.
                              "render": function ( data, type, row ) {
                                //console.log(data);
                                //console.log(type);
                                //console.log(row);
                                  //return data +' ('+ row[0]+')';
                                  //id = data;
                                  //console.log(this.state.timetableId);
                                  return '<a data-toggle="modal" data-single-edit="0"  title="Manage" data-id="' + data + '" data-target="#teacherPopup"><i id="edi" class=\"glyphicon glyphicon-list-alt\"></i><span class=\"sr-only\">Edit</span></a>';
                              },
                              "className": "dt-center",
                              "sorting": false,
                              "targets": 8
                          }
                          ,{ 
                              "render": function ( data, type, row ) {
                                //return (<a onClick={onOrderRestaurant.bind(self, this)} 
                                //                className="btn btn-primary btn-sm">Order this restaurant
                                //                </a>);
                                return '<a id="dele" data-tid="' + data + '" title="Delete"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Edit</span></a>';
                                  //return ('<a onClick={self.handleClick.bind(self, 1)}>del</a>');
                                  //return '<a onClick={self.handleClick} className="btn btn-success">click</a>';
                                  //return '<a onClick="javascript:deleteConfirm()" className="btn btn-success"> Callback ()</a>';
                                  //return '<a data-toggle="modal" data-id="' + data + '" data-target="#teacherPopup"><i class=\"glyphicon glyphicon-edit\"></i><span class=\"sr-only\">Delete</span></a>';
                              }.bind(self),
                              "className": "dt-center",
                              "sorting": false,
                              "targets": 9
                          }
                      ],
                      columns: [
                        //{
                        //    "className":      'details-control',
                        //    "orderable":      false,
                        //    "data":           null,
                        //    "defaultContent": ''
                        //},
                        {data: "timetableId"},
                        {data: "Name"},
                        {data: "Email"},    
                        {data: "IDNo"},  
                        {data: "Gender"},  
                        {data: "DOB"},  
                        {data: "Rating"},  
                        {data: "timetableId"},
                        {data: "timetableId"},
                        {data: "timetableId"}
                      ],
                      buttons: [
                        'copy', 'excel', 'pdf'
                      ]
                    }}
                    paginationLength={true} 
                    //refresh={this.state.refresh}
                    className="table table-striped table-bordered table-hover"
                    width="100%">
                    <thead>
                    <tr>
                      <th data-hide="mobile-p"><Msg phrase="IDText"/></th>
                      <th data-class="expand"><Msg phrase="NameText"/></th>
                      <th data-hide="mobile-p"><Msg phrase="EmailAddressText"/></th>
                      <th data-hide="mobile-p"><Msg phrase="IdentityCardNumberText"/></th>
                      <th data-hide="mobile-p"><Msg phrase="GenderText"/></th>
                      <th data-hide="mobile-p"><Msg phrase="DOBText"/></th>
                      <th data-hide="mobile-p"><Msg phrase="RatingText"/></th>
                      <th data-hide="mobile-p"></th>
                      <th data-hide="mobile-p"></th>
                      <th data-hide="mobile-p"></th>
                    </tr>
                    </thead>
                  </Datatable>

                </div>
                {/* end widget div */}

              </JarvisWidget>
              {/* end widget */}

            
            </article>
            {/* END COL */}

          </div>

          {/* END ROW */}

        </WidgetGrid>

        {/* end widget grid */}
  
        <div className="modal fade" id="teacherPopup" tabIndex="-1" role="dialog" 
            data-backdrop="static" data-keyboard="false"
            aria-labelledby="teacherPopupLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title" id="teacherPopupLabel">
                  { this.state.singleEditMode == 1 ? <Msg phrase="EditText" /> : (this.state.timetableId > 0 ? <Msg phrase="Manage Teacher" /> : <Msg phrase="Add New Teacher"/>)}
                </h4>
              </div>
              <div className="modal-body">  
                                
                 
              </div>
            </div>
            {/* /.modal-content */}
          </div>
          {/* /.modal-dialog */}
        </div>
        {/* /.modal */}

      </div>
    )
  }

} 
const afterSubmit = function(result, dispatch) { 
    dispatch(reset('TimetablesPage'));
}

export default reduxForm({
  form: 'TimetablesPage',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(TimetablesPage)
 
