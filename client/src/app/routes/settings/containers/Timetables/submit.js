import {SubmissionError} from 'redux-form'
import axios from 'axios' 

import alert, {confirmation} from '../../../../components/utils/alerts'
import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";
import Msg from '../../../../components/i18n/Msg'
import {isYesClicked, isNoClicked, overlap} from '../../../../components/utils/functions'
import LanguageStore from '../../../../components/i18n/LanguageStore'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader';

  function submit(values, timetableId){
    console.log(values);
    console.log('timetableId ', timetableId);
    // return axios.get('/api/students/' + values.studentId + '/' + values.email + '/')
    //   .then(res=>{            
    //       //throw {email: 'That email is already taken'}
    //       if(res.data.Email===''){
                    
            if(timetableId>0){
              update(values); 
            }
            else{
              insert(values);
            }      

      //     }
      //     else{
      //       throw new SubmissionError({   
      //         email: 'email is already taken',
      //         _error: 'You cannot proceed further!'
      //       })
      //     }
      // })   
  }

  function insert(values){
    LoaderVisibility(true);

    axios.post('/api/timetables', values)      
      .then(function (response) {
         
        LoaderVisibility(false);
        alert('s', 'data has been saved successfully');
        $('#timeTablePopup').modal('hide');  

      })
      .catch(function (error) {
        if (error.response) { 
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert('f', error.response.data.StatusMessage);   
          LoaderVisibility(false);     
                //throw new SubmissionError({ _error: "That's weird. "});   
                //reject('error error error');
                return Promise.resolve(true).then(() => {
                throw new SubmissionError({  });
              }); 
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

  function update(values){
    //console.log('in update');
    //console.log(values);
    // LoaderVisibility(true);
    // axios.put('/api/students', values)      
    //   .then(function (response) {
        
    //     alert('s','student details have been updated.');
    //     $('#StudentPopup').modal('hide');  
    //     LoaderVisibility(false);

    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     alert('f', error.response.data.StatusMessage);
    //     LoaderVisibility(false);
    //   });      
  }


  export function remove(id, delCell){
    
  let messageText = LanguageStore.getData().phrases["DeleteConfirmationMessageText"] 
                          || 'Are you sure, you want to delete this record?';

  confirmation(messageText, function(ButtonPressed){
      deleteRecord(ButtonPressed, id, delCell); 
  });

}
  
function deleteRecord(ButtonPressed, id, delCell) {

  if (isYesClicked(ButtonPressed)) {
      LoaderVisibility(true);
      console.log('timetable dele conf yes by func');
      // console.log(id);
       
      $.ajax({
          url : '/api/RemoveTimeTable/' + id,
          type: "POST",
          //data : formData,
          success: function(data, textStatus, jqXHR)
          {
            console.log('success...');
            alert('s','data has been deleted.');
            
            var table = $('#timeTablesGrid').DataTable();                
            table
              .row( delCell.parents('tr') )
              .remove()
              .draw();

            LoaderVisibility(false);

          },
          error: function (jqXHR, textStatus, errorThrown)
          {
            console.log('error = ', jqXHR, textStatus, errorThrown);
            alert('f','');

            LoaderVisibility(false);
          }
      });
  }
  else if (isNoClicked(ButtonPressed)) {
    // do nothing
  }    
}

export function createEmptyTimeTableDetail(timeTableId, dayId){
    LoaderVisibility(true);
  
      axios.post('/api/createEmptyTimeTableDetails', {"timeTableId":timeTableId, "dayId":dayId})      
        .then(function (response) {
           
          LoaderVisibility(false);
          alert('s', 'data has been saved successfully');
          $('#timeTablePopup').modal('hide');  
  
        })
        .catch(function (error) {
          if (error.response) { 
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            alert('f', error.response.data.StatusMessage);   
            LoaderVisibility(false);     
                  //throw new SubmissionError({ _error: "That's weird. "});   
                  //reject('error error error');
                  return Promise.resolve(true).then(() => {
                  throw new SubmissionError({  });
                }); 
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

export function submitTimetableDay(values) {
  // console.log('func submitTimetableDay ', 
  //   {"timeTableId": values.timeTableId, "dayId": values.dayId, "timeTableDetails": values.timeTableDetails});

  LoaderVisibility(true);

  if(values.timeTableDetails.length >0){
    //console.log(' not empty ..');

    var dateRange = values.timeTableDetails.map(function (item, index) {
      return { start: item.startTime, end: item.endTime };
    });     

    //console.log('dateRange, ', dateRange);

    var validate = overlap(dateRange);
    if (!validate.overlap) {

      axios.put('/api/TimeTableDetails', values.timeTableDetails)
        .then(function (response) {

          alert('s', 'data has been updated.');
          $('#timeTablePopup').modal('hide');
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
      alert('f', "There is an overlapping in timetable start & end time.");
    }

  }
else{
  //console.log(' empty .. ',{"timeTableDetailId": -1, "timeTableId": values.timeTableId, "dayId": values.dayId});
  axios.put('/api/TimeTableDetails', [{"timeTableDetailId": -1, "timeTableId": values.timeTableId, "dayId": values.dayId}])
  .then(function (response) {

    alert('s', 'data has been updated.');
    $('#timeTablePopup').modal('hide');
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


  //axios.put('/api/TimeTableDetails', {"timeTableId": values.timeTableId, "dayId": values.dayId, "timeTableDetails": values.timeTableDetails})
    
    // .catch(function (error) {
    //   console.log(error);
    //   alert('f', error.response.data.StatusMessage);
    //   LoaderVisibility(false);
    // });
}

export default submit