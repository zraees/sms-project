import React, { PropTypes } from 'react';
import classNames from 'classnames'  
import Msg from '../i18n/Msg'

RFReactSelectSingle.defaultProps = { 
  className: ""
};
 
export default function RFReactSelectSingle({ input , options, className, label, disabled, meta: {asyncValidating, touched, error, warning} }) {
  const { name, value, onBlur, onChange, onFocus } = input;
  //const transformedValue = transformValue(value, options);
  return (
    <div >
 
      {label == "" ? "" : <label><Msg phrase={label} /></label>}

      <label className={classNames('select', { 'state-error': (touched && error !== undefined) || asyncValidating })}>
        <select {...input} className="input" disabled={disabled}
          onBlur={() => input.onBlur(input.value)}
          onChange={onChange}>
          
          <option key="0" value="">Select</option>
          {options.map(renderSelectOptions)}
        </select>
        <i></i></label>
      {touched && ((error && <span><em className="invalid"><Msg phrase={error}/></em></span>) || (warning && <span><Msg phrase={warning}/></span>))}          
    
    </div>
  );
}

function renderSelectOptions(person) {
  return (<option key={person.label} value={person.value}>{person.label}</option>);
}

function singleChangeHandler(func) {
  return function handleSingleChange(value) {
    console.log('singleChangeHandler(func) == ', value.value)
    func(value ? value.value : '');
  };
}