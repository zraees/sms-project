import axios from 'axios'
import {instanceAxios} from '../../../../components/utils/functions'

const asyncValidate = (values /*, dispatch */) => {
   return instanceAxios.get('/api/student/'+ values.id + '/' + values.email)
        .then(res=>{            
            throw {email: 'email is already taken'}
        })   
}

export default asyncValidate