// Imports: Dependencies
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

// Imports: Redux
import rootReducer from '../reducers/index';

import { apiUrl } from '../../components/util/Api';

// const client = axios.create({ //all axios can be used, shown in axios documentation
//   baseURL: apiUrl,
//   responseType: 'json'
// });

// Middleware: Redux Persist Config
const persistConfig = {
  // Root?
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'user',
    'reports',
    'introSurvey',
    'surveys',
    'consent',
    'slideshow',
    'postMeasureSurvey',
    'pendingSurveys'
  ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [
    'affirmations',
    'aggressions',
    'surveyA',
    'surveyB',
    'surveyC',
    'surveyD',
    'surveyE',

    // 'user',
    // 'reports',
    // 'introSurvey',
    // 'surveys',
    // 'consent',
    // 'slideshow',
    // 'postMeasureSurvey',
    // 'pendingSurveys'
  ],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(
    // createLogger(),
    // axiosMiddleware(client)
  ),
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

// Exports
export {
  store,
  persistor,
};