/**
 * Created by griga on 11/30/15.
 */

import React from 'react'
import axios from 'axios' 
import {SubmissionError} from 'redux-form'
import {connect} from 'react-redux'
import moment from 'moment'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'

import {Field, FieldArray, reduxForm, formValueSelector, getFormValues} from 'redux-form'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import JarvisWidget from '../../../../components/widgets/JarvisWidget'
import Datatable from '../../../../components/tables/Datatable'
import Msg from '../../../../components/i18n/Msg'

import Moment from '../../../../components/utils/Moment'

import FeeCollectionForm from './FeeCollectionForm'
import EditGeneralInfo from './EditGeneralInfo'

import mapForCombo, {renderDate} from '../../../../components/utils/functions'

import {required, number}  from '../../../../components/forms/validation/CustomValidation' 
import {RFField, RFReactSelect, RFLabel} from '../../../../components/ui'
import submit, {remove} from './submit' 

class FeeCollectionsPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      feeCollectionId: 0,
      shiftOptions: [],
      classOptions: [],
      sectionOptions: [],
      //gridData: [{"$id":"1","FeeStructureID":1,"ClassID":3,"ClassName":"II","ClassNameAr":"II","FeeTypeCode":"0004","FeeTypeName":"abc 2","FeeTypeNameAr":"ed ed","FeeCycleID":1,"FeeCycleName":"Monthly","FeeCycleNameAr":"شهريا\r\n","FeeDueOnFrequencyID":1,"FeeDueOnFrequencyName":"Monthly","FeeDueOnFrequencyNameAr":"شهريا\r\n","FeeDueOnIntervalID":1,"FeeDueOnIntervalName":"First of every month","FeeDueOnIntervalNameAr":"أولا من كل شهر","FeeDiscountTypeID":null,"FeeDiscountTypeName":"","FeeDiscountTypeNameAr":"","DiscountOption":"P","DiscountOptionText":"%","DiscountRate":0.00,"DiscountValue":0.00,"Fee":5000.00,"NetFee":5000.00},{"$id":"2","FeeStructureID":3,"ClassID":4,"ClassName":"III","ClassNameAr":"III","FeeTypeCode":"0005","FeeTypeName":"abc","FeeTypeNameAr":"aaaa","FeeCycleID":2,"FeeCycleName":"Yearly","FeeCycleNameAr":"سنوي","FeeDueOnFrequencyID":3,"FeeDueOnFrequencyName":"Every 2 Months","FeeDueOnFrequencyNameAr":"كل شهرين\r\n","FeeDueOnIntervalID":4,"FeeDueOnIntervalName":"Till tenth of every month","FeeDueOnIntervalNameAr":"حتى عشر من كل شهر\r\n","FeeDiscountTypeID":1,"FeeDiscountTypeName":"Session Discount","FeeDiscountTypeNameAr":"خصم الجلسة\r\n","DiscountOption":"P","DiscountOptionText":"%","DiscountRate":25.00,"DiscountValue":3750.00,"Fee":15000.00,"NetFee":11250.00},{"$id":"3","FeeStructureID":1002,"ClassID":4,"ClassName":"III","ClassNameAr":"III","FeeTypeCode":"0008","FeeTypeName":"tution fee","FeeTypeNameAr":"edc","FeeCycleID":2,"FeeCycleName":"Yearly","FeeCycleNameAr":"سنوي","FeeDueOnFrequencyID":4,"FeeDueOnFrequencyName":"Quarterly","FeeDueOnFrequencyNameAr":"فصليا","FeeDueOnIntervalID":5,"FeeDueOnIntervalName":"Till tenth of every month","FeeDueOnIntervalNameAr":"حتى عشر من كل شهر\r\n","FeeDiscountTypeID":1,"FeeDiscountTypeName":"Session Discount","FeeDiscountTypeNameAr":"خصم الجلسة\r\n","DiscountOption":"P","DiscountOptionText":"%","DiscountRate":5.00,"DiscountValue":550.00,"Fee":11000.00,"NetFee":10450.00}]
    }
    this.handleShiftBlur = this.handleShiftBlur.bind(this);
    this.handleClassBlur = this.handleClassBlur.bind(this);
  }

  componentWillMount() {
    LoaderVisibility(true);
  }

  componentDidMount(){ 

    console.log('componentDidMount --> FeeCollectionsPage');

    axios.get('/api/lookup/shifts/')
      .then(res => {
        const shiftOptions = mapForCombo(res.data);
        this.setState({ shiftOptions });
      }); 

    $('#FeeCollectionGrid').on('click', 'td', function(event) {
      
      if ($(this).find('#dele').length > 0) {
         
        var id = $(this).find('#dele').data('tid');
        remove(id, $(this));
 
      }
    });
    
    // call before modal open
    $('#FeeCollectionPopup').on('show.bs.modal', function (e) {      

      var button = $(e.relatedTarget);                    // Button that triggered the modal   
      var feeTypeId = button.data('id');             // Extract info from data-* attributes
      this.setState({feeTypeId});    

    }.bind(this));

    // call on modal close
    $('#FeeCollectionPopup').on('hidden.bs.modal', function (e) {
      this.setState({ feeTypeId: 0 });
      var table = $('#FeeCollectionGrid').DataTable();
      table.clear();
      table.ajax.reload(null, false); // user paging is not reset on reload
    }.bind(this));
     
    LoaderVisibility(false);
  }


  handleShiftBlur(obj, value) {
    if (value != '') {
      axios.get('/api/GetClassesByShiftId/' + value)
        .then(res => {
          const classOptions = mapForCombo(res.data);
          this.setState({ classOptions });
        });

      axios.get('/api/shifts/' + value)
        .then(res => {
          this.props.change('shiftStartTime', res.data.StartTime);
          this.props.change('shiftEndTime', res.data.EndTime);
          this.props.change('breakStartTime', res.data.BreakStartTime);
          this.props.change('breakEndTime', res.data.BreakEndTime);
        });
    }
    else {
      this.props.change('shiftStartTime', '');
      this.props.change('shiftEndTime', '');
      this.props.change('breakStartTime', '');
      this.props.change('breakEndTime', '');

      this.setState({ classOptions: [] });
      this.setState({ sectionOptions: [] });
    }
  }

  handleClassBlur(obj, value) {
    console.log('this.props.shiftId', this.props.shiftId);
    if (this.props.shiftId && value) {
      axios.get('/api/GetClassesByShiftIdClassId/' + this.props.shiftId + '/' + value)
        .then(res => {
          const sectionOptions = mapForCombo(res.data);
          this.setState({ sectionOptions });
        });
    }
    else {
      this.setState({ sectionOptions: [] });
    }
  }

  render() {
  
    const { shiftOptions, classOptions, sectionOptions, feeCollectionId } = this.state;    
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

                  <h2><Msg phrase="FeeCollections" /></h2>
                  
                </header>

                {/* widget div*/}
                <div>


                  {/* widget content */}
                  <div className="widget-body no-padding">

                    <div className="widget-body-toolbar">

                      <div className="row">
                        <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
                          <Field
                            multi={false}
                            name="shiftId"
                            label="ShiftText"
                            validate={required}
                            options={shiftOptions}
                            onBlur={this.handleShiftBlur}
                            component={RFReactSelect} />
                        </section>

                        <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
                          <Field
                            multi={false}
                            name="classId"
                            label="ClassText"
                            validate={required}
                            options={classOptions}
                            onBlur={this.handleClassBlur}
                            component={RFReactSelect} />
                        </section>

                        <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3">
                          <Field
                            multi={false}
                            name="sectionId"
                            label="SectionText"
                            validate={required}
                            options={sectionOptions}
                            component={RFReactSelect} />
                        </section>

                        <section className="remove-col-padding col-sm-3 col-md-3 col-lg-3"> 
                        </section>

                      </div>

                      <div className="row">

                        <div className="col-md-4">

                        </div>
                        <div className="col-md-5">
                        </div>
                        <div className="col-md-3 text-right">
                          <button className="btn btn-primary" data-toggle="modal"
                            data-target="#FeeCollectionPopup">
                            <i className="fa fa-plus" />
                            <span className="hidden-mobile"><Msg phrase="AddNewText" /></span>
                          </button>
                          &nbsp;
                                <button className="btn btn-primary" data-toggle="modal"
                            data-target="#FeeCollectionPopup">
                            <i className="fa fa-plus" />
                            <span className="hidden-mobile"><Msg phrase="AddNewText" /></span>
                          </button>
                        </div>
                      </div>
                    </div> 
                     
                    <Loader isLoading={this.props.isLoading} />
                    <Datatable id="FeeCollectionGrid"  
                      options={{
                        ajax: {"url":'/api/FeeStructures/All', "dataSrc": ""},                       
                        columnDefs: [                             
                            {
                                // The `data` parameter refers to the data for the cell (defined by the
                                // `data` option, which defaults to the column being worked with, in
                                // this case `data: 0`.
                                "render": function ( data, type, row ) {
                                    return '<a data-toggle="modal" data-id="' + data + '" data-target="#FeeCollectionPopup"><i id="edi" class=\"glyphicon glyphicon-edit\"></i><span class=\"sr-only\">Edit</span></a>';
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
                          {data: "FeeCollectionID"},
                          {data: "ClassName"},
                          {data: "FeeTypeName"},       
                          {data: "FeeCycleName"},
                          {data: "FeeDueOnFrequencyName"}, 
                          {data: "Fee"},    
                          {data: "DiscountValue"},  
                          {data: "NetFee"},                   
                          {data: "FeeCollectionID"},
                          {data: "FeeCollectionID"}
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
                        <th><Msg phrase="ClassText"/></th>
                        <th><Msg phrase="FeeTypes"/></th>
                        <th><Msg phrase="FeeCycleText"/></th>
                        <th><Msg phrase="FeeDueOnFrequencyText"/></th>
                        <th><Msg phrase="FeeText"/></th> 
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
  
        <div className="modal fade" id="FeeCollectionPopup" tabIndex="-1" role="dialog" 
            data-backdrop="static" data-keyboard="false"
            aria-labelledby="FeeCollectionPopupLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title" id="FeeCollectionPopupLabel">
                  { this.state.feeTypeId > 0 ? <Msg phrase="ManageText" /> : <Msg phrase="AddNewText"/> }
                </h4>
              </div>
              <div className="modal-body"> 
                { this.state.feeTypeId > 0 ?                     
                  <EditGeneralInfo 
                    FeeTypeID={this.state.feeTypeId}  
                    onSubmit={submit} />
                  : <FeeCollectionForm 
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
const afterSubmit = function(result, dispatch) { 
  dispatch(reset('FeeCollectionsPage'));
}
 
FeeCollectionsPage =  reduxForm({
form: 'FeeCollectionsPage',  // a unique identifier for this form
onSubmitSuccess: afterSubmit,
keepDirtyOnReinitialize: false 
})(FeeCollectionsPage)

const selector = formValueSelector('FeeCollectionsPage') // <-- same as form name
FeeCollectionsPage = connect(
state => { 
  //const { shiftId111 } = selector(state, 'shiftId')
  return {
    shiftId: selector(state, 'shiftId')
    //shiftId111
  }
}
)(FeeCollectionsPage)

export default FeeCollectionsPage;