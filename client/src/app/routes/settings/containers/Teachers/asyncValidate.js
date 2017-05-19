import axios from 'axios'

const asyncValidate = (values /*, dispatch */) => {
//   return sleep(1000).then(() => {
//     // simulate server latency
//     if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
//       throw {username: 'That username is taken'}
//     }
//   })

   return axios.get('/api/teachers/0/' + values.email)
        .then(res=>{            
            throw {email: 'That email is already taken'}
        })   
}

export default asyncValidate