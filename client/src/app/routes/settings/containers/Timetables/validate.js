const validate = values => {
    const errors = {}

    //console.log('values ==> ',values);
 
    if (!values.timeTableDetails || !values.timeTableDetails.length) {
      errors.timeTableDetails = { _error: 'At least one period must be entered' }
    } else {
      const timeTableDetailsArrayErrors = []
      values.timeTableDetails.forEach((period, periodIndex) => {
        const periodErrors = {}
        if ((!period || !period.startTime)) {
          periodErrors.startTime = 'Required'
          timeTableDetailsArrayErrors[periodIndex] = periodErrors
        }
        if ((!period || !period.endTime)) {
          periodErrors.endTime = 'Required'
          timeTableDetailsArrayErrors[periodIndex] = periodErrors
        } 
        if ((!period || !period.teacherId) && !period.isBreak) {
          periodErrors.teacherId = 'Required'
          periodErrors.subjectId = 'Required'
          timeTableDetailsArrayErrors[periodIndex] = periodErrors
        } 
        if ((!period || !period.subjectId) && !period.isBreak) {
          periodErrors.subjectId = 'Required'
          timeTableDetailsArrayErrors[periodIndex] = periodErrors
        } 
        if ((!period || !period.locationId) && !period.isBreak) {
          periodErrors.locationId = 'Required'
          timeTableDetailsArrayErrors[periodIndex] = periodErrors
        } 
      })
      if(timeTableDetailsArrayErrors.length) {
        errors.timeTableDetails = timeTableDetailsArrayErrors
      }
    }
    return errors
  }
  
  export default validate