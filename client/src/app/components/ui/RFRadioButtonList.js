import React from 'react';
import Msg from '../i18n/Msg'

export default class RFRadioButtonList extends React.Component {
      render() {
          const { input, meta, options, label } = this.props
          const hasError = meta.touched && meta.error;

          return (
            <div>
                <label><Msg phrase={label}/></label>
                <div className="inline-group">                
                    {options.map(o => 
                        <label className="radio" key={o.value}>
                            <input type="radio" {...input} 
                                value={o.value} 
                                checked={o.value === input.value} /><i/> 
                            
                            <label><Msg phrase={o.title}/></label>
                        </label>)}
                    {hasError && <span className="error"><Msg phrase={meta.error}/></span>}
                </div>
            </div>
          );
      }
  }