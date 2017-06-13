import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import classnames from 'classnames'
import Msg from '../i18n/Msg'
//import {getDateFrontEndFormat} from '../utils/functions'

import 'react-datepicker/dist/react-datepicker.css';

const RFDatePicker = ({input, placeholder, defaultValue, minDate, handleChange, meta: {touched, error, warning} }) => (
  <div>
    <label>{placeholder}</label>
    <label className={classnames(['input', {'state-error':touched && error!==undefined}])}>
        <i className="icon-append fa fa-calendar"/>
            <DatePicker {...input} showMonthDropdown
                showYearDropdown 
                minDate = {minDate}
                selected={input.value ? moment(input.value, "YYYY-MM-DD") : null} />
    </label>
    {touched && ((error && <span><em className="invalid"><Msg phrase={error}/></em></span>) || (warning && <span><Msg phrase={warning}/></span>))}          
  </div>
);

export default RFDatePicker