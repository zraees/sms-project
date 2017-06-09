import LoaderActions from './LoaderActions'

function LoaderReducer(value = 0, action) {
  switch (action.type) {
   
  case LoaderActions.VISIBLE:
    return 1
  case LoaderActions.HIDE:
    return 0
  
  default:
    return value
  }
}

export default LoaderReducer;