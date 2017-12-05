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

import FeeStructureForm from './FeeStructureForm'
import EditGeneralInfo from './EditGeneralInfo'

import submit, {remove} from './submit'
import mapForCombo from '../../../../components/utils/functions'

class FeeStructuresPages extends React.Component {
  
  constructor(props){
   super(props);
   this.state = {
     feeTypeId: 0
   }
  }
  
  componentWillMount() {
    LoaderVisibility(true);
  }
  
  componentDidMount(){ 

    console.log('componentDidMount --> FeeStructuresPages');
    
    $('#FeeTypeGrid').on('click', 'td', function(event) {
      
      if ($(this).find('#dele').length > 0) {
         
        var id = $(this).find('#dele').data('tid');
        remove(id, $(this));
 
      }
    });
    
    // call before modal open
    $('#FeeTypePopup').on('show.bs.modal', function (e) {      

      var button = $(e.relatedTarget);                    // Button that triggered the modal   
      var feeTypeId = button.data('id');             // Extract info from data-* attributes
      this.setState({feeTypeId});    

    }.bind(this));

    // call on modal close
    $('#FeeTypePopup').on('hidden.bs.modal', function (e) {
      this.setState({ feeTypeId: 0 });
      var table = $('#FeeTypeGrid').DataTable();
      table.clear();
      table.ajax.reload(null, false); // user paging is not reset on reload
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

                  <h2><Msg phrase="FeeTypes" /></h2>
                  
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
                                  data-target="#FeeTypePopup">
                                    <i className="fa fa-plus"/> 
                                    <span className="hidden-mobile"><Msg phrase="AddNewText" /></span>
                                </button> 
                            </div>
                        </div>
                    </div> 
                    
                    <Loader isLoading={this.props.isLoading} />
                    <Datatable id="FeeTypeGrid"  
                      options={{
                        ajax: {"url":'/api/FeeTypes/All', "dataSrc": ""},                         
                        columnDefs: [                             
                            {
                                // The `data` parameter refers to the data for the cell (defined by the
                                // `data` option, which defaults to the column being worked with, in
                                // this case `data: 0`.
                                "render": function ( data, type, row ) {
                                    return '<a data-toggle="modal" data-id="' + data + '" data-target="#FeeTypePopup"><i id="edi" class=\"glyphicon glyphicon-edit\"></i><span class=\"sr-only\">Edit</span></a>';
                                },
                                "className": "dt-center",
                                "sorting": false,
                                "targets": 9
                            }
                            ,{ 
                                "render": function ( data, type, row ) { 
                                  return '<a id="dele" data-tid="' + data + '"><i class=\"glyphicon glyphicon-trash\"></i><span class=\"sr-only\">Edit</span></a>';
                                }.bind(self),
                                "className": "dt-center",
                                "sorting": false,
                                "targets": 10
                            }
                        ],
                        columns: [ 
                          {data: "FeeTypeID"},
                          {data: "Code"},
                          {data: "Name"},
                          {data: "NameAr"},       
                          {data: "FeeCycleName"},
                          {data: "FeeDueOnFrequencyName"}, 
                          {data: "Fee"},  
                          // {data: "FeeDiscountTypeName"},
                          // {data: "DiscountOption"},  
                          // {data: "DiscountRate"},  
                          {data: "DiscountValue"},  
                          {data: "NetFee"},                   
                          {data: "FeeTypeID"},
                          {data: "FeeTypeID"}
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
                        <th><Msg phrase="IDText"/></th>
                        <th><Msg phrase="CodeText"/></th>
                        <th><Msg phrase="NameText"/></th>
                        <th><Msg phrase="NameArText"/></th>  
                        <th><Msg phrase="FeeCycleText"/></th>
                        <th><Msg phrase="FeeDueOnFrequencyText"/></th>
                        <th><Msg phrase="FeeText"/></th>
                        {/* <th><Msg phrase="FeeDiscountTypeText"/></th>
                        <th><Msg phrase="DiscountOptionText"/></th>
                        <th><Msg phrase="DiscountRateText"/></th> */}
                        <th><Msg phrase="DiscountValueText"/></th>
                        <th><Msg phrase="FeeAmountAfterDiscountText"/></th>   
                        <th></th>
                        <th></th>
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
  
        <div className="modal fade" id="FeeTypePopup" tabIndex="-1" role="dialog" 
            data-backdrop="static" data-keyboard="false"
            aria-labelledby="FeeTypePopupLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title" id="FeeTypePopupLabel">
                  { this.state.feeTypeId > 0 ? <Msg phrase="ManageText" /> : <Msg phrase="AddNewText"/> }
                </h4>
              </div>
              <div className="modal-body"> 
                { this.state.feeTypeId > 0 ?                     
                  <EditGeneralInfo 
                    FeeTypeID={this.state.feeTypeId}  
                    onSubmit={submit} />
                  : <FeeStructureForm 
                      FeeTypeID={this.state.feeTypeId}  
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

export default FeeStructuresPages;
