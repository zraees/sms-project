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

import TeacherForm from './TeacherForm'
import TeacherEditForm from './TeacherEditForm'
import EditGeneralInfo from './EditGeneralInfo'
//import Test from './Test'
import submit, {remove, submitQualification, submitExperience, submitTeacherSubject, submitTeacherClass} from './submit'
import mapForCombo, {renderDate, mapForRadioList} from '../../../../components/utils/functions'

// import {OverlayTrigger, Tooltip} from 'react-bootstrap'

class TeachersPage extends React.Component {
  
  constructor(props){
   super(props);
   this.state = {
     teacherId: 0,
     singleEditMode: 0,
     nationalities: [],
     countries: [],
     genderOptions: []
   }
  }
  
  componentWillMount() {
    LoaderVisibility(true);
  }
  
  componentDidMount(){ 

    //console.log('componentDidMount --> TeacherPage');
    //var self =this;
    $('#teachersGrid').on('click', 'td', function(event) {
      
      if ($(this).find('#dele').length > 0) {
        
        //alert(  $(this).find('#dele').data('tid'));
        //LoaderVisibility(true);//
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

      //console.log('modal before call edit page');

      //LoaderVisibility(true);
      var button = $(e.relatedTarget);        // Button that triggered the modal
      //$(button).find('#edi').removeClass("glyphicon glyphicon-edit").addClass("glyphicon glyphicon-refresh glyphicon-spin");

      //console.log(button);
      var teacherId = button.data('id');             // Extract info from data-* attributes
      //console.log(button.data('single-edit'));
      this.setState({singleEditMode: button.data('single-edit')}); 
      this.setState({teacherId});    
    }.bind(this));

    // call on modal close
    $('#teacherPopup').on('hidden.bs.modal', function (e) {            
      this.setState({teacherId : 0});
      //console.log('close popup');
      //$('#teachersGrid').DataTable().ajax.reload();      
          var table = $('#teachersGrid').DataTable();                
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
 
    axios.get('assets/api/common/gender.json')
        .then(res=>{
            //console.log('gender.json');            
            const genderOptions = mapForRadioList(res.data);
            //console.log(genderOptions);
            this.setState({genderOptions});
        });

      //   //console.log(this.props.isLoading);
      // setTimeout(function(){ 
      //   console.log('sss'); 
      //   //this.setState({isLoading:true}) 
      //   LoaderVisibility(false);
      // }.bind(this), 6000);

      // console.log('aaaaa'); 
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

                  <h2><Msg phrase="Teachers" /></h2>
                  
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
                                    <i className="fa fa-plus"/> 
                                    <span className="hidden-mobile"><Msg phrase="Add New" /></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/*<Moment date="2017-05-26T00:00:00" format="YYYY-MM-DD" />*/}
                    
                    <Loader isLoading={this.props.isLoading} />
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
                                  //console.log(data);
                                  //console.log(type);
                                  //console.log(row);
                                    //return data +' ('+ row[0]+')';
                                    //id = data;
                                    //console.log(this.state.teacherId);
                                    return '<a data-toggle="modal" data-single-edit="1" data-id="' + data + '" data-target="#teacherPopup"><i id="edi" class=\"glyphicon glyphicon-edit\"></i><span class=\"sr-only\">Edit</span></a>';
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
                                  //console.log(data);
                                  //console.log(type);
                                  //console.log(row);
                                    //return data +' ('+ row[0]+')';
                                    //id = data;
                                    //console.log(this.state.teacherId);
                                    return '<a data-toggle="modal" data-single-edit="0" data-id="' + data + '" data-target="#teacherPopup"><i id="edi" class=\"glyphicon glyphicon-list-alt\"></i><span class=\"sr-only\">Edit</span></a>';
                                },
                                "className": "dt-center",
                                "sorting": false,
                                "targets": 8
                            }
                            ,{ 
                                "render": function ( data, type, row ) {
                                  //return (<a onClick={onOrderRestaurant.bind(self, this)} 
                                  //                className="btn btn-primary btn-sm">Order this restaurant
                                  //                </a>);
                                  return '<a id="dele" data-tid="' + data + '" title={`<Msg phrase="EmailAddressText"/>`}><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Edit</span></a>';
                                    //return ('<a onClick={self.handleClick.bind(self, 1)}>del</a>');
                                    //return '<a onClick={self.handleClick} className="btn btn-success">click</a>';
                                    //return '<a onClick="javascript:deleteConfirm()" className="btn btn-success"> Callback ()</a>';
                                    //return '<a data-toggle="modal" data-id="' + data + '" data-target="#teacherPopup"><i class=\"glyphicon glyphicon-edit\"></i><span class=\"sr-only\">Delete</span></a>';
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
                          {data: "TeacherId"},
                          {data: "Name"},
                          {data: "Email"},    
                          {data: "IDNo"},  
                          {data: "Gender"},  
                          {data: "DOB"},  
                          {data: "Rating"},  
                          {data: "TeacherId"},
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
                        <th data-hide="mobile-p"><Msg phrase="IDText"/></th>
                        <th data-class="expand"><Msg phrase="NameText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="EmailAddressText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="IdentityCardNumberText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="GenderText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="DOBText"/></th>
                        <th data-hide="mobile-p"><Msg phrase="RatingText"/></th>
                        <th data-hide="mobile-p"></th>
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
                <h4 className="modal-title" id="teacherPopupLabel">
                  { this.state.singleEditMode == 1 ? <Msg phrase="EditText" /> : (this.state.teacherId > 0 ? <Msg phrase="Manage Teacher" /> : <Msg phrase="Add New Teacher"/>)}
                </h4>
              </div>
              <div className="modal-body">  
                                
                { this.state.singleEditMode == 1 ?
                  <EditGeneralInfo teacherId={this.state.teacherId} 
                    nationalities={this.state.nationalities} 
                    genderOptions={this.state.genderOptions}
                    countries={this.state.countries}
                    onSubmit={submit} />
                  :
                  (this.state.teacherId > 0 ? 
                    <TeacherEditForm
                      teacherId={this.state.teacherId} 
                      nationalities={this.state.nationalities} 
                      countries={this.state.countries} 
                      genderOptions={this.state.genderOptions}
                      onSubmit={submit} 
                      onSubmitQualification={submitQualification} 
                      onSubmitExperience={submitExperience} 
                      onSubmitTeacherSubject={submitTeacherSubject} 
                      onSubmitTeacherClass={submitTeacherClass} />
                  : 
                    <TeacherForm 
                      teacherId={this.state.teacherId} 
                      nationalities={this.state.nationalities} 
                      countries={this.state.countries} 
                      genderOptions={this.state.genderOptions}
                      onSubmit={submit} />)
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

export default TeachersPage;
