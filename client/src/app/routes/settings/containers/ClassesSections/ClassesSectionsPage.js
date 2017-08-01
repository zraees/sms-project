/**
 * Created by griga on 11/30/15.
 */

import React from 'react'
import axios from 'axios' 
import {SubmissionError} from 'redux-form'
import {connect} from 'react-redux'
import moment from 'moment'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import JarvisWidget from '../../../../components/widgets/JarvisWidget'
import Datatable from '../../../../components/tables/Datatable'
import Msg from '../../../../components/i18n/Msg'

import Moment from '../../../../components/utils/Moment'

import ClassSectionForm from './ClassSectionForm'
import EditGeneralInfo from './EditGeneralInfo'

import submit, {remove} from './submit'
import mapForCombo from '../../../../components/utils/functions'

class ClassesSectionsPage extends React.Component {
  
  constructor(props){
   super(props);
   this.state = {
     classSectionId: 0
   }
  }
  
  componentWillMount() {
    LoaderVisibility(true);
  }
  
  componentDidMount(){ 

    console.log('componentDidMount --> StudentPage');
    
    $('#ClassSectionGrid').on('click', 'td', function(event) {
      
      if ($(this).find('#dele').length > 0) {
         
        var id = $(this).find('#dele').data('tid');
        remove(id, $(this));
 
      }
    });
    
    // call before modal open
    $('#ClassSectionPopup').on('show.bs.modal', function (e) {      

      var button = $(e.relatedTarget);                    // Button that triggered the modal   
      var classSectionId = button.data('id');             // Extract info from data-* attributes
      this.setState({classSectionId});    

    }.bind(this));

    // call on modal close
    $('#ClassSectionPopup').on('hidden.bs.modal', function (e) {            
      this.setState({classSectionId : 0});     
          var table = $('#ClassSectionGrid').DataTable();                
          table.clear();
          table.ajax.reload( null, false ); // user paging is not reset on reload
    }.bind(this));
     
    LoaderVisibility(false);
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

                  <h2><Msg phrase="ClassesSections" /></h2>
                  
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
                                  data-target="#ClassSectionPopup">
                                    <i className="fa fa-plus"/> 
                                    <span className="hidden-mobile"><Msg phrase="AddNewText" /></span>
                                </button> 
                            </div>
                        </div>
                    </div> 
                    
                    <Loader isLoading={this.props.isLoading} />
                    <Datatable id="ClassSectionGrid"  
                      options={{
                        ajax: {"url":'/api/ClassesSections', "dataSrc": ""},                         
                        columnDefs: [                             
                            {
                                // The `data` parameter refers to the data for the cell (defined by the
                                // `data` option, which defaults to the column being worked with, in
                                // this case `data: 0`.
                                "render": function ( data, type, row ) {
                                    return '<a data-toggle="modal" data-id="' + data + '" data-target="#ClassSectionPopup"><i id="edi" class=\"glyphicon glyphicon-edit\"></i><span class=\"sr-only\">Edit</span></a>';
                                },
                                "className": "dt-center",
                                "sorting": false,
                                "targets": 6
                            }
                            ,{ 
                                "render": function ( data, type, row ) { 
                                  return '<a id="dele" data-tid="' + data + '"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Edit</span></a>';
                                }.bind(self),
                                "className": "dt-center",
                                "sorting": false,
                                "targets": 7
                            }
                        ],
                        columns: [ 
                          {data: "Shift.Code"},
                          {data: "Shift.Name"},
                          {data: "Class.Code"},
                          {data: "Class.Name"},
                          {data: "Section.Code"},
                          {data: "Section.Name"},                          
                          {data: "ClassSectionID"},
                          {data: "ClassSectionID"}
                        ],
                        buttons: [
                          'copy', 'excel', 'pdf'
                        ]
                      }}
                      paginationLength={true}  
                      className="table table-striped table-bordered table-hover"
                      width="100%">
                      <thead>
                      <tr>
                        <th data-hide="mobile-p"><Msg phrase="CodeText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="ShiftText"/></th>
                        <th data-class="expand"><Msg phrase="CodeText"/></th>
                        <th data-class="expand"><Msg phrase="ClassText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="CodeText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="SectionText"/></th> 
                        <th data-hide="mobile-p"></th>
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
  
        <div className="modal fade" id="ClassSectionPopup" tabIndex="-1" role="dialog" 
            data-backdrop="static" data-keyboard="false"
            aria-labelledby="ClassSectionPopupLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title" id="ClassSectionPopupLabel">
                  { this.state.classSectionId > 0 ? <Msg phrase="ManageText" /> : <Msg phrase="AddNewText"/> }
                </h4>
              </div>
              <div className="modal-body"> 
                { this.state.classSectionId > 0 ?                     
                  <ClassSectionForm 
                    classSectionId={this.state.classSectionId}  
                    onSubmit={submit} />
                  : <EditGeneralInfo 
                      classSectionId={this.state.classSectionId}  
                      onSubmit={submit} />
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

export default ClassesSectionsPage;
