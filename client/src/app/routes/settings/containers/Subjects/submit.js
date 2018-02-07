import {SubmissionError} from 'redux-form'
import axios from 'axios' 

import alert, {confirmation} from '../../../../components/utils/alerts'
import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";
import Msg from '../../../../components/i18n/Msg'
import {isYesClicked, isNoClicked, instanceAxios} from '../../../../components/utils/functions'
import LanguageStore from '../../../../components/i18n/LanguageStore'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader';
 
  function submit(values){
    //console.log(values);
    return instanceAxios.get('/api/subjects/' + values.subjectId + '/' + values.code + '/')
      .then(res=>{            
          //throw {Code: 'That Code is already taken'}
          if(res.data.Code===''){
                    
            if(values.subjectId>0){
              update(values); 
            }
            else{
              insert(values);
            }      

          }
          else{
            throw new SubmissionError({   
              Code: 'Code is already taken',
              _error: 'You cannot proceed further!'
            })
          }
      })   
  }

  function insert(values){
    LoaderVisibility(true);
    console.log(values);
    instanceAxios.post('/api/subjects', values)      
        .then(function (response) {
          
          LoaderVisibility(false);
          alert('s', 'data has been saved successfully');
          $('#teacherPopup').modal('hide');  

        })
        .catch(function (error) {
          if (error.response) { 
            alert('f', error.response.data.StatusMessage);  
          
            LoaderVisibility(false);      
            return Promise.resolve(true).then(() => {
              throw new SubmissionError({ Code: 'User does not exist', _error: 'Login failed!' });
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
    LoaderVisibility(true);
    instanceAxios.put('/api/subjects', values)      
        .then(function (response) {
          
          alert('s','data has been updated successfully');
          $('#teacherPopup').modal('hide');  
          LoaderVisibility(false);

        })
        .catch(function (error) {
          console.log(error);
          alert('f', error.response.data.StatusMessage);
          LoaderVisibility(false);
        });      
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
        console.log('teacher dele conf yes by func');
        // console.log(id);
         
        $.ajax({
            url : '/api/RemoveSubject/' + id,
            type: "POST",
            //data : formData,
            success: function(data, textStatus, jqXHR)
            {
              console.log('success...');
              alert('s','data has been deleted successfully');
              
              var table = $('#subjectsGrid').DataTable();                
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

export default submit