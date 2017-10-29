import React from 'react'
import { reset } from 'redux-form'
import axios from 'axios'
import classNames from 'classnames'

import { Field, reduxForm } from 'redux-form'

import Datatable from '../../../../components/tables/Datatable'
import {RFField, RFDatePicker, RFRadioButtonList, RFReactSelect, RFTextArea} from '../../../../components/ui'

import {required, email}  from '../../../../components/forms/validation/CustomValidation'
import AlertMessage from '../../../../components/common/AlertMessage'
import {submitExperience, removeExperience} from './submit'
import mapForCombo from '../../../../components/utils/functions'
import Msg from '../../../../components/i18n/Msg'

class ExperienceForm extends React.Component  {
  
  constructor(props){
    super(props);
     this.state = {
      states: [],
      teacherId: 0,
      cities: []
    }
    this.handleCountryBlur = this.handleCountryBlur.bind(this);
    this.handleStateBlur = this.handleStateBlur.bind(this);
    this.handleCityBlur = this.handleCityBlur.bind(this);

  }
    
componentDidMount(){ 
    console.log('componentDidMount --> ExperienceForm');

    this.setState({teacherId: this.props.teacherId});
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
    const { handleSubmit, countries, pristine, reset, submitting, touched, error, warning } = this.props
    const { teacherId, states, cities } = this.state;

    return (

        <div className="tabbable tabs">
            
            <ul className="nav nav-tabs">
                <li id="tabAddLink" className="active">
                    <a id="tabAddExp" data-toggle="tab" href="#AAA"><Msg phrase="AddText" /></a>
                </li>
                <li id="tabListLink">
                    <a id="tabListExp" data-toggle="tab" href="#BBB"><Msg phrase="ListText" /></a>
                </li> 
            </ul>

            <div className="tab-content padding-10">
                <div className="tab-pane active" id="AAA">
                    
                    <form id="form-teacher-experience" className="smart-form" 
                        onSubmit={handleSubmit((values)=>{submitExperience(values, teacherId)})}>
                        <fieldset>

                        <div className="row">
                            <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                                <Field name="companyName" labelClassName="input" labelIconClassName="icon-append fa fa-graduation-cap"
                                    validate={required} component={RFField} 
                                    maxLength="150" type="text" 
                                    label="CompanyNameText"
                                    placeholder="Please enter company name"/>
                            </section>
                        </div>

                        <div className="row">
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field name="startDate" label="StartDateText" component={RFDatePicker} />
                            </section>
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field name="endDate" label="EndDateText" component={RFDatePicker} />
                            </section>
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field name="designation" labelClassName="input" labelIconClassName="icon-append fa fa-graduation-cap"
                                    validate={required} component={RFField} 
                                    maxLength="50" type="text" 
                                    placeholder="Please enter designation" 
                                    label="DesignationText"/>
                            </section>
                        </div>

                        <div className="row">
                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field
                                    multi={false}
                                    name="countryId"
                                    label="CountryText"
                                    options={countries}
                                    onBlur={this.handleCountryBlur}
                                    component={RFReactSelect} />
                            </section>

                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field
                                    multi={false}
                                    name="stateId"
                                    label="StateText"
                                    options={states}
                                    onBlur={this.handleStateBlur}
                                    component={RFReactSelect} />
                            </section>

                            <section className="remove-col-padding col-sm-4 col-md-4 col-lg-4">
                                <Field
                                    multi={false}
                                    name="cityId"
                                    label="CityText"
                                    options={cities}
                                    onBlur={this.handleCityBlur}
                                    component={RFReactSelect} />
                            </section>
                        </div>

                        <div className="row">                            
                            <section className="remove-col-padding col-sm-12 col-md-12 col-lg-12">
                                <Field name="leavingReason" labelClassName="input" labelIconClassName="icon-append fa fa-book"
                                    component={RFField} type="text" 
                                    label="LeavingReasonText"
                                    placeholder="Please enter reason of leaving"/>
                            </section>
                        </div>

                        {(error!==undefined && <AlertMessage type="w" icon="alert-danger" message={error} />)}

                        <Field component="input" type="hidden" name="teacherId"/>

                        <footer>
                            <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary">
                            <Msg phrase="ResetText"/>
                            </button>
                            <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
                            <Msg phrase="SaveText"/>
                            </button>
                        </footer>
                        </fieldset>
                    </form>

                </div>
                <div className="tab-pane table-responsive" id="BBB">
                    
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
                        <th data-hide="mobile-p"><Msg phrase="CompanyNameText"/></th>
                        <th data-class="expand"><Msg phrase="StartDateText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="EndDateText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="TotalExperienceText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="DesignationText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="LeavingReasonText"/></th>
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