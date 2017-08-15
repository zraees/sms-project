import {SubmissionError} from 'redux-form'
import axios from 'axios' 

import alert, {confirmation} from '../../../../components/utils/alerts'
import {smallBox, bigBox, SmartMessageBox} from "../../../../components/utils/actions/MessageActions";
import Msg from '../../../../components/i18n/Msg'
import {isYesClicked, isNoClicked} from '../../../../components/utils/functions'
import LanguageStore from '../../../../components/i18n/LanguageStore'

import Loader, {Visibility as LoaderVisibility} from '../../../../components/Loader/Loader';

  function submit(values, timetableId){
    console.log(values);
    // return axios.get('/api/students/' + values.studentId + '/' + values.email + '/')
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
    
export default submit