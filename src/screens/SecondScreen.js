import React,  { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class SecondScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>2nd Screen</Text>
        <Button title="1st Screen" onPress={() => this.props.navigation.navigate('FirstScreen')}/>
        <Button title="Go to Home Screen" onPress={() => this.props.navigation.navigate('HomeScreen')}/>
      </View>
    );
  }
}

export default SecondScreen
