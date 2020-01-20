import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers/reducer'
import { mainMiddleware } from '../middleware/middleware.js'
import thunk from "redux-thunk";


const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(rootReducer)
// const store = createStore(combineReducers(rootReducer));
const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(mainMiddleware, thunk))
)

export default store
