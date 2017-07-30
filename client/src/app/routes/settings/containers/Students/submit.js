import {SubmissionError} from 'redux-form'
import axios from 'axios' 

import alert, {confirmation} from '../../../../components/utils/alerts'
import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";
import Msg from '../../../../components/i18n/Msg'
import {isYesClicked, isNoClicked} from '../../../../components/utils/functions'
import LanguageStore from '../../../../components/i18n/LanguageStore'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader';

    function submit(values){
      console.log(values);
      return axios.get('/api/students/' + values.studentId + '/' + values.email + '/')
        .then(res=>{            
            //throw {email: 'That email is already taken'}
            if(res.data.Email===''){
                      
              if(values.studentId>0){
                update(values); 
              }
              else{
                insert(values);
              }      

            }
            else{
              throw new SubmissionError({   
                email: 'email is already taken',
                _error: 'You cannot proceed further!'
              })
            }
        })   
    }

    function insert(values){
      LoaderVisibility(true);
      console.log(values);
      axios.post('/api/students', values)      
          .then(function (response) {
            
            LoaderVisibility(false);
            alert('s', 'student details have been saved.');
            $('#studentPopup').modal('hide');  

          })
          .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              //console.log(error.response.data);
              //console.log(error.response.status);
              //console.log(error.response.headers);

              alert('f', error.response.data.StatusMessage);  
            
              LoaderVisibility(false);     
                   //throw new SubmissionError({ _error: "That's weird. "});   
                   //reject('error error error');
                   return Promise.resolve(true).then(() => {
                    throw new SubmissionError({ email: 'User does not exist', _error: 'Login failed!' });
                  });
              // return new SubmissionError({   
              //   email: 'email is already taken',
              //   _error: 'You cannot proceed further!'
              // });

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
      axios.put('/api/students', values)      
          .then(function (response) {
            
            alert('s','student details have been updated.');
            $('#studentPopup').modal('hide');  
            LoaderVisibility(false);

          })
          .catch(function (error) {
            console.log(error);
            alert('f', '');
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
            console.log('student dele conf yes by func');
            // console.log(id);
            
            ////axios.delete('/api/students/' + id)      
            // axios.post('/api/Removestudent/' + id)
            //   .then(function (response) {
                
            //     alert('s','student details have been deleted.');
                
            //     var table = $('#studentsGrid').DataTable();                
            //     table
            //       .row( delCell.parents('tr') )
            //       .remove()
            //       .draw();

            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //       alert('f','');
            //   }); 

            $.ajax({
                url : '/api/Removestudent/' + id,
                type: "POST",
                //data : formData,
                success: function(data, textStatus, jqXHR)
                {
                  console.log('success...');
                  alert('s','student details have been deleted.');
                  
                  var table = $('#studentsGrid').DataTable();                
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