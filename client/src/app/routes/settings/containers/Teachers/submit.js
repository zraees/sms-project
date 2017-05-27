import {SubmissionError} from 'redux-form'
import axios from 'axios' 

import alert, {confirmation} from '../../../../components/utils/alerts'
import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";
import Msg from '../../../../components/i18n/Msg'

    function submit(values){
      //console.log(values);
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
      // console.log(' in insert');
      // console.log(values);
      axios.post('/api/teachers', values)      
          .then(function (response) {
            
            alert('s', 'Teacher details has been saved.');
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
            
            alert('s','Teacher details has been updated.');
            $('#teacherPopup').modal('hide');  

          })
          .catch(function (error) {
            console.log(error);
            alert('f', '');
            
          });      
    }

    export function remove(id, delCell){
      // console.log('in remove');

        confirmation('Are you sure, you want to delete this record?', function(ButtonPressed){
           deleteRecord(ButtonPressed, id, delCell); 
        });

      }

      function deleteRecord(ButtonPressed, id, delCell) {

        if (ButtonPressed === "Yes") {
            // console.log('conf yes');
            // console.log(id);
            axios.delete('/api/teachers/' + id)      
              .then(function (response) {
                
                alert('s','Teacher details has been deleted.');
                
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
        else if (ButtonPressed === "No") {
          // do nothing
        }
      }
        
export default submit