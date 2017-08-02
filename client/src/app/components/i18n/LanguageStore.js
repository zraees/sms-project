import Reflux from 'reflux'

import LanguageActions from './LanguageActions'
import {getLang, getPhrases} from '../../components/utils/functions'

const data = {
    language: getLang(),
    languages: [],
    phrases: getPhrases() 
};

const LanguageStore = Reflux.createStore({
    listenables: LanguageActions,
    getData: function(){
        return data
        // return {
        //             language: getLang(),
        //             languages: data.languages,
        //             phrases: data.phrases
        //         };
    },
    onInitCompleted: function (_data) {
        data.languages = _data;
        this.trigger(data)
    },
    onSelectCompleted: function (_data) {
        //now we are getting phrases from functions.js/getPhrases()
        //directly(sync) reading json file
        
        //data.phrases = _data;
        //this.trigger(data)
        data.phrases = getPhrases();
        this.trigger(data)
    },
    setLanguage: function(_lang){
        data.language = _lang
        // var $body = $('body');
        // if (!$body.hasClass("smart-rtl")) {
        //     $body.addClass("smart-rtl");
        // }
    }
});

export default LanguageStore;

