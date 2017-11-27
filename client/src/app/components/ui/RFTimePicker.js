import React from 'react'
import TimePicker from 'rc-time-picker';
import moment from 'moment'
import classnames from 'classnames'
import Msg from '../i18n/Msg'

import 'rc-time-picker/assets/index.css';

const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

const RFTimePicker = ({input, label, value, onChange, meta: {touched, error, warning} }) => (
  <div>
    <label><Msg phrase={label}/></label>
    <label className={classnames(['input', {'state-error':touched && error!==undefined}])}>
        <i className="icon-append fa fa-calendar"/>
        <TimePicker style={{ width: 100 }}
          showSecond={showSecond} 
          defaultValue={value}
          className="xxx"
          onBlur={() => input.onBlur(value)}
          onChange={onChange} />
    </label>
    {touched && ((error && <span><em className="invalid"><Msg phrase={error}/></em></span>) || (warning && <span><Msg phrase={warning}/></span>))}          
  </div>
);

export default RFTimePicker