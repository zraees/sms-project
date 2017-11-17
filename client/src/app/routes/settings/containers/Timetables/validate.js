const validate = values => {
    const errors = {}

    console.log('values ==> ',values);
 
    if (!values.periods || !values.periods.length) {
      errors.periods = { _error: 'At least one period must be entered' }
    } else {
      const periodsArrayErrors = []
      values.periods.forEach((period, periodIndex) => {
        const periodErrors = {}
        if ((!period || !period.startTime)) {
          periodErrors.startTime = 'Required'
          periodsArrayErrors[periodIndex] = periodErrors
        }
        if ((!period || !period.endTime)) {
          periodErrors.endTime = 'Required'
          periodsArrayErrors[periodIndex] = periodErrors
        } 
        if ((!period || !period.teacherId) && !period.isBreak) {
          periodErrors.teacherId = 'Required'
          periodsArrayErrors[periodIndex] = periodErrors
        } 
        if ((!period || !period.subjectId) && !period.isBreak) {
          periodErrors.subjectId = 'Required'
          periodsArrayErrors[periodIndex] = periodErrors
        } 
        if ((!period || !period.locationId) && !period.isBreak) {
          periodErrors.locationId = 'Required'
          periodsArrayErrors[periodIndex] = periodErrors
        } 
      })
      if(periodsArrayErrors.length) {
        errors.periods = periodsArrayErrors
      }
    }
    return errors
  }
  
  export default validate