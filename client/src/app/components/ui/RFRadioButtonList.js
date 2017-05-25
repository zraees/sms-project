import React from 'react';

export default class RFRadioButtonList extends React.Component {
      render() {
          const { input, meta, options, placeholder } = this.props
          const hasError = meta.touched && meta.error;

          return (
            <section>
                <label>{placeholder}</label>
                <div className="inline-group">                
                    {options.map(o => <label className="radio" key={o.value}>
                        <input type="radio" {...input} value={o.value} checked={o.value === input.value} /><i/> {o.title}</label>)}
                    {hasError && <span className="error">{meta.error}</span>}
                </div>
            </section>
          );
      }
  }