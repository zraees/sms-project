import React from 'react'
import { reset } from 'redux-form'
import axios from 'axios'
import classNames from 'classnames'

import { Field, reduxForm } from 'redux-form'

import Datatable from '../../../../components/tables/Datatable'

import RFDatePicker from '../../../../components/ui/RFDatePicker'
import RFReactSelect from '../../../../components/ui/RFReactSelect'
import RFRadioButtonList from '../../../../components/ui/RFRadioButtonList'
import RFField from '../../../../components/ui/RFField'
import RFTextArea from '../../../../components/ui/RFTextArea'

import {required, email}  from '../../../../components/forms/validation/CustomValidation'
import asyncValidate from './asyncValidate'
import AlertMessage from '../../../../components/common/AlertMessage'
import alert from '../../../../components/utils/alerts'
import {removeExperience} from './submit'
import mapForCombo from '../../../../components/utils/functions'


class ExperienceForm extends React.Component  {
  
  constructor(props){
    super(props);
     this.state = {
      states: [],
      cities: []
    }
    this.handleCountryBlur = this.handleCountryBlur.bind(this);
    this.handleStateBlur = this.handleStateBlur.bind(this);
    this.handleCityBlur = this.handleCityBlur.bind(this);

  }
    
componentDidMount(){ 
    console.log('componentDidMount --> ExperienceForm');

    this.props.change('teacherId', this.props.teacherId); // function provided by redux-form

    $('#teacherExperiencesGrid').on('click', 'td', function(event) {
      
      if ($(this).find('#dele').length > 0) {
        
        //alert(  $(this).find('#dele').data('tid'));
        var id = $(this).find('#dele').data('tid');
        removeExperience(id, $(this));

      }
    });

}

  handleCountryBlur(obj, value){
    //console.log('before experience states');
    axios.get('/api/states/' + value)
        .then(res=>{
            const states = mapForCombo(res.data);                          
            this.setState({states});
        });
 
  }

  handleStateBlur(obj, value){
    axios.get('/api/cities/' + value)
        .then(res=>{
            const cities = mapForCombo(res.data);                          
            this.setState({cities});
        });
 
  }

  handleCityBlur(obj, value){
    //console.log(obj);
    //console.log(value);
  }

  render() {
    const { teacherId, handleSubmit, countries, pristine, reset, submitting, touched, error, warning } = this.props
    const { states, cities } = this.state;

    return (

        <div className="tabbable tabs">
            
            <ul className="nav nav-tabs">
                <li id="tabAddLink" className="active">
                    <a id="tabAddExp" data-toggle="tab" href="#AAA">Add</a>
                </li>
                <li id="tabListLink">
                    <a id="tabListExp" data-toggle="tab" href="#BBB">List</a>
                </li> 
            </ul>

            <div className="tab-content padding-10">
                <div className="tab-pane active" id="AAA">
                    
                    <form id="form-teacher-experience" className="smart-form" 
                        onSubmit={handleSubmit}>
                        <fieldset>

                        <div className="row">
                            <section>
                                <Field name="companyName" labelClassName="input" labelIconClassName="icon-append fa fa-graduation-cap"
                                    validate={required} component={RFField} type="text" placeholder="Company Name"/>    
                            </section>
                        </div>

                        <div className="row">
                            <section className="col col-4">
                                <Field name="startDate" placeholder="Start Date" component={RFDatePicker} />
                            </section>
                            <section className="col col-4">
                                <Field name="endDate" placeholder="End Date" component={RFDatePicker} />
                            </section>
                            <section className="col col-4">
                                <Field name="designation" labelClassName="input" labelIconClassName="icon-append fa fa-graduation-cap"
                                    validate={required} component={RFField} type="text" placeholder="Designation"/>  
                            </section>
                        </div>

                        <div className="row">
                            <section className="col col-4">
                                <Field
                                    multi={false}
                                    name="countryId"
                                    placeholder="Country"
                                    options={countries}
                                    onBlur={this.handleCountryBlur}
                                    component={RFReactSelect} />
                            </section>

                            <section className="col col-4">
                                <Field
                                    multi={false}
                                    name="stateId"
                                    placeholder="State"
                                    options={states}
                                    onBlur={this.handleStateBlur}
                                    component={RFReactSelect} />
                            </section>

                            <section className="col col-4">
                                <Field
                                    multi={false}
                                    name="cityId"
                                    placeholder="City"
                                    options={cities}
                                    onBlur={this.handleCityBlur}
                                    component={RFReactSelect} />
                            </section>
                        </div>

                        <div className="row">                            
                            <section>
                                <Field name="leavingReason" labelClassName="input" labelIconClassName="icon-append fa fa-book"
                                    component={RFField} type="text" placeholder="Reason of leaving"/>    
                            </section>
                        </div>

                        {(error!==undefined && <AlertMessage type="w" icon="alert-danger" message={error} />)}

                        <Field component="input" type="hidden" name="teacherId"/>

                        <footer>
                            <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary">
                            Reset
                            </button>
                            <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
                            Save
                            </button>
                        </footer>
                        </fieldset>
                    </form>

                </div>
                <div className="tab-pane" id="BBB">
                    
                    <Datatable id="teacherExperiencesGrid"  
                      options={{
                        ajax: {"url":'/api/TeacherExperiences/' + teacherId, "dataSrc": ""},
                        columnDefs: [
                            {/*{ 
                                "type": "date",
                                "render": function ( data, type, row ) {
                                  //console.log(data);
                                  return data;
                                    //return '<Moment date="2017-05-26T00:00:00" format="DD-MM-YYYY" ></Moment>';  //return data !== null ? moment(data, "DD-MM-YYYY") : null;
                                },
                                "targets": 5 
                            },*/},
                            {
                                "mRender": function (data, type, full) {
                                    //console.log(data);
                                    {/*if(data!=null){
                                    //var dtStart = new Date(parseInt(data.substr(6)));
                                    var dtStartWrapper = moment(data, "MM-DD-YYYY")
                                    console.log(dtStartWrapper);
                                    return dtStartWrapper;
                                    }*/}
                                    return data; //dtStartWrapper.format('DD/MM/YYYY');
                                },
                                "targets": 1
                            }
                            ,{ 
                                "render": function ( data, type, row ) {
                                  //return (<a onClick={onOrderRestaurant.bind(self, this)} 
                                  //                className="btn btn-primary btn-sm">Order this restaurant
                                  //                </a>);
                                  return '<a id="dele" data-tid="' + data + '"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Edit</span></a>';
                                    //return ('<a onClick={self.handleClick.bind(self, 1)}>del</a>');
                                    //return '<a onClick={self.handleClick} className="btn btn-success">click</a>';
                                    //return '<a onClick="javascript:deleteConfirm()" className="btn btn-success"> Callback ()</a>';
                                    //return '<a data-toggle="modal" data-id="' + data + '" data-target="#teacherPopup"><i class=\"glyphicon glyphicon-edit\"></i><span class=\"sr-only\">Delete</span></a>';
                                }.bind(self),
                                "className": "dt-center",
                                "sorting": false,
                                "targets": 6
                            }
                        ],
                        columns: [
                          //{
                          //    "className":      'details-control',
                          //    "orderable":      false,
                          //    "data":           null,
                          //    "defaultContent": ''
                          //},
                          {data: "CompanyName"},
                          {data: "StartDate"},
                          {data: "EndDate"},    
                          {data: "TotalExperience"},  
                          {data: "Designation"},  
                          {data: "LeavingReason"},
                          {data: "TeacherExperienceId"}
                        ],
                        buttons: [
                          'copy', 'excel', 'pdf'
                        ]
                      }}
                      paginationLength={true} 
                      //refresh={this.state.refresh}
                      className="table table-striped table-bordered table-hover"
                      width="100%">
                      <thead>
                      <tr>
                        <th data-hide="mobile-p">Company Name</th>
                        <th data-class="expand">Start Date</th>
                        <th data-hide="mobile-p">End Date</th>
                        <th data-hide="mobile-p">Total Experience</th>
                        <th data-hide="mobile-p">Designation</th>
                        <th data-hide="mobile-p">Reason of Leaving</th>
                        <th data-hide="mobile-p"></th>
                      </tr>
                      </thead>
                    </Datatable>

                </div> 
            </div>
        </div>
            
    )
  }
}
       
const afterSubmit = (result, dispatch) =>
  dispatch(reset('ExperienceForm'));

export default reduxForm({
  form: 'ExperienceForm',  // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  keepDirtyOnReinitialize: false
  // ,
  // asyncValidate,
  // asyncBlurFields: ['email']
})(ExperienceForm) 