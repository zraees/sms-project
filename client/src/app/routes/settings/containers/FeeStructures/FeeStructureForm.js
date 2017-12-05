import React from 'react'
import {reset} from 'redux-form';
import axios from 'axios';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import {connect} from 'react-redux'

import {Field, reduxForm, formValueSelector, getFormValues} from 'redux-form'
import {required, email, number} from '../../../../components/forms/validation/CustomValidation'

import {RFField, RFReactSelect, RFRadioButtonList} from '../../../../components/ui'

import AlertMessage from '../../../../components/common/AlertMessage'
import Msg from '../../../../components/i18n/Msg'
import mapForCombo, {mapForRadioList} from '../../../../components/utils/functions'
 
class FeeStructureForm extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      editDataLoaded: false, 
      percentageOptions: [],
      feeCycleOptions: [],
      feeDiscountTypeOptions: [],
      feeDueOnFrequencyOptions: [],
      feeDueOnIntervalOptions: []
    }  
    this.handleFeeCycleBlur = this.handleFeeCycleBlur.bind(this);
    this.handleFeeDueOnFrequencyBlur = this.handleFeeDueOnFrequencyBlur.bind(this);
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

    axios.get('/api/lookup/feeCycles/')
      .then(res=>{            
          const feeCycleOptions = mapForCombo(res.data);
          this.setState({feeCycleOptions});
    });            
    
    axios.get('/api/lookup/feeDiscountTypes/')
      .then(res=>{            
          const feeDiscountTypeOptions = mapForCombo(res.data);
          this.setState({feeDiscountTypeOptions});
    });

    
    axios.get('/api/GetFeeTypeGeneratedCode')  
    .then(res=>{      
      //console.log(res);       
      const initData = {
          "feeTypeId": 0,
          "discountOption": 'P',
          "discountRate": 0,
          "discountValue": 0,
          "code": res.data
      }

      this.props.initialize(initData);
      
    });
 
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

  handleFeeCycleBlur(obj, value){
    if(value!=''){
      axios.get('/api/Lookup/FeeDueOnFrequencies/FeecycleID/' + value)
        .then(res=>{
            const feeDueOnFrequencyOptions = mapForCombo(res.data);
            this.setState({feeDueOnFrequencyOptions});
        });
    }
    else{ 
      this.setState({feeDueOnFrequencyOptions: [], feeDueOnIntervalOptions: []}); 
    }
  }

  handleFeeDueOnFrequencyBlur(obj, value){  
    //console.log('this.props.shiftId', this.props.shiftId);
    if(value){
      axios.get('/api/Lookup/FeeDueOnInterval/FeeDueOnFrequencyID/'  + value)
        .then(res=>{
            const feeDueOnIntervalOptions = mapForCombo(res.data);
            this.setState({feeDueOnIntervalOptions});
        });
    }
    else{      
      this.setState({feeDueOnIntervalOptions: []});
    }
  }
 
  render() {
    const { feeTypeId, handleSubmit, pristine, reset, submitting, touched, error, warning } = this.props
    const { feeCycleOptions, feeDiscountTypeOptions, feeDueOnFrequencyOptions, feeDueOnIntervalOptions, percentageOptions } = this.state;

    return (
      <form id="form-Fee-Types" className="smart-form"
        onSubmit={handleSubmit}>

        <fieldset>

          <div className="row">
            <section className="remove-col-padding col-sm-2 col-md-2 col-lg-2">
              <Field name="code" labelClassName="input"
                labelIconClassName="icon-append fa fa-barcode"
                validate={required} component={RFField} readOnly="readOnly"
                maxLength="5" type="text" placeholder=""
                label="CodeText" />
            </section>

            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-5">
              <Field name="name" labelClassName="input"
                labelIconClassName="icon-append fa fa-file-text-o"
                validate={required} component={RFField}
                maxLength="100" type="text" placeholder=""
                label="NameText" />
            </section>
            
            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-5">
              <Field name="nameAr" labelClassName="input"
                labelIconClassName="icon-append fa fa-file-text-o"
                validate={required} component={RFField}
                maxLength="100" type="text" placeholder=""
                label="NameArText" />
            </section>
          </div>

          <div className="row">
            <section className="col col-4">
              <Field
                multi={false}
                name="feeCycleId"
                label="FeeCycleText"
                validate={required}
                options={feeCycleOptions}
                onBlur={this.handleFeeCycleBlur}
                component={RFReactSelect} />
            </section>

            <section className="col col-4">
              <Field
                multi={false}
                name="feeDueOnFrequencyId"
                label="FeeDueOnFrequencyText"
                validate={required}
                options={feeDueOnFrequencyOptions}
                onBlur={this.handleFeeDueOnFrequencyBlur}
                component={RFReactSelect} />
            </section>

            <section className="col col-4">
              <Field
                multi={false}
                name="feeDueOnIntervalId"
                label="FeeDueOnIntervalText"
                validate={required}
                options={feeDueOnIntervalOptions}
                component={RFReactSelect} />
            </section> 
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
                component={RFReactSelect} />
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
            {feeTypeId > 0 ? <Msg phrase="UndoChangesText" /> : <Msg phrase="ResetText" />}
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
// //export default 
// FeeStructureForm = reduxForm({
//   form: 'FeeStructureForm',  // a unique identifier for this form
//   onSubmitSuccess: afterSubmit,
//   keepDirtyOnReinitialize: false 
// })(FeeStructureForm)
 
// export default FeeStructureForm;
 