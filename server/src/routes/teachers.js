import express from 'express';
//import commonValidations from '../shared/validations/signup';
import isEmpty from 'lodash/isEmpty';

import Teacher from '../models/teacher';

let router = express.Router();

// function validateInput(data) {    //, otherValidations
//   let error  = {}; //otherValidations(data);
//   console.log('validateInput');
  
//   return Teacher.query({
//     where: { Email: data.email }//,
//     //orWhere: { username: data.username }
//   }).fetch().then(teacher => {
    
//     if (teacher) {
//       if (teacher.get('Email') === data.email) {
//         error.email = 'There is user with such email';
//       }
//     }

//     return {
//       error,
//       isValid: isEmpty(error)
//     };
//   })

// }

router.get('/', (req, res) => {
  Teacher.query({
    select: [ 'TeacherId', 'Name', 'Email', 'IDNo', 'Gender', 'DOB', 'Rating' ],  
  }).fetchAll().then(teachers => {
      //console.log('get teachers OK' + teachers);
      res.send({"data": teachers.toJSON()});
  });
});

router.get('/:teacherId', (req, res) => {
  //console.log('GET by teacher id ' + req.params.teacherId);
  Teacher.forge({TeacherId: req.params.teacherId})
      .fetch()
      .then(function (teacher) {
      if(!teacher) {
        console.log('404 error get teacher id');
        res.status(404).json({error: true, data: {}});
      }
      else {
        //console.log(teacher.toJSON());
        //res.json({error: false, data: teacher.toJSON()});
        //res.json({error: false, data: JSON.stringify(teacher)});
        //res.send({"data": teacher.toJSON()});
        res.send(teacher.toJSON());
      }
      })
      .catch(function (err) {
        console.log('500 error get teacher id ' + err.message);
        res.status(500).json({error: true, data: {message: err.message}});
      });    
});

router.get('/:teacherId/:email', (req, res) => {
  console.log('GET by teacher email ' );
  Teacher.forge({Email: req.params.email})
      .fetch()
      .then(function (teacher) {
      if(!teacher) {
        //console.log('404 error get teacher email');
        //res.status(404).json({error: true, data: {}});
        var EmptyObj = {"Email":""};
        res.send(JSON.stringify(EmptyObj));
      }
      else {        
        if(req.params.teacherId > 0 && teacher.get('TeacherId') !== req.params.teacherId){
          var EmptyObj = {"Email":""};
          res.send(JSON.stringify(EmptyObj));
        }
        else{
          res.send(teacher.toJSON());
          }
    
        }
      })
      .catch(function (err) {
        console.log('500 error get teacher email ' + err.message);
        res.status(500).json({error: true, data: {message: err.message}});
      });    
});

router.post('/', (req, res) => {
  // validateInput(req.body).then(({ error, isValid }) => {   //, commonValidations
  //   if (isValid) {
  //     console.log(isValid);
      const { name, email, DOB, idNo, nationality, rating, gender } = req.body;
  
      //console.log(req.body);

      Teacher.forge({
        Name: name, Email: email, Gender: gender, IDNo: idNo, Rating : rating, NationalityId: nationality, DOB: DOB
      }).save(null, {method: 'insert'})
        .then(teacher => res.json({ success: true }))
        .catch(err => { console.log(err.message); res.status(500).json({ error: err.message })});
         
  //   } else {
  //     console.log(error.message);
  //    res.status(400).json(error);
  //  }
  // });
});
// });


router.put('/', (req, res) => {
  //validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
  //  if (isValid) {
      //const { id, name, email } = req.body;
      //const ParentName = firstName + ' ' + lastName;
      //const ParentID = id;
      //console.log('server/routes/parents', ParentName)
      //console.log('server/routes/teacherupdate ', req.body)
       
      Teacher.forge({
        TeacherId: id, Name: name, Email: email
      }).save(null, {method: 'update'})
        .then(teacher => res.json({ success: true }))
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
      const TeacherId = req.params.id;
      //console.log('server/routes/parents', ParentName)
      console.log('server/routes/teacherDelete', TeacherId)
       
      Teacher.forge({
        TeacherId
      }).destroy()
        .then(teacher => res.json({ success: true }))
        .catch(err => { console.log(err.message); res.status(500).json({ error: err.message })});
      

      // Teacher.forge({
      //   TeacherId:123213
      // }).destroy()
      //   .then(teacher => res.json({ success: true }))
      //   .catch(res.json({ success: true }));


    //} else {
    //  res.status(400).json(errors);
   // }
  //});
});
// });


export default router;
