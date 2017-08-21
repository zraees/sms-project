/**
 * Created by griga on 11/30/15.
 */

import React from 'react'
import axios from 'axios' 
import {SubmissionError} from 'redux-form'
import {connect} from 'react-redux'
import moment from 'moment'

import contextmenu from 'ui-contextmenu'
 

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import JarvisWidget from '../../../../components/widgets/JarvisWidget'
import Datatable from '../../../../components/tables/Datatable'
import Msg from '../../../../components/i18n/Msg'

import Moment from '../../../../components/utils/Moment'

import StudentForm from './StudentForm'
import StudentDocumentsForm from './StudentDocumentsForm'
import EditGeneralInfo from './EditGeneralInfo'
import PreviousSchoolsForm from './PreviousSchoolsForm'
import SiblingDetailsForm from './SiblingDetailsForm'
import RelativesForm from './RelativesForm'
import ParentsForm from './ParentsForm'
import EmergencyContactsForm from './EmergencyContactsForm'
import SpecialServicesForm from './SpecialServicesForm'
import MedicalDetailsForm from './MedicalDetailsForm'

import submit, {remove, submitPreviousSchool, submitSiblingDetail, submitStudentRelative, submitStudentParent, submitStudentEmergencyContactDetail, submitStudentSpecialSevices, submitStudentMedicalDetails } from './submit'
import mapForCombo, {renderDate} from '../../../../components/utils/functions'

//http://live.datatables.net/caderego/1/edit
//https://github.com/mar10/jquery-ui-contextmenu

class StudentsPage extends React.Component {
  
  constructor(props){ 
   super(props);
   this.state = {
     studentId: 0,
     singleEditMode: 0,
     nationalities: [],
     countries: [],
     popupPageName: '',
     refreshGrid: false
   }
    
    this.handleClick = this.handleClick.bind(this);
    this.renderModalBody = this.renderModalBody.bind(this);
    
  }
  
  componentWillMount() {
    LoaderVisibility(true);
  }
  
  renderModalBody(){
    console.log('this.state.popupPageName ==> ', this.state.popupPageName);
      
   // this.setState({refreshGrid:false});       
    if(this.state.popupPageName == "EditGeneralInfo"){ 
      //this.setState({refreshGrid:true});
      return <EditGeneralInfo teacherId={this.state.teacherId} 
          nationalities={this.state.nationalities} 
          genderOptions={this.state.genderOptions}
          countries={this.state.countries}
          onSubmit={submit} />
    }
    else if(this.state.popupPageName == "StudentDocumentsForm"){
      return <StudentDocumentsForm
          studentId={this.state.studentId}   
          //onSubmitPreviousSchool={submitPreviousSchool} 
          />
    }
    else if(this.state.popupPageName == "PreviousSchoolsForm"){
      return <PreviousSchoolsForm
          studentId={this.state.studentId}   
          onSubmitPreviousSchool={submitPreviousSchool} />
    }
    else if(this.state.popupPageName == "SiblingDetailsForm"){
      return <SiblingDetailsForm
          studentId={this.state.studentId}   
          onSubmitSiblingDetail={submitSiblingDetail} />
    }
    else if(this.state.popupPageName == "RelativesForm"){
      return <RelativesForm
          studentId={this.state.studentId}   
          onSubmitStudentRelative={submitStudentRelative} />
    }
    else if(this.state.popupPageName == "ParentsForm"){
      return <ParentsForm
          studentId={this.state.studentId}   
          onSubmitStudentParent={submitStudentParent} />
    }
    else if(this.state.popupPageName == "EmergencyContactsForm"){
      return <EmergencyContactsForm
          studentId={this.state.studentId}   
          onSubmitStudentEmergencyContactDetail={submitStudentEmergencyContactDetail} />
    }
    else if(this.state.popupPageName == "SpecialServicesForm"){
      return <SpecialServicesForm
          studentId={this.state.studentId}   
          onSubmitStudentSpecialSevices={submitStudentSpecialSevices} />
    }
    else if(this.state.popupPageName == "MedicalDetailsForm"){
      return <MedicalDetailsForm
          studentId={this.state.studentId}   
          onSubmitStudentMedicalDetails={submitStudentMedicalDetails} />
    }
    
  }

  componentDidMount(){ 

    console.log('componentDidMount --> StudentPage');

    $(document).contextmenu({
      delegate: ".dataTable td",
      autoFocus: true,
      preventContextMenuForPopup: true,
      preventSelect: true,
      taphold: true,
      menu: [
      {title: "Edit", cmd: "EditGeneralInfo", uiIcon: "ui-icon-scissors"},
      {title: "Documents", cmd: "StudentDocumentsForm", uiIcon: "ui-icon-scissors"},
      {title: "Parents Details", cmd: "ParentsForm", uiIcon: "ui-icon-copy"},
      {title: "Emergency Contacts", cmd: "EmergencyContactsForm", uiIcon: "ui-icon-copy"},
      {title: "----"},
      {title: "Previous School Details", cmd: "PreviousSchoolsForm", uiIcon: "ui-icon-copy"},
      {title: "Sibling Details", cmd: "SiblingDetailsForm", uiIcon: "ui-icon-clipboard"},   //, disabled: true
      {title: "Relatives Details", cmd: "RelativesForm", uiIcon: "ui-icon-copy"},
      {title: "Special Services", cmd: "SpecialServicesForm", uiIcon: "ui-icon-copy"},
      {title: "Medical Details", cmd: "MedicalDetailsForm", uiIcon: "ui-icon-copy"},        
      // {title: "More", children: [
      //   {title: "Use an 'action' callback", action: function(event, ui) {
      //     alert("action callback sub1");
      //     } },
      //   {title: "Tooltip (static)", cmd: "sub2", tooltip: "Static tooltip"},
      //   {title: "Tooltip (dynamic)", tooltip: function(event, ui){ return "" + Date(); }},
      //   {title: "Custom icon", cmd: "browser", uiIcon: "ui-icon custom-icon-firefox"},
      //   {title: "Disabled (dynamic)", disabled: function(event, ui){
      //     return false;
      //     }}
      //   ]}
      ],
      select: function(event, ui) {
        var coltext = ui.target.text();
        var colvindex = ui.target.parent().children().index(ui.target);
        var rowindex = ui.target.parent().index(); 
        var colindex = $('table thead tr th:eq('+colvindex+')').data('column-index');
        var id = $('table tbody tr:eq('+rowindex+') td:last-child a').data('tid');
        //alert(colvindex);
        //alert(rowindex);
        //alert(id);
        id = 55;
        //console.log(ui.cmd);

        this.setState({popupPageName:ui.cmd, studentId:id});
        $('#StudentPopup').modal('show'); 
        // switch(ui.cmd){
        //   case "EditGeneralInfo":
        //     this.setState({popupPageName:'', studentId:id})
        //     //alert('^' + coltext + '$ ' + colindex);
        //     break;
        //   case "PreviousSchoolsForm":
        //     alert('PreviousSchoolsForm');
        //     break;
        // }
      }.bind(this),
      beforeOpen: function(event, ui) {
        var $menu = ui.menu,
          $target = ui.target,
          extraData = ui.extraData;
          //ui.menu.zIndex( $(event.target).zIndex() + 1);
        //ui.menu.zIndex(9999);
        }
    });

    $('#StudentsGrid').on('click', 'td', function(event) {
      
      if ($(this).find('#dele').length > 0) { 
        var id = $(this).find('#dele').data('tid');
        remove(id, $(this));
      }
    });
    
    // call before modal open
    $('#StudentPopup').on('show.bs.modal', function (e) {      

      //LoaderVisibility(true);
      var button = $(e.relatedTarget);                // Button that triggered the modal
   
      var studentId = button.data('id');             // Extract info from data-* attributes
      // console.log('button.data(single-edit)', button.data('single-edit'));

      this.setState({singleEditMode: button.data('single-edit')}); 
      this.setState({studentId});    
      // just for checking ????      
      //this.setState({studentId:5}); 
    }.bind(this));

    // call on modal close
    $('#StudentPopup').on('hidden.bs.modal', function (e) {            
      this.setState({studentId : 0});     
      //if(this.state.refreshGrid){
        var table = $('#StudentsGrid').DataTable();                
        table.clear();
        table.ajax.reload( null, false ); // user paging is not reset on reload
      //}
    }.bind(this));
    
    //https://jsonplaceholder.typicode.com/posts
    axios.get('/api/nationalities/')
      .then(res=>{
          const nationalities = mapForCombo(res.data);      
          this.setState({nationalities});
      });
 
    axios.get('/api/countries/')
      .then(res=>{
          const countries = mapForCombo(res.data);
          this.setState({countries});
      });

    LoaderVisibility(false);
  }

  handleClick(e, data) {
    console.log(data);
  }

  render() {
  
    var self = this;
    return (
      
      <div id="content">
        
        <WidgetGrid>

          {/* START ROW */}

          <div className="row">

            {/* NEW COL START */}
            <article className="col-sm-12 col-md-12 col-lg-12">

              {/* Widget ID (each widget will need unique ID)*/}
              <JarvisWidget colorbutton={false} editbutton={false} color="blueLight" 
                            custombutton={false} deletebutton={false} >

                <header>
                  <span className="widget-icon"> <i className="fa fa-edit"/> </span>

                  <h2><Msg phrase="Students" /></h2>
                  
                </header>

                {/* widget div*/}
                <div>


                  {/* widget content */}
                  <div className="widget-body no-padding">

                    <div className="widget-body-toolbar">
                        <div className="row">
                            <div className="col-xs-9 col-sm-5 col-md-5 col-lg-5">

                            </div>
                            <div className="col-xs-3 col-sm-7 col-md-7 col-lg-7 text-right">
                                <button className="btn btn-primary" data-toggle="modal"
                                  data-target="#StudentPopup">
                                    <i className="fa fa-plus"/> 
                                    <span className="hidden-mobile"><Msg phrase="Add New" /></span>
                                </button>
                            </div>
                        </div>
                    </div> 

                    <Loader isLoading={this.props.isLoading} />
                    {/* ajax: {"url":'/api/Students', "dataSrc": ""}, */}
                    <Datatable id="StudentsGrid"  
                      options={{
                        
                        //1. PAGING-SETTING SAMPLE lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
                        //createdRow: function ( row, data, index ) {
                            //if ( data[5].replace(/[\$,]/g, '') * 1 > 150000 ) {
                        //        $('td', row).eq(2).addClass('text-success');
                            //}
                        //},                        
                        columnDefs: [
                            { 
                                "type": "date",
                                "render": function ( data, type, row ) {
                                    //return moment(data).format('Do MMM YYYY' || 'llll')
                                    return renderDate(data);
                                },
                                "targets": 6
                            },
                            {
                                // The `data` parameter refers to the data for the cell (defined by the
                                // `data` option, which defaults to the column being worked with, in
                                // this case `data: 0`.
                                "render": function ( data, type, row ) {
                                  //console.log(data);
                                  //console.log(type);
                                  //console.log(row);
                                    //return data +' ('+ row[0]+')';
                                    //id = data;
                                    //console.log(this.state.teacherId);
                                    return '<a data-toggle="modal" data-single-edit="1" title="Edit" data-id="' + data + '" data-target="#StudentPopup"><i id="edi" class=\"glyphicon glyphicon-edit\"></i><span class=\"sr-only\">Edit</span></a>';
                                },
                                "className": "dt-center",
                                "sorting": false,
                                "targets": 7
                            },
                            {
                                // The `data` parameter refers to the data for the cell (defined by the
                                // `data` option, which defaults to the column being worked with, in
                                // this case `data: 0`.
                                "render": function ( data, type, row ) {
                                    return '<a data-toggle="modal" data-single-edit="0" title="Manage" data-id="' + data + '" data-target="#StudentPopup"><i id="edi" class=\"glyphicon glyphicon-list-alt\"></i><span class=\"sr-only\">Edit</span></a>';
                                },
                                "className": "dt-center",
                                "sorting": false,
                                "targets": 8
                            }
                            ,{ 
                                "render": function ( data, type, row ) { 
                                  return '<a id="dele" data-tid="' + data + '"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Edit</span></a>';
                                }.bind(self),
                                "className": "dt-center",
                                "sorting": false,
                                "targets": 9
                            }
                        ],
                        columns: [
                          //{
                          //    "className":      'details-control',
                          //    "orderable":      false,
                          //    "data":           null,
                          //    "defaultContent": ''
                          //},
                          {data: "Code"},
                          {data: "FullName"},
                          {data: "FullNameAr"},
                          {data: "Email"},    
                          {data: "StudentIDNo"},  
                          {data: "Gender"},  
                          {data: "DOB"},   
                          {data: "StudentId"},
                          {data: "StudentId"},
                          {data: "StudentId"}
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
                        <th data-hide="mobile-p"><Msg phrase="CodeText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="FullNameText"/></th>
                        <th data-class="expand"><Msg phrase="FullNameArText"/></th>                        
                        <th data-hide="mobile-p"><Msg phrase="EmailAddressText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="IdentityCardNumberText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="GenderText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="DOBText"/></th> 
                        <th data-hide="mobile-p"></th>
                        <th data-hide="mobile-p"></th>
                        <th data-hide="mobile-p"></th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td >a</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>  
                      <tr>
                        <td >a12</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>  
                      </tbody>
                    </Datatable>

                  </div>
                  {/* end widget content */}

                </div>
                {/* end widget div */}

              </JarvisWidget>
              {/* end widget */}

            
            </article>
            {/* END COL */}

          </div>

          {/* END ROW */}

        </WidgetGrid>

        {/* end widget grid */}
  
        <div className="modal fade" id="StudentPopup" tabIndex="-1" role="dialog" 
            data-backdrop="static" data-keyboard="false"
            aria-labelledby="StudentPopupLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title" id="StudentPopupLabel"> 
                  { this.state.singleEditMode == 1 ? <Msg phrase="EditText" /> : (this.state.studentId > 0 ? <Msg phrase="Manage Student" /> : <Msg phrase="Add New Student"/>)}
                </h4>
              </div>
              <div className="modal-body"> 
                       
                {
                  this.renderModalBody()
                }       
                   
              </div>
            </div>
            {/* /.modal-content */}
          </div>
          {/* /.modal-dialog */}
        </div>
        {/* /.modal */}

      </div>
    )
  }

}

export default StudentsPage; 