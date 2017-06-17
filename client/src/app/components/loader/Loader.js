import React from 'react';
import {connect} from 'react-redux';

import LoaderActions from './LoaderActions'
import store from '../../store/configureStore'

class Loader extends React.Component{
    constructor(props){
        super(props);
    }    

//     componentWillReceiveProps(nextProps) {
//         console.log('componentWillReceiveProps --> loader');
    
//         const {show} = nextProps;

//         if(show==1){
//             this.props.visible;
//         }
//         else
//             this.props.hide;
    
// }    

    render(){
        console.log(this.props.isLoading);  
        return(
            
            this.props.isLoading == 1 ?
            <div className="loader">
                {/*<img src="assets/img/ajax-loader.gif" // place your logo here
                         alt="SmartAdmin"/>*/}
                <div className="sk-cube-grid">
                    <div className="sk-cube sk-cube1"></div>
                    <div className="sk-cube sk-cube2"></div>
                    <div className="sk-cube sk-cube3"></div>
                    <div className="sk-cube sk-cube4"></div>
                    <div className="sk-cube sk-cube5"></div>
                    <div className="sk-cube sk-cube6"></div>
                    <div className="sk-cube sk-cube7"></div>
                    <div className="sk-cube sk-cube8"></div>
                    <div className="sk-cube sk-cube9"></div>
                </div>
            </div>
            :
            <div></div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.loader,
    };
}

// function mapDispatchToProps(dispatch) {
//     return {
//         visible: () => dispatch(LoaderActions.visible()),
//         hide: () => dispatch(LoaderActions.hide())
//     };
// }

//export default connect(mapStateToProps,mapDispatchToProps)(Loader);
export default connect(mapStateToProps, null)(Loader);


export function Visibility(visible){
    
    if(visible){
        store.dispatch(LoaderActions.visible());
    }
    else{
        store.dispatch(LoaderActions.hide());
    }

} 