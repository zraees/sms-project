import React from 'react';
import Msg from '../i18n/Msg'

export default class RFRadioButtonList extends React.Component {
      render() {
          const { input, meta, options, placeholder } = this.props
          const hasError = meta.touched && meta.error;

          return (
            <div>
                <label>{placeholder}</label>
                <div className="inline-group">                
                    {options.map(o => <label className="radio" key={o.value}>
                        <input type="radio" {...input} value={o.value} checked={o.value === input.value} /><i/> {o.title}</label>)}
                    {hasError && <span className="error"><Msg phrase={meta.error}/></span>}
                </div>
            </div>
          );
      }
  }