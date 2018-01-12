import React from 'react'
import classNames from 'classnames'
import Msg from '../i18n/Msg'
import LanguageStore from '../i18n/LanguageStore' 

const RFLabel = ({input, label, className, type, disabled, readOnly}) => (
        
          <input {...input} 
            type={type} 
            className=""
            className={classNames(className,'input Text2Label' )}
            disabled={disabled}
            readOnly={readOnly}
            value={input.value} />             
       
    );

export default RFLabel