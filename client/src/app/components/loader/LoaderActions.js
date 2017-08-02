
export default class LoaderActions {

    // static properties to be used in reducer for switch cases
    static VISIBLE = "VISIBLE";
    static HIDE = "HIDE";
    
    // static functions to be mapped with dispatch in component
    static visible(){
        //console.log('action visible');
        return { 
            type: 'VISIBLE'
        }
    }

    static hide(){
        //console.log('action hide');
        return { 
            type: 'HIDE' 
        }
    }

}