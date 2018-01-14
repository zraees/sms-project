import {SubmissionError} from 'redux-form'
import axios from 'axios' 

import alert, {confirmation} from '../../../../components/utils/alerts'
import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";
import Msg from '../../../../components/i18n/Msg'
import {isYesClicked, isNoClicked} from '../../../../components/utils/functions'
import LanguageStore from '../../../../components/i18n/LanguageStore'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader';


export function generateFeeCollections(values) {
  // console.log('in generateFeeCollections ', values);
  // console.log('hi ' , values.studentId==null?"null":values.studentId);

  LoaderVisibility(true);
  axios.get('api/GenerateFeeCollections/' + values.shiftId + '/' + values.classId + '/' 
            + values.sectionId + '/' + values.batchId + '/' + (values.studentId==null?"null":values.studentId))
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


export function submitFeePayment(values) {

  LoaderVisibility(true);

  if (values.feeDueDetails.length > 0) {

    values.feeDueDetails[0].paymentDate = values.paymentDate;
    values.feeDueDetails[0].paymentComments = values.paymentComments;
    
    console.log(' not empty ..', values.feeDueDetails);

    axios.put('/api/UpdateFeeAging', values.feeDueDetails)
      .then(function (response) {

        console.log('response ',response);
        alert('s', 'data has been updated.');
        $('#feeCollectionPopup').modal('hide');
        $('#paymentId').val(response.data);
        
        LoaderVisibility(false);

      })
      .catch(function (error) {
        console.log('error agya');
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
    LoaderVisibility(false);
    alert('f', "At least one record must be entered");
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
//   axios.post('/api/FeeStructures', values)
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
//   axios.put('/api/FeeStructures', values)
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
 