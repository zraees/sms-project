import React from 'react'
import classNames from 'classnames'

const RFField = ({input, label, type, labelClassName, labelIconClassName, placeholder, meta: {asyncValidating, touched, error, warning}}) => (
      <div>        
        <label>{placeholder}</label>
        <label className={classNames(labelClassName, {'state-error':(touched && error!==undefined)||asyncValidating })}>    
          <i className={labelIconClassName} aria-hidden="true"/>
          <input {...input} placeholder={label} type={type} placeholder={placeholder} />            
        </label>
        {touched && ((error && <span><em className="invalid">{error}</em></span>) || (warning && <span>{warning}</span>))}          
      </div>
    );

export default RFField