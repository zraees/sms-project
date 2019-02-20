/**
 * Created by griga on 11/30/15.
 */

import React from 'react'
import axios from 'axios' 
import {SubmissionError, reset} from 'redux-form'
import {connect} from 'react-redux' 
import moment from 'moment'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jsPDF'
import converter from 'number-to-words'
import numeral  from 'numeral'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'

import {Field, FieldArray, reduxForm, formValueSelector, getFormValues} from 'redux-form'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import JarvisWidget from '../../../../components/widgets/JarvisWidget'
import Datatable from '../../../../components/tables/Datatable'
import Msg from '../../../../components/i18n/Msg'

import Moment from '../../../../components/utils/Moment'
import alert, {confirmation} from '../../../../components/utils/alerts'
import mapForCombo, {getWebApiRootUrl, instanceAxios} from '../../../../components/utils/functions'

import FeeCollectionForm from './FeeCollectionForm'
import Details from './Details'
import Payments from './Payments'
import Alerts from './Alerts'

import {renderDate, getLangKey, getDateFrontEndFormat, getTranslation, renderFeeStatus, renderNumber, guid} from '../../../../components/utils/functions'
import print from '../../../../components/utils/reportRendering'

import {required, number}  from '../../../../components/forms/validation/CustomValidation' 
import {RFField, RFReactSelect, RFLabel} from '../../../../components/ui'
import submit, {remove, generateFeeCollections, printFeeSlip} from './submit' 

import HtmlRender from '../../../../components/utils/HtmlRender'

const feePaymentSlipTemplate = require('html-loader!./FeePaymentSlip-1.html');

class FeeCollectionsPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      feeCollectionId: 0,
      langKey: getLangKey(),
      shiftOptions: [],
      classOptions: [],
      sectionOptions: [],
      studentOptions: [],
      batchOptions: [],
      feeStructureOptions: [],
      paymentModeOptions: [],
      //url: '/api/FeeCollections/null/null/null/null/null',
      pageName: '',
      batchId: 0,
      sectionId: 0,
      classId: 0,
      shiftId: 0,
      studentId: 0,
      //feePaymentSlipTemplate: feePaymentSlipTemplate,
      //gridData: [{"$id":"1","FeeStructureID":1,"ClassID":3,"ClassName":"II","ClassNameAr":"II","FeeTypeCode":"0004","FeeTypeName":"abc 2","FeeTypeNameAr":"ed ed","FeeCycleID":1,"FeeCycleName":"Monthly","FeeCycleNameAr":"شهريا\r\n","FeeDueOnFrequencyID":1,"FeeDueOnFrequencyName":"Monthly","FeeDueOnFrequencyNameAr":"شهريا\r\n","FeeDueOnIntervalID":1,"FeeDueOnIntervalName":"First of every month","FeeDueOnIntervalNameAr":"أولا من كل شهر","FeeDiscountTypeID":null,"FeeDiscountTypeName":"","FeeDiscountTypeNameAr":"","DiscountOption":"P","DiscountOptionText":"%","DiscountRate":0.00,"DiscountValue":0.00,"Fee":5000.00,"NetFee":5000.00},{"$id":"2","FeeStructureID":3,"ClassID":4,"ClassName":"III","ClassNameAr":"III","FeeTypeCode":"0005","FeeTypeName":"abc","FeeTypeNameAr":"aaaa","FeeCycleID":2,"FeeCycleName":"Yearly","FeeCycleNameAr":"سنوي","FeeDueOnFrequencyID":3,"FeeDueOnFrequencyName":"Every 2 Months","FeeDueOnFrequencyNameAr":"كل شهرين\r\n","FeeDueOnIntervalID":4,"FeeDueOnIntervalName":"Till tenth of every month","FeeDueOnIntervalNameAr":"حتى عشر من كل شهر\r\n","FeeDiscountTypeID":1,"FeeDiscountTypeName":"Session Discount","FeeDiscountTypeNameAr":"خصم الجلسة\r\n","DiscountOption":"P","DiscountOptionText":"%","DiscountRate":25.00,"DiscountValue":3750.00,"Fee":15000.00,"NetFee":11250.00},{"$id":"3","FeeStructureID":1002,"ClassID":4,"ClassName":"III","ClassNameAr":"III","FeeTypeCode":"0008","FeeTypeName":"tution fee","FeeTypeNameAr":"edc","FeeCycleID":2,"FeeCycleName":"Yearly","FeeCycleNameAr":"سنوي","FeeDueOnFrequencyID":4,"FeeDueOnFrequencyName":"Quarterly","FeeDueOnFrequencyNameAr":"فصليا","FeeDueOnIntervalID":5,"FeeDueOnIntervalName":"Till tenth of every month","FeeDueOnIntervalNameAr":"حتى عشر من كل شهر\r\n","FeeDiscountTypeID":1,"FeeDiscountTypeName":"Session Discount","FeeDiscountTypeNameAr":"خصم الجلسة\r\n","DiscountOption":"P","DiscountOptionText":"%","DiscountRate":5.00,"DiscountValue":550.00,"Fee":11000.00,"NetFee":10450.00}]
    }
    this.handleShiftBlur = this.handleShiftBlur.bind(this);
    this.handleClassBlur = this.handleClassBlur.bind(this);
    this.handleSectionBlur = this.handleSectionBlur.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleBatchBlur = this.handleBatchBlur.bind(this);
    this.renderModalBody = this.renderModalBody.bind(this);
     
    //this.printFeeSlip = this.printFeeSlip.bind(this);
  }

  componentWillMount() {
    LoaderVisibility(true);
  }

  componentDidMount(){ 

    console.log('componentDidMount --> FeeCollectionsPage');

    // $('body').on('click', '.modal-toggle', function (event) {
    //   console.log('asdasd ');
    //   event.preventDefault();
    //   $('.modal-content').empty();
    //   $('#myModal')
    //     .removeData('bs.modal')
    //     .modal({ remote: $(this).attr('href') });
    // });

    instanceAxios.get('/api/lookup/shifts/')
      .then(res => {
        const shiftOptions = mapForCombo(res.data);
        this.setState({ shiftOptions });
      });

    instanceAxios.get('/api/lookup/batches/')
      .then(res => {
        const batchOptions = mapForCombo(res.data);
        this.setState({ batchOptions });
      });

    instanceAxios.get('/api/lookup/paymentModes/')
      .then(res => {

        //console.log('/api/lookup/paymentModes/', res.data);

        const paymentModeOptions = mapForCombo(res.data);
        this.setState({ paymentModeOptions });
      });

    // instanceAxios.get('/api/FeeStructures/GetFeeTypes/')
    //   .then(res => {
    //     const feeStructureOptions = mapForCombo(res.data);
    //     this.setState({ feeStructureOptions });
    //   });

    $('#FeeCollectionGrid').on('click', 'td', function(event) {
      
      if ($(this).find('#dele').length > 0) {
         
        var id = $(this).find('#dele').data('tid');
        remove(id, $(this));
 
      }
    });
    
    // call before modal open
    $('#feeCollectionPopup').on('show.bs.modal', function (e) {      

      //console.log('show.bs.modal');
      $('#paymentId').val('');

      var button = $(e.relatedTarget);                    // Button that triggered the modal   
      var feeTypeId = button.data('id');             // Extract info from data-* attributes
      var pageName = button.data('page-name');
      var batchId = button.data('batch-id');
      var classId = button.data('class-id');
      var sectionId = button.data('section-id');
      var shiftId = button.data('shift-id');
      var studentId = button.data('student-id');

      this.setState({pageName, feeTypeId, batchId, classId, sectionId, shiftId, studentId});    

    }.bind(this));

    // call on modal close
    $('#feeCollectionPopup').on('hidden.bs.modal', function (e) {
      this.setState({ feeTypeId: 0 });

      $(this).data('modal', null);
      // $(".modal-body").html("");

      //console.log($('#paymentId').val());

      var table = $('#FeeCollectionGrid').DataTable();
      table.clear();
      table.ajax.reload(null, false); // user paging is not reset on reload

      $(this).data('bs.modal', null);
      $(this).remove();

      //this.printFeeSlip(this.state.langKey, $('#paymentId').val());
      printFeeSlip(this.state.langKey, $('#paymentId').val());

    }.bind(this));

    $('#reportPopup').on('shown.bs.modal', function () {
      // $(this).find('.modal-body').css({
      //   width: 'auto',
      //   height: 'auto',
      //   'max-height': '100%'
      // });

      $(this).find('.modal-body').height(500);

    });

    LoaderVisibility(false);
  }


  handleShiftBlur(obj, value) {
    
    this.setState({ sectionOptions: [] });
    this.setState({ studentOptions: [] });

    if (value != '') {
      instanceAxios.get('/api/GetClassesByShiftId/' + value)
        .then(res => {
          const classOptions = mapForCombo(res.data);
          this.setState({ classOptions });
        });

      // instanceAxios.get('/api/shifts/' + value)
      //   .then(res => {
      //     this.props.change('shiftStartTime', res.data.StartTime);
      //     this.props.change('shiftEndTime', res.data.EndTime);
      //     this.props.change('breakStartTime', res.data.BreakStartTime);
      //     this.props.change('breakEndTime', res.data.BreakEndTime);
      //   });
    }
    else {
      // this.props.change('shiftStartTime', '');
      // this.props.change('shiftEndTime', '');
      // this.props.change('breakStartTime', '');
      // this.props.change('breakEndTime', '');

      this.setState({ classOptions: [] }); 
    }
  }

  handleClassBlur(obj, value) {
    //console.log('this.props.shiftId', this.props.shiftId);
    this.setState({ studentOptions: [] });

    if (this.props.shiftId && value) {
      instanceAxios.get('/api/GetClassesByShiftIdClassId/' + this.props.shiftId + '/' + value)
        .then(res => {
          const sectionOptions = mapForCombo(res.data);
          this.setState({ sectionOptions });
        });

      instanceAxios.get('/api/FeeStructures/GetFeeTypes/'+value)
        .then(res => {
          const feeStructureOptions = mapForCombo(res.data);
          this.setState({ feeStructureOptions });
        });
    }
    else {
      this.setState({ sectionOptions: [], feeStructureOptions: [] });
    }
  }

  handleSectionBlur(obj, value) {
    //console.log('this.props.sectionID ', this.props.shiftId, this.props.sectionId);
    if (this.props.shiftId && this.props.batchId && this.props.classId && value) {
      instanceAxios.get('/api/GetStudentsByShiftIdClassIdSectionId/' + this.props.shiftId + '/' + this.props.classId + '/' + value + '/'+ this.props.batchId)
        .then(res => {
          const studentOptions = mapForCombo(res.data);
          this.setState({ studentOptions });
        });
    }
    else { 
      this.setState({ studentOptions: [] });
    }
  }

  handleBatchBlur(obj, value) {
    //console.log('this.props.sectionID ', this.props.shiftId, this.props.sectionId);
    if (this.props.shiftId && this.props.classId && this.props.sectionId && value) { 
      instanceAxios.get('/api/GetStudentsByShiftIdClassIdSectionId/' + this.props.shiftId + '/' + this.props.classId + '/' + this.props.sectionId + '/' + value)
        .then(res => {
          const studentOptions = mapForCombo(res.data);
          this.setState({ studentOptions });
        });
    }
    else {  
      this.setState({ studentOptions: [] });
    }
  }

  handleSearchClick(obj, value) {

    //console.log('handleSearchClick this.props.sectionID ', this.props.shiftId, this.props.sectionId);
    var shiftId, classId, sectionId, batchId, studentId;
    shiftId = this.props.shiftId ? this.props.shiftId : null;
    classId = this.props.classId ? this.props.classId : null;
    sectionId = this.props.sectionId ? this.props.sectionId : null;
    batchId = this.props.batchId ? this.props.batchId : null;
    studentId = this.props.studentId ? this.props.studentId : null;
    
    console.log('this.state.langKey ',this.state.langKey );

    var url = '/api/FeeCollections/Get/' + this.state.langKey + '/' + shiftId + '/' + classId + '/' + sectionId + '/' + batchId + '/' + studentId;
    //console.log(url);
    //this.setState({ url });

    var table = $('#FeeCollectionGrid').DataTable();

    table.ajax.url(url).load();

  }

  renderModalBody(popupPageName){ 
    var modalBody ;
    const {feeCollectionId, batchId, sectionId, classId, shiftId, studentId, paymentModeOptions} = this.state;


    if(popupPageName == "details"){ 
      //this.setState({refreshGrid:true});
      modalBody = <Details 
        feeCollectionId={this.state.feeCollectionId}
        batchId={batchId}
        sectionId={sectionId}
        classId={classId}
        shiftId={shiftId}
        studentId={studentId}
        printFeeSlip={this.printFeeSlip}
        guid={guid()}
        paymentModeOptions={paymentModeOptions}
      /> //onSubmit={submit}
    }
    else if(popupPageName == "payments"){
      modalBody = <Payments feeCollectionId={this.state.feeCollectionId} /> //onSubmit={submit}
    }
    else if(popupPageName == "alerts"){
      modalBody = <Alerts feeCollectionId={this.state.feeCollectionId} /> //onSubmit={submit}
    }

    //console.log('mdal body ==>', popupPageName, feeCollectionId);
    return modalBody;
  }

  render() {
  
    const { handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { shiftOptions, classOptions, sectionOptions, feeCollectionId, studentOptions, batchOptions, feeStructureOptions } = this.state;    
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

                  <h2><Msg phrase="FeeCollections" /></h2>
                  
                </header>

                {/* widget div*/}
                <div>


                  {/* widget content */}
                  <div className="widget-body no-padding">

                    <div className="widget-body-toolbar">

                      <form id="form-Fee-Structure" className="smart-form"
                        onSubmit={handleSubmit((values) => { generateFeeCollections(values) })}> 

                        <fieldset>

                          <div className="row">

                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                              <Field
                                multi={false}
                                name="batchId"
                                label="BatchText"
                                validate={required}
                                options={batchOptions}
                                onBlur={this.handleBatchBlur}
                                component={RFReactSelect} />
                            </section>

                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                              <Field
                                multi={false}
                                name="shiftId"
                                label="ShiftText"
                                validate={required}
                                options={shiftOptions}
                                onBlur={this.handleShiftBlur}
                                component={RFReactSelect} />
                            </section>

                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                              <Field
                                multi={false}
                                name="classId"
                                label="ClassText"
                                validate={required}
                                options={classOptions}
                                onBlur={this.handleClassBlur}
                                component={RFReactSelect} />
                            </section>

                          </div>

                          <div className="row">

                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                              <Field
                                multi={false}
                                name="sectionId"
                                label="SectionText"
                                validate={required}
                                options={sectionOptions}
                                onBlur={this.handleSectionBlur}
                                component={RFReactSelect} />
                            </section>

                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                              <Field
                                multi={false}
                                name="studentId"
                                label="Students"
                                options={studentOptions}
                                component={RFReactSelect} />
                            </section>

                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">

                            </section>

                          </div>

                          <div className="row">

                            <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                              <Field
                                multi={true}
                                name="feeStructureId"
                                label="FeeTypes"
                                validate={required}
                                options={feeStructureOptions}
                                component={RFReactSelect} />
                            </section>

                          </div>

                        </fieldset>
                        
                        {(error !== undefined && <AlertMessage type="w"
                          icon="alert-danger" message={error} />)}

                        <footer>
                          <button type="button" onClick={this.handleSearchClick} className="btn btn-primary">
                            <Msg phrase="SearchText" />
                          </button> 
                          {/* <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary">
                            {feeCollectionId > 0 ? <Msg phrase="UndoChangesText" /> : <Msg phrase="ResetText" />}
                          </button> */}
                          <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
                            <Msg phrase="GenerateText" />
                          </button>
                        </footer>

                      </form>
                    </div> 
{/*  + '/null/null/null/null/null'   */}                 
                    <Loader isLoading={this.props.isLoading} />
                    {"show more cols.. like batch, class, etc.. Also add color coding for status "}
                    <br/>
                    {"on Payment: payment mode, populate table on template ... setup school & branch tables. Set print by etc etc "}
                    <Datatable id="FeeCollectionGrid"  
                      options={{
                        ajax: {"url": getWebApiRootUrl() +'/api/FeeCollections/Get/' + this.state.langKey , "dataSrc": ""},                       
                        columnDefs: [    
                          {
                            "type": "num",
                            "render": renderNumber, 
                            targets: [ 6, 7, 8, 9]
                          },
                          {
                            "type": "date",
                            "render": function (data, type, row) {
                              //return moment(data).format('Do MMM YYYY' || 'llll')
                              return renderDate(data);
                            },
                            "targets": 10
                          },
                          { 
                            // "render": function (data, type, row) {
                            //   var t = row.FeeStatusID == 1 ? "txt-color-redLight" : "txt-color-red";
                            //   var t2 = row.FeeStatusID == 1 ? "font-md" : "font-md";
                            //   return '<p class=' + t + ' ' + t2 + '>' + data + '</p>';
                            // },
                            "render": renderFeeStatus,
                            "targets": 11
                          },
                          {
                            // The `data` parameter refers to the data for the cell (defined by the
                            // `data` option, which defaults to the column being worked with, in
                            // this case `data: 0`.
                            "render": function (data, type, row) {
                              //console.log('row', row);
                              return '<a data-toggle="modal" data-page-name="details"'
                                + ' data-batch-id="'+ row.BatchID + '"'
                                + ' data-class-id="'+ row.ClassId + '"'
                                + ' data-section-id="'+ row.SectionId + '"'
                                + ' data-shift-id="'+ row.ShiftId + '"'
                                + ' data-student-id="'+ row.StudentId + '"'
                                + ' data-id="' + data + '" data-target="#feeCollectionPopup"><i id="edi" class=\"glyphicon glyphicon-edit\"></i><span class=\"sr-only\">EditText</span></a>';
                            },
                            "className": "dt-center",
                            "sorting": false,
                            "targets": 12
                          },
                          // {
                          //   "render": function (data, type, row) {
                          //     return '<a data-toggle="modal" data-page-name="payments" data-id="' + data + '" data-target="#feeCollectionPopup"><i id="pay" class=\"fa fa-money\"></i><span class=\"sr-only\">Payments</span></a>';
                          //   },
                          //   "className": "dt-center",
                          //   "sorting": false,
                          //   "targets": 13
                          // },
                          {
                            "render": function (data, type, row) {
                              return '<a data-toggle="modal" data-page-name="alerts" data-id="' + data + '" data-target="#feeCollectionPopup"><i id="alrt" class=\"fa fa-bell\"></i><span class=\"sr-only\">Alerts</span></a>';
                            },
                            "className": "dt-center",
                            "sorting": false,
                            "targets": 13
                          }
                          , {
                            "render": function (data, type, row) {
                              return '<a id="dele" data-tid="' + data + '"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Delete</span></a>';
                            }.bind(self),
                            "className": "dt-center",
                            "sorting": false,
                            "targets": 14
                          }
                        ],
                        columns: [ 
                          {data: "FeeCollectionID"}, 
                          {data: "ShiftName"},
                          {data: "ClassName"},
                          {data: "SectionName"},
                          {data: "RollNo"},
                          {data: "FullName"},
                          // {data: "FullNameAr"},      
                          {data: "TotalFee"}, 
                          {data: "TotalPaid"},  
                          {data: "Balance"},   
                          {data: "TotalDueAmountAfterAddDisc"},  
                          {data: "DueDate"}, 
                          {data: "FeeStatusName"},
                          {data: "FeeCollectionID"},
                          // {data: "FeeCollectionID"},
                          {data: "FeeCollectionID"},
                          {data: "FeeCollectionID"}
                        ],
                        buttons: [
                          'copy', 'excel', 'pdf'
                        ]
                      }}
                      paginationLength={true}  
                      className="table table-striped table-bordered table-hover"
                      width="100%">
                      <thead>
                      <tr>
                        <th><Msg phrase="IDText"/></th>
                        <th><Msg phrase="ShiftText"/></th>
                        <th><Msg phrase="ClassText"/></th>
                        <th><Msg phrase="SectionText"/></th>
                        <th><Msg phrase="RollNoText"/></th>
                        <th><Msg phrase="FullNameText"/></th>
                        {/* <th><Msg phrase="FullNameArText"/></th> */}
                        <th><Msg phrase="TotalFeeText"/></th>   
                        <th><Msg phrase="TotalPaidText"/></th>
                        <th><Msg phrase="BalanceText"/></th>
                        {/* <th><Msg phrase="TotalDueAmountAfterAdditionalDiscountText"/></th>  */}
                        <th><Msg phrase="TotalDueAmountText"/></th>                        
                        <th><Msg phrase="DueDateText"/></th>
                        <th><Msg phrase="FeeStatusNameText"/></th>   
                        <th></th>
                        {/* <th></th> */}
                        <th></th>
                        <th></th>
                      </tr>
                      </thead>
                    </Datatable>


                  </div>
                  {/* end widget content */}

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
        <input id="paymentId" type="text"></input>

        <div className="modal fade" id="feeCollectionPopup" tabIndex="-1" role="dialog"
          data-backdrop="static" data-keyboard="false"
          aria-labelledby="feeCollectionPopupLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg-xl">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title" id="feeCollectionPopupLabel">
                  {this.state.pageName =='details' ? <Msg phrase="FeeDetailsText" /> : <Msg phrase="AlertText" />}
                </h4>
              </div>
              <div className="modal-body">
                {
                  this.renderModalBody(this.state.pageName)
                }
                {/* { this.state.feeTypeId > 0 ?                     
                  <Details 
                    FeeTypeID={this.state.feeTypeId}  
                    onSubmit={submit} />
                  : <FeeCollectionForm 
                      FeeTypeID={this.state.feeTypeId}  
                      onSubmit={submit} />
                } */}
              </div>
            </div>
            {/* /.modal-content */}
          </div>
          {/* /.modal-dialog */}
        </div>
        {/* /.modal */}

        <div id="reportContainer"></div>
        {/* <HtmlRender html={this.state.feePaymentSlipTemplate}/> */}

        {/* <div id="content11" className="width-400-px" >

          <div  className="row">
            <div className="col-md-9">
              <h4 className="semi-bold">Rogers, Inc.</h4>
              <address>
                <strong>Mr. Simon Hedger</strong>
                <br />
                342 Mirlington Road,
                                            <br />
                Calfornia, CA 431464
                                            <br />
                <abbr title="Phone">P:</abbr> (467) 143-4317
                                        </address>
            </div>
            <div className="col-md-3">
              <div>
                <div>
                  <strong>INVOICE NO :</strong>
                  <span className="pull-right"> #AA-454-4113-00 </span>
                </div>
              </div>
              <div>
                <div className="font-md">
                  <strong>INVOICE DATE :</strong>
                  <span className="pull-right"> <i className="fa fa-calendar"></i> 15/02/13 </span>
                </div>
              </div>
              <br />
              <div className="well well-sm  bg-color-darken txt-color-white no-border">
                <div className="fa-lg">
                  Total Due :
                                                <span className="pull-right"> 4,972 USD** </span>
                </div>
              </div>
              <br />
              <br />
            </div>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="text-center">QTY</th>
                <th>ITEM</th>
                <th>DESCRIPTION</th>
                <th>PRICE</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center"><strong>1</strong></td>
                <td><a href="#">Print and Web Logo Design</a></td>
                <td>Perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam xplicabo.</td>
                <td>$1,300.00</td>
                <td>$1,300.00</td>
              </tr>
              <tr>
                <td className="text-center"><strong>1</strong></td>
                <td><a href="#">SEO Management</a></td>
                <td>Sit voluptatem accusantium doloremque laudantium inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</td>
                <td>$1,400.00</td>
                <td>$1,400.00</td>
              </tr>
              <tr>
                <td className="text-center"><strong>1</strong></td>
                <td><a href="#">Backend Support and Upgrade</a></td>
                <td>Inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</td>
                <td>$1,700.00</td>
                <td>$1,700.00</td>
              </tr>
              <tr>
                <td colSpan="4">Total</td>
                <td><strong>$4,400.00</strong></td>
              </tr>
              <tr>
                <td colSpan="4">HST/GST</td>
                <td><strong>13%</strong></td>
              </tr>
            </tbody>
          </table>

        </div> */}

        {/* print popup modal start */}
        {/* <div className="modal fade" id="reportPopup" tabIndex="-1" role="dialog"
          data-backdrop="static" data-keyboard="false"
          aria-labelledby="reportPopupLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg-xl">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title" id="reportPopupLabel">
                  <Msg phrase="ReportText" />
                </h4>
              </div>
              <div className="modal-body">
                <iframe id="iframeReport" type="application/pdf"></iframe>
              </div>
            </div> 
          </div> 
        </div> */}
        {/* print popup modal end */} 


      </div>
    )
  }

}
const afterSubmit = function(result, dispatch) { 
  dispatch(reset('FeeCollectionsPage'));
}
 
FeeCollectionsPage =  reduxForm({
form: 'FeeCollectionsPage',  // a unique identifier for this form
onSubmitSuccess: afterSubmit,
keepDirtyOnReinitialize: false 
})(FeeCollectionsPage)

const selector = formValueSelector('FeeCollectionsPage') // <-- same as form name
FeeCollectionsPage = connect(
state => { 
  //const { shiftId111 } = selector(state, 'shiftId')
  return {
    shiftId: selector(state, 'shiftId'),
    classId: selector(state, 'classId'),
    sectionId: selector(state, 'sectionId'),
    studentId: selector(state, 'studentId'), 
    batchId: selector(state, 'batchId'), 
    //shiftId111
  }
}
)(FeeCollectionsPage)

export default FeeCollectionsPage;