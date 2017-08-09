import LanguageStore from '../i18n/LanguageStore'
//import store from '../../store/configureStore'
//import LoaderActions from '../Loader/LoaderActions'

import moment from 'moment'
import axios from 'axios'
import _ from 'lodash';

import * as phrases_us from '../../../assets/api/langs/us.json';
import * as phrases_ar from '../../../assets/api/langs/ar.json';
import * as phrases_ur from '../../../assets/api/langs/ur.json';

let phrasesUs = {}
let phrasesUr = {}
let phrasesAr = {} 

function mapForCombo(keyValues){
    let key = getLangKey();
    return keyValues.map(function(item, index){
                return {value: item.Id + "", label: key=='ar'? item.NameAr : item.Name};
            });                       
}

export function mapForRadioList(keyValues){
    return keyValues.map(function(item, index){
                return {title: item.Name, value: item.Id + ""};
            });                       
} 

export function isYesClicked(ButtonPressed){
    let yesText = LanguageStore.getData().phrases["yesText"] || "Yes!";
    return ButtonPressed===yesText ? true : false;
} 

export function isNoClicked(ButtonPressed){
    let noText = LanguageStore.getData().phrases["noText"] || "No";
    return ButtonPressed===noText ? true : false;
}

export function isOtherOptionSelected(value){
    return lower(value) == 'other' || lower(value) == 'others' ? true : false ;
}

export function getLangKey(){
    return JSON.parse(localStorage.getItem('sm-lang')).key || "us"
}

export function getLang(){
    return JSON.parse(localStorage.getItem('sm-lang')) //|| "us"
}

export function getPhrases(){
    let languageKey = getLangKey();
    let phrases = {}
    //console.log('export function getPhrases(){ languageKey = ',languageKey)
    
    if(languageKey=='us'){
        if(_.isEmpty(phrasesUs)){
            //console.log('phrases_us is empty')
            phrasesUs = phrases_us;            
        }
        phrases = phrasesUs
    }
    else if(languageKey=='ar'){
        if(_.isEmpty(phrasesAr)){
            //console.log('phrasesAr is empty')
            phrasesAr = phrases_ar;            
        }
        phrases = phrasesAr
    }
    else if(languageKey=='ur'){
        if(_.isEmpty(phrasesUr)){
            //console.log('phrasesUr is empty')
            phrasesUr = phrases_ur;            
        }
        phrases = phrasesUr
    }

    return phrases;
}

/*  Date formatting functions   */
export function getDateFrontEndFormat(date){
    return moment(date).format(getLang().backend || 'Do MMM YYYY')
    //return date;
}

export function getDateBackEndFormat(date){
    return moment(date).format(getLang().backend || 'Do MMM YYYY')
}

/*  Function for dataTable  */
export function renderDate( data ){
	return moment(data).format(getLang().frontend || 'Do MMM YYYY')
}

export default mapForCombo