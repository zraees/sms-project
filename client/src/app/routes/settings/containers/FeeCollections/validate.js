
const validate = values => {
  const errors = {}

  //   console.log(' aa ', !0, !2, !null, !'');
  // console.log('values ==> ',values);

  if (!values.feeDueDetails || !values.feeDueDetails.length) {
    errors.feeDueDetails = { _error: 'At least one record must be entered' }
  } else {
    const feeDueDetailsArrayErrors = []
    values.feeDueDetails.forEach((period, periodIndex) => {
      const periodErrors = {}
      periodErrors.newAdditionalDiscount = '';
      periodErrors.paymentAmount = '';

      console.log('period.newAdditionalDiscount => ', periodIndex, period.newAdditionalDiscount, period.paymentAmount, period.newAdditionalDiscount=='');

      // if(period.newAdditionalDiscount==0){        
      //   periodErrors.newAdditionalDiscount = ''
      //   feeDueDetailsArrayErrors[periodIndex] = periodErrors
      // }
      if (period.newAdditionalDiscount=='' ) {    
        
        //console.log('hi hi', periodIndex, period.newAdditionalDiscount );

        periodErrors.newAdditionalDiscount = 'RequiredFieldText'
        feeDueDetailsArrayErrors[periodIndex] = periodErrors
        
        // if(period.newAdditionalDiscount==0){        

          
        // console.log('hi hi period.newAdditionalDiscount==0 ==> ', periodIndex, period.newAdditionalDiscount );

        //     periodErrors.newAdditionalDiscount = ''
        //     feeDueDetailsArrayErrors[periodIndex] = periodErrors
        // }
      }
      // else if(period.newAdditionalDiscount<0){        
      //   periodErrors.newAdditionalDiscount = 'InvalidText'
      //   feeDueDetailsArrayErrors[periodIndex] = periodErrors
      // }

      
      // if(period.paymentAmount==0){        
      //   periodErrors.paymentAmount = ''
      //   feeDueDetailsArrayErrors[periodIndex] = periodErrors
      // }
      else if ((!period || !period.paymentAmount)) {
        periodErrors.paymentAmount = 'RequiredFieldText'
        feeDueDetailsArrayErrors[periodIndex] = periodErrors
      }
      else if(period.paymentAmount<0){        
        periodErrors.paymentAmount = 'InvalidText'
        feeDueDetailsArrayErrors[periodIndex] = periodErrors
      }

      if (periodErrors.newAdditionalDiscount == '' && period.newAdditionalDiscount > 0 && period.newAdditionalDiscount > period.dueAmountAfterAddDisc) {
        periodErrors.newAdditionalDiscount = 'InvalidText'
        feeDueDetailsArrayErrors[periodIndex] = periodErrors
      }

      if (periodErrors.paymentAmount == '' && period.paymentAmount > 0 && period.paymentAmount > period.outstandingAmount - period.newAdditionalDiscount) {
        periodErrors.paymentAmount = 'InvalidText'
        feeDueDetailsArrayErrors[periodIndex] = periodErrors
      }
    })
    if (feeDueDetailsArrayErrors.length) {
      errors.feeDueDetails = feeDueDetailsArrayErrors
    }
  }
  return errors
}

export default validate