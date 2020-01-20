//########################################################################
//## src/js/actions/index.js
//########################################################################
import {
  ADD_BOX, ADD_OR_MODIFY_ITEM_INDB, RESTAPI_BOX_DATA_LOADED, SET_CURRENT_BOX_TO_EDIT,
  RESTAPI_ITEM_DATA_LOADED, RESTAPI_SEARCH_ITEM_RETURNED, SET_BARCODE_SCANNED, SET_CURRENT_ITEM
} from '../constants/action-types.js'
import axios from 'axios';

const remote_url_prefix = "http://192.168.86.155:3000" // My Home
// const remote_url_prefix = "http://192.168.1.230:3000"  // Kkottongnae
// const remote_url_prefix = "http://192.168.43.14:3000" // Mobile hotspot


// export function addNewItemToDB (reqObj){
export function addOrModifyItemInDB (reqObj){
  return (dispatch) => {
    return fetch(remote_url_prefix + "/modify_item" ,{
      method: 'POST',
      headers: {"Content-type":"application/json;charset=utf-8"},
      mode:"cors",
      body: JSON.stringify(reqObj)
    })
    .then(function(response){ return response.json()})
    .then(function(json){
      // console.log("response.json: ", json);
      dispatch({ type: ADD_OR_MODIFY_ITEM_INDB, payload: json })
    });
  };
}


// export function editExistingItemInDB (reqObj){
//   return (dispatch) => {
//     return fetch(remote_url_prefix + "/edit_item" ,{
//       method: 'POST',
//       headers: {"Content-type":"application/json;charset=utf-8"},
//       mode:"cors",
//       body: JSON.stringify(reqObj)
//     })
//     .then(function(response){ return response.json()})
//     .then(function(json){
//       // console.log("response.json: ", json);
//       dispatch({ type: EDIT_EXISTING_ITEM_INDB, payload: json })
//     });
//   };
// }


// export function getItemData ()  {
//   // console.log("Inside getItemData 1");
//
//   // return function(dispatch) {
//   //   console.log("Inside getItemData 2");
//   //
//   //   // return fetch(remote_url_prefix + "/boxes", {
//   //   return fetch(remote_url_prefix + "/item_rand", {
//   //       method: 'GET',
//   //       headers: { 'Content-Type': 'application/json', },
//   //     })
//   //     .then(response => response.json())
//   //     .then(json => {
//   //       debugger
//   //       dispatch({ type: RESTAPI_ITEM_DATA_LOADED, payload: json })
//   //     })
//   //     .catch(error => { console.error("ERROR: ", error); });
//   // }
//
//   return function(dispatch) {
//     return fetch(remote_url_prefix + "/item_rand", {
//           method: 'GET',
//           headers: { 'Content-Type': 'application/json', },
//         })
//         .then(response => response.json())
//         .then(json => {
//           console.log("json: ", json);
//           dispatch({ type: RESTAPI_ITEM_DATA_LOADED, payload: json })
//         })
//         .catch(error => {
//           console.error(error);
//         });
//   }
// }

export function getItemData() {
  return function(dispatch) {
    return fetch(remote_url_prefix + "/item_rand", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
      })
      .then(response => response.json())
      .then(json => {
        console.log("json: ", json);
        dispatch({ type: RESTAPI_ITEM_DATA_LOADED, payload: json })
      })
  }
}


export const getSearchItem = ({item_barcode}) => { // 8809379950617
  return (dispatch) => {
    return fetch(remote_url_prefix + "/items" + item_barcode ,{
      method: 'POST',
      headers: {"Content-type":"application/json;charset=utf-8"},
      mode:"cors",
    })
    .then(function(response){ return response.json() })
    .then(function(json){ // console.log("B. response.json: ", json);
      dispatch({ type: RESTAPI_SEARCH_ITEM_RETURNED, payload: json })
    });
  };
};



export function getBoxData() {
  return function(dispatch) {
    return fetch(remote_url_prefix + "/boxes", {
        method: 'GET',
        // mode: "cors", // or without this line
        // redirect: 'follow',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(json => {
        // console.log("json: ", json);
        dispatch({ type: RESTAPI_BOX_DATA_LOADED, payload: json })
      })
  }
}

export function setCurrentBoxToEdit(payload){
  return { type: SET_CURRENT_BOX_TO_EDIT, payload }
}

export function setCurrentItem(payload){
  return { type: SET_CURRENT_ITEM, payload }
}

export function setBarcodeScanned(payload){
  return { type: SET_BARCODE_SCANNED, payload }
}
