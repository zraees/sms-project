import React from 'react'
import classNames from 'classnames'
import Msg from '../i18n/Msg'
import LanguageStore from '../i18n/LanguageStore' 

const RFTextArea = ({textarea, label, type, labelClassName, labelIconClassName, placeholder, meta: {asyncValidating, touched, error, warning}}) => (
      <div>        
        <label><Msg phrase={label}/></label>
        <p><Msg phrase={placeholder}/></p>
        <label className={classNames('textarea textarea-expandable', {'state-error':(touched && error!==undefined)||asyncValidating })}>    
          <i className={labelIconClassName} aria-hidden="true"/>
          <textarea {...textarea} rows="3" placeholder={LanguageStore.getData().phrases[placeholder]} className="custom-scroll" ></textarea>
          
        </label>
        {touched && ((error && <span><em className="invalid"><Msg phrase={error}/></em></span>) || (warning && <span><Msg phrase={warning}/></span>))}
      </div>
    );

export default RFTextArea

//1
//http://redux-form.com/6.0.0-alpha.6/examples/simple/
//const  { DOM: { input, select, textarea } } = React

//2
//http://redux-form.com/6.7.0/examples/simple/
//<button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>

//3 ==> Textarea Not Cleared when Blowing Away Form Data 
//https://github.com/erikras/redux-form/issues/394
//<textarea value={this.props.value || ''} />

//4 --> Normalizing Floats #1218
//https://github.com/erikras/redux-form/issues/1218
//<MaskedInput  {...field}  format={formatInputString}  normalize={convertInputToFloat}/>