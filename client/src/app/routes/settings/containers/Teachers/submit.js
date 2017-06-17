import {SubmissionError} from 'redux-form'
import axios from 'axios' 

import alert, {confirmation} from '../../../../components/utils/alerts'
import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";
import Msg from '../../../../components/i18n/Msg'
import {isYesClicked, isNoClicked} from '../../../../components/utils/functions'
import LanguageStore from '../../../../components/i18n/LanguageStore'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader'


    function submit(values){
      //console.log(values);
      return axios.get('/api/teachers/' + values.teacherId + '/' + values.email + '/')
        .then(res=>{            
            //throw {email: 'That email is already taken'}
            if(res.data.Email===''){
                      
              if(values.teacherId>0){
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
      
      axios.post('/api/teachers', values)      
          .then(function (response) {
            
            LoaderVisibility(false);
            alert('s', 'Teacher details have been saved.');
            $('#teacherPopup').modal('hide');  

          })
          .catch(function (error) {
            console.log(error);
            alert('f', '');
            LoaderVisibility(false);      
          });      
    }

    function update(values){
      //console.log('in update');
      //console.log(values);
      LoaderVisibility(true);
      axios.put('/api/teachers', values)      
          .then(function (response) {
            
            alert('s','Teacher details have been updated.');
            $('#teacherPopup').modal('hide');  
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
            console.log('teacher dele conf yes by func');
            // console.log(id);
            
            ////axios.delete('/api/teachers/' + id)      
            // axios.post('/api/RemoveTeacher/' + id)
            //   .then(function (response) {
                
            //     alert('s','Teacher details have been deleted.');
                
            //     var table = $('#teachersGrid').DataTable();                
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
                url : '/api/RemoveTeacher/' + id,
                type: "POST",
                //data : formData,
                success: function(data, textStatus, jqXHR)
                {
                  console.log('success...');
                  alert('s','Teacher details have been deleted.');
                  
                  var table = $('#teachersGrid').DataTable();                
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

    export function submitQualification(values, teacherId){
      // console.log('quali submit');
      // console.log(values);
      // console.log(teacherId);
      values = Object.assign({}, values, {teacherId});
      //console.log(values);
      LoaderVisibility(true);
      axios.post('/api/TeacherQualifications', values)      
          .then(function (response) {
            
            alert('s', 'Qualification details have been saved.');
            $('#teacherQualificationsGrid').DataTable().ajax.reload();  
            $('#tabList').trigger('click');
            LoaderVisibility(false);

          })
          .catch(function (error) {
            console.log(error);
            alert('f', '');
            LoaderVisibility(false);
            throw new SubmissionError({   
                _error: 'Something went wrong, please contact system administrator!'
              });
          });
    } 

    export function submitExperience(values, teacherId){
      values = Object.assign({}, values, {teacherId});
      //console.log(values);
      LoaderVisibility(true);
      axios.post('/api/TeacherExperiences', values)      
          .then(function (response) {
            
            alert('s', 'Experience details have been saved.');
            $('#teacherExperiencesGrid').DataTable().ajax.reload();  
            $('#tabListExp').trigger('click');
            LoaderVisibility(false);

          })
          .catch(function (error) {
            console.log(error);
            alert('f', '');
            LoaderVisibility(false);
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
            
            LoaderVisibility(true);
            console.log('del quali yes');
            console.log(Date());

            //axios.delete('/api/TeacherQualifications/' + id)      
            axios.post('/api/RemoveTeacherQualification/' + id)      
              .then(function (response) {
                
                alert('s','Qualification details have been deleted.');
                
                var table = $('#teacherQualificationsGrid').DataTable();                
                table
                  .row( delCell.parents('tr') )
                  .remove()
                  .draw();

                  //console.log('after row del ..')
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

  export function removeExperience(id, delCell){
    
    let messageText = LanguageStore.getData().phrases["DeleteConfirmationMessageText"] 
                              || 'Are you sure, you want to delete this record?';
    
    confirmation(messageText, function(ButtonPressed){
        deleteExperienceRecord(ButtonPressed, id, delCell); 
    });
  }

  function deleteExperienceRecord(ButtonPressed, id, delCell) {

      if (isYesClicked(ButtonPressed)) {
          console.log('del expe yes');
          console.log(Date());
          LoaderVisibility(true);

          //axios.delete('/api/TeacherExperiences/' + id)      
          axios.post('/api/RemoveTeacherExperience/' + id)      
            .then(function (response) {
              
              alert('s','Experience details have been deleted.');
              
              var table = $('#teacherExperiencesGrid').DataTable();                
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