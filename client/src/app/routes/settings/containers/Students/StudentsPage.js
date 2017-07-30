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

import StudentForm from './StudentForm'
import StudentEditForm from './StudentEditForm'

import submit, {remove} from './submit'
import mapForCombo, {renderDate} from '../../../../components/utils/functions'

class StudentsPage extends React.Component {
  
  constructor(props){
   super(props);
   this.state = {
     StudentId: 0,
     nationalities: [],
     countries: []
   }
  }
  
  componentWillMount() {
    LoaderVisibility(true);
  }
  
  componentDidMount(){ 

    console.log('componentDidMount --> StudentPage');
    //var self =this;
    $('#StudentsGrid').on('click', 'td', function(event) {
      
      if ($(this).find('#dele').length > 0) {
        
        //alert(  $(this).find('#dele').data('tid'));
        //LoaderVisibility(true);//
        var id = $(this).find('#dele').data('tid');
        remove(id, $(this));

        // console.log('outside');
        // console.log(success);
        
        // if(success){
        //   var table = $('#StudentsGrid').DataTable();                
        //   table
        //     .row( $(this).parents('tr') )
        //     .remove()
        //     .draw();
        // }
        
        
        //self._smartModEg1();

      }
    });
    
    // call before modal open
    $('#StudentPopup').on('show.bs.modal', function (e) {      

      //LoaderVisibility(true);
      var button = $(e.relatedTarget);        // Button that triggered the modal
   
      var StudentId = button.data('id');             // Extract info from data-* attributes
      this.setState({StudentId});    
    }.bind(this));

    // call on modal close
    $('#StudentPopup').on('hidden.bs.modal', function (e) {            
      this.setState({StudentId : 0});     
          var table = $('#StudentsGrid').DataTable();                
          table.clear();
          table.ajax.reload( null, false ); // user paging is not reset on reload

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
                    
                    {/*<Moment date="2017-05-26T00:00:00" format="YYYY-MM-DD" />*/}
                    
                    <Loader isLoading={this.props.isLoading} />
                    <Datatable id="StudentsGrid"  
                      options={{
                        ajax: {"url":'/api/Students', "dataSrc": ""},
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
                                "targets": 5 
                            },
                            {
                                // The `data` parameter refers to the data for the cell (defined by the
                                // `data` option, which defaults to the column being worked with, in
                                // this case `data: 0`.
                                "render": function ( data, type, row ) {
                                    return '<a data-toggle="modal" data-id="' + data + '" data-target="#StudentPopup"><i id="edi" class=\"glyphicon glyphicon-edit\"></i><span class=\"sr-only\">Edit</span></a>';
                                },
                                "className": "dt-center",
                                "sorting": false,
                                "targets": 7
                            }
                            ,{ 
                                "render": function ( data, type, row ) { 
                                  return '<a id="dele" data-tid="' + data + '"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Edit</span></a>';
                                }.bind(self),
                                "className": "dt-center",
                                "sorting": false,
                                "targets": 8
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
                        <th data-hide="mobile-p"><Msg phrase="IDText"/></th>
                        <th data-class="expand"><Msg phrase="NameText"/></th>
                        <th data-class="expand"><Msg phrase="NameText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="EmailAddressText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="IdentityCardNumberText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="GenderText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="DOBText"/></th> 
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
                  { this.state.StudentId > 0 ? <Msg phrase="Manage Student" /> : <Msg phrase="Add New Student"/> }
                </h4>
              </div>
              <div className="modal-body">
                  
                  { this.state.StudentId > 0 ?                     
                    <StudentEditForm
                      StudentId={this.state.StudentId} 
                      nationalities={this.state.nationalities} 
                      countries={this.state.countries} 
                      onSubmit={submit}  />
                  : <StudentForm 
                      StudentId={this.state.StudentId} 
                      nationalities={this.state.nationalities} 
                      countries={this.state.countries} 
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

export default StudentsPage;
