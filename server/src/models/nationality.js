import bookshelf from '../bookshelf';

export default bookshelf.Model.extend({
  tableName: 'Nationality',
  idAttribute: 'NationalityId'
});
