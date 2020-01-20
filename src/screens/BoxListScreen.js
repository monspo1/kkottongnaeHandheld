import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Text, Button } from 'react-native';
import { getItemData, getBoxData, setCurrentBoxToEdit } from '../actions/action'
import Constants from 'expo-constants';
const globalStyle = require('../styles/styles')


class BoxListScreenBarebone extends Component {

  componentDidMount(){
    console.log("this.props: ", this.props);
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={globalStyle.MainContainer}>
        <Text style={{ fontSize: 23 }}> Box Screen </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items,
  count: state.count
})
// function mapDispatchToProps (dispatch) {
//   return {
//     setCurrentBoxToEdit: box => dispatch(setCurrentBoxToEdit(box)),
//     getItemData: () => dispatch(getBoxData())
//   }
// }

export default BoxListScreen = connect(mapStateToProps)(BoxListScreenBarebone)
