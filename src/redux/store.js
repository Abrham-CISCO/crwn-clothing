import {createStore, applyMiddleware} from 'redux'
import {persistStore} from 'redux-persist'
import logger from 'redux-logger'

import rootReducer from './root-reducer'

const middleware =  [];


//process.env is refering to process enviroment variables
//process.env.NODE_ENV can either be production, test or development

if(process.env.NODE_ENV === 'development')
{
    middleware.push(logger)
}

export const store = createStore(rootReducer,applyMiddleware(...middleware))

export const persistor = persistStore(store);