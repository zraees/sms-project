import {SubmissionError} from 'redux-form'
import axios from 'axios'  

import alert, {confirmation} from '../../../../components/utils/alerts'
import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";
import Msg from '../../../../components/i18n/Msg'
import {isYesClicked, isNoClicked, removeAllSpecialChar} from '../../../../components/utils/functions'
import LanguageStore from '../../../../components/i18n/LanguageStore'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader';

  function submit(values){
    console.log(values);
    if(values.studentId>0){
      update(values); 
    }
    else{
      insert(values);
    }   
    
    // return instanceAxios.get('/api/students/' + values.studentId + '/' + values.email + '/')
    //   .then(res=>{            
    //       //throw {email: 'That email is already taken'}
    //       if(res.data.Email===''){
                    
    //         if(values.studentId>0){
    //           update(values); 
    //         }
    //         else{
    //           insert(values);
    //         }      

    //       }
    //       else{
    //         throw new SubmissionError({   
    //           email: 'email is already taken',
    //           _error: 'You cannot proceed further!'
    //         })
    //       }
    //   })   
  }
  //https://stackoverflow.com/questions/27045598/how-to-upload-files-from-reactjs-to-express-endpoint
  //https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef
  //https://github.com/mzabriskie/axios/blob/master/examples/upload/index.html
  //https://github.com/mzabriskie/axios/issues/318

  //react dropzone:
  //https://www.npmjs.com/package/react-dropzone-js 
  //https://github.com/okonet/react-dropzone
  
  // dropzone.js
  //http://www.dropzonejs.com/#
  //https://howtonode.org/really-simple-file-uploads
  
  function insert(values){
    LoaderVisibility(true);

    instanceAxios.post('/api/students', values)      
      .then(function (response) {
        //multipart/form-data; boundary=${formData._boundary}
        console.log('response ==> ', response);
        console.log('values.files ==> ', values.files);

        if((values.files||{})!={}){
          uploadPic(values, response.data);
        }

        LoaderVisibility(false);
        alert('s', 'student details have been saved.');
        $('#StudentPopup').modal('hide');  

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

  function uploadPic(values, studentId){
    
    let data = new FormData();
    let fileName = studentId  + '_' +  removeAllSpecialChar(values.fullName);

    data.append('file', values.files[0]);
    data.append('folderName', 'StudentPics');
    data.append('fileName', fileName);
    data.append('dbOperation', 'update');
    data.append('tableName', 'students');
    data.append('fieldName', 'studentPic');
    data.append('whereFieldName', 'studentId');
    data.append('whereFieldValue', studentId);
    data.append('allowedFileExt', '.jpg,.png,.gif');
    data.append('sizeInMBs', 1);

    //data.append('document', {'folderName':'StudentPics', 'fileName': fileName});    

    //instanceAxios.post('/api/PostImage/StudentPics/' +fileName, data)
    instanceAxios.post('/api/PostImage', data)
      .then(function (response) {
        console.log('image upload sucess, ', response);
        //updatePicPath({'studentId': studentId, 'studentPic': fileName});
      })
      .catch(function(error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            alert('f', error.response.data.error);   
          }
          console.log('image upload error, ', error);
      });

  } 

  // function updatePicPath(values){
    
  //   console.log('in updatePicPath');
  //   instanceAxios.put('/api/AddStudentPicPath/' + values.studentId + '/' + values.studentPic)
  //     .then(function (response) {
  //       console.log('updatePicPath sucess, ', response);
        
  //     })
  //     .catch(function(error) {
  //       if (error.response) {
  //           console.log(error.response.data);
  //           console.log(error.response.status);
  //           console.log(error.response.headers);
  //           alert('f', error.response.data.StatusMessage);   
  //         }
  //         console.log('updatePicPath error, ', error);
  //     });

  // } 

  function update(values){
    //console.log('in update');
    //console.log(values);
    LoaderVisibility(true);
    instanceAxios.put('/api/students', values)      
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
    instanceAxios.post('/api/StudentPreviousSchools', values)      
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
    instanceAxios.post('/api/StudentSiblings', values)      
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
    instanceAxios.post('/api/StudentsRelatives', values)      
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

  export function submitStudentParent(values, studentId){
    values = Object.assign({}, values, {studentId});    
    LoaderVisibility(true);
    instanceAxios.post('/api/StudentsParents', values)      
      .then(function (response) {
        
        alert('s', 'data has been saved successfully');
        $('#parentsGrid').DataTable().ajax.reload();  
        $('#tabListParent').trigger('click');
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

  export function submitStudentEmergencyContactDetail(values, studentId){
    values = Object.assign({}, values, {studentId});    
    LoaderVisibility(true);
    instanceAxios.post('/api/StudentsEmergencyContactDetails', values)      
      .then(function (response) {
        
        alert('s', 'data has been saved successfully');
        $('#emergencyContactDetailsGrid').DataTable().ajax.reload();  
        $('#tabListEmergencyContactDetail').trigger('click');
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
  
  export function submitStudentSpecialSevices(values, studentId){
    values = Object.assign({}, values, {studentId});    
    LoaderVisibility(true);
    instanceAxios.post('/api/StudentsSpecialSevices', values)      
      .then(function (response) {
        
        alert('s', 'data has been saved successfully');
        $('#specialServicesGrid').DataTable().ajax.reload();  
        $('#tabListSpecialService').trigger('click');
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

  export function submitStudentMedicalDetails(values, studentId){
    values = Object.assign({}, values, {studentId});    
    // LoaderVisibility(true);
    // instanceAxios.post('/api/StudentsSpecialSevices', values)      
    //   .then(function (response) {
        
    //     alert('s', 'data has been saved successfully');
    //     $('#specialServicesGrid').DataTable().ajax.reload();  
    //     $('#tabListSpecialService').trigger('click');
    //     LoaderVisibility(false);

    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     alert('f', error.response.data.StatusMessage);
    //     LoaderVisibility(false);
    //     throw new SubmissionError({   
    //         _error: 'Something went wrong, please contact system administrator!'
    //       });
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

        instanceAxios.post('/api/RemovePreviousSchool/' + id)      
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

        instanceAxios.post('/api/RemoveSibling/' + id)      
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

        instanceAxios.post('/api/RemoveStudentRelative/' + id)      
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

  export function removeStudentParent(id, delCell){
  
    let messageText = LanguageStore.getData().phrases["DeleteConfirmationMessageText"] 
                              || 'Are you sure, you want to delete this record?';
    
    confirmation(messageText, function(ButtonPressed){
        deleteStudentParent(ButtonPressed, id, delCell); 
    });
  }

  function deleteStudentParent(ButtonPressed, id, delCell) {

    if (isYesClicked(ButtonPressed)) {         
        LoaderVisibility(true);

        instanceAxios.post('/api/RemoveStudentParent/' + id)      
          .then(function (response) {
            
            alert('s','data has been deleted successfully');
            
            var table = $('#parentsGrid').DataTable();                
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

  export function removeStudentEmergencyContactDetail(id, delCell){
  
    let messageText = LanguageStore.getData().phrases["DeleteConfirmationMessageText"] 
                              || 'Are you sure, you want to delete this record?';
    
    confirmation(messageText, function(ButtonPressed){
        deleteStudentEmergencyContactDetail(ButtonPressed, id, delCell); 
    });
  }

  function deleteStudentEmergencyContactDetail(ButtonPressed, id, delCell) {

    if (isYesClicked(ButtonPressed)) {         
        LoaderVisibility(true);

        instanceAxios.post('/api/RemoveStudentEmergencyContactDetail/' + id)      
          .then(function (response) {
            
            alert('s','data has been deleted successfully');
            
            var table = $('#emergencyContactDetailsGrid').DataTable();                
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

  export function removeStudentSpecialSevices(id, delCell){
  
    let messageText = LanguageStore.getData().phrases["DeleteConfirmationMessageText"] 
                              || 'Are you sure, you want to delete this record?';
    
    confirmation(messageText, function(ButtonPressed){
        deleteStudentSpecialSevices(ButtonPressed, id, delCell); 
    });
  }

  function deleteStudentSpecialSevices(ButtonPressed, id, delCell) {

    if (isYesClicked(ButtonPressed)) {         
        LoaderVisibility(true);

        instanceAxios.post('/api/RemoveStudentSpecialSevice/' + id)      
          .then(function (response) {
            
            alert('s','data has been deleted successfully');
            
            var table = $('#specialServicesGrid').DataTable();                
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