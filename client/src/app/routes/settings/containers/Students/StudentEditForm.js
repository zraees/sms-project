import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

// import EditGeneralInfo from './EditGeneralInfo'
import PreviousSchoolsForm from './PreviousSchoolsForm'
import SiblingDetailsForm from './SiblingDetailsForm'
import RelativesForm from './RelativesForm'
import ParentsForm from './ParentsForm'
import alert from '../../../../components/utils/alerts'
import mapForCombo from '../../../../components/utils/functions'
import Msg from '../../../../components/i18n/Msg'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'

class TeacherEditForm extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
        editDataLoaded: false,  
        nowRender: false
    }
  }

  componentWillMount() {
    console.log('componentWillMount --> TeacherEditForm');

    LoaderVisibility(true);
  }

  componentDidMount(){ 
    //LoaderVisibility(true);
    console.log('componentDidMount --> TeacherEditForm');
   
     setTimeout(function(){ 
        
        this.setState({nowRender:true}) 
        LoaderVisibility(false);
        
      }.bind(this), 500);

    }

  render() {
    const { studentId, onSubmit, nationalities, countries, onSubmitPreviousSchool, onSubmitSiblingDetail, onSubmitStudentRelative, onSubmitStudentParent } = this.props;
    //, onSubmitQualification, onSubmitExperience 

    return (

        <div>
        
        {/*<Loader isLoading={this.props.isLoading} />*/}

        <ul id="myTab1" className="nav nav-tabs bordered">
            <li className="active">
                <a href="#s1" data-toggle="tab"><i className="fa fa-fw fa-lg fa-user"/>
                    <Msg phrase="General" />
                </a>
            </li>
            <li>
                <a href="#s2" data-toggle="tab"><i className="fa fa-fw fa-lg fa-graduation-cap"/>
                    <Msg phrase="LastSchoolAndSiblingDetailsTitleText" />
                </a>
            </li>
            <li>
                <a href="#s3" data-toggle="tab"><i className="fa fa-fw fa-lg fa-trophy"/>
                    <Msg phrase="ParentGuardianInformationTitleText" />
                </a>
            </li>
            <li>
                <a href="#s4" data-toggle="tab"><i className="fa fa-fw fa-lg fa-book"/>
                    <Msg phrase="EmergencyContactDetailsTitleText" />
                </a>
            </li>
            <li>
                <a href="#s5" data-toggle="tab"><i className="fa fa-fw fa-lg fa-suitcase"/>
                    <Msg phrase="EducationalServicesHistoryTitleText" />
                </a>
            </li>
            <li>
                <a href="#s6" data-toggle="tab"><i className="fa fa-fw fa-lg fa-suitcase"/>
                    <Msg phrase="MedicalInformationTitleText" />
                </a>
            </li>
        </ul>

        <div id="myTabContent1" className="tab-content padding-10">
            <div className="tab-pane fade in active" id="s1">
                { this.state.nowRender ? 
                    <div>EditGeneralInfo from teacher</div>
                    
                : <div></div>
                }
            </div>
            <div className="tab-pane fade" id="s2">
                { this.state.nowRender ? 
                    <div className="panel-group smart-accordion-default" id="accordion-2">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title"><a data-toggle="collapse"
                                                         data-parent="#accordion-2"
                                                         href="#collapseOne-1"> <i
                            className="fa fa-fw fa-plus-circle "/> <i
                            className="fa fa-fw fa-minus-circle "/> <Msg phrase="LastSchoolTitleText" /> </a></h4>
                        </div>
                        <div id="collapseOne-1" className="panel-collapse collapse in">
                          <div className="panel-body">
                            <PreviousSchoolsForm studentId={studentId} 
                                onSubmit={onSubmitPreviousSchool}/>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title"><a data-toggle="collapse"
                                                         data-parent="#accordion-2"
                                                         href="#collapseTwo-1"
                                                         className="collapsed"> <i
                            className="fa fa-fw fa-plus-circle"/> <i
                            className="fa fa-fw fa-minus-circle"/> <Msg phrase="SiblingsDetailsTitleText" /> </a></h4>
                        </div>
                        <div id="collapseTwo-1" className="panel-collapse collapse">
                          <div className="panel-body">
                            <SiblingDetailsForm studentId={studentId} 
                                onSubmit={onSubmitSiblingDetail}/>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title"><a data-toggle="collapse"
                                                         data-parent="#accordion-2"
                                                         href="#collapseThree-1"
                                                         className="collapsed"> <i
                            className="fa fa-fw fa-plus-circle"/> <i
                            className="fa fa-fw fa-minus-circle"/> <Msg phrase="StudentRelativeTitleText" /> </a></h4>
                        </div>
                        <div id="collapseThree-1" className="panel-collapse collapse">
                          <div className="panel-body">
                            <RelativesForm studentId={studentId} 
                                onSubmit={onSubmitStudentRelative}/>
                          </div>
                        </div>
                      </div>
                    </div> 
                : <div></div>
                }
            </div>
            <div className="tab-pane fade" id="s3">
                { this.state.nowRender ? 
                    <ParentsForm studentId={studentId} 
                                onSubmit={onSubmitStudentParent}/>
                : <div></div>
                }
            </div>
            <div className="tab-pane fade" id="s4">
                { this.state.nowRender ? 
                     <div>sss</div>
                : <div></div>
                }
            </div>
            <div className="tab-pane fade" id="s5">
                <p>
                Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                single-origin coffee squid. Exercitation +1 labore velit, blog
                sartorial PBR leggings next level wes anderson artisan four loko
                farm-to-table craft beer twee.
                </p>
            </div>
            <div className="tab-pane fade" id="s6">
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