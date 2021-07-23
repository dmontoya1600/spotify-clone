import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import access from './accessToken'
import playlists from './playlist'
import pageUser from './userPage'
import featurePlaylists from './featurePlaylist'
import searchRes from './search'
import currentSong from "./currentSong";

const rootReducer = combineReducers({
  session,
  access,
  playlists,
  pageUser,
  featurePlaylists,
  searchRes,
  currentSong
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
