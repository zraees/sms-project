import express from 'express'; 
import isEmpty from 'lodash/isEmpty';

import Nationality from '../models/nationality';
 
let router = express.Router();

router.get('/', (req, res) => {
  Nationality.query({
    select: [ 'NationalityId', 'Nationality' ],  
  }).fetchAll().then(nationalities => {
      res.send(nationalities.toJSON());
  });
});

router.get('/:nationalityId', (req, res) => { 
  Nationality.forge({NationalityId: req.params.nationalityId})
      .fetch()
      .then(function (nationality) {
      if(!nationality) {
        console.log('404 error get nationality id');
        res.status(404).json({error: true, data: {}});
      }
      else { 
        res.send(nationality.toJSON());
      }
      })
      .catch(function (err) {
        console.log('500 error get nationality id ' + err.message);
        res.status(500).json({error: true, data: {message: err.message}});
      });    
}); 

export default router;
