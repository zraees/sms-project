import LanguageStore from '../i18n/LanguageStore'
//import store from '../../store/configureStore'
//import LoaderActions from '../Loader/LoaderActions'


function mapForCombo(keyValues){
    return keyValues.map(function(item, index){
                return {value: item.Id + "", label: item.Name};
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

export default mapForCombo