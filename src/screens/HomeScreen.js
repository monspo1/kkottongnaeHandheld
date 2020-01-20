import React,  { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#C2185B",
    height: Constants.statusBarHeight,
  },

  // rest of the styles
});

class HomeScreen extends Component {
  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Screen</Text>
        <Button title="Go to 1st Screen" onPress={() => this.props.navigation.navigate('FirstScreen')}/>
        <Button title="2nd screen" onPress={() => this.props.navigation.navigate('SecondScreen')}/>
      </View>
    );
  }
}

export default HomeScreen
