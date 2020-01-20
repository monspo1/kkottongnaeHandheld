import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator, getActiveChildNavigationOptions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createBottomTabNavigator } from 'react-navigation-tabs';

import FirstScreen from '../screens/FirstScreen';
import SecondScreen from '../screens/SecondScreen';
import HomeScreen from '../screens/HomeScreen';
import SigninHomeScreen from '../screens/SigninHomeScreen';
import SignInScreen from '../screens/SignInScreen';
import OtherScreen from '../screens/OtherScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import SafeareaScreen from '../screens/SafeareaScreen'


const Placeholder = ({ text }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>{text}</Text>
  </View>
)

//################################################################
//## A. nested navigation options (Wrong way)
// https://reactnavigation.org/docs/en/navigation-options-resolution.html
// https://snack.expo.io/@react-navigation/nested-navigationoptions-wrong-v3
//################################################################
// class A extends React.Component {
//   static navigationOptions = { tabBarLabel: 'Home!', };
//   render() {
//     return <Placeholder text="A A A A!"/>
//   }
// }
//
// class B extends React.Component {
//   static navigationOptions = { tabBarLabel: 'Settings Tab!!!', };
//   render() {
//     return <Placeholder text="BBBBBBBBB!"/>
//   }
// }
//
// let HomeStack = createStackNavigator({ A })
// let SettingsStack = createStackNavigator({ B })



//################################################################
//## B. nested navigation options (Correct way - Unoptimized)
// https://reactnavigation.org/docs/en/navigation-options-resolution.html
// https://snack.expo.io/@react-navigation/nested-navigationoptions-correct-v3
//################################################################
// class A extends React.Component {
//   render() {
//     return <Placeholder text="A A A A!"/>
//   }
// }
//
// class B extends React.Component {
//   render() {
//     return <Placeholder text="BBBBBBBBB!"/>
//   }
// }
//
// let HomeStack = createStackNavigator({ A })
// let SettingsStack = createStackNavigator({ B })
//
// HomeStack.navigationOptions = { tabBarLabel: 'Home!' }
// SettingsStack.navigationOptions = { tabBarLabel: 'Settings Tab!!' }



//################################################################
//## C. nested navigation options (Correct - Optimized)
// https://reactnavigation.org/docs/en/navigation-options-resolution.html
// https://snack.expo.io/@react-navigation/nested-navigationoptions-title-v3
//################################################################
class A extends React.Component {
  render() {
    return <Placeholder text="A A A A!"/>
  }
}

class B extends React.Component {
  render() {
    return <Placeholder text="BBBBBBBBB!"/>
  }
}

//# Correct way (But Optimized)
let HomeStack = createStackNavigator({ A }, {
  navigationOptions: { tabBarLabel: 'Home!' },
  defaultNavigationOptions: { title: 'Welcome' }
});

let SettingsStack = createStackNavigator({ B }, {
  navigationOptions: { tabBarLabel: 'Setting Tabl!!' },
  defaultNavigationOptions: { title: 'Settings' }
});


//################################################################
//## D. nested navigation options (Another way) with Active Child
// https://reactnavigation.org/docs/en/navigation-options-resolution.html
// https://snack.expo.io/@react-navigation/nested-navigationoptions-active-child-v3
//################################################################
//# Exlanation: If you would like to get the navigationOptions from the active child of a navigator,
//# you can do that with getActiveChildNavigationOptions. This makes it possible for you to set the
//# tabBarLabel directly on a screen inside of a stack that is inside of a tab, for example.

// class A extends React.Component {
//   static navigationOptions = {
//     title: 'Welcome',
//     tabBarLabel: 'Home!',
//   };
//
//   render() {
//     return <Placeholder text="A A A A!"/>
//   }
// }
//
// class B extends React.Component {
//   static navigationOptions = {
//     title: 'Settings',
//     tabBarLabel: 'Settings!',
//   };
//
//   render() {
//     return <Placeholder text="BBBBBBBBB!"/>
//   }
// }
//
// //# Correct way (But Optimized)
// let HomeStack = createStackNavigator({ A }, {
//   navigationOptions: ({ navigation, screenProps }) => ({
//     // You can put fallback value before here, e.g., a default tabBarLabel
//     ...getActiveChildNavigationOptions(navigation, screenProps),
//     // Put other navigationOptions that you don't want the active child to be able to override here
//   })
// });
// let SettingsStack = createStackNavigator({ B }, {
//   navigationOptions: ({ navigation, screenProps }) => ({
//     ...getActiveChildNavigationOptions(navigation, screenProps)
//   })
// });


//#############
// Common code
//#############
export const MyNestedNavigatorsOptions = createBottomTabNavigator({
  HomeStack,
  SettingsStack,
})
