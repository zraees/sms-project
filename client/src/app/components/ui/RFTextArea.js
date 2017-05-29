import React from 'react'
import classNames from 'classnames'

const RFTextArea = ({textarea, label, type, labelClassName, labelIconClassName, placeholder, meta: {asyncValidating, touched, error, warning}}) => (
      <div>        
        <label>{placeholder}</label>
        <label className={classNames('textarea textarea-expandable', {'state-error':(touched && error!==undefined)||asyncValidating })}>    
          <i className={labelIconClassName} aria-hidden="true"/>
          <textarea {...textarea} rows="3" placeholder={placeholder} className="custom-scroll" />            
        </label>
        {touched && ((error && <span><em className="invalid">{error}</em></span>) || (warning && <span>{warning}</span>))}          
      </div>
    );

export default RFTextArea