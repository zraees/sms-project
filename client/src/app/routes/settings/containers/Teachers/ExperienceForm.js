import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';

import alert from '../../../../components/utils/alerts'

class ExperienceForm extends React.Component {
 
  
  render() {
    const { teacherId, onSubmit } = this.props;

    return (

        <div className="tabbable tabs-below">
            <div className="tab-content padding-10">
                <div className="tab-pane active" id="tabAddExp">
                    {teacherId}
                </div>
                <div className="tab-pane" id="tabListExp">
                    <p>
                    Search ...
                    </p>
                </div> 
            </div>
            <ul className="nav nav-tabs">
                <li className="active">
                    <a data-toggle="tab" href="#tabAddExp">Add</a>
                </li>
                <li>
                    <a data-toggle="tab" href="#tabListExp">List</a>
                </li> 
            </ul>
        </div>
            
    )
  }
}
       
export default ExperienceForm