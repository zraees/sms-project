import React from 'react'
import classnames from 'classnames'

import {smallBox, bigBox, SmartMessageBox} from "./actions/MessageActions";
import Msg from '../i18n/Msg'
import LanguageStore from '../i18n/LanguageStore'

function alert(type, message){
    let titleText = LanguageStore.getData().phrases["SystemAlertText"] || "System Alert";
    let messageText = LanguageStore.getData().phrases["message"] || message;
    
    if(type === 's'){
        smallBox({
            title: titleText,
            content: "<i class='fa fa-thumbs-o-up'></i> <i>" + messageText + "</i>",
            color: "#659265",
            iconSmall: "fa fa-check fa-2x  animated"//,     //messageText
            //timeout: 3000
        });
    }
    else if(type === 'f'){
        smallBox({
            title: titleText,
            content: "<i class='fa fa-thumbs-o-down'></i> <i>Something went wrong, please contact system administrator</i>",
            //content: "<i class='fa fa-thumbs-o-down'></i> <i>"+<Msg phrase="Recent projects" />+"</i>",
            color: "#C46A69",
            //timeout: 5000,
            iconSmall: "fa fa-times fa-2x  animated"    //fadeInRight
        });
    }
}

export function confirmation(message, callback){
    let titleText = LanguageStore.getData().phrases["Confirmation!"] || "Confirmation!";
    let noText = LanguageStore.getData().phrases["noText"] || "No";
    let yesText = LanguageStore.getData().phrases["yesText"] || "Yes";
    let messageText = LanguageStore.getData().phrases[message] || message;
    SmartMessageBox({
        title: titleText,
        content: messageText,
        buttons: '['+yesText+']['+noText+']'
    }, callback);
}

export default alert