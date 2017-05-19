import {SubmissionError} from 'redux-form'
import axios from 'axios' 

import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";
import Msg from '../../../../components/i18n/Msg'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    function submit(values){
/*
      return sleep(1000).then(() => {
    // simulate server latency



        if (!['john', 'paul', 'george', 'ringo'].includes(values.name)) {
          throw new SubmissionError({
            name: 'User does not exist',
            _error: 'Login failed!'
          })
        } else {
          window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        }
      })
      */
      if(values.id>0){
        update(values); 
      }
      else{
        insert(values);
      }      
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
      console.log('update '+ values);

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


export default submit