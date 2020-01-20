//########################################################################
//## src/js/middleware/index.js
//########################################################################
import {  RESTAPI_SEARCH_ITEM_RETURNED, SEARCH_ITEM_RETURNED_ERROR, //ADD_NEW_ITEM_TODB, 
          SEARCH_ITEM_RETURNED_SUCCESS, SET_CURRENT_ITEM } from '../constants/action-types'

const forbiddenWords = ["spam", "money"]

export function mainMiddleware({ dispatch,  }){
  return function(next){
    return function(action){
      switch(action.type){
        // case ADD_BOX:
        //   const foundWord = forbiddenWords.filter(word => action.payload.title.includes(word))
        //   if(foundWord.length) return dispatch({ type: FOUND_BAD_WORD })
        //   break;
        // case RESTAPI_ITEM_DATA_LOADED:
        //   console.log("action in middleware: ", action);
        //   next(action);
        //   break;

        case RESTAPI_SEARCH_ITEM_RETURNED:
          // console.log("action in middleware: ", action.payload.data[0]);
          // console.log("action in middleware: ", action);
          if(action.payload.data.length > 0) dispatch({ type: SEARCH_ITEM_RETURNED_SUCCESS, response: action })
          else dispatch({ type: SEARCH_ITEM_RETURNED_ERROR, response: action })


        default:
          // console.log("deault action in middleware: ", action);
          next(action);
          break;

      }

       //# <- This will cause the error : Actions must be plain objects. Use custom middleware for async actions
                          //# Use the redux-thunk
    }
  }
}
