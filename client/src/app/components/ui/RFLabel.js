import React from 'react'
import classNames from 'classnames'
import Msg from '../i18n/Msg'
import LanguageStore from '../i18n/LanguageStore' 

const RFLabel = ({input, label, type, disabled, readOnly}) => (
        
          <input {...input} 
            type={type} 
            className="input Text2Label"
            disabled={disabled}
            readOnly={readOnly}
            value={input.value} />             
       
    );

export default RFLabel