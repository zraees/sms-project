import LanguageStore from '../i18n/LanguageStore'
//import store from '../../store/configureStore'
//import LoaderActions from '../Loader/LoaderActions'

import moment from 'moment'

// export function getDate(){
//     moment.locale('en'); // default the locale to English
//     var localLocale = moment();

//     localLocale.locale('fr'); // set this instance to use French
//     return localLocale.format('LLLL'); // dimanche 15 juillet 2012 11:01
//     //moment().format('LLLL'); // Sunday, July 15 2012 11:01 AM

// }

function mapForCombo(keyValues){
    return keyValues.map(function(item, index){
                return {value: item.Id + "", label: item.Name};
            });                       
}

export function mapForRadioList(keyValues){
    return keyValues.map(function(item, index){
                return {title: item.Name, value: item.Id + ""};
            });                       
}
// export function LoaderVisibity(visible){
    
//     if(visible){
//         store.dispatch(LoaderActions.visible());
//     }
//     else{
//         store.dispatch(LoaderActions.hide());
//     }

// } 

export function isYesClicked(ButtonPressed){
    let yesText = LanguageStore.getData().phrases["yesText"] || "Yes!";
    return ButtonPressed===yesText ? true : false;
} 

export function isNoClicked(ButtonPressed){
    let noText = LanguageStore.getData().phrases["noText"] || "No";
    return ButtonPressed===noText ? true : false;
}

export function getLangKey(){
    return JSON.parse(localStorage.getItem('sm-lang')).key || "us"
}

export function getLang(){
    return JSON.parse(localStorage.getItem('sm-lang')) //|| "us"
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