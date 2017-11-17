import React from 'react'
import classNames from 'classnames'
import Msg from '../i18n/Msg'
import LanguageStore from '../i18n/LanguageStore' 

const RFCheckboxGroup = ({input, label, disabled, readOnly, labelClassName, labelIconClassName, onBlur, meta: {asyncValidating, touched, error, warning}}) => (
    
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

export default RFCheckboxGroup

//https://github.com/erikras/redux-form/issues/1037

// very good example of groupcheckbox
// abhi iss control ki need nhe jab requirement ho tu uper walle link sy help lyni hai :)


/*
import React from 'react';
import { FormGroup, ControlLabel, HelpBlock, Label } from 'react-bootstrap';

const Error = ({ meta : {touched, error} }) =>  (touched && error ? <HelpBlock>{error}</HelpBlock> : null);

const CheckboxGroup = ({ label, required, name, options,  input, meta}) => (
  <FormGroup controlId={name}>
    <ControlLabel>{label} { required && <Label bsStyle="info">required</Label> }</ControlLabel>
      { options.map((option, index) => (
        <div className="checkbox" key={index}>
          <label>
            <input type="checkbox"
                   name={`${name}[${index}]`}
                   value={option.name}
                   checked={input.value.indexOf(option.name) !== -1}
                   onChange={event => {
                     const newValue = [...input.value];
                     if(event.target.checked) {
                       newValue.push(option.name);
                     } else {
                       newValue.splice(newValue.indexOf(option.name), 1);
                     }

                     return input.onChange(newValue);
                   }}/>
            {option.name}
          </label>
        </div>))
      }
    <Error meta={meta} />
  </FormGroup>
);

export default CheckboxGroup;`*/