import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import classnames from 'classnames'

import 'react-datepicker/dist/react-datepicker.css';

const RFDatePicker = ({input, placeholder, defaultValue, minDate, handleChange, meta: {touched, error, warning} }) => (
  <div>
    <label>{placeholder}</label>
    <label className={classnames(['input', {'state-error':touched && error!==undefined}])}>
        <i className="icon-append fa fa-calendar"/>
            <DatePicker {...input} showMonthDropdown
                showYearDropdown 
                minDate = {minDate}
                selected={input.value ? moment(input.value, "MM-DD-YYYY") : null} />
    </label>
    {touched && ((error && <span><em className="invalid">{error}</em></span>) || (warning && <span>{warning}</span>))}          
  </div>
);

export default RFDatePicker