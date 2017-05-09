import express from 'express';
//import commonValidations from '../shared/validations/signup';
//import isEmpty from 'lodash/isEmpty';

import Teacher from '../models/teacher';

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
  Teacher.query({
    select: [ 'TeacherId', 'Name', 'Email' ],  
  }).fetchAll().then(teachers => {
      //console.log('get teachers OK' + teachers);
      res.send({"data": teachers.toJSON()});
  });
});

router.get('/:teacherId', (req, res) => {
  console.log('GET by teacher id ' + req.params.teacherId);
  Teacher.forge({TeacherId: req.params.teacherId})
      .fetch()
      .then(function (teacher) {
      if(!teacher) {
        console.log('404 error get teacher id');
        res.status(404).json({error: true, data: {}});
      }
      else {
        console.log(teacher.toJSON());
        //res.json({error: false, data: teacher.toJSON()});
        res.json({error: false, data: JSON.stringify(teacher)});
        //res.send({"data": teacher.toJSON()});
      }
      })
      .catch(function (err) {
        console.log('500 error get teacher id ' + err.message);
        res.status(500).json({error: true, data: {message: err.message}});
      });    
});

router.post('/', (req, res) => {
  //validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
  //  if (isValid) {
      const { name, email } = req.body;
      //const ParentID = 100;
      //console.log('server/routes/parents', ParentName)
      console.log('server/routes/teachers', name + ' ' + email)
       
      Teacher.forge({
        Name: name, Email: email
      }).save(null, {method: 'insert'})
        .then(teacher => res.json({ success: true }))
        .catch(err => { console.log(err.message); res.status(500).json({ error: err.message })});

    //} else {
    //  res.status(400).json(errors);
   // }
  //});
});
// });

/*
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
*/

export default router;
