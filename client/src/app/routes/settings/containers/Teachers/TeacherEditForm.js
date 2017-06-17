import React from 'react'
import { reset } from 'redux-form';
import axios from 'axios';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import EditGeneralInfo from './EditGeneralInfo'
import QualificationForm from './QualificationForm'
import ExperienceForm from './ExperienceForm'
import alert from '../../../../components/utils/alerts'
import mapForCombo from '../../../../components/utils/functions'

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
    console.log('componentWillMount --> TeacherEditForm');

    LoaderVisibility(true);
  }

  componentDidMount(){ 
    //LoaderVisibility(true);
    console.log('componentDidMount --> TeacherEditForm');
  
    // axios.get('/api/nationalities/')
    //     .then(res=>{
    //         const nationalities = mapForCombo(res.data);      
    //         this.setState({nationalities});
    //     });
 
    // axios.get('/api/countries/')
    //     .then(res=>{
    //         const countries = mapForCombo(res.data);
    //         this.setState({countries});
    //     });
    
     setTimeout(function(){ 
        
        this.setState({nowRender:true}) 
        LoaderVisibility(false);
        
      }.bind(this), 500);

    }

  render() {
    const { teacherId, onSubmit, nationalities, countries, onSubmitQualification, onSubmitExperience } = this.props;
    //const {nationalities, countries} = this.state;

    return (

        <div>
        
        {/*<Loader isLoading={this.props.isLoading} />*/}

        <ul id="myTab1" className="nav nav-tabs bordered">
            <li className="active">
                <a href="#s1" data-toggle="tab"><i className="fa fa-fw fa-lg fa-user"/>
                General</a>
            </li>
            <li>
                <a href="#s2" data-toggle="tab"><i className="fa fa-fw fa-lg fa-graduation-cap"/>
                Qualification</a>
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
                { this.state.nowRender ? 
                <EditGeneralInfo teacherId={teacherId} 
                    nationalities={nationalities} 
                    countries={countries}
                    onSubmit={onSubmit} />
                : <div></div>
                }
            </div>
            <div className="tab-pane fade" id="s2">
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