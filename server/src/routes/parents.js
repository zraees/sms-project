import express from 'express';
//import commonValidations from '../shared/validations/signup';
//import bcrypt from 'bcrypt-nodejs';
//import isEmpty from 'lodash/isEmpty';

import Parent from '../models/parent';

let router = express.Router();

// function validateInput(data, otherValidations) {
//   let { errors } = otherValidations(data);
  
//   return User.query({
//     where: { email: data.email },
//     orWhere: { username: data.username }
//   }).fetch().then(user => {
//     if (user) {
//       if (user.get('username') === data.username) {
//         errors.username = 'There is user with such username';
//       }
//       if (user.get('email') === data.email) {
//         errors.email = 'There is user with such email';
//       }
//     }

//     return {
//       errors,
//       isValid: isEmpty(errors)
//     };
//   })

// }

router.get('/', (req, res) => {
  Parent.query({
    select: [ 'ParentID', 'ParentName' ],  
  }).fetchAll().then(parents => {
        res.send(parents.toJSON());
  });
});

router.post('/', (req, res) => {
  //validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
  //  if (isValid) {
      const { firstName, lastName } = req.body;
      const ParentName = firstName + ' ' + lastName;
      //const ParentID = 100;
      //console.log('server/routes/parents', ParentName)
      console.log('server/routes/parents', req.body)
       
      Parent.forge({
        ParentName
      }).save(null, {method: 'insert'})
        .then(parent => res.json({ success: true }))
        .catch(err => { res.status(500).json({ error: err.message })});

    //} else {
    //  res.status(400).json(errors);
   // }
  //});
});
// });

router.put('/', (req, res) => {
  //validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
  //  if (isValid) {
      const { id, firstName, lastName } = req.body;
      const ParentName = firstName + ' ' + lastName;
      const ParentID = id;
      //console.log('server/routes/parents', ParentName)
      console.log('server/routes/parentupdate', req.body)
       
      Parent.forge({
        ParentID,
        ParentName
      }).save(null, {method: 'update'})
        .then(parent => res.json({ success: true }))
        .catch(err => { console.log(err.message); res.status(500).json({ error: err.message })});

    //} else {
    //  res.status(400).json(errors);
   // }
  //});
});
// });

router.delete('/:id', (req, res) => {
  //validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
  //  if (isValid) {
      //const { id } = req.body;
      const ParentID = req.params.id;
      //console.log('server/routes/parents', ParentName)
      console.log('server/routes/parentDelete', ParentID)
       
      Parent.forge({
        ParentID
      }).destroy()
        .then(parent => res.json({ success: true }))
        .catch(err => { console.log(err.message); res.status(500).json({ error: err.message })});

    //} else {
    //  res.status(400).json(errors);
   // }
  //});
});
// });


export default router;
