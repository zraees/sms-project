import React, { PropTypes } from 'react';
import classNames from 'classnames'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Msg from '../i18n/Msg'

RFReactSelect.defaultProps = {
  multi: false,
  className: ""
};

// RFReactSelect.propTypes = {
//   input: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     value: PropTypes.string.isRequired,
//     onBlur: PropTypes.func.isRequired,
//     onChange: PropTypes.func.isRequired,
//     onFocus: PropTypes.func.isRequired,
//   }).isRequired,
//   options: PropTypes.array.isRequired,
//   multi: PropTypes.bool,
//   className: PropTypes.string
// };

//https://github.com/erikras/redux-form/issues/1185
export default function RFReactSelect({ input , options, multi, className, label, disabled, meta: {asyncValidating, touched, error, warning} }) {
  const { name, value, onBlur, onChange, onFocus } = input;
  const transformedValue = transformValue(value, options, multi);
  return (
    <div>
      {label==""?"":<label><Msg phrase={label}/></label>} 
      <Select
        valueKey="value"
        name={name}
        value={transformedValue}
        multi={multi}
        disabled={disabled}
        options={options}
        onChange={multi
          ? multiChangeHandler(onChange)
          : singleChangeHandler(onChange)
        }
        onBlur={() => onBlur(value)}
        onFocus={onFocus}
        className={className}
      /> 
      {touched && ((error && <span><em className="invalid"><Msg phrase={error}/></em></span>) || (warning && <span><Msg phrase={warning}/></span>))}          
    </div>
  );
}

/**
 * onChange from Redux Form Field has to be called explicity.
 */
function singleChangeHandler(func) {
  return function handleSingleChange(value) {
    func(value ? value.value : '');    
  };
}

/**
 * onBlur from Redux Form Field has to be called explicity.
 */
function multiChangeHandler(func) {
 
  return function handleMultiHandler(values) {
    func(values.map(value => ''+value.value));
  };
}

/**
 * For single select, Redux Form keeps the value as a string, while React Select 
 * wants the value in the form { value: "grape", label: "Grape" }
 * 
 * * For multi select, Redux Form keeps the value as array of strings, while React Select 
 * wants the array of values in the form [{ value: "grape", label: "Grape" }]
 */
function transformValue(value, options, multi) {
   
  if (multi && typeof value === 'string') return [];
   //console.log('transformValue(value, options, multi) ', value, options, multi)
  const filteredOptions = options.filter(option => {
    return multi 
      ? value.indexOf(option.value) !== -1
      : option.value === value;
  }); 
  //console.log('  multi) ', multi)
  //console.log(filteredOptions);
  return multi ? filteredOptions : filteredOptions[0];
}