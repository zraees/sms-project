import Reflux from 'reflux'

import LanguageActions from './LanguageActions'

const data = {
    language: {
        key: "us",
        alt: "United States",
        title: "English (US)"
    },
    languages: [],
    phrases: {}
};

const LanguageStore = Reflux.createStore({
    listenables: LanguageActions,
    getData: function(){
        return data
    },
    onInitCompleted: function (_data) {
        data.languages = _data;
        this.trigger(data)
    },
    onSelectCompleted: function (_data) {
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

