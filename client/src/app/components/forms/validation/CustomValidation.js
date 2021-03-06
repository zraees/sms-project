    
    export function required (value) {
      // console.log('required');
      // console.log(value);
       return value ? undefined : 'RequiredFieldText';
      }
 
    export function requiredCombo (value) {
      // console.log('requiredCombo');
      // console.log(value);
       return value ? undefined : 'RequiredFieldText';
      }

    export function email (value){
      return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
      'InvalidEmailAddressText' : undefined;
      }
    
    export function number (value){
      return value && isNaN(Number(value)) ? 'MustBeANumberText' : undefined
    }
    // const required = value => value ? undefined : 'This field is required'
    // const maxLength = max => value =>
    //   value && value.length > max ? `Must be ${max} characters or less` : undefined
    // const maxLength15 = maxLength(15)
    // const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
    // const minValue = min => value =>
    //   value && value < min ? `Must be at least ${min}` : undefined
    // const minValue18 = minValue(18)
    // const email = value =>
    //   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    //   'Invalid email address' : undefined
    // const tooOld = value =>
    //   value && value > 65 ? 'You might be too old for this' : undefined
    // const aol = value =>
    //   value && /.+@aol\.com/.test(value) ?
    //   'Really? You still use AOL for your email?' : undefined
