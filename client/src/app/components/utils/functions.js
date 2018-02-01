import LanguageStore from '../i18n/LanguageStore'
//import store from '../../store/configureStore'
//import LoaderActions from '../Loader/LoaderActions'

import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'
import numeral  from 'numeral'

import * as phrases_us from '../../../assets/api/langs/us.json';
import * as phrases_ar from '../../../assets/api/langs/ar.json';
import * as phrases_ur from '../../../assets/api/langs/ur.json';
import { config } from '../../config/config';

let phrasesUs = {}
let phrasesUr = {}
let phrasesAr = {} 

function mapForCombo(keyValues) {
    let key = getLangKey();
    return keyValues.map(function (item, index) {
        return { value: item.Id + "", label: key == 'ar' ? item.NameAr : item.Name };
    });
}

export function mapForRadioList(keyValues) {
    return keyValues.map(function (item, index) {
        return { title: item.Name, value: item.Id + "" };
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

export function getTranslation(text){
    return LanguageStore.getData().phrases[text] || text;
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
    return moment(date).format(getLang().frontend || 'Do MMM YYYY')
    //return date;
}

export function getDateBackEndFormat(date){
    return moment(date).format(getLang().backend || 'Do MMM YYYY')
}

/*  Function for dataTable  */
export function renderDate( data ){
	return data? moment(data).format(getLang().frontend || 'Do MMM YYYY') : "";
}

export function renderNumber(data){
    data = data? numeral(data).format('0,0.00') : "0";
    return '<span class="text-right">' + data + '</span>';
}

export function renderFeeStatus(data, type, row){
    var newData=data;

    if(row.FeeStatusID==0){         // paid
        newData = '<strong><span class="text-success">' + data + '</span></strong>';
    }
    else if(row.FeeStatusID==1){         // due
        newData = '<strong><span class="text-warning">' + data + '</span></strong>';
    }
    else if(row.FeeStatusID==2){   // overdue
        newData = '<strong><span class="text-danger">' + data + '</span></strong>';
    }

	return newData;
}


export function removeAllSpecialChar(data){ 
    return data.replace(/[^a-zA-Z0-9]/g, "");
}

export function validateTime(data) {
    var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(data);
    return isValid;
}

export function dateCompare(time1, time2) {
    var t1 = new Date();
    var parts = time1.split(":");
    t1.setHours(parts[0], parts[1], 0, 0);
    var t2 = new Date();
    parts = time2.split(":");
    t2.setHours(parts[0], parts[1], 0, 0);

    // returns 1 if greater, -1 if less and 0 if the same
    if (t1.getTime() > t2.getTime()) return 1;
    if (t1.getTime() < t2.getTime()) return -1;
    return 0;
}

export function TimeToDate(time1){
    var t1 = new Date();
    var parts = time1.split(":");
    t1.setHours(parts[0], parts[1], 0, 0);
    return t1;
}


// this function takes an array of date ranges in this format:
// [{ start: Date, end: Date}]
// the array is first sorted, and then checked for any overlap
export function overlap(dateRanges) {
    var sortedRanges = dateRanges.sort((previous, current) => {

        // get the start date from previous and current
        var previousTime = TimeToDate(previous.start).getTime();
        var currentTime = TimeToDate(current.start).getTime();

        // if the previous is earlier than the current
        if (previousTime < currentTime) {
            return -1;
        }

        // if the previous time is the same as the current time
        if (previousTime === currentTime) {
            return 0;
        }

        // if the previous time is later than the current time
        return 1;
    });

    var result = sortedRanges.reduce((result, current, idx, arr) => {
        // get the previous range
        if (idx === 0) { return result; }
        var previous = arr[idx - 1];

        // check for any overlap
        var previousEnd = TimeToDate(previous.end).getTime();
        var currentStart = TimeToDate(current.start).getTime();
        var overlap = (previousEnd >= currentStart);

        // store the result
        if (overlap) {
            // yes, there is overlap
            result.overlap = true;
            // store the specific ranges that overlap
            result.ranges.push({
                previous: previous,
                current: current
            })
        }

        return result;

        // seed the reduce  
    }, { overlap: false, ranges: [] });


    // return the final results  
    return result;
}

export function today() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;
    
    return(today);
}

export default mapForCombo