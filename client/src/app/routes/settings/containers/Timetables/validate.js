import { validateTime, dateCompare } from '../../../../components/utils/functions'

const validate = values => {
    const errors = {}

    //console.log('values ==> ',values);
 
    if (!values.timeTableDetails || !values.timeTableDetails.length) {
      errors.timeTableDetails = { _error: 'At least one record must be entered' }
    } else {
      const timeTableDetailsArrayErrors = []
      values.timeTableDetails.forEach((period, periodIndex) => {
        const periodErrors = {}
        periodErrors.startTime = '';
        periodErrors.endTime = '';
        if ((!period || !period.startTime)) {
          periodErrors.startTime = 'RequiredFieldText'
          timeTableDetailsArrayErrors[periodIndex] = periodErrors
        }
        else if(!validateTime(period.startTime)){
          periodErrors.startTime = 'InvalidText'
          timeTableDetailsArrayErrors[periodIndex] = periodErrors
        }
        if ((!period || !period.endTime)) {
          periodErrors.endTime = 'RequiredFieldText'
          timeTableDetailsArrayErrors[periodIndex] = periodErrors
        } 
        else if(!validateTime(period.endTime)){
          periodErrors.endTime = 'InvalidText'
          timeTableDetailsArrayErrors[periodIndex] = periodErrors
        }

        //console.log('startTimeError periodEndTimeError result ',period.startTime, period.endTime, periodErrors.startTime, periodErrors.endTime, dateCompare(period.startTime, period.endTime))

        if(periodErrors.startTime == '' && periodErrors.endTime == '' && dateCompare(period.startTime, period.endTime)==1){
          periodErrors.startTime = 'InvalidText'
          periodErrors.endTime = 'InvalidText'
          timeTableDetailsArrayErrors[periodIndex] = periodErrors
        }
        if ((!period || !period.teacherId) && !period.isBreak) {
          periodErrors.teacherId = 'RequiredFieldText'
          periodErrors.subjectId = 'RequiredFieldText'
          timeTableDetailsArrayErrors[periodIndex] = periodErrors
        } 
        if ((!period || !period.subjectId) && !period.isBreak) {
          periodErrors.subjectId = 'RequiredFieldText'
          timeTableDetailsArrayErrors[periodIndex] = periodErrors
        } 
        if ((!period || !period.locationId) && !period.isBreak) {
          periodErrors.locationId = 'RequiredFieldText'
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