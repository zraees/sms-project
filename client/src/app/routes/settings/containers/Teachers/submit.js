import {SubmissionError} from 'redux-form'
import axios from 'axios' 

import alert, {confirmation} from '../../../../components/utils/alerts'
import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";
import Msg from '../../../../components/i18n/Msg'
import {isYesClicked, isNoClicked} from '../../../../components/utils/functions'
import LanguageStore from '../../../../components/i18n/LanguageStore'


    function submit(values){
      console.log(values);
      return axios.get('/api/teachers/' + values.id + '/' + values.email + '/')
        .then(res=>{            
            //throw {email: 'That email is already taken'}
            if(res.data.Email===''){
                      
              if(values.id>0){
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
      
      axios.post('/api/teachers', values)      
          .then(function (response) {
            
            alert('s', 'Teacher details have been saved.');
            $('#teacherPopup').modal('hide');  

          })
          .catch(function (error) {
            console.log(error);
            alert('f', '');
            
          });      
    }

    function update(values){
      // console.log('in update');
      // console.log(values);
      axios.put('/api/teachers', values)      
          .then(function (response) {
            
            alert('s','Teacher details have been updated.');
            $('#teacherPopup').modal('hide');  

          })
          .catch(function (error) {
            console.log(error);
            alert('f', '');
            
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
            console.log('conf yes by func');
            // console.log(id);
            axios.delete('/api/teachers/' + id)      
              .then(function (response) {
                
                alert('s','Teacher details have been deleted.');
                
                var table = $('#teachersGrid').DataTable();                
                table
                  .row( delCell.parents('tr') )
                  .remove()
                  .draw();

                  //console.log('after row del ..')

              })
              .catch(function (error) {
                  alert('f','');
              }); 

          
        }
        else if (isNoClicked(ButtonPressed)) {
          // do nothing
        }
      }

    export function submitQualification(values){
      
      axios.post('/api/TeacherQualifications', values)      
          .then(function (response) {
            
            alert('s', 'Qualification details have been saved.');
            $('#teacherQualificationsGrid').DataTable().ajax.reload();  
            $('#tabList').trigger('click');

          })
          .catch(function (error) {
            console.log(error);
            alert('f', '');
            throw new SubmissionError({   
                _error: 'Something went wrong, please contact system administrator!'
              });
          });
    } 

    export function submitExperience(values){
      console.log(values);
      axios.post('/api/TeacherExperiences', values)      
          .then(function (response) {
            
            alert('s', 'Experience details have been saved.');
            $('#teacherExperiencesGrid').DataTable().ajax.reload();  
            $('#tabListExp').trigger('click');

          })
          .catch(function (error) {
            console.log(error);
            alert('f', '');
            throw new SubmissionError({   
                _error: 'Something went wrong, please contact system administrator!'
              });
          });
    }

  export function removeQualification(id, delCell){
      
      let messageText = LanguageStore.getData().phrases["DeleteConfirmationMessageText"] 
                                || 'Are you sure, you want to delete this record?';
    
      confirmation(messageText, function(ButtonPressed){
          deleteQualificationRecord(ButtonPressed, id, delCell); 
      });
  }

    function deleteQualificationRecord(ButtonPressed, id, delCell) {

        if (isYesClicked(ButtonPressed)) {
            axios.delete('/api/TeacherQualifications/' + id)      
              .then(function (response) {
                
                alert('s','Qualification details have been deleted.');
                
                var table = $('#teacherQualificationsGrid').DataTable();                
                table
                  .row( delCell.parents('tr') )
                  .remove()
                  .draw();

                  //console.log('after row del ..')

              })
              .catch(function (error) {
                  alert('f','');
              }); 

          
        }
        else if (isNoClicked(ButtonPressed)) {
          // do nothing
        }
      }

  export function removeExperience(id, delCell){
    
    let messageText = LanguageStore.getData().phrases["DeleteConfirmationMessageText"] 
                              || 'Are you sure, you want to delete this record?';
    
    confirmation(messageText, function(ButtonPressed){
        deleteExperienceRecord(ButtonPressed, id, delCell); 
    });
  }

  function deleteExperienceRecord(ButtonPressed, id, delCell) {

      if (isYesClicked(ButtonPressed)) {
          
          axios.delete('/api/TeacherExperiences/' + id)      
            .then(function (response) {
              
              alert('s','Experience details have been deleted.');
              
              var table = $('#teacherExperiencesGrid').DataTable();                
              table
                .row( delCell.parents('tr') )
                .remove()
                .draw();

            })
            .catch(function (error) {
                alert('f','');
            }); 

        
      }
      else if (isNoClicked(ButtonPressed)) {
        // do nothing
      }
    }


export default submit