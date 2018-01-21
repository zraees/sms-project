/**
 * Created by griga on 11/30/15.
 */

import React from 'react'
import axios from 'axios' 
import {SubmissionError, reset} from 'redux-form'
import {connect} from 'react-redux' 
import moment from 'moment'
import html2canvas from 'html2canvas'
import jsPDF from 'jsPDF'
import converter from 'number-to-words'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'

import {Field, FieldArray, reduxForm, formValueSelector, getFormValues} from 'redux-form'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import JarvisWidget from '../../../../components/widgets/JarvisWidget'
import Datatable from '../../../../components/tables/Datatable'
import Msg from '../../../../components/i18n/Msg'

import Moment from '../../../../components/utils/Moment'

import FeeCollectionForm from './FeeCollectionForm'
import Details from './Details'
import Payments from './Payments'
import Alerts from './Alerts'

import mapForCombo, {renderDate} from '../../../../components/utils/functions'

import {required, number}  from '../../../../components/forms/validation/CustomValidation' 
import {RFField, RFReactSelect, RFLabel} from '../../../../components/ui'
import submit, {remove, generateFeeCollections} from './submit' 

import HtmlRender from '../../../../components/utils/HtmlRender'

const feePaymentSlipTemplate = require('html-loader!./FeePaymentSlip-1.html');

class FeeCollectionsPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      feeCollectionId: 0,
      shiftOptions: [],
      classOptions: [],
      sectionOptions: [],
      studentOptions: [],
      batchOptions: [],
      feeStructureOptions: [],
      //url: '/api/FeeCollections/null/null/null/null/null',
      pageName: '',
      batchId: 0,
      sectionId: 0,
      classId: 0,
      shiftId: 0,
      studentId: 0,
      feePaymentSlipTemplate: feePaymentSlipTemplate,
      //gridData: [{"$id":"1","FeeStructureID":1,"ClassID":3,"ClassName":"II","ClassNameAr":"II","FeeTypeCode":"0004","FeeTypeName":"abc 2","FeeTypeNameAr":"ed ed","FeeCycleID":1,"FeeCycleName":"Monthly","FeeCycleNameAr":"شهريا\r\n","FeeDueOnFrequencyID":1,"FeeDueOnFrequencyName":"Monthly","FeeDueOnFrequencyNameAr":"شهريا\r\n","FeeDueOnIntervalID":1,"FeeDueOnIntervalName":"First of every month","FeeDueOnIntervalNameAr":"أولا من كل شهر","FeeDiscountTypeID":null,"FeeDiscountTypeName":"","FeeDiscountTypeNameAr":"","DiscountOption":"P","DiscountOptionText":"%","DiscountRate":0.00,"DiscountValue":0.00,"Fee":5000.00,"NetFee":5000.00},{"$id":"2","FeeStructureID":3,"ClassID":4,"ClassName":"III","ClassNameAr":"III","FeeTypeCode":"0005","FeeTypeName":"abc","FeeTypeNameAr":"aaaa","FeeCycleID":2,"FeeCycleName":"Yearly","FeeCycleNameAr":"سنوي","FeeDueOnFrequencyID":3,"FeeDueOnFrequencyName":"Every 2 Months","FeeDueOnFrequencyNameAr":"كل شهرين\r\n","FeeDueOnIntervalID":4,"FeeDueOnIntervalName":"Till tenth of every month","FeeDueOnIntervalNameAr":"حتى عشر من كل شهر\r\n","FeeDiscountTypeID":1,"FeeDiscountTypeName":"Session Discount","FeeDiscountTypeNameAr":"خصم الجلسة\r\n","DiscountOption":"P","DiscountOptionText":"%","DiscountRate":25.00,"DiscountValue":3750.00,"Fee":15000.00,"NetFee":11250.00},{"$id":"3","FeeStructureID":1002,"ClassID":4,"ClassName":"III","ClassNameAr":"III","FeeTypeCode":"0008","FeeTypeName":"tution fee","FeeTypeNameAr":"edc","FeeCycleID":2,"FeeCycleName":"Yearly","FeeCycleNameAr":"سنوي","FeeDueOnFrequencyID":4,"FeeDueOnFrequencyName":"Quarterly","FeeDueOnFrequencyNameAr":"فصليا","FeeDueOnIntervalID":5,"FeeDueOnIntervalName":"Till tenth of every month","FeeDueOnIntervalNameAr":"حتى عشر من كل شهر\r\n","FeeDiscountTypeID":1,"FeeDiscountTypeName":"Session Discount","FeeDiscountTypeNameAr":"خصم الجلسة\r\n","DiscountOption":"P","DiscountOptionText":"%","DiscountRate":5.00,"DiscountValue":550.00,"Fee":11000.00,"NetFee":10450.00}]
    }
    this.handleShiftBlur = this.handleShiftBlur.bind(this);
    this.handleClassBlur = this.handleClassBlur.bind(this);
    this.handleSectionBlur = this.handleSectionBlur.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleBatchBlur = this.handleBatchBlur.bind(this);
    this.renderModalBody = this.renderModalBody.bind(this);
    
    this.handlePrintClick = this.handlePrintClick.bind(this);
    this.printFeeSlip = this.printFeeSlip.bind(this);
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

    axios.get('/api/lookup/shifts/')
      .then(res => {
        const shiftOptions = mapForCombo(res.data);
        this.setState({ shiftOptions });
      });

    axios.get('/api/lookup/batches/')
      .then(res => {
        const batchOptions = mapForCombo(res.data);
        this.setState({ batchOptions });
      });

    // axios.get('/api/FeeStructures/GetFeeTypes/')
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

      this.printFeeSlip($('#paymentId').val());

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
      axios.get('/api/GetClassesByShiftId/' + value)
        .then(res => {
          const classOptions = mapForCombo(res.data);
          this.setState({ classOptions });
        });

      // axios.get('/api/shifts/' + value)
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
      axios.get('/api/GetClassesByShiftIdClassId/' + this.props.shiftId + '/' + value)
        .then(res => {
          const sectionOptions = mapForCombo(res.data);
          this.setState({ sectionOptions });
        });

      axios.get('/api/FeeStructures/GetFeeTypes/'+value)
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
      axios.get('/api/GetStudentsByShiftIdClassIdSectionId/' + this.props.shiftId + '/' + this.props.classId + '/' + value + '/'+ this.props.batchId)
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
      axios.get('/api/GetStudentsByShiftIdClassIdSectionId/' + this.props.shiftId + '/' + this.props.classId + '/' + this.props.sectionId + '/' + value)
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
    
    var url = '/api/FeeCollections/' + shiftId + '/' + classId + '/' + sectionId + '/' + batchId + '/' + studentId;
    //console.log(url);
    //this.setState({ url });

    var table = $('#FeeCollectionGrid').DataTable();

    table.ajax.url(url).load();

  }

  printFeeSlip(feePaymentId) {

    console.log('feePaymentId ==> ', feePaymentId, converter.toWords(4434));

    if (feePaymentId) {

      var htmlContent = this.state.feePaymentSlipTemplate; 

      htmlContent = htmlContent.replace('$PaymentCode$', feePaymentId);
      htmlContent = htmlContent.replace('$AmountInWords$', converter.toWords(4434));
      

      this.setState({feePaymentSlipTemplate: htmlContent});

      $("#feePaymentSlip").removeClass('hide');
      html2canvas(document.getElementById("feePaymentSlip"), {
        logging: false
        , onclone: function (document) {
          console.log('onclone ..', document);
          //$("#feePaymentSlip").show();
        }
      }).then(function (canvas) {
        var img = canvas.toDataURL('image/png');
        //var doc = new jsPDF('p', 'cm',  [22, 29]);
        var doc = new jsPDF('p', 'pt', 'a4');
        doc.addImage(img, 'JPEG', 1, 1);
        //doc.save('test.pdf');

        //$('#reportPopup').modal('show');

        //var iframe = document.getElementById('iframeReport'); //document.createElement('iframe');
        //iframe.setAttribute('style', 'position:absolute;top:0;right:0;height:100%; width:100%');
        //document.body.appendChild(iframe);
        //iframe.src = doc.output('datauristring');  it takes too much time so open in new window option is suitable

        //good solution to open in new window
        window.open(doc.output('bloburl'), '_blank');
        //a.style.display = "none";
        //$("#feePaymentSlip").hide();
        $("#feePaymentSlip").addClass('hide');
      });

    }
  }

  handlePrintClick(obj, value) {
     
    LoaderVisibility(true);
    //console.log('handleSearchClick this.props.sectionID ', this.props.shiftId, this.props.sectionId);

    /*var pdf = new jsPDF('p', 'pt', 'letter');
    var canvas = pdf.canvas;
    canvas.width = 8.5 * 72;
    html2canvas(document.getElementById("content11"), {
        canvas:canvas,
        logging:false,
        onrendered: function(canvas) {
            var iframe = document.getElementById('iframeReport'); //document.createElement('iframe');
            iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:500px');
            //document.body.appendChild(iframe);
            iframe.src = pdf.output('datauristring');
           //var div = document.createElement('pre');
           //div.innerText=pdf.output();
           //document.body.appendChild(div);
        }
    });
    */


    /*
    var doc = new jsPDF();

    $('#reportPopup').modal('show');
    var iframe = document.getElementById('iframeReport'); //document.createElement('iframe');
    iframe.setAttribute('style', 'position:absolute;top:0;right:0;height:100%; width:100%');

    doc.fromHTML($("#feePaymentSlip").get(0), 20, 20, { 'width': 500 }, function (bla) {
      console.log('aaa');
    iframe.src = doc.output('datauristring');
    });
    //doc.save('test.pdf');
    */



    // var content = document.getElementById("feePaymentSlip").removeClass('hide');
    // console.log(content)
    //var a = document.getElementById("feePaymentSlip");
    //a.style.display = "block";

    var htmlContent = this.state.feePaymentSlipTemplate; 

    htmlContent = htmlContent.replace('$PaymentCode$', $('#paymentId').val());

    this.setState({feePaymentSlipTemplate: htmlContent});

    $("#feePaymentSlip").removeClass('hide');
    html2canvas(document.getElementById("feePaymentSlip"), {
      logging: false
      , onclone: function (document) {
        console.log('onclone ..', document);
        //$("#feePaymentSlip").show();
      }
    }).then(function (canvas) {
      var img = canvas.toDataURL('image/png');
      //var doc = new jsPDF('p', 'cm',  [22, 29]);
      var doc = new jsPDF('p', 'pt', 'a4');
      doc.addImage(img, 'JPEG', 1, 1);
      //doc.save('test.pdf');

      //$('#reportPopup').modal('show');

      //var iframe = document.getElementById('iframeReport'); //document.createElement('iframe');
      //iframe.setAttribute('style', 'position:absolute;top:0;right:0;height:100%; width:100%');
      //document.body.appendChild(iframe);
      //iframe.src = doc.output('datauristring');  it takes too much time so open in new window option is suitable

      //good solution to open in new window
      window.open(doc.output('bloburl'), '_blank');
      //a.style.display = "none";
      //$("#feePaymentSlip").hide();
      $("#feePaymentSlip").addClass('hide');
    });


    /*
    var pdf = new jsPDF('p', 'pt', 'letter');
        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.
        //source = $('#FeeCollectionGrid_wrapper')[0];

        // we support special element handlers. Register them with jQuery-style 
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors 
        // (class, of compound) at this time.
        // specialElementHandlers = {
        //     // element with id of "bypass" - jQuery style selector
        //     '#bypassme': function (element, renderer) {
        //         // true = "handled elsewhere, bypass text extraction"
        //         return true
        //     }
        // };
        // margins = {
        //     top: 80,
        //     bottom: 60,
        //     left: 40,
        //     width: 522
        // };
        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case

        pdf.fromHTML(
          document.getElementById("FeeCollectionGrid_wrapper"), // HTML string or DOM elem ref.
          40, // x coord
          80, { // y coord
                'width': 522, // max width of content on PDF
                'elementHandlers': {
                  // element with id of "bypass" - jQuery style selector
                  '#bypassme': function (element, renderer) {
                      // true = "handled elsewhere, bypass text extraction"
                      return true
                  }
              }
            },

            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF 
                //          this allow the insertion of new lines after html
                pdf.save('Test.pdf');
            }, {
              top: 80,
              bottom: 60,
              left: 40,
              width: 522
          }
        );
        */

    LoaderVisibility(false);
  }

  renderModalBody(popupPageName){ 
    var modalBody ;
    const {feeCollectionId, batchId, sectionId, classId, shiftId, studentId} = this.state;


    if(popupPageName == "details"){ 
      //this.setState({refreshGrid:true});
      modalBody = <Details 
        feeCollectionId={this.state.feeCollectionId}
        batchId={batchId}
        sectionId={sectionId}
        classId={classId}
        shiftId={shiftId}
        studentId={studentId}
      /> //onSubmit={submit}
    }
    else if(popupPageName == "payments"){
      modalBody = <Payments feeCollectionId={this.state.feeCollectionId} /> //onSubmit={submit}
    }
    else if(popupPageName == "alerts"){
      modalBody = <Alerts feeCollectionId={this.state.feeCollectionId} /> //onSubmit={submit}
    }

    console.log('mdal body ==>', popupPageName, feeCollectionId);
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
                          <button type="button" onClick={this.handlePrintClick} download className="btn btn-primary">
                            <Msg phrase="PrintText" />
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
                     
                    <Loader isLoading={this.props.isLoading} />
                    {"show more cols.. like batch, class, etc.. Also add color coding for status "}
                    <Datatable id="FeeCollectionGrid"  
                      options={{
                        ajax: {"url": '/api/FeeCollections/null/null/null/null/null', "dataSrc": ""},                       
                        columnDefs: [    
                          {
                            "type": "date",
                            "render": function (data, type, row) {
                              //return moment(data).format('Do MMM YYYY' || 'llll')
                              return renderDate(data);
                            },
                            "targets": 7
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
                            "targets": 9
                          },
                          {
                            "render": function (data, type, row) {
                              return '<a data-toggle="modal" data-page-name="payments" data-id="' + data + '" data-target="#feeCollectionPopup"><i id="pay" class=\"fa fa-money\"></i><span class=\"sr-only\">Payments</span></a>';
                            },
                            "className": "dt-center",
                            "sorting": false,
                            "targets": 10
                          },
                          {
                            "render": function (data, type, row) {
                              return '<a data-toggle="modal" data-page-name="alerts" data-id="' + data + '" data-target="#feeCollectionPopup"><i id="alrt" class=\"fa fa-bell\"></i><span class=\"sr-only\">Alerts</span></a>';
                            },
                            "className": "dt-center",
                            "sorting": false,
                            "targets": 11
                          }
                          , {
                            "render": function (data, type, row) {
                              return '<a id="dele" data-tid="' + data + '"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Delete</span></a>';
                            }.bind(self),
                            "className": "dt-center",
                            "sorting": false,
                            "targets": 12
                          }
                        ],
                        columns: [ 
                          {data: "FeeCollectionID"}, 
                          {data: "RollNo"},
                          {data: "FullName"},
                          {data: "FullNameAr"},      
                          {data: "TotalFee"}, 
                          {data: "TotalPaid"},    
                          {data: "TotalDueAmountAfterAddDisc"},  
                          {data: "DueDate"}, 
                          {data: "FeeStatusName"},
                          {data: "FeeCollectionID"},
                          {data: "FeeCollectionID"},
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
                        <th><Msg phrase="RollNoText"/></th>
                        <th><Msg phrase="FullNameText"/></th>
                        <th><Msg phrase="FullNameArText"/></th>
                        <th><Msg phrase="TotalFeeText"/></th>   
                        <th><Msg phrase="TotalPaidText"/></th>
                        <th><Msg phrase="TotalDueAmountAfterAdditionalDiscountText"/></th> 
                        <th><Msg phrase="DueDateText"/></th>
                        <th><Msg phrase="FeeStatusNameText"/></th>   
                        <th></th>
                        <th></th>
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


        <HtmlRender html={this.state.feePaymentSlipTemplate}/>

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
        <div className="modal fade" id="reportPopup" tabIndex="-1" role="dialog"
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
        </div>
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