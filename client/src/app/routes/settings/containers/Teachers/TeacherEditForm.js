import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import EditGeneralInfo from './EditGeneralInfo'
import QualificationForm from './QualificationForm'
import ExperienceForm from './ExperienceForm'
import TeacherSubjectsForm from './TeacherSubjectsForm'
import TeacherClassesForm from './TeacherClassesForm'
import alert from '../../../../components/utils/alerts'
import mapForCombo from '../../../../components/utils/functions'
import Msg from '../../../../components/i18n/Msg'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'

class TeacherEditForm extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
        editDataLoaded: false,
        rating: 0,
        nationalities: [],
        countries: [],
        nowRender: false
    }
  }

  componentWillMount() {
    //console.log('componentWillMount --> TeacherEditForm');

    LoaderVisibility(true);
  }

  componentDidMount(){ 
    //LoaderVisibility(true);
    //console.log('componentDidMount --> TeacherEditForm');
        
     setTimeout(function(){ 
        
        this.setState({nowRender:true}) 
        LoaderVisibility(false);
        
      }.bind(this), 100);

    }

  render() {
    const { teacherId, onSubmit, nationalities, countries, genderOptions, onSubmitQualification, onSubmitExperience, onSubmitTeacherSubject, onSubmitTeacherClass } = this.props;
    //const {nationalities, countries} = this.state;

    return (

        <div>
        
        {/*<Loader isLoading={this.props.isLoading} />*/}

        <ul id="myTab1" className="nav nav-tabs bordered">
            {/* <li className="active">
                <a href="#s1" data-toggle="tab"><i className="fa fa-fw fa-lg fa-user"/>
                <Msg phrase="General" />
                </a>
            </li> */}
            <li className="active">
                <a href="#s2" data-toggle="tab"><i className="fa fa-fw fa-lg fa-graduation-cap"/>
                <Msg phrase="Qualification" />
                </a>
            </li>
            <li>
                <a href="#s3" data-toggle="tab"><i className="fa fa-fw fa-lg fa-trophy"/>
                <Msg phrase="Experience" />
                </a>
            </li>
            <li>
                <a href="#s4" data-toggle="tab"><i className="fa fa-fw fa-lg fa-book"/>
                <Msg phrase="SubjectsText" />
                </a>
            </li>
            <li>
                <a href="#s5" data-toggle="tab"><i className="fa fa-fw fa-lg fa-institution"/>
                <Msg phrase="Classes" />
                </a>
            </li>
        </ul>

        <div id="myTabContent1" className="tab-content padding-10">
            {/* <div className="tab-pane fade in active" id="s1">
                { this.state.nowRender ? 
                <EditGeneralInfo teacherId={teacherId} 
                    nationalities={nationalities} 
                    genderOptions={genderOptions}
                    countries={countries}
                    onSubmit={onSubmit} />
                : <div></div>
                }
            </div> */}
            <div className="tab-pane fade in active" id="s2">
                { this.state.nowRender ? 
                    <QualificationForm teacherId={teacherId} 
                        onSubmit={onSubmitQualification}/>
                : <div></div>
                }
            </div>
            <div className="tab-pane fade" id="s3">
                { this.state.nowRender ? 
                    <ExperienceForm teacherId={teacherId} 
                        countries={countries}
                        onSubmit={onSubmitExperience}/>
                : <div></div>
                }
            </div>
            <div className="tab-pane fade" id="s4">
                { this.state.nowRender ? 
                    <TeacherSubjectsForm teacherId={teacherId}                         
                        onSubmit={onSubmitTeacherSubject}/>
                : <div></div>
                }
            </div>
            <div className="tab-pane fade" id="s5">
                { this.state.nowRender ? 
                    <TeacherClassesForm teacherId={teacherId}                         
                        onSubmit={onSubmitTeacherClass}/>
                : <div></div>
                }
            </div>
        </div>
        
        </div>
    )
  }
}
       
export default TeacherEditForm