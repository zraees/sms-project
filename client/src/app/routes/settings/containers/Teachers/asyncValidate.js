import axios from 'axios'

const asyncValidate = (values /*, dispatch */) => {
   return axios.get('/api/teachers/'+ values.id + '/' + values.email)
        .then(res=>{            
            throw {email: 'email is already taken'}
        })   
}

export default asyncValidate