export default {
  path: 'settings',
  component: require('../../components/common/Layout').default,

  indexRoute: { onEnter: (nextState, replace) => replace('/settings/subjects') },

  childRoutes: [
    {
      path: 'subjects',
      getComponent(nextState, cb){
        System.import('./containers/Subjects').then((m)=> {
          cb(null, m.default)
        })
      }
    }
    ,
    {
      path: 'teachers',
      getComponent(nextState, cb){
        System.import('./containers/Teachers/TeachersPage').then((m)=> {
          cb(null, m.default)
        })
      }
    }
  ]


};
