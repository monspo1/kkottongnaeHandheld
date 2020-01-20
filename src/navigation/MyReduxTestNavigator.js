import React,  { Component } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createBottomTabNavigator } from 'react-navigation-tabs';

import FirstScreen from '../screens/FirstScreen';
import SecondScreen from '../screens/SecondScreen';
import HomeScreen from '../screens/HomeScreen';

//################################################################
//## Redux
// https://reactnavigation.org/docs/en/redux-integration.html
// https://snack.expo.io/@react-navigation/redux-example-with-dynamic-title
//################################################################

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

function counter(state, action) {
  if(typeof state === 'undefined') return 0;

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// export const store = createStore(combineReducers({ count: counter }));

class Count extends React.Component {
  render() {
    return <Text>Count: {this.props.value}</Text>;
  }
}

//# Main Screen

class Counter extends React.Component {
  header: (navigationOptions) = {
    title: <CountContainer />,
  };

  render() {
    console.log("this.props.count: ", this.props.count);
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Count: {this.props.count}</Text>
        <Button
          title="Increment(+)"
          onPress={() => this.props.dispatch({ type: 'INCREMENT' })}
        />
        <Button
          title="Decrement(-)"
          onPress={() => this.props.dispatch({ type: 'DECREMENT' })}
        />

        <Button
          title="Go to static count screen"
          onPress={() =>
            this.props.navigation.navigate('StaticCounter', {
              count: this.props.count,
            })
          }
        />
      </View>
    );
  }
}

// Another screen!
class StaticCounter extends React.Component {
  header: (navigationOptions) = ({ navigation }) => ({
    title: navigation.getParam('count'),
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Received COUNT: {this.props.navigation.getParam('count')}
        </Text>
      </View>
    );
  }
}

let CountContainer = connect(state => ({ value: state.count }))(Count);
let CounterContainer = connect(state => ({ count: state.count }))(Counter);
let StaticCounterContainer = connect(state => ({ count: state.count }))( StaticCounter );

export const MyReduxTestNavigator = createStackNavigator({
  Counter: CounterContainer,
  StaticCounter: StaticCounterContainer,
})
