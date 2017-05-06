/**
 * Created by griga on 11/30/15.
 */

import React from 'react'
import axios from 'axios'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import JarvisWidget from '../../../../components/widgets/JarvisWidget'
import Datatable from '../../../../components/tables/Datatable'

import TeacherForm from './TeacherForm'

export default class TeachersPage extends React.Component {
  render() {
      
      function onSubmit(values){
          console.log('values submitted', values);
          
          axios.post('/api/teachers', values)      
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log('this is error: '+error);
              });      
      }

    return (
      <div id="content">
        
        <WidgetGrid>


          {/* START ROW */}

          <div className="row">

            {/* NEW COL START */}
            <article className="col-sm-12 col-md-12 col-lg-12">

              {/* Widget ID (each widget will need unique ID)*/}
              <JarvisWidget colorbutton={false} editbutton={false} color="blueLight" 
                            custombutton={false} deletebutton={false}>

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
                                  data-target="#myModal">
                                    <i className="fa fa-plus"/> <span className="hidden-mobile">Add New</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <Datatable 
                      options={{
                        ajax: '/api/teachers',
                        columns: [
                          {data: "TeacherId"},
                          {data: "Name"},
                          {data: "Email"},
                          {
                               "sName": "TeacherId",
                               "bSearchable": false,
                               "bSortable": false,
                               "mRender": function (row) {
                                  //console.log(row.data());
                                   //return '<a data-modal = \"\" href=\"Site/Edit?siteID=' + item + '\"><i class=\"glyphicon glyphicon-edit\"></i><span class=\"sr-only\">Edit</span></a>';
                                   return '<a data-toggle="modal" data-target="#myModal"><i class=\"glyphicon glyphicon-edit\"></i><span class=\"sr-only\">Edit</span></a>';
                                   
                               }
                           }
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
                        <th data-hide="mobile-p">ID</th>
                        <th data-class="expand">Name</th>
                        <th data-hide="mobile-p">Email</th>
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

        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" 
            aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title" id="myModalLabel">Add New Teacher</h4>
              </div>
              <div className="modal-body">

                  <TeacherForm onSubmit={onSubmit} />

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