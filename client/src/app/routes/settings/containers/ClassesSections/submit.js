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
      return axios.get('/api/ClassesSections/' + values.shiftId + '/' + values.classId + '/' + values.sectionId + '/')
        .then(res=>{             

            if(res.data.ClassID>0){
                      
              if(values.classSectionId>0){
                update(values); 
              }
              else{
                insert(values);
              }      

            }
            else{
              throw new SubmissionError({   
                shiftId: 'Class and section is already exists',
                _error: 'You cannot proceed further!'
              })
            }
        })   
    }

    function insert(values){
      LoaderVisibility(true);
      console.log(values);
      axios.post('/api/ClassesSections', values)      
        .then(function (response) {
          
          LoaderVisibility(false);
          alert('s', 'data has been saved successfully');
          $('#ClassSectionPopup').modal('hide');  

        })
        .catch(function (error) {
          if (error.response) { 
            alert('f', error.response.data.StatusMessage);  
          
            LoaderVisibility(false);     
                  //throw new SubmissionError({ _error: "That's weird. "});   
                  //reject('error error error');
            // return Promise.resolve(true).then(() => {
            //   throw new SubmissionError({ email: 'User does not exist', _error: 'Login failed!' });
            // }); 
          } else if (error.request) { 
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
      axios.put('/api/ClassesSections', values)      
        .then(function (response) {
          
          alert('s','data has been updated successfully');
          $('#ClassSectionPopup').modal('hide');  
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
            //console.log('classsection dele conf yes by func');
            // console.log(id);
            
            ////axios.delete('/api/ClassesSections/' + id)      
            // axios.post('/api/Removestudent/' + id)
            //   .then(function (response) {
                
            //     alert('s','student details have been deleted.');
                
            //     var table = $('#ClassSectionGrid').DataTable();                
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
                url : '/api/RemoveClassesSections/' + id,
                type: "POST",
                //data : formData,
                success: function(data, textStatus, jqXHR)
                {
                  console.log('success...');
                  alert('s','data has been deleted successfully');
                  
                  var table = $('#ClassSectionGrid').DataTable();                
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