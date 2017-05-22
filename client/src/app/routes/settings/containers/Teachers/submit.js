import {SubmissionError} from 'redux-form'
import axios from 'axios' 

import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";
import Msg from '../../../../components/i18n/Msg'

    function submit(values){
      //console.log(values);
      
      return axios.get('/api/teachers/' + values.id + '/' + values.email)
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
            //console.log(response);
            smallBox({
              title: "System Alert",
              content: "<i class='fa fa-clock-o'></i> <i>Teacher record has been saved.</i>",
              color: "#659265",
              iconSmall: "fa fa-check fa-2x fadeInRight animated",
              timeout: 3000
            });
              
            $('#teacherPopup').modal('hide');  

          })
          .catch(function (error) {
            console.log(error);
            smallBox({
              title: "System Alert",
              content: "<i class='fa fa-clock-o'></i> <i>Something went wrong, please contact system administrator</i>",
              color: "#C46A69",
              iconSmall: "fa fa-times fa-2x fadeInRight animated",
              timeout: 5000
            });
          });      
    }

    function update(values){
      //console.log('update '+ values);

      axios.put('/api/teachers', values)      
          .then(function (response) {
            //console.log(response);
            smallBox({
              title: "System Alert",
              content: "<i class='fa fa-clock-o'></i> <i>Teacher record has been saved.</i>",
              color: "#659265",
              iconSmall: "fa fa-check fa-2x fadeInRight animated",
              timeout: 3000
            });
              
            $('#teacherPopup').modal('hide');  

          })
          .catch(function (error) {
            console.log(error);
            smallBox({
              title: "System Alert",
              content: "<i class='fa fa-clock-o'></i> <i>Something went wrong, please contact system administrator</i>",
              color: "#C46A69",
              iconSmall: "fa fa-times fa-2x fadeInRight animated",
              timeout: 5000
            });
          });      
    }

    export function remove(id, delCell){

      SmartMessageBox({
        title: "Confirmation!",
        content: "Are you sure, you want to delete this record?",
        buttons: '[No][Yes]'
        }, function (ButtonPressed) {
          if (ButtonPressed === "Yes") {
              //console.log('conf yes');

              axios.delete('/api/teachers/' + id)      
                .then(function (response) {
                  //console.log(response);
                  
                  smallBox({
                    title: "System Alert",
                    content: "<i class='fa fa-clock-o'></i> <i>Teacher record has been deleted.</i>",
                    color: "#659265",
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 3000
                  });
                  
                  //console.log('del success..');
                  var table = $('#teachersGrid').DataTable();                
                  table
                    .row( delCell.parents('tr') )
                    .remove()
                    .draw();

                    //console.log('after row del ..')

                })
                .catch(function (error) {
                  
                  smallBox({
                    title: "System Alert",
                    content: "<i class='fa fa-clock-o'></i> <i>Something went wrong, please contact system administrator</i>",
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 5000
                  });
                }); 

            
          }
          if (ButtonPressed === "No") {
            // do nothing
          }

        });
      }

export default submit