const SET_LOGIN = 'SET_LOGIN'

export function actionSetLogin(isLogged){
  return {
    type: SET_LOGIN,
    isLogged: isLogged
  }
}

export default function setLogin(state = false, action){
  switch(action.type){
    
    case SET_LOGIN:{
      return action.isLogged
    }

    default:
      return false
  }

}