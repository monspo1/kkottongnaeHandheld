import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
const globalStyle = require('../styles/styles')


export default class NavigationDrawerStructure extends React.Component {
    toggleDrawer = () => {
      this.props.navigationProps.toggleDrawer();
    }

    render(){
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            <Image source={require('../images/drawer.png')} style={{ width: 25, height: 25, marginLeft: 5 }} />
          </TouchableOpacity>
        </View>
      )
    }
}
