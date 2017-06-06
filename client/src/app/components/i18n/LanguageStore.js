import Reflux from 'reflux'

import LanguageActions from './LanguageActions'
import {getLang} from '../../components/utils/functions'

const data = {
    language: getLang(),
    languages: [],
    phrases: {}
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
        console.log('onSelectCompleted need to fix this issue');
        //console.log(data.language);
        //console.log(_data);
        data.phrases = _data;
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

