/**
 * Created by griga on 11/30/15.
 */

import React from 'react'
import axios from 'axios' 
import {SubmissionError} from 'redux-form'
import {connect} from 'react-redux'
import moment from 'moment'

//import moment from 'moment'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import JarvisWidget from '../../../../components/widgets/JarvisWidget'
import Datatable from '../../../../components/tables/Datatable'
import Msg from '../../../../components/i18n/Msg'

import Moment from '../../../../components/utils/Moment'

import SubjectForm from './SubjectForm'
import SubjectEditForm from './SubjectEditForm'

import submit, {remove} from './submit'
import mapForCombo, {renderDate, mapForRadioList} from '../../../../components/utils/functions'

// import {OverlayTrigger, Tooltip} from 'react-bootstrap'

class SubjectsPage extends React.Component {
  
  constructor(props){
   super(props);
   this.state = {
     subjectId: 0,
     singleEditMode: 0 
   }
  }
  
  componentWillMount() {
    LoaderVisibility(true);
  }
  
  componentDidMount(){ 

    $('#subjectsGrid').on('click', 'td', function(event) {
      
      if ($(this).find('#dele').length > 0) {
         
        var id = $(this).find('#dele').data('tid');
        remove(id, $(this));
 
      }
    });
    
    // call before modal open
    $('#subjectPopup').on('show.bs.modal', function (e) {       
     
      var button = $(e.relatedTarget);        // Button that triggered the modal
     
      var subjectId = button.data('id');             // Extract info from data-* attributes
      this.setState({singleEditMode: button.data('single-edit')}); 
      // just for checking ????      
      this.setState({subjectId:5}); 
      //this.setState({subjectId});    
    }.bind(this));

    // call on modal close
    $('#subjectPopup').on('hidden.bs.modal', function (e) {            
      this.setState({subjectId : 0});    
      var table = $('#subjectsGrid').DataTable();                
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

                  <h2><Msg phrase="Subjects" /></h2>
                  
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
                                  data-target="#subjectPopup">
                                    <i className="fa fa-plus"/> 
                                    <span className="hidden-mobile"><Msg phrase="Add New" /></span>
                                </button>
                            </div>
                        </div>
                    </div>
                     
                    <Loader isLoading={this.props.isLoading} />
                    <Datatable id="subjectsGrid"  
                      options={{
                        ajax: {"url":'/api/subjects', "dataSrc": ""},                         
                        columnDefs: [
                            { 
                                "type": "date",
                                "render": function ( data, type, row ) { 
                                    return renderDate(data);
                                },
                                "targets": 5 
                            },
                            { 
                                "render": function ( data, type, row ) {
                                    return '<a data-toggle="modal" data-single-edit="1"  title="Edit" data-id="' + data + '" data-target="#subjectPopup"><i id="edi" class=\"glyphicon glyphicon-edit\"></i><span class=\"sr-only\">Edit</span></a>';
                                },
                                "className": "dt-center",
                                "sorting": false,
                                "targets": 7
                            },
                            { 
                                "render": function ( data, type, row ) { 
                                  return '<a id="dele" data-tid="' + data + '" title="Delete"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Edit</span></a>';                                    
                                }.bind(self),
                                "className": "dt-center",
                                "sorting": false,
                                "targets": 9
                            }
                        ],
                        columns: [ 
                          {data: "subjectId"},
                          {data: "Code"},
                          {data: "Name"},    
                          {data: "NameAr"},
                          {data: "subjectId"},
                          {data: "subjectId"}
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
                        <th data-hide="mobile-p"><Msg phrase="IDText"/></th>
                        <th data-class="expand"><Msg phrase="CodeText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="NameText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="NameArText"/></th> 
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
  
        <div className="modal fade" id="subjectPopup" tabIndex="-1" role="dialog" 
            data-backdrop="static" data-keyboard="false"
            aria-labelledby="subjectPopupLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title" id="subjectPopupLabel">
                  { this.state.singleEditMode == 1 ? <Msg phrase="EditText" /> : (this.state.subjectId > 0 ? <Msg phrase="ManageText" /> : <Msg phrase="AddNewText"/>)}
                </h4>
              </div>
              <div className="modal-body">  
                                
                { this.state.subjectId > 0 ? 
                    <SubjectEditForm
                      subjectId={this.state.subjectId}  
                      onSubmit={submit}  />
                  : 
                    <SubjectForm 
                      subjectId={this.state.subjectId}  
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

export default SubjectsPage;
