import React from 'react'
import {reset} from 'redux-form';
import axios from 'axios';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import {connect} from 'react-redux'

import { Field, FieldArray, reduxForm, formValueSelector, getFormValues } from 'redux-form'
import {required, email, number} from '../../../../components/forms/validation/CustomValidation'
import Datatable from '../../../../components/tables/Datatable'

import {RFField, RFReactSelect, RFRadioButtonList, RFReactSelectSingle, RFLabel, RFDatePicker} from '../../../../components/ui'

import AlertMessage from '../../../../components/common/AlertMessage'
import Msg from '../../../../components/i18n/Msg'
import mapForCombo, {mapForRadioList, getLangKey, today, renderDate, getDateBackEndFormat, guid, instanceAxios, isYesClicked, isNoClicked} from '../../../../components/utils/functions'
import { submitFeePayment, removePayment, printFeeSlip} from './submit'

import StudentControl from '../Students/StudentControl'
import { config } from '../../../../config/config';
 
import validate from './validate'
import alert, {confirmation} from '../../../../components/utils/alerts'
import LanguageStore from '../../../../components/i18n/LanguageStore' 

class Details extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {     
      langKey: getLangKey(),
      paymentDate: today(),
      feeDueDetails: [],
      studentId: this.props.studentId,
      //paymentModeOptions: []
    }  
    // this.handleFeeTypeBlur = this.handleFeeTypeBlur.bind(this);
    // this.handleFeeBlur = this.handleFeeBlur.bind(this);
    // this.handleDiscountRateBlur = this.handleDiscountRateBlur.bind(this);
    this.handleAdditionalDiscountBlur = this.handleAdditionalDiscountBlur.bind(this);
    this.initializeFeeDues = this.initializeFeeDues.bind(this);
  }

  componentDidMount() {

    // this.props.initialize(initData);
    //this.props.change("feeDiscountTypeId", 1);

    this.initializeFeeDues(this.state.studentId);

    // instanceAxios.get('/api/lookup/paymentModes/')
    //   .then(res => {

    //     console.log('/api/lookup/paymentModes/', res.data);

    //     const paymentModeOptions = mapForCombo(res.data);
    //     this.setState({ paymentModeOptions });
    //   });

    // var url = '/api/FeeCollections/FeePaymentDetailsByStudentID/' + this.state.langKey + '/' + this.state.studentId;     
    // //this.setState({ url });
    // var table = $('#feePaymentDetailsGrid').DataTable();
    // table.ajax.url(url).load();

    $('#feePaymentDetailsGrid').on('click', 'td', function (event) {

      //var thisElement = $('#feePaymentDetailsGrid td');

      console.log('???? fix the print and delete thisElement -- ', $(this).find('#dele').length, $(this).find('#prnt').length );
      console.log('test ==> ', $(this).find('#dele').data('tid'),  $(this).find('#prnt').data('tid'))

      if ($(this).find('#dele').length > 0) {
        var id = $(this).find('#dele').data('tid');
        removePayment(id, $(this));
      }
      else if ($(this).find('#prnt').length > 0) {
        var id = $(this).find('#prnt').data('tid');

        console.log('print slip from popup -- ', id)

        printFeeSlip('', id);
      }

    });

    console.log('componentDidMount --> Details');
  }

  initializeFeeDues(studentId) {

    //console.log('initializeFeeDues -- this.state.studentId ', this.state.studentId);

    instanceAxios.get('/api/FeeCollections/FeeDueDetailsByStudentID/' + this.state.langKey + '/' + studentId)
      .then(res => {
        if (res.data) {
          //console.log('exists..');
          let feeDueDetails = [];

          res.data.map(function (item, index) {
            feeDueDetails.push({
              "feeCollectionAgingID": item.FeeCollectionAgingID,
              "feeCollectionId": item.FeeCollectionID,
              // "studentId":item.StudentId,
              // "studentClassId":item.StudentClassId,
              //"feeTypeID":FeeTypeID,
              "feeTypeName": item.FeeTypeName,
              "dueOn": item.DueOn != null ? moment(item.DueOn).format("MM/DD/YYYY") : "",
              "dueAmountBeforeAdditionalDiscount": item.DueAmountBeforeAdditionalDiscount,
              "additionalDiscount": item.AdditionalDiscount,
              "newAdditionalDiscount": item.NewAdditionalDiscount,
              "dueAmountAfterAddDisc": item.DueAmountAfterAddDisc,
              "outstandingAmount": item.OutstandingAmount,
              "totalPaidAmount": item.TotalPaidAmount,
              "paymentAmount": item.PaymentAmount,
              //"feePaymentStatusName":item.FeePaymentStatusName,
              "paymentDate": "",
              "paymentComments": "",
              //"paymentModeId":null,
              "feeCollectedBy": ""
            });


          });

          const initData = {
            "feeCollectionDetailId": 0,
            "paymentDate": today(),
            "feeDueDetails": feeDueDetails,
            "paymentModeId": null
          }

          this.props.initialize(initData);
          //this.setState({feeDueDetails})

          //console.log('this.state.feeDueDetails', initData.feeDueDetails, this.state.feeDueDetails);
          // instanceAxios.get('/api/lookup/paymentModes/')
          //   .then(res => {

          //     //console.log('/api/lookup/paymentModes/', res.data);

          //     const paymentModeOptions = mapForCombo(res.data);
          //     this.setState({ paymentModeOptions });
          //   });

          var url = '/api/FeeCollections/FeePaymentDetailsByStudentID/' + this.state.langKey + '/' + studentId;
          //console.log(url);
          //this.setState({ url });

          var table = $('#feePaymentDetailsGrid').DataTable();
          table.ajax.url(url).load();

        }
        else {
          // show error message, there is some this went wrong 
        }

      });

  }

  shouldComponentUpdate(nextProps, nextState) {

    // const { batchId, sectionId, classId, shiftId, studentId } = this.props;
    // const { nbatchId, nsectionId, nclassId, nshiftId, nstudentId } = nextProps;

    //console.log('shouldComponentUpdate --> FeeCollection Details', this.state.studentId != nextState.nstudentId, nextProps, nextState);

    // if (this.state.studentId != nextState.studentId && nextState.studentId) { 
    //   console.log('aaa');
    //   this.initializeFeeDues(nextState.studentId);
    // }
    //else 
    if (this.props.guid != nextProps.guid || (this.props.studentId != nextProps.studentId && nextProps.studentId)) { 
      console.log('aaa aaa');
      this.initializeFeeDues(nextProps.studentId);
    }

    //return this.state.studentId != nextState.studentId || this.props.studentId != nextProps.studentId;
    console.log('guid ==> ', this.props.guid, nextProps.guid,  this.props.guid != nextProps.guid )
    console.log('nextState.studentId   nextProps.studentId', nextState.studentId, nextProps.studentId)
    return this.props.guid != nextProps.guid;
  }

  handleAdditionalDiscountBlur(index, event) {

    //console.log('handleAdditionalDiscountBlur(obj, value) == ', index, event, this.state.feeDueDetails[index].additionalDiscount);
    //var value = event.target.value;


    // if (value) {
    //   axios.get('api/TeachersSubjects/All/' + value)
    //     .then(res => {

    //       //console.log('subjectOptions2D 1 -- ', subjectOptions2D);

    //       let subjectOptions2D = this.state.subjectOptions2D;
    //       const subjectOptions = mapForCombo(res.data);
    //       subjectOptions2D[index] = subjectOptions;
    //       this.setState({ subjectOptions2D });

    //       //console.log('subjectOptions2D 2 -- ', subjectOptions2D);
    //     });
    // }
    // else {

    //   let subjectOptions2D = this.state.subjectOptions2D;
    //   subjectOptions2D[index] = [];
    //   this.setState({ subjectOptions2D });
    //   //this.setState({ subjectOptions2D: [] });
    // }

  }
 
  render() {
    const { feeCollectionId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props;
    const { batchId, sectionId, classId, shiftId, studentId, guid, paymentModeOptions} = this.props;
    const { langKey } = this.state;

    return (
      <form id="form-Fee-Aging" className="smart-form"
        onSubmit={handleSubmit((values) => { submitFeePayment(values, $('#dueFeeId').val()) })}>

        <StudentControl batchId={batchId}
          sectionId={sectionId}
          classId={classId}
          shiftId={shiftId}
          studentId={studentId} />

        <br/>
        <fieldset>
          <div className="tabbable tabs">

            <ul className="nav nav-tabs">
              <li id="tabFeeDetailsLink" className="active">
                <a id="tabAddFeeDetails" data-toggle="tab" href="#A1P1A"><Msg phrase="FeeOutstandingText" /></a>
              </li>
              <li id="tabPaymentHistoryLink">
                <a id="tabPaymentHistory" data-toggle="tab" href="#B1P1B"><Msg phrase="PaymentHistoryText" /></a>
              </li>
            </ul>
            {/* guid = {guid} */}
            <div className="tab-content">
              <div className="tab-pane active" id="A1P1A">

                <div className="row">
                  <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                     
                  </section>
                </div>

                <div className="row">
                  <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                    <Field name="paymentDate" label="PaymentDateText" 
                      component={RFDatePicker} />
                  </section>

                  <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                    <Field
                      multi={false}
                      name="paymentModeId"
                      label="PaymentModeText" 
                      options={paymentModeOptions} 
                      component={RFReactSelect} />
                  </section>

                  <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                    <Field name="feeCollectedBy" labelClassName="input"
                      validate={required} component={RFField}
                      maxLength="50" type="text" 
                      label="FeeCollectedByText" />
                  </section>
                  
                </div>

                <div className="row">
                  <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                    <Field name="paymentComments" labelClassName="input"
                      labelIconClassName="icon-append fa fa-file-text-o"
                      component={RFField}
                      maxLength="150" type="text"
                      label="FeePaymentCommentsText"
                      placeholder="P" />
                  </section>
                </div>  

                <div className="row">
                  <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                    <FieldArray name="feeDueDetails" component={renderFeeDueDetails} />
                  </section>
                </div>

              </div>
              <div className="tab-pane table-responsive" id="B1P1B">
              
                <Datatable id="feePaymentDetailsGrid"
                  options={{
                    ajax: { "url": getWebApiRootUrl() +'/api/FeeCollections/FeePaymentDetailsByStudentID/' + langKey + '/' + studentId, "dataSrc": "" },
                    columnDefs: [
                      {
                        "type": "date",
                        "render": function (data, type, row) { 
                          return renderDate(data);
                        },
                        "targets": 2
                      },
                      {
                        "render": function (data, type, row) {
                          return '<a id="prnt" data-tid="' + data + '"><i class=\"glyphicon glyphicon-print\"></i><span class=\"sr-only\">Print</span></a>';
                        }.bind(self),
                        "className": "dt-center",
                        "sorting": false,
                        "targets": 6
                      },
                      {
                        "render": function (data, type, row) {
                          return '<a id="dele" data-tid="' + data + '"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Edit</span></a>';
                        }.bind(self),
                        "className": "dt-center",
                        "sorting": false,
                        "targets": 7
                      }
                    ],
                    columns: [
                      { data: "Code" },
                      { data: "FeeCollectedBy" },
                      { data: "PaidOn" },
                      { data: "TotalPaidAmount" },
                      { data: "Balance" },
                      { data: "Comments" },
                      { data: "FeePaymentID" },
                      { data: "FeePaymentID" }
                    ],
                    // buttons: [
                    //   'copy', 'excel', 'pdf'
                    // ]
                  }}
                  paginationLength={true}
                  className="table table-striped table-bordered table-hover"
                  width="100%">
                  <thead>
                    <tr>
                      <th data-hide="mobile-p"><Msg phrase="CodeText" /></th>
                      <th data-class="expand"><Msg phrase="FeeCollectedByText" /></th>
                      <th data-hide="mobile-p"><Msg phrase="PaidOnText" /></th>
                      <th data-hide="mobile-p"><Msg phrase="TotalPaidAmountText" /></th>
                      <th data-hide="mobile-p"><Msg phrase="BalanceText" /></th>
                      <th data-hide="mobile-p"><Msg phrase="CommentsText" /></th>
                      <th data-hide="mobile-p"></th>
                      <th data-hide="mobile-p"></th>
                    </tr>
                  </thead>
                </Datatable>

              </div>
            </div>
          </div>
        </fieldset>
        
                <input id="dueFeeId" type="hidden"></input>
        {(error !== undefined && <AlertMessage type="w"
          icon="alert-danger" message={error} />)}

        <footer>
          <button type="button" disabled={submitting} onClick={reset} className="btn btn-primary">
            {feeCollectionId > 0 ? <Msg phrase="UndoChangesText" /> : <Msg phrase="ResetText" />}
          </button>
          <button type="submit" disabled={submitting} className="btn btn-primary">
            <Msg phrase="SaveText" />
          </button>
        </footer>

      </form>
    )
  }
}
       
const afterSubmit = function(result, dispatch) { 
    //console.log('result = ', result);
    dispatch(reset('Details'));
}


//export default 
Details = reduxForm({
  form: 'Details',  // a unique identifier for this form
  validate,
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(Details)

// const selector = formValueSelector('Details') // <-- same as form name
// Details = connect(
//   state => { 
//     const { fee, discountOption, discountRate, discountValue } = selector(state, 'fee', 'discountOption', 'discountRate', 'discountValue')
//     return {
//       discountValue: discountOption=='P'? fee * (discountRate||0) / 100 : discountRate,
//       netFee: fee - (discountOption=='P'? fee * (discountRate||0) / 100 : discountRate)
//     }
//   }
// )(Details)

const myHandler = (index, fields) => {
  
  let messageText = LanguageStore.getData().phrases["DeleteConfirmationMessageText"]
    || 'Are you sure, you want to delete this record?';

  confirmation(messageText, function (ButtonPressed) {
    deleteRecord(ButtonPressed);
  });

}

function deleteRecord(ButtonPressed) {

  if (isYesClicked(ButtonPressed)) {
    LoaderVisibility(true);

    $('#dueFeeId').val($('#dueFeeId').val() + ',' + fields.get(index).feeCollectionAgingID);
  
    fields.remove(index);
    console.log('#dueFeeId', $('#dueFeeId').val())

  }
}

const renderFeeDueDetails = ({ fields, meta: { touched, error } }) => (  
  <div >         
    <div className="table-responsive"> 
      {(error && <span><em className="invalid"><h5><Msg phrase={error}/></h5></em></span>)}
      <table className="table table-striped table-bordered table-hover table-responsive">
        <thead>
          <tr>
            <th>
              <Msg phrase="FeeTypeText" />
            </th>
            <th>
              <Msg phrase="DueDateText" />
            </th>
            {/* <th>
              <Msg phrase="DueAmountBeforeAdditionalDiscountText" />
            </th> */}
            <th>
              <Msg phrase="AdditionalDiscountText" />
              <Msg phrase="OldNewText" />
            </th>
            <th>
              <Msg phrase="TotalDueAmountAfterAdditionalDiscountText" />
            </th>
            <th>
              <Msg phrase="OutstandingAmountText" />
            </th>  
            <th>
              <Msg phrase="TotalPaidAmountText" />
            </th>
            {/* <th>
              <Msg phrase="FeePaymentStatusText" />
            </th> */}
            <th>

            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((period, index) =>
            <tr key={period}>
              <td>
                <Field name={`${period}.feeTypeName`}
                  component={RFLabel}
                  className="width-150-px"
                  disabled={true}
                  type="label" />
              </td>
              <td>
                <Field name={`${period}.dueOn`}
                  component={RFLabel}
                  labelClassName="width-50-px"
                  disabled={true}
                  label=""
                  type="label" />
              </td>
              {/* <td>
                <Field name={`${period}.dueAmountBeforeAdditionalDiscount`}
                  component={RFLabel}
                  className="width-50-px"
                  disabled={true}
                  type="label" />
              </td> */}
              <td>
                <Field name={`${period}.additionalDiscount`}
                  component={RFLabel}
                  className="width-50-px"
                  disabled={true}
                  type="text" />
                <Field name={`${period}.newAdditionalDiscount`} labelClassName="input remove-col-padding "
                  labelIconClassName="" 
                  validate={[number]}
                  component={RFField}
                  // onBlur={(e) => this.handleAdditionalDiscountBlur(index, `${period}.additionalDiscount`)} 
                  type="text" maxLength="5" />
              </td>
              <td>
                <Field name={`${period}.dueAmountAfterAddDisc`}
                  component={RFLabel}
                  className="width-50-px"
                  disabled={true}
                  type="text" />
              </td>                  
              <td>
                <Field name={`${period}.outstandingAmount`}
                  component={RFLabel}
                  className="width-50-px"
                  disabled={true}
                  type="text" /> 
              </td>
              <td>
                <Field name={`${period}.paymentAmount`} labelClassName="input remove-col-padding "
                  labelIconClassName=""
                  validate={[number]}
                  component={RFField} 
                  type="text" /> 
              </td>
              {/* <td>
                <Field name={`${period}.feePaymentStatusName`}
                  component="input"
                  className="width-50-px"
                  disabled={true}
                  type="text" />
              </td> */}
              <td>
                {/* <a onClick={() => fields.remove(index)}><i className="glyphicon glyphicon-trash"></i></a> */}
                {(fields.get(index).totalPaidAmount<=0)? <a onClick={(e) => myHandler(index, fields)}><i className="glyphicon glyphicon-trash"></i></a> :""}
                
              </td>
            </tr>
          )}

        </tbody>
      </table>
      
    </div>
  </div>
)

export default Details; 