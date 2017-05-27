/**
 * Created by griga on 11/30/15.
 */

import React from 'react'
import axios from 'axios' 
import {SubmissionError} from 'redux-form'
import moment from 'moment'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import JarvisWidget from '../../../../components/widgets/JarvisWidget'
import Datatable from '../../../../components/tables/Datatable'
import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";

import Msg from '../../../../components/i18n/Msg'
import Moment from '../../../../components/utils/Moment'


import TeacherForm from './TeacherForm'
import submit, {remove} from './submit';

class TeachersPage extends React.Component {
  
  constructor(props){
   super(props);
   this.state = {
     id: 0,
     nationalities: []
   }
   
     //this.handleClick = this.handleClick.bind(this);
     //   this.handleClick();
  } 

  componentDidMount(){ 

    //var self =this;
    $('#teachersGrid').on('click', 'td', function(event) {
      
      if ($(this).find('#dele').length > 0) {
        
        //alert(  $(this).find('#dele').data('tid'));
        var id = $(this).find('#dele').data('tid');
        remove(id, $(this));

        // console.log('outside');
        // console.log(success);
        
        // if(success){
        //   var table = $('#teachersGrid').DataTable();                
        //   table
        //     .row( $(this).parents('tr') )
        //     .remove()
        //     .draw();
        // }
        
        
        //self._smartModEg1();

      }
    });
    
    // call before modal open
    $('#teacherPopup').on('show.bs.modal', function (e) {      
      var button = $(e.relatedTarget);        // Button that triggered the modal
      var id = button.data('id');             // Extract info from data-* attributes
      this.setState({id});    
    }.bind(this));

    // call on modal close
    $('#teacherPopup').on('hidden.bs.modal', function (e) {            
      this.setState({id : 0});
      $('#teachersGrid').DataTable().ajax.reload();      
    }.bind(this));
    
    //https://jsonplaceholder.typicode.com/posts
    axios.get('/api/nationalities/')
        .then(res=>{
            const nationalities = res.data.map(function(item, index){
                return {value: item.NationalityId + "", label: item.Nationality};
            });                       
            this.setState({nationalities});
        });
 
    //https://datatables.net/forums/discussion/29406/delete-row-with-fade-out
    //https://datatables.net/examples/api/select_single_row.html
    //https://datatables.net/reference/api/row().remove()
    
    // $('#teachersGrid tbody').on( 'click', 'tr', function () {
    //     var table = $('#teachersGrid').DataTable();
    //     alert('hi');
    //     table
    //         .row( $(this).parents('tr') )
    //         .remove()
    //         .draw();
    // } ).bind(this);

  }


  // handleClick() {
	// 	console.log("clicked");
	// }
      
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

                  <h2>Teachers</h2>

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
                                  data-target="#teacherPopup">
                                    <i className="fa fa-plus"/> <span className="hidden-mobile">Add New</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <Msg phrase="Recent projects" />
                    <Moment date="2017-05-26T00:00:00" format="YYYY-MM-DD" />
                    <Datatable id="teachersGrid"  
                      options={{
                        ajax: {"url":'/api/teachers', "dataSrc": ""},
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
                                  //console.log(data);
                                  return data;
                                    //return '<Moment date="2017-05-26T00:00:00" format="DD-MM-YYYY" ></Moment>';  //return data !== null ? moment(data, "DD-MM-YYYY") : null;
                                },
                                "targets": 5 
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
                                    //console.log(this.state.id);
                                    return '<a data-toggle="modal" data-id="' + data + '" data-target="#teacherPopup"><i class=\"glyphicon glyphicon-edit\"></i><span class=\"sr-only\">Edit</span></a>';
                                },
                                "className": "dt-center",
                                "sorting": false,
                                "targets": 7
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
                          {data: "TeacherId"},
                          {data: "Name"},
                          {data: "Email"},    
                          {data: "IDNo"},  
                          {data: "Gender"},  
                          {data: "DOB"},  
                          {data: "Rating"},  
                          {data: "TeacherId"},
                          {data: "TeacherId"}
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
                        <th data-hide="mobile-p">ID</th>
                        <th data-class="expand">Name</th>
                        <th data-hide="mobile-p">Email</th>
                        <th data-hide="mobile-p">ID Number</th>
                        <th data-hide="mobile-p">Gender</th>
                        <th data-hide="mobile-p">DOB</th>
                        <th data-hide="mobile-p">Rating</th>
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
  
        <div className="modal fade" id="teacherPopup" tabIndex="-1" role="dialog" 
            data-backdrop="static" data-keyboard="false"
            aria-labelledby="teacherPopupLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title" id="teacherPopupLabel">Add New Teacher</h4>
              </div>
              <div className="modal-body">
                  
                  <TeacherForm teacherId={this.state.id} nationalities={this.state.nationalities} 
                      onSubmit={submit} />

              </div>
              {/*<div className="modal-footer">
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

export default TeachersPage;
