import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native';
const globalStyle = require('../styles/styles')
import { getItemData, getBoxData, setCurrentBoxToEdit } from '../actions/action'

class rootScreen1 extends Component {

  componentDidMount(){
    console.log("this.props: ", this.props);
  }

  render() {
    return (
      <View style={globalStyle.MainContainer}>
        <Text style={{ fontSize: 23 }}> Screen ONE </Text>
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
//     getBoxData: () => dispatch(getBoxData())
//   }
// }

export default Screen1 = connect(mapStateToProps)(rootScreen1)
