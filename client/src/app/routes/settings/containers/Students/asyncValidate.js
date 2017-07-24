import axios from 'axios'

const asyncValidate = (values /*, dispatch */) => {
   return axios.get('/api/student/'+ values.id + '/' + values.email)
        .then(res=>{            
            throw {email: 'email is already taken'}
        })   
}

export default asyncValidate