/**
 * Created by griga on 11/30/15.
 */

import React from 'react'
import axios from 'axios' 
import {SubmissionError} from 'redux-form'
import {connect} from 'react-redux'
import moment from 'moment'
import contextmenu from 'ui-contextmenu' 


//import moment from 'moment'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import JarvisWidget from '../../../../components/widgets/JarvisWidget'
import Datatable from '../../../../components/tables/Datatable'
import Msg from '../../../../components/i18n/Msg'
import LanguageStore from '../../../../components/i18n/LanguageStore'

import Moment from '../../../../components/utils/Moment'

import TimetableForm from './TimetableForm'
// import TeacherEditForm from './TeacherEditForm'
// import EditGeneralInfo from './EditGeneralInfo'
// import QualificationForm from './QualificationForm'
// import ExperienceForm from './ExperienceForm'
// import TimeTablesubjectsForm from './TimeTablesubjectsForm'
// import TeacherClassesForm from './TeacherClassesForm'
//import Test from './Test'
import submit, {remove} from './submit'
import mapForCombo, {renderDate, mapForRadioList} from '../../../../components/utils/functions'

// import {OverlayTrigger, Tooltip} from 'react-bootstrap'

class TimeTablesPage extends React.Component {
  
  constructor(props){
   super(props);
   this.state = {
     timeTableId: 0,
     singleEditMode: 0,
     nationalities: [],
     countries: [],
     genderOptions: [],
     popupPageName: '',
     refreshGrid: false
   }
   
   this.renderModalBody = this.renderModalBody.bind(this);
  }
  
  componentWillMount() {
    LoaderVisibility(true);
  }
  
  
  renderModalBody(popupPageName, timeTableId){
    
    var modalBody;    
    /*
    if(popupPageName == "EditText"){ 
      //this.setState({refreshGrid:true});
      modalBody = <EditGeneralInfo timeTableId={timeTableId} 
          nationalities={this.state.nationalities} 
          genderOptions={this.state.genderOptions}
          countries={this.state.countries}
          onSubmit={submit} />
    }
    else if(popupPageName == "Qualification"){
      modalBody = <QualificationForm
          timeTableId={timeTableId}   
          onSubmit={submitQualification} 
          />      
    }
    else if(popupPageName == "Experience"){
      modalBody = <ExperienceForm
          timeTableId={timeTableId}  
          countries={this.state.countries} 
          onSubmit={submitExperience} />
    }
    else if(popupPageName == "SubjectsText"){
      modalBody = <TimeTablesubjectsForm
          timeTableId={timeTableId}   
          onSubmit={submitTimeTablesubject} />
    }
    else if(popupPageName == "Classes"){
      modalBody = <TeacherClassesForm
          timeTableId={timeTableId}   
          onSubmit={submitTeacherClass} />
    }
    */
    return modalBody;
  }

  componentDidMount(){ 

    
    $('#timeTablesGrid').contextmenu({
      delegate: "td",
      autoFocus: true,
      preventContextMenuForPopup: true,
      preventSelect: true,
      taphold: true,
      menu: [
      {title: LanguageStore.getData().phrases["EditText"], cmd: "EditText", uiIcon: "ui-icon-pencil"},
      {title: LanguageStore.getData().phrases["Day1Text"], cmd: "Day1", uiIcon: "ui-icon-document"},
      {title: LanguageStore.getData().phrases["Day2Text"], cmd: "Day2", uiIcon: "ui-icon-person"},
      {title: LanguageStore.getData().phrases["Day3Text"], cmd: "Day3", uiIcon: "ui-icon-contact"},
      {title: LanguageStore.getData().phrases["Day4Text"], cmd: "Day4", uiIcon: "ui-icon-contact"},
      {title: LanguageStore.getData().phrases["Day5Text"], cmd: "Day5", uiIcon: "ui-icon-contact"},
      {title: LanguageStore.getData().phrases["Day6Text"], cmd: "Day6", uiIcon: "ui-icon-contact"},
      {title: LanguageStore.getData().phrases["Day7Text"], cmd: "Day7", uiIcon: "ui-icon-contact"},
            
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
        //console.log('id ', id);
        this.setState({popupPageName:ui.cmd, timeTableId:id, refreshGrid:(ui.cmd=='EditText'?true:false)});
        
        $('#timeTablePopup').modal('show'); 
      }.bind(this),
      beforeOpen: function(event, ui) {
        var $menu = ui.menu,
          $target = ui.target,
          extraData = ui.extraData;
          
        }
    });

    $('#timeTablesGrid').on('click', 'td', function(event) {
      //console.log('hi');
      if ($(this).find('#dele').length > 0) {
        //console.log('hi 2 ', $(this).find('#dele'));
        var id = $(this).find('#dele').data('tid');
        //console.log('hi 3 ', id);
        remove(id, $(this));

      }
    });
    
    // call before modal open
    $('#timeTablePopup').on('show.bs.modal', function (e) {      

      var button = $(e.relatedTarget);        // Button that triggered the modal
      var timeTableId = button.data('id');             // Extract info from data-* attributes
      this.setState({singleEditMode: button.data('single-edit'), timeTableId}); 
      
    }.bind(this));

    // call on modal close
    $('#timeTablePopup').on('hidden.bs.modal', function (e) {            
      this.setState({timeTableId : 0, popupPageName:''});
      //console.log('close popup');
      //$('#timeTablesGrid').DataTable().ajax.reload();      
          var table = $('#timeTablesGrid').DataTable();                
          table.clear();
          table.ajax.reload( null, false ); // user paging is not reset on reload

    }.bind(this));
    
    LoaderVisibility(false);
  }

  render() {
    const { timeTableId, popupPageName } = this.state;
    const { isLoading } = this.props;
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

                  <h2><Msg phrase="TimetableText" /></h2>
                  
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
                                  data-target="#timeTablePopup">
                                    <i className="fa fa-plus"/> 
                                    <span className="hidden-mobile"><Msg phrase="Add New" /></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/*<Moment date="2017-05-26T00:00:00" format="YYYY-MM-DD" />*/}
                    
                    <Loader isLoading={this.props.isLoading} />
                    <Datatable id="timeTablesGrid"  
                      options={{
                        ajax: {"url":'/api/TimeTables', "dataSrc": ""},
                        //1. PAGING-SETTING SAMPLE lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
                        //createdRow: function ( row, data, index ) {
                            //if ( data[5].replace(/[\$,]/g, '') * 1 > 150000 ) {
                        //        $('td', row).eq(2).addClass('text-success');
                            //}
                        //},                        
                        columnDefs: [
                            { 
                                "render": function ( data, type, row ) { 
                                  return '<a id="dele" data-tid="' + data + '" title="Delete"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Edit</span></a>';
                                   
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
                          {data: "TimeTableID"},
                          {data: "Code"},    
                          {data: "Name"},
                          {data: "ShiftName"},
                          {data: "ClassName"},
                          {data: "SectionName"},     
                          {data: "TimeTableID"}
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
                        <th data-hide="mobile-p"><Msg phrase="IDText"/></th>
                        <th data-class="expand"><Msg phrase="CodeText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="NameText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="ShiftText"/></th>
                        <th data-class="expand"><Msg phrase="ClassText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="SectionText"/></th> 
                        <th data-hide="mobile-p"></th>
                      </tr>
                      </thead>
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
  
        <div className="modal fade" id="timeTablePopup" tabIndex="-1" role="dialog" 
            data-backdrop="static" data-keyboard="false"
            aria-labelledby="timeTablePopupLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title" id="timeTablePopupLabel">
                  { popupPageName != '' ? <Msg phrase={popupPageName} /> : <Msg phrase="AddNewText"/> }    
                </h4>
              </div>
              <div className="modal-body">  
                
                {  
                    popupPageName != '' ? 
                      this.renderModalBody(popupPageName, timeTableId) 
                      : 
                      <TimetableForm 
                        timeTableId={this.state.timeTableId}  
                        onSubmit={submit} />

                 
                }      
                {
                  /*
                   // this.state.singleEditMode == 1 ?
                  // <EditGeneralInfo timeTableId={this.state.timeTableId} 
                  //   nationalities={this.state.nationalities} 
                  //   genderOptions={this.state.genderOptions}
                  //   countries={this.state.countries}
                  //   onSubmit={submit} />
                  // :
                  // (this.state.timeTableId > 0 ? 
                  //   <TeacherEditForm
                  //     timeTableId={this.state.timeTableId} 
                  //     nationalities={this.state.nationalities} 
                  //     countries={this.state.countries} 
                  //     genderOptions={this.state.genderOptions}
                  //     onSubmit={submit} 
                  //     onSubmitQualification={submitQualification} 
                  //     onSubmitExperience={submitExperience} 
                  //     onSubmitTimeTablesubject={submitTimeTablesubject} 
                  //     onSubmitTeacherClass={submitTeacherClass} />
                  // : 
                  //   <TimetableForm 
                  //     timeTableId={this.state.timeTableId} 
                  //     nationalities={this.state.nationalities} 
                  //     countries={this.state.countries} 
                  //     genderOptions={this.state.genderOptions}
                  //     onSubmit={submit} />)
                  */
                }
              </div>
              {/*  
                    <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Post Article
                </button>
              </div>*/}
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


// //const mapStateToProps = (state, ownProps) => (state.isLoading);
// function mapStateToProps(state) {
//     return {
//         isLoading: state.isLoading
//     };
// }

export default TimeTablesPage;
