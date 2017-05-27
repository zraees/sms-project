import classnames from 'classnames'

import {smallBox, bigBox, SmartMessageBox} from "./actions/MessageActions";
import Msg from '../i18n/Msg'

function alert(type, message){
    
    if(type === 's'){
        smallBox({
            title: "System Alert",
            content: "<i class='fa fa-thumbs-o-up'></i> <i>" + message + "</i>",
            color: "#659265",
            iconSmall: "fa fa-check fa-2x fadeInRight animated",
            timeout: 3000
        });
    }
    else if(type === 'f'){
        smallBox({
            title: "System Alert",
            content: "<i class='fa fa-thumbs-o-down'></i> <i>Something went wrong, please contact system administrator</i>",
            color: "#C46A69",
            iconSmall: "fa fa-times fa-2x fadeInRight animated",
            timeout: 5000
        });
    }

    // smallBox({
    //     title: "System Alert",
    //     content: "<i className={classnames(['fa ', {'fa-thumbs-o-up': type==='s', 'fa-thumbs-o-down': type==='f'}])}></i> <i>" + message + "</i>",
    //     color: "#659265",
    //     iconSmall: "fa fa-2x fadeInRight animated fa-check",
    //     timeout: 3000
    // });
            
}

export function confirmation(message, callback){
    SmartMessageBox({
        title: "Confirmation!",
        content: message,
        buttons: '[No][Yes]'
    }, callback);
}

export default alert