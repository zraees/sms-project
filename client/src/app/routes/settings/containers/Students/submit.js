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
    //console.log(values);
    axios.post('/api/students', values)      
      .then(function (response) {
        
        LoaderVisibility(false);
        alert('s', 'student details have been saved.');
        $('#StudentPopup').modal('hide');  

      })
      .catch(function (error) {
        if (error.response) { 
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
    LoaderVisibility(true);
    axios.put('/api/students', values)      
      .then(function (response) {
        
        alert('s','student details have been updated.');
        $('#StudentPopup').modal('hide');  
        LoaderVisibility(false);

      })
      .catch(function (error) {
        console.log(error);
        alert('f', error.response.data.StatusMessage);
        LoaderVisibility(false);
      });      
  }

  export function submitPreviousSchool(values, studentId){
    values = Object.assign({}, values, {studentId});    
    LoaderVisibility(true);
    axios.post('/api/StudentPreviousSchools', values)      
      .then(function (response) {
        
        alert('s', 'data has been saved successfully');
        $('#previousSchoolsGrid').DataTable().ajax.reload();  
        $('#tabListPreviousSchool').trigger('click');
        LoaderVisibility(false);

      })
      .catch(function (error) {
        console.log(error);
        alert('f', error.response.data.StatusMessage);
        LoaderVisibility(false);
        throw new SubmissionError({   
            _error: 'Something went wrong, please contact system administrator!'
          });
      });
  }

  export function submitSiblingDetail(values, studentId){
    values = Object.assign({}, values, {studentId});    
    LoaderVisibility(true);
    axios.post('/api/StudentSiblings', values)      
      .then(function (response) {
        
        alert('s', 'data has been saved successfully');
        $('#siblingsGrid').DataTable().ajax.reload();  
        $('#tabListSibling').trigger('click');
        LoaderVisibility(false);

      })
      .catch(function (error) {
        console.log(error);
        alert('f', error.response.data.StatusMessage);
        LoaderVisibility(false);
        throw new SubmissionError({   
            _error: 'Something went wrong, please contact system administrator!'
          });
      });
  }

  export function submitStudentRelative(values, studentId){
    values = Object.assign({}, values, {studentId});    
    LoaderVisibility(true);
    axios.post('/api/StudentsRelatives', values)      
      .then(function (response) {
        
        alert('s', 'data has been saved successfully');
        $('#relativesGrid').DataTable().ajax.reload();  
        $('#tabListRelative').trigger('click');
        LoaderVisibility(false);

      })
      .catch(function (error) {
        console.log(error);
        alert('f', error.response.data.StatusMessage);
        LoaderVisibility(false);
        throw new SubmissionError({   
            _error: 'Something went wrong, please contact system administrator!'
          });
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
        //console.log('student dele conf yes by func'); 
        $.ajax({
            url : '/api/Removestudent/' + id,
            type: "POST",
            //data : formData,
            success: function(data, textStatus, jqXHR)
            {
              console.log('success...');
              alert('s','student details have been deleted.');
              
              var table = $('#StudentsGrid').DataTable();                
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

  export function removePreviousSchool(id, delCell){
  
    let messageText = LanguageStore.getData().phrases["DeleteConfirmationMessageText"] 
                              || 'Are you sure, you want to delete this record?';
    
    confirmation(messageText, function(ButtonPressed){
        deletePreviousSchoolRecord(ButtonPressed, id, delCell); 
    });
  }

  function deletePreviousSchoolRecord(ButtonPressed, id, delCell) {

    if (isYesClicked(ButtonPressed)) {         
        LoaderVisibility(true);

        axios.post('/api/RemovePreviousSchool/' + id)      
          .then(function (response) {
            
            alert('s','data has been deleted successfully');
            
            var table = $('#previousSchoolsGrid').DataTable();                
            table
              .row( delCell.parents('tr') )
              .remove()
              .draw();
              
              console.log(Date());
              LoaderVisibility(false);
          })
          .catch(function (error) {
              alert('f','');
              LoaderVisibility(false);
          }); 

      
    }
    else if (isNoClicked(ButtonPressed)) {
      // do nothing
    }
  }

  export function removeSibling(id, delCell){
  
    let messageText = LanguageStore.getData().phrases["DeleteConfirmationMessageText"] 
                              || 'Are you sure, you want to delete this record?';
    
    confirmation(messageText, function(ButtonPressed){
        deleteSiblingRecord(ButtonPressed, id, delCell); 
    });
  }

  function deleteSiblingRecord(ButtonPressed, id, delCell) {

    if (isYesClicked(ButtonPressed)) {         
        LoaderVisibility(true);

        axios.post('/api/RemoveSibling/' + id)      
          .then(function (response) {
            
            alert('s','data has been deleted successfully');
            
            var table = $('#siblingsGrid').DataTable();                
            table
              .row( delCell.parents('tr') )
              .remove()
              .draw();
              
              console.log(Date());
              LoaderVisibility(false);
          })
          .catch(function (error) {
              alert('f','');
              LoaderVisibility(false);
          }); 

      
    }
    else if (isNoClicked(ButtonPressed)) {
      // do nothing
    }
  }

  export function removeStudentRelative(id, delCell){
  
    let messageText = LanguageStore.getData().phrases["DeleteConfirmationMessageText"] 
                              || 'Are you sure, you want to delete this record?';
    
    confirmation(messageText, function(ButtonPressed){
        deleteSiblingRecord(ButtonPressed, id, delCell); 
    });
  }

  function deleteStudentRelativeRecord(ButtonPressed, id, delCell) {

    if (isYesClicked(ButtonPressed)) {         
        LoaderVisibility(true);

        axios.post('/api/RemoveStudentRelative/' + id)      
          .then(function (response) {
            
            alert('s','data has been deleted successfully');
            
            var table = $('#relativesGrid').DataTable();                
            table
              .row( delCell.parents('tr') )
              .remove()
              .draw();
              
              console.log(Date());
              LoaderVisibility(false);
          })
          .catch(function (error) {
              alert('f','');
              LoaderVisibility(false);
          }); 

      
    }
    else if (isNoClicked(ButtonPressed)) {
      // do nothing
    }
  }
export default submit