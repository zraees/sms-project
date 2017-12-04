import {Visibility as LoaderVisibility} from '../../components/Loader/Loader'

export default {
  path: 'settings',
  component: require('../../components/common/Layout').default,

  indexRoute: { onEnter: (nextState, replace) => replace('/settings/teachers') },

  childRoutes: [
    {
      path: 'students',
      getComponent(nextState, cb){
        System.import('./containers/Students/StudentsPage').then((m)=> {
          //LoaderVisibility(true);
          cb(null, m.default)
        })
      }
    },
    {
      path: 'subjects',
      getComponent(nextState, cb){
        System.import('./containers/Subjects/SubjectsPage').then((m)=> {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'teachers',
      getComponent(nextState, cb){
        System.import('./containers/Teachers/TeachersPage').then((m)=> {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'classesSections',
      getComponent(nextState, cb){
        System.import('./containers/ClassesSections/ClassesSectionsPage').then((m)=> {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'timetable',
      getComponent(nextState, cb){
        System.import('./containers/Timetables/TimeTablesPage').then((m)=> {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'classes',
      getComponent(nextState, cb){
        System.import('./containers/Classes').then((m)=> {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'feeTypes',
      getComponent(nextState, cb){
        System.import('./containers/FeeTypes/FeeTypesPage').then((m)=> {
          cb(null, m.default)
        })
      }
    },
  ]


};
