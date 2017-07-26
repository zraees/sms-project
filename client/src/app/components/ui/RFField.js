import React from 'react'
import classNames from 'classnames'
import Msg from '../i18n/Msg'
import LanguageStore from '../i18n/LanguageStore'

const RFField = ({input, label, type, value, disabled, labelClassName, labelIconClassName, placeholder, meta: {asyncValidating, touched, error, warning}}) => (
  
      <div>       
        <label><Msg phrase={label}/></label>
        <label className={classNames(labelClassName, {'state-error':(touched && error!==undefined)||asyncValidating })}>    
          <i className={labelIconClassName} aria-hidden="true"/>
          <input {...input} 
            type={type} 
            disabled={disabled}
            value={disabled?"":value}
            placeholder={LanguageStore.getData().phrases[placeholder]} />            
        </label>
        {touched && ((error && <span><em className="invalid"><Msg phrase={error}/></em></span>) || (warning && <span><Msg phrase={warning}/></span>))}          
      </div>
    );

export default RFField