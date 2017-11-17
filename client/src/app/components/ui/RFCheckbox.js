import React from 'react'
import classNames from 'classnames'
import Msg from '../i18n/Msg'
import LanguageStore from '../i18n/LanguageStore' 

const RFCheckbox = ({input, label, disabled, readOnly, labelClassName, labelIconClassName, onBlur, meta: {asyncValidating, touched, error, warning}}) => (
    
      <div>     
        {console.log('input.value ',input.value)}
        {label==""?"":<label><Msg phrase={label}/></label>}
        <label className={classNames(labelClassName, {'state-error':(touched && error!==undefined)||asyncValidating })}>    
          <i aria-hidden="true"/>
          <input {...input} 
            type="checkbox"
            disabled={disabled}
            readOnly={readOnly}
            value={disabled?"":input.value}
            onBlur={() => input.onBlur(input.value)} />            
        </label>
        {touched && ((error && <span><em className="invalid"><Msg phrase={error}/></em></span>) || (warning && <span><Msg phrase={warning}/></span>))}
      </div>
    );

export default RFCheckbox