import React from 'react'
import {reset} from 'redux-form';
import axios from 'axios';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import {connect} from 'react-redux'

import {Field, reduxForm, formValueSelector, getFormValues} from 'redux-form'
import {required, email, number} from '../../../../components/forms/validation/CustomValidation'

import {RFField, RFReactSelect, RFRadioButtonList, RFReactSelectSingle, RFLabel} from '../../../../components/ui'

import AlertMessage from '../../../../components/common/AlertMessage'
import Msg from '../../../../components/i18n/Msg'
import mapForCombo, {mapForRadioList, getLangKey} from '../../../../components/utils/functions'
 
class FeeStructureForm extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      editDataLoaded: false, 
      percentageOptions: [],
      classOptions: [],
      feeDiscountTypeOptions: [],
      feeTypeOptions: [] ,
      feeTypeCode: ''
    }  
    this.handleFeeTypeBlur = this.handleFeeTypeBlur.bind(this);
    this.handleFeeBlur = this.handleFeeBlur.bind(this);
    this.handleDiscountRateBlur = this.handleDiscountRateBlur.bind(this);
    this.handleDiscountOptionChange = this.handleDiscountOptionChange.bind(this);
  }
  
  componentDidMount(){

    axios.get('assets/api/common/discount-options.json')
      .then(res => {
        const percentageOptions = mapForRadioList(res.data);
        this.setState({ percentageOptions });
      });

    axios.get('/api/lookup/Classes/')
      .then(res => {
        const classOptions = mapForCombo(res.data);
        this.setState({ classOptions });
      });

    axios.get("/api/lookup/FeeTypes/FeeTypeID,Name,NameAr")
      .then(res => {
        const feeTypeOptions = mapForCombo(res.data);
        this.setState({ feeTypeOptions });
      });

    axios.get('/api/lookup/feeDiscountTypes/')
      .then(res => {
        const feeDiscountTypeOptions = mapForCombo(res.data);
        this.setState({ feeDiscountTypeOptions });
      });

    const initData = {
      "feeStuctureId": 0,
      "discountOption": 'P',
      "discountRate": 0,
      "discountValue": 0,
      "feeTypeCode": ''
    }

    this.props.initialize(initData);
    //this.props.change("feeDiscountTypeId", 1);
    console.log('componentDidMount --> FeeStructureForm');
  }

  
  handleDiscountOptionChange(obj, value) {
    this.calculateDiscount();
  }

  handleFeeBlur(obj, value){
    this.calculateDiscount();
  } 

  handleDiscountRateBlur(obj, value){
    //console.log('test ' );   
    this.calculateDiscount();
  } 

  calculateDiscount(){
    this.props.change("discountValue", this.props.discountValue);
    this.props.change("netFee", this.props.netFee); 
  }

  handleFeeTypeBlur(index, event) {
    
    var val = event.target.value;
    if (val) { 

      //let langKey = getLangKey();

      axios.get('/api/FeeTypesById/'+ val)    //+langKey +'/'
        .then(res => {
          this.props.change("feeTypeCode", res.data.Code);
          this.props.change("feeTypeName", res.data.Name);
          this.props.change("feeTypeNameAr", res.data.NameAr);
          this.props.change("feeCycleName", res.data.FeeCycleName);
          this.props.change("feeDueOnFrequency", res.data.FeeDueOnFrequencyName);
          this.props.change("feeDueOnInterval", res.data.FeeDueOnIntervalName);
          this.props.change("fee", res.data.Fee);
          this.props.change("feeDiscountTypeId", res.data.FeeDiscountTypeID);
          this.props.change("discountOption", res.data.DiscountOption);
          this.props.change("discountRate", res.data.DiscountRate);
          this.calculateDiscount();

        });
    }
    else {
      //this.setState({feeDueOnIntervalOptions: []});
    }
  }
 
  render() {
    const { feeStuctureId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { classOptions, feeDiscountTypeOptions, feeTypeOptions, percentageOptions } = this.state;

    return (
      <form id="form-Fee-Structure" className="smart-form"
        onSubmit={handleSubmit}>

        <fieldset>

          <div className="row">
            <section className="col col-4">
              <Field
                multi={false}
                name="classId"
                label="ClassText"
                validate={required}
                options={classOptions} 
                component={RFReactSelectSingle} />
            </section>

            <section className="col col-4">
              <Field
                multi={false}
                name="feeTypeId"
                label="FeeTypeText"
                validate={required}
                options={feeTypeOptions}  
                onChange={(e) => this.handleFeeTypeBlur(0, e)}
                component={RFReactSelectSingle} />
            </section>

            <section className="col col-4"> 
            </section> 
          </div>

          <div className="highlight">
            <div className="row">
              <section className="col col-4">
                <Field name="feeTypeCode" labelClassName="input"
                  component={RFField} readOnly="readOnly"
                  type="text" placeholder=""
                  label="CodeText" />
              </section>

              <section className="col col-4">
                <Field name="feeTypeName" labelClassName="input"
                  component={RFField} readOnly="readOnly"
                  type="text" placeholder=""
                  label="NameText" />
              </section>

              <section className="col col-4">
                <Field name="feeTypeNameAr" labelClassName="input"
                  component={RFField} readOnly="readOnly"
                  type="text" placeholder=""
                  label="NameArText" />
              </section>
            </div>

            <div className="row">
              <section className="col col-4">
                <Field name="feeCycleName" labelClassName="input"
                  component={RFField} readOnly="readOnly"
                  type="text" placeholder=""
                  label="FeeCycleText" />
              </section>

              <section className="col col-4">
                <Field name="feeDueOnFrequency" labelClassName="input"
                  component={RFField} readOnly="readOnly"
                  type="text" placeholder=""
                  label="FeeDueOnFrequencyText" />
              </section>

              <section className="col col-4">
                <Field name="feeDueOnInterval" labelClassName="input"
                  component={RFField} readOnly="readOnly"
                  type="text" placeholder=""
                  label="FeeDueOnIntervalText" />
              </section>
            </div>

          </div>

          <div className="row">
          <section className="col col-4">
              <Field name="fee" labelClassName="input" labelIconClassName="icon-append fa fa-money"
                validate={[required, number]} component={RFField} type="text" maxLength="10"
                onBlur={this.handleFeeBlur}
                label="FeeText" />
            </section>
            <section className="col col-4">

            </section>
            <section className="col col-4">

            </section> 
          </div>

          <div className="row">
            <section className="col col-4">
              <Field
                multi={false}
                name="feeDiscountTypeId"
                label="FeeDiscountTypeText" 
                options={feeDiscountTypeOptions}
                component={RFReactSelectSingle} />
            </section>

            <section className="col col-4">
              <Field component={RFRadioButtonList} name="discountOption" required={true}
                label=""
                onChange={this.handleDiscountOptionChange}
                options={percentageOptions} />
            </section>

            <section className="col col-4">
              <Field name="discountRate" labelClassName="input" labelIconClassName="icon-append fa fa-money"
                validate={[number]} component={RFField} type="text" maxLength="10"
                onBlur={this.handleDiscountRateBlur}
                label="DiscountRateText" />
            </section> 

          </div>

          <div className="row">

            <section className="col col-4">
              <Field name="discountValue" labelClassName="input" labelIconClassName="icon-append fa fa-money"
                validate={[number]} component={RFField} type="text" maxLength="10" readOnly={true}
                label="DiscountValueText" />
            </section>

            <section className="col col-4">
              <Field name="netFee" labelClassName="input" labelIconClassName="icon-append fa fa-money"
                validate={[required, number]} component={RFField} type="text" maxLength="10"
                label="FeeAmountAfterDiscountText" />
            </section>

            <section className="col col-4">
            </section>

          </div>

        </fieldset>

        {(error !== undefined && <AlertMessage type="w"
          icon="alert-danger" message={error} />)}

        <footer>
          <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary">
            {feeStuctureId > 0 ? <Msg phrase="UndoChangesText" /> : <Msg phrase="ResetText" />}
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
    dispatch(reset('FeeStructureForm'));
}


//export default 
FeeStructureForm = reduxForm({
  form: 'FeeStructureForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false 
})(FeeStructureForm)

const selector = formValueSelector('FeeStructureForm') // <-- same as form name
FeeStructureForm = connect(
  state => { 
    const { fee, discountOption, discountRate, discountValue } = selector(state, 'fee', 'discountOption', 'discountRate', 'discountValue')
    return {
      discountValue: discountOption=='P'? fee * (discountRate||0) / 100 : discountRate,
      netFee: fee - (discountOption=='P'? fee * (discountRate||0) / 100 : discountRate)
    }
  }
)(FeeStructureForm)

export default FeeStructureForm; 