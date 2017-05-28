import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import EditGeneralInfo from './EditGeneralInfo'
import EducationForm from './EducationForm'
import ExperienceForm from './ExperienceForm'
import alert from '../../../../components/utils/alerts'

class TeacherEditForm extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      editDataLoaded: false,
      rating: 0
    }
  }
  
  render() {
    const { teacherId, nationalities, onSubmit, onSubmitEducation, onSubmitExperience } = this.props;

    return (

        <div>

        <ul id="myTab1" className="nav nav-tabs bordered">
            <li className="active">
                <a href="#s1" data-toggle="tab"><i className="fa fa-fw fa-lg fa-user"/>
                General</a>
            </li>
            <li>
                <a href="#s2" data-toggle="tab"><i className="fa fa-fw fa-lg fa-graduation-cap"/>
                Education</a>
            </li>
            <li>
                <a href="#s3" data-toggle="tab"><i className="fa fa-fw fa-lg fa-trophy"/>
                Experience</a>
            </li>
            <li>
                <a href="#s4" data-toggle="tab"><i className="fa fa-fw fa-lg fa-book"/>
                Subjects</a>
            </li>
            <li>
                <a href="#s5" data-toggle="tab"><i className="fa fa-fw fa-lg fa-suitcase"/>
                Classes</a>
            </li>
        </ul>

        <div id="myTabContent1" className="tab-content padding-10">
            <div className="tab-pane fade in active" id="s1">
                <EditGeneralInfo teacherId={teacherId} nationalities={nationalities} 
                    onSubmit={onSubmit} />
            </div>
            <div className="tab-pane fade" id="s2">
                <EducationForm teacherId={teacherId} nationalities={nationalities} 
                    onSubmit={onSubmitEducation}/>
            </div>
            <div className="tab-pane fade" id="s3">
                <ExperienceForm teacherId={teacherId} onSubmit={onSubmitExperience}/>
            </div>
            <div className="tab-pane fade" id="s4">
                <p>
                Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                single-origin coffee squid. Exercitation +1 labore velit, blog
                sartorial PBR leggings next level wes anderson artisan four loko
                farm-to-table craft beer twee.
                </p>
            </div>
            <div className="tab-pane fade" id="s5">
                <p>
                Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                single-origin coffee squid. Exercitation +1 labore velit, blog
                sartorial PBR leggings next level wes anderson artisan four loko
                farm-to-table craft beer twee.
                </p>
            </div>
        </div>
        
        </div>
    )
  }
}
       
export default TeacherEditForm