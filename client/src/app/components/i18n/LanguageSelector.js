import React from 'react'
import Reflux from 'reflux'
import moment from 'moment'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import _ from 'lodash';

import classnames from 'classnames'

import LanguageActions from './LanguageActions'
import LanguageStore from './LanguageStore'

import * as LayoutActions from '../layout/LayoutActions'

import 'moment/locale/ar.js'
import 'moment/locale/ar-sa.js'
import 'moment/locale/ur.js'
import 'moment/locale/en-gb.js'


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
        let store = this.state.store;
        let languages = this.state.store.languages;
        //let language = this.state.store.language;         //get language from language store, but now I'm getting from localStorage
        let language = this.props.lang;
        
        //console.log(this.state.store.language);
        //console.log('before lang ddl render');
        //console.log(language);
        //store.phrases ={};
        //this.setState({store});
        
        if(_.isEmpty(store.phrases)){
            //console.log('isempty');
            LanguageActions.select(language)
        }
        // else{
        //     console.log(store.phrases);
        // }
        
        moment.locale(language.locale);            
        //console.log (moment.locale());

        return (
            <ul className="header-dropdown-list hidden-xs ng-cloak">
                <li className="dropdown">
                    <a className="dropdown-toggle" href="#"  data-toggle="dropdown">
                        <img src="assets/img/blank.gif"
                             className={classnames(['flag', 'flag-'+language.flag])} alt={language.alt} />
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
                                             className={classnames(['flag', 'flag-'+_lang.flag])} alt={_lang.alt} />
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
        
        //console.log('_selectLanguage');
        // console.log(language);
        this.props.onSetLang(language);
        //console.log('before rtl action ' + language.rtl)
        if((!this.props.rtl && language.rtl) || (this.props.rtl && !language.rtl))
            this.props.onRtl();     // toggle RTL 

        moment.locale(language.locale);            
    }
});

const mapStateToProps = (state, ownProps) => (state.layout); 

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LayoutActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);