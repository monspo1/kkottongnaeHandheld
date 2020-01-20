import React,  { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class FirstScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>1st Screen</Text>
        <Button title="Go to Home Screen" onPress={() => this.props.navigation.navigate('HomeScreen')}/>
        <Button title="2nd screen" onPress={() => this.props.navigation.navigate('SecondScreen')}/>
      </View>
    );
  }
}

export default FirstScreen
