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
import mapForCombo, {mapForRadioList, getLangKey, renderDate} from '../../../../components/utils/functions'
import { submitFeePayment } from './submit'

import StudentControl from '../Students/StudentControl'
import { config } from '../../../../config/config';
 
class Details extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {     
      langKey: getLangKey(),
      feeDueDetails: []
    }  
    // this.handleFeeTypeBlur = this.handleFeeTypeBlur.bind(this);
    // this.handleFeeBlur = this.handleFeeBlur.bind(this);
    // this.handleDiscountRateBlur = this.handleDiscountRateBlur.bind(this);
    this.handleAdditionalDiscountBlur = this.handleAdditionalDiscountBlur.bind(this);
  }
  
  componentDidMount(){

    axios.get( '/api/FeeDueDetailsByStudentID/' + this.state.langKey + '/' + this.props.studentId)
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
              "feeTypeName":item.FeeTypeName,
              "dueOn":item.DueOn != null ? moment(item.DueOn).format("MM/DD/YYYY") : "",
              "dueAmountBeforeAdditionalDiscount":item.DueAmountBeforeAdditionalDiscount,
              "additionalDiscount":item.AdditionalDiscount,
              "dueAmount":item.DueAmount,
              "outstandingAmount": item.OutstandingAmount,
              "totalPaidAmount":item.TotalPaidAmount,
              "feePaymentStatusName":item.FeePaymentStatusName
            });

            
          });

          const initData = {
            "feeCollectionDetailId": 0,
            "feeDueDetails": feeDueDetails
          } 

          this.props.initialize(initData); 
          //this.setState({feeDueDetails})
          
          //console.log('this.state.feeDueDetails', initData.feeDueDetails, this.state.feeDueDetails);

        }
        else {
          // show error message, there is some this went wrong 
        }

      });   
    // this.props.initialize(initData);
    //this.props.change("feeDiscountTypeId", 1);

    // var url = '/api/FeeDueDetailsByStudentID/' + this.state.langKey + '/' + this.props.studentId;
    // console.log(url);
    // var table = $('#feeDueDetailsGrid').DataTable();
    // table.ajax.url(url).load();

    console.log('componentDidMount --> Details');
  }

  // componentWillMount() {
  //   console.log('componentWillMount --> Details');
 
  // }
  
  
  handleAdditionalDiscountBlur(index, event) {

    console.log('handleAdditionalDiscountBlur(obj, value) == ', index, event, this.state.feeDueDetails[index].additionalDiscount);
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
    const { batchId, sectionId, classId, shiftId, studentId } = this.props;
    const { langKey } = this.state;

    return (
      <form id="form-Fee-Aging" className="smart-form"
        onSubmit={handleSubmit((values) => { submitFeePayment(values) })}>

        {studentId}

        <StudentControl batchId={batchId}
          sectionId={sectionId}
          classId={classId}
          shiftId={shiftId}
          studentId={studentId} />

        <div className="row">
          <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">

          </section>
        </div>

        <fieldset>
          <div className="tabbable tabs">

            <ul className="nav nav-tabs">
              <li id="tabFeeDetailsLink" className="active">
                <a id="tabAddFeeDetails" data-toggle="tab" href="#A1P1A"><Msg phrase="FeeDetailsText" /></a>
              </li>
              <li id="tabPaymentHistoryLink">
                <a id="tabPaymentHistory" data-toggle="tab" href="#B1P1B"><Msg phrase="PaymentHistoryText" /></a>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane active" id="A1P1A">

                <FieldArray name="feeDueDetails" component={renderFeeDueDetails} />

                {/* <div className="table-responsive">

                  <Datatable id="feeDueDetailsGrid"
                    options={{
                      ajax: { "url": '/api/FeeDueDetailsByStudentID/' + langKey + '/' + studentId, "dataSrc": "" },
                      columnDefs: [
                        {
                          "type": "date",
                          "render": function (data, type, row) {
                            return renderDate(data);
                          },
                          "targets": 1
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
                        { data: "FeeTypeName" },
                        { data: "DueOn" },
                        { data: "DueAmountBeforeAdditionalDiscount" },
                        { data: "AdditionalDiscount" },
                        { data: "DueAmount" },
                        { data: "TotalPaidAmount" },
                        { data: "FeePaymentStatusName" },
                        { data: "FeeCollectionAgingID" }
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
                        <th data-hide="mobile-p"><Msg phrase="FeeTypeText" /></th>
                        <th data-class="expand"><Msg phrase="DueDateText" /></th>
                        <th data-hide="mobile-p"><Msg phrase="DueAmountBeforeAdditionalDiscountText" /></th>
                        <th data-hide="mobile-p"><Msg phrase="AdditionalDiscountText" /></th>
                        <th data-hide="mobile-p"><Msg phrase="TotalDueAmountText" /></th>
                        <th data-hide="mobile-p"><Msg phrase="TotalPaidAmountText" /></th>
                        <th data-hide="mobile-p"><Msg phrase="FeePaymentStatusText" /></th>
                        <th data-hide="mobile-p"></th>
                      </tr>
                    </thead>
                  </Datatable>

                </div> */}

              </div>
              <div className="tab-pane table-responsive" id="B1P1B">

                {/* <Datatable id="parentsGrid"
                  options={{
                    ajax: { "url": '/api/FeeDueDetailsByStudentID/' + studentId, "dataSrc": "" },
                    columnDefs: [
                      {
                        "render": function (data, type, row) {
                          return '<a id="dele" data-tid="' + data + '"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Edit</span></a>';
                        }.bind(self),
                        "className": "dt-center",
                        "sorting": false,
                        "targets": 6
                      }
                    ],
                    columns: [
                      { data: "FirstName" },
                      { data: "SurName" },
                      { data: "parentType" },
                      { data: "SchoolName" },
                      { data: "ClassName" },
                      { data: "SectionName" },
                      { data: "FeeCollectionAgingID" }
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
                      <th data-hide="mobile-p"><Msg phrase="FirstNameText" /></th>
                      <th data-class="expand"><Msg phrase="SurNameText" /></th>
                      <th data-hide="mobile-p"><Msg phrase="parentTypeInOurSchoolText" /></th>
                      <th data-hide="mobile-p"><Msg phrase="SchoolNameText" /></th>
                      <th data-hide="mobile-p"><Msg phrase="ClassText" /></th>
                      <th data-hide="mobile-p"><Msg phrase="SectionText" /></th>
                      <th data-hide="mobile-p"></th>
                    </tr>
                  </thead>
                </Datatable> */}

              </div>
            </div>
          </div>
        </fieldset>

        {(error !== undefined && <AlertMessage type="w"
          icon="alert-danger" message={error} />)}

        <footer>
          <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary">
            {feeCollectionId > 0 ? <Msg phrase="UndoChangesText" /> : <Msg phrase="ResetText" />}
          </button>
          <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
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
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(Details)

const selector = formValueSelector('Details') // <-- same as form name
Details = connect(
  state => { 
    const { fee, discountOption, discountRate, discountValue } = selector(state, 'fee', 'discountOption', 'discountRate', 'discountValue')
    return {
      discountValue: discountOption=='P'? fee * (discountRate||0) / 100 : discountRate,
      netFee: fee - (discountOption=='P'? fee * (discountRate||0) / 100 : discountRate)
    }
  }
)(Details)


const renderFeeDueDetails = ({ fields, meta: { touched, error } }) => (
  <div >         
    <div className="table-responsive"> 

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
            </th>
            <th>
              <Msg phrase="TotalDueAmountText" />
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
                {/* <Field name={`${period}.additionalDiscount`}
                  component="input"
                  className="width-50-px"
                  disabled={true}
                  type="text" /> */}
                <Field name={`${period}.additionalDiscount`} labelClassName="input remove-col-padding "
                  labelIconClassName=""
                  validate={[number]}
                  component={RFField}
                  // onBlur={(e) => this.handleAdditionalDiscountBlur(index, `${period}.additionalDiscount`)} 
                  type="text" maxLength="5" />
              </td>
              <td>
                <Field name={`${period}.dueAmount`}
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
                <Field name={`${period}.totalPaidAmount`} labelClassName="input remove-col-padding "
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
                <a onClick={() => fields.remove(index)}><i className="glyphicon glyphicon-trash"></i></a>

              </td>
            </tr>
          )}
          {/* {fields.error && <li className="error">{fields.error}</li>} */}

        </tbody>
      </table>
      
    </div>
  </div>
)

export default Details; 