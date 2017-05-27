import React from 'react'
import classnames from 'classnames'

const AlertMessage = (props) => {
    
    return(
        <div className={classnames(['alert fade in', props.icon])}>
            <button className="close" data-dismiss="alert">
            ×
            </button>
            <i className={classnames(['fa-fw fa', 
                                    {'fa-times': props.type==='e', 'fa-info':props.type==='i',
                                    'fa-warning': props.type==='w', 'fa-check':props.type==='s'}])}/>
            <strong>Error!</strong> {props.message}
        </div>        
    )
}

export default AlertMessage;
