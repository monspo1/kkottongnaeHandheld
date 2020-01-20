//########################################################################
//## src/reducers/reducer.js
//########################################################################
import {
  ADD_BOX, ADD_OR_MODIFY_ITEM_INDB, RESTAPI_ITEM_DATA_LOADED, SEARCH_ITEM_RETURNED_ERROR, SEARCH_ITEM_RETURNED_SUCCESS,
  SET_BARCODE_SCANNED, SET_CURRENT_ITEM, RESTAPI_BOX_DATA_LOADED,
} from '../constants/action-types'

const initialState = {
  boxes: [],
  items: [],
  cur_item: {},
  cur_box: {},
  count: 0,
  barcode_scanned: '',
  modify_result: ''
}

function rootReducer (state = initialState, action){

  switch(action.type){
    case ADD_BOX:
      return Object.assign({}, state, { boxes: state.boxes.concat(action.payload) })

    // case ADD_NEW_ITEM_TODB:
    //   console.log("action ADD_NEW_ITEM_TODB: ", action);
    //   return Object.assign({}, state, { items: action.payload.data })

    // case EDIT_EXISTING_ITEM_INDB:
    //   console.log("action EDIT_EXISTING_ITEM_INDB: ", action);
    //   return Object.assign({}, state, { items: action.payload.data })

    case ADD_OR_MODIFY_ITEM_INDB:
    // console.log("ADD_OR_MODIFY_ITEM_INDB -> items in reducer (action.payload): ", action.payload);
    console.log("ADD_OR_MODIFY_ITEM_INDB -> items in reducer (action.payload.message): ", action.payload.message);
    // return Object.assign({}, state, { cur_item: action.payload })
    return Object.assign({}, state, { cur_item: {}, result_modify: action.payload.message, })

    case RESTAPI_ITEM_DATA_LOADED:
      // console.log("items in reducer: ", action);
      return Object.assign({}, state, { items: state.items.concat(action.payload.data) })

    case RESTAPI_BOX_DATA_LOADED:
      // console.log("reducer > state: ", state);
      return Object.assign({}, state, { boxes: state.boxes.concat(action.payload) })


    // case RESTAPI_SEARCH_ITEM_RETURNED:   //# defined in the middleware, then, -> dispatch SEARCH_ITEM_RETURNED_SUCCESS
    //   console.log("items in reducer: ", action.payload);               //#    -> or       SEARCH_ITEM_RETURNED_ERROR
    //   return Object.assign({}, state, { cur_item: action.payload.data })

    case SEARCH_ITEM_RETURNED_SUCCESS:
      // console.log("action SEARCH_ITEM_RETURNED_SUCCESS: ",  action);
      return Object.assign({}, state, { cur_item: action.response.payload.data[0] })

    case SEARCH_ITEM_RETURNED_ERROR:
      // console.log("action SEARCH_ITEM_RETURNED_ERROR: ", action);  // 8809379950617
      // console.log("action.response SEARCH_ITEM_RETURNED_ERROR: ", action.response); // Differ (=> barcode is stored at a higher level)
      return Object.assign({}, state, { cur_item: { text: "no_item_found", item_barcode: action.response.payload.item_barcode } })
      // return Object.assign({}, state, { cur_item: {} })

    case SET_CURRENT_ITEM:
      // console.log("> reducer - action.payload: ", action.payload);
      return Object.assign({}, state, { cur_item: action.payload })
      break;

    case SET_BARCODE_SCANNED:
      // console.log("action in set_barcode_scanned: ", action);
      return Object.assign({}, state, { barcode_scanned: action.payload })
      break;

    default:
      // console.log("action?: ", action);
      return state
  }
}

export default rootReducer;
