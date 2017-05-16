import React from 'react'
import Reflux from 'reflux'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import classnames from 'classnames'

import LanguageActions from './LanguageActions'
import LanguageStore from './LanguageStore'

import * as LayoutActions from '../layout/LayoutActions'

const LanguageSelector = React.createClass({
    getInitialState: function(){
        return {
            'store': LanguageStore.getData()
        }
    },
    mixins: [Reflux.connect(LanguageStore, 'store')],
    componentWillMount: function(){
        LanguageActions.init();
    },
    render: function () {
        let languages = this.state.store.languages;
        let language = this.state.store.language;
        
        // console.log(language);
        // console.log(languages);
        return (
            <ul className="header-dropdown-list hidden-xs ng-cloak">
                <li className="dropdown">
                    <a className="dropdown-toggle" href="#"  data-toggle="dropdown">
                        <img src="assets/img/blank.gif"
                             className={classnames(['flag', 'flag-'+language.key])} alt={language.alt} />
                        <span>&nbsp;{language.title}&nbsp;</span>
                        <i className="fa fa-angle-down" /></a>
                    <ul className="dropdown-menu pull-right">
                        {languages.map(function(_lang, idx){
                            return (
                                <li key={idx} className={classnames({
                                    active: _lang.key == language.key
                                })}>
                                    <a href="#" onClick={this._selectLanguage.bind(this, _lang)} >
                                        <img src="assets/img/blank.gif"
                                             className={classnames(['flag', 'flag-'+_lang.key])} alt={_lang.alt} />
                                        <span>&nbsp;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               {_lang.title}</span>
                                    </a>
                                </li>
                            )
                        }.bind(this))}
                    </ul>
                </li>
            </ul>
        )
    },
    _selectLanguage: function(language){
        LanguageStore.setLanguage(language)
        LanguageActions.select(language)
        
        //console.log('before rtl action ' + language.rtl)
        if((!this.props.rtl && language.rtl) || (this.props.rtl && !language.rtl))
            this.props.onRtl();     // toggle RTL 
    }
});

const mapStateToProps = (state, ownProps) => (state.layout); 

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LayoutActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);