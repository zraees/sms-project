import {SubmissionError} from 'redux-form'
import axios from 'axios' 
import converter from 'number-to-words'
import numeral  from 'numeral'

import alert, {confirmation} from '../../../../components/utils/alerts'
import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";
import Msg from '../../../../components/i18n/Msg' 
import {isYesClicked, isNoClicked, getLangKey, getDateFrontEndFormat, getTranslation, instanceAxios} from '../../../../components/utils/functions'
import LanguageStore from '../../../../components/i18n/LanguageStore'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader';
import print from '../../../../components/utils/reportRendering'

const feePaymentSlipTemplate = require('html-loader!./FeePaymentSlip-1.html');

export function generateFeeCollections(values) {
  console.log('in generateFeeCollections ', values, values.feeStructureId.join());
  // console.log('hi ' , values.studentId==null?"null":values.studentId);

  LoaderVisibility(true);
  axios.get('api/GenerateFeeCollections/' + values.shiftId + '/' + values.classId + '/' 
            + values.sectionId + '/' + values.batchId +'/'+values.feeStructureId.join()+ '/' + (values.studentId==null?"null":values.studentId))
    .then(function (response) {

      alert('s', 'data has been generated successfully');

      var table = $('#FeeCollectionGrid').DataTable();
      table.clear();
      table.ajax.reload(null, false);

      LoaderVisibility(false);

    })
    .catch(function (error) {
      console.log(error);
      alert('f', '');
      LoaderVisibility(false);
    });
}


export function submitFeePayment(values, dueFeeIdsForDelete) {

  LoaderVisibility(true);

  if (values.feeDueDetails.length > 0) {

    values.feeDueDetails[0].paymentDate = values.paymentDate;
    values.feeDueDetails[0].paymentComments = values.paymentComments;
    values.feeDueDetails[0].paymentModeId = values.paymentModeId;
    values.feeDueDetails[0].feeCollectedBy = values.feeCollectedBy;
    
    //console.log(' not empty ..', values.feeDueDetails);

    if (dueFeeIdsForDelete.length > 0) {
      instanceAxios.post('/api/RemoveFeeCollectionAging/' + dueFeeIdsForDelete)
        .then(function (response) {

          console.log('remove done .. ');
          UpdateFeeAgingApiCall(values);

        })
        .catch(function (error) {
          console.log('error agya.. ', error);
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            alert('f', error.response.data.StatusMessage);
            LoaderVisibility(false);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          //console.log(error.config);

          //alert('f', '');
          LoaderVisibility(false);
        });
    }
    else {

      UpdateFeeAgingApiCall(values);
    }

  }
  else {
    LoaderVisibility(false);
    alert('f', "At least one record must be entered");
  }
}

function UpdateFeeAgingApiCall(values) {

  instanceAxios.put('/api/UpdateFeeAging', values.feeDueDetails)
    .then(function (response) {

      // console.log('response  submitFeePayment(values)',response);
      // console.log('response  response.data ',response.data);
      // console.log('response  response.status ',response.status);
      // console.log('response  response.data.StatusMessage ',response.data.StatusMessage);

      alert('s', 'data has been updated.');
      $('#feeCollectionPopup').modal('hide');
      $('#paymentId').val(response.data);

      LoaderVisibility(false);

    })
    .catch(function (error) {
      console.log('error agya.. ', error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert('f', error.response.data.StatusMessage);
        LoaderVisibility(false);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      //console.log(error.config);

      //alert('f', '');
      LoaderVisibility(false);
    });
}

export function printFeeSlip(langKey, feePaymentId) {

  console.log('feePaymentId ==> ', feePaymentId, numeral(2324).format('0,0.00'));

  if (feePaymentId) {

    langKey = getLangKey ();
    alert('i', 'Please wait while report data is loading ... ');

    //console.log(',feePaymentSlipTemplate ==> ',feePaymentSlipTemplate)

    var htmlContent = feePaymentSlipTemplate; //$("#feePaymentSlip").html(); //this.state.feePaymentSlipTemplate; 

    axios.get('api/FeePayments/FeePaymentByID/' + langKey + '/' + feePaymentId)
      .then(res => {
        var masterData = res.data[0];
        //console.log('res from api/FeePayments/FeePaymentByID/ ', res,  converter.toWords(masterData.TotalPaidAmount));
       
        htmlContent = htmlContent.replace('$SchoolName$', getTranslation('Prime Stars International School'));
        htmlContent = htmlContent.replace('$SchoolAddress$', getTranslation('Al Kharj Saudi Arabia'));
        
        htmlContent = htmlContent.replace('$ReportTitle$', getTranslation('Fee Receipt'));
        htmlContent = htmlContent.replace('$RollNoText$', getTranslation('RollNoText'));
        
        htmlContent = htmlContent.replace('$NameText$', getTranslation('NameText'));
        htmlContent = htmlContent.replace('$BatchText$', getTranslation('BatchText'));
        htmlContent = htmlContent.replace('$ClassText$', getTranslation('ClassText'));
        htmlContent = htmlContent.replace('$SectionText$', getTranslation('SectionText'));
        
        htmlContent = htmlContent.replace('$PaymentCodeText$', getTranslation('PaymentCodeText'));
        htmlContent = htmlContent.replace('$PaymentDateText$', getTranslation('PaymentDateText'));
        htmlContent = htmlContent.replace('$PrintDateText$', getTranslation('PrintDateText'));
        
        htmlContent = htmlContent.replace('$FeeTitleText$', getTranslation('FeeTypeText'));
        htmlContent = htmlContent.replace('$AmountText$', getTranslation('AmountText'));
        htmlContent = htmlContent.replace('$AmountInWordsText$', getTranslation('AmountInWordsText'));
        htmlContent = htmlContent.replace('$TotalAmountText$', getTranslation('TotalPaidAmountText'));
        htmlContent = htmlContent.replace('$PaymentModeText$', getTranslation('PaymentModeText'));
        htmlContent = htmlContent.replace('$BalanceText$', getTranslation('BalanceText'));
        htmlContent = htmlContent.replace('$CommentsText$', getTranslation('CommentsText'));
        htmlContent = htmlContent.replace('$DiscountAmountText$', getTranslation('DiscountAmountText'));
        
        htmlContent = htmlContent.replace('$PrintedByText$', getTranslation('PrintedByText'));
        htmlContent = htmlContent.replace('$FeeCollectedByText$', getTranslation('FeeCollectedByText'));


        htmlContent = htmlContent.replace('$Batch$', masterData.BatchName);
        htmlContent = htmlContent.replace('$Class$', masterData.ClassName);
        htmlContent = htmlContent.replace('$Section$', masterData.SectionName);
        htmlContent = htmlContent.replace('$RollNo$', masterData.RollNo);
        htmlContent = htmlContent.replace('$Name$', masterData.StudentFullName);
        htmlContent = htmlContent.replace('$PaymentCode$', masterData.FeePaymentCode);
        htmlContent = htmlContent.replace('$PaymentDate$', getDateFrontEndFormat(masterData.PaidOn));
        htmlContent = htmlContent.replace('$PrintDate$', getDateFrontEndFormat(moment()));
        htmlContent = htmlContent.replace('$TotalAmount$', numeral(masterData.TotalPaidAmount).format('0,0.00'));
        htmlContent = htmlContent.replace('$DiscountAmount$', numeral(masterData.DiscountAmount).format('0,0.00'));
        htmlContent = htmlContent.replace('$PaymentMode$', masterData.PaymentModeName);
        htmlContent = htmlContent.replace('$Balance$', numeral(masterData.Balance).format('0,0.00'));

        htmlContent = htmlContent.replace('$PrintedBy$', "Zeeshan");
        //htmlContent = htmlContent.replace('$IssuedBy$', "Admin");
        htmlContent = htmlContent.replace('$FeeCollectedBy$', masterData.FeeCollectedBy);
        htmlContent = htmlContent.replace('$ComputerGeneratedDocument$', getTranslation('ComputerGeneratedDocumentText')); 

        htmlContent = htmlContent.replace('$AmountInWords$', converter.toWords(masterData.TotalPaidAmount));
        htmlContent = htmlContent.replace('$Comments$', masterData.Comments);

        var tblRow = '<tr><td>#</td><td>$title$</td><td class="text-right">$amount$</td></tr>';
        var temp = '';
        res.data.forEach(function(element, index){
          temp += tblRow.replace('#', index+1).replace('$title$', element.FeeTypeName).replace('$amount$', numeral(element.PaidAmount).format('0,0.00'));
        });
        
        htmlContent = htmlContent.replace(tblRow, temp);

        if (langKey == 'ar') {
          htmlContent = htmlContent.replace('direction: ltr;', 'direction: rtl;');
          htmlContent = htmlContent.replace('text-right', 'text-left');
        }

        //this.setState({ feePaymentSlipTemplate: htmlContent });
        $("#reportContainer").html(htmlContent);
        print('feePaymentSlip');
      });

    

  }
}

// function submit(values) {
//   console.log(values);

//   if (values.feeStructureId > 0) {
//     update(values);
//   }
//   else {
//     insert(values);
//   }

// }

// function insert(values) {
//   LoaderVisibility(true);
//   console.log(values);
//   instanceAxios.post('/api/FeeStructures', values)
//     .then(function (response) {

//       LoaderVisibility(false);
//       alert('s', 'data has been saved successfully');
//       $('#FeeCollectionPopup').modal('hide');

//     })
//     .catch(function (error) {
//       if (error.response) {
//         alert('f', error.response.data.StatusMessage);

//         LoaderVisibility(false);
//         //throw new SubmissionError({ _error: "That's weird. "});   
//         //reject('error error error');
//         console.log('submission error')
//         throw new SubmissionError({
//           shiftId: 'record already exists',
//           _error: 'You cannot proceed further!',
//         });

//       } else if (error.request) {
//         console.log(error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log('Error', error.message);
//       }
//       //console.log(error.config);

//       //alert('f', '');
//       LoaderVisibility(false);
//     });
// }

// function update(values) {
//   //console.log('in update');
//   //console.log(values);
//   LoaderVisibility(true);
//   instanceAxios.put('/api/FeeStructures', values)
//     .then(function (response) {

//       alert('s', 'data has been updated successfully');
//       $('#FeeCollectionPopup').modal('hide');
//       LoaderVisibility(false);

//     })
//     .catch(function (error) {
//       console.log(error);
//       alert('f', '');
//       LoaderVisibility(false);
//     });
// }

export function remove(id, delCell) {

  let messageText = LanguageStore.getData().phrases["DeleteConfirmationMessageText"]
    || 'Are you sure, you want to delete this record?';

  confirmation(messageText, function (ButtonPressed) {
    deleteRecord(ButtonPressed, id, delCell);
  });

}

function deleteRecord(ButtonPressed, id, delCell) {

  if (isYesClicked(ButtonPressed)) {
    LoaderVisibility(true);
    console.log('delete feecoll id ', id);
    
    $.ajax({
      url: '/api/RemoveFeeCollection/' + id,
      type: "POST",
      //data : formData,
      success: function (data, textStatus, jqXHR) {
        console.log('success...');
        alert('s', 'data has been deleted successfully');

        var table = $('#FeeCollectionGrid').DataTable();
        table
          .row(delCell.parents('tr'))
          .remove()
          .draw();

        LoaderVisibility(false);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('error = ', jqXHR, textStatus, errorThrown);
        alert('f', '');

        LoaderVisibility(false);
      }
    });
  }
  else if (isNoClicked(ButtonPressed)) {
    // do nothing
  }
  
}
 

export function removePayment(id, delCell) {

  let messageText = LanguageStore.getData().phrases["DeleteConfirmationMessageText"]
    || 'Are you sure, you want to delete this record?';

  confirmation(messageText, function (ButtonPressed) {
    deletePaymentRecord(ButtonPressed, id, delCell);
  });

}

function deletePaymentRecord(ButtonPressed, id, delCell) {

  if (isYesClicked(ButtonPressed)) {
    LoaderVisibility(true);
    console.log('delete removePayment id ', id);
    
    $.ajax({
      url: '/api/RemoveFeePayment/' + id,
      type: "POST",
      //data : formData,
      success: function (data, textStatus, jqXHR) {
        console.log('success... feePaymentDetailsGrid ??? need to fix aging effect . ');
        alert('s', 'data has been deleted successfully');

        var table = $('#feePaymentDetailsGrid').DataTable();
        table
          .row(delCell.parents('tr'))
          .remove()
          .draw();

        LoaderVisibility(false);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('error = ', jqXHR, textStatus, errorThrown);
        alert('f', '');

        LoaderVisibility(false);
      }
    });
  }
  else if (isNoClicked(ButtonPressed)) {
    // do nothing
  }
  
}
