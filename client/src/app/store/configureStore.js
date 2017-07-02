/**
 * Created by griga on 11/17/16.
 */

/*  https://github.com/indexiatech/redux-immutablejs  */
/*
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutablejs';

import Immutable from 'immutable';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);
const state = Immutable.fromJS({});

const store = reducer(state);
export default createStore(reducer, store);
*/

import {createStore, combineReducers,  applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {routerReducer} from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

// Logger with default options
import createLogger from 'redux-logger'

import {config} from '../config/config'
import {handleBodyClasses, dumpLayoutToStorage, layoutReducer} from '../components/layout'

import navigationReducer from '../components/navigation/navigationReducer'
import {userReducer, requestUserInfo} from '../components/user'
import {chatReducer, chatInit} from '../components/chat'
import {eventsReducer} from '../components/calendar'
import outlookReducer from '../routes/outlook/outlookReducer'
import loaderReducer from '../components/Loader/loaderReducer'

import {voiceReducer, VoiceMiddleware} from '../components/voice-control'
import {voiceControlOn} from "../components/voice-control/VoiceActions";

export const rootReducer = combineReducers(
  {
    routing: routerReducer,
    loader: loaderReducer,
    layout: layoutReducer,
    navigation: navigationReducer,
    outlook: outlookReducer,
    user: userReducer,
    chat: chatReducer,
    events: eventsReducer,
    voice: voiceReducer,
    form: formReducer,
  }
);

const logger = createLogger({
    //empty options
});

const store =  createStore(rootReducer,
  applyMiddleware(   
    //logger,       working fine but comment because there is lot of console writing
    thunk,
    handleBodyClasses,
    dumpLayoutToStorage,
    VoiceMiddleware    
  )
);

store.dispatch(requestUserInfo());
store.dispatch(chatInit());

if(config.voice_command_auto){
  store.dispatch(voiceControlOn());
}


export default store;