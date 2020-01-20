import { createAppContainer, createSwitchNavigator } from 'react-navigation';
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

//################################################################
//## 1. Bottom Tab Navigator
//################################################################
// export const MyTestNavigator = createBottomTabNavigator({
//   Home: HomeScreen,
//   FirstScreen: FirstScreen,
//   SecondScreen: SecondScreen
// });


//################################################################
//## 2. Auth Navigator example
// https://snack.expo.io/@react-navigation/auth-flow-v3
//################################################################
// const AppStack = createStackNavigator({
//   Home: SigninHomeScreen,
//   Other: OtherScreen,
// })
//
// const AuthStack = createStackNavigator({
//   SignIn: SignInScreen
// })
//
//
// export const MyTestNavigator = createSwitchNavigator(
//   {
//     AuthLoading: AuthLoadingScreen,
//     App: AppStack,
//     Auth: AuthStack,
//   },
//   {
//     initialRouteName: 'AuthLoading',
//   }
// );


//################################################################
//## 3. Supporting safe areas (Remove unnecessary status bar & bottom bar )
// https://reactnavigation.org/docs/en/handling-iphonex.html
//################################################################


export const MyTestNavigator = createStackNavigator({
  Home: HomeScreen
  // Home: SafeareaScreen,
}, {
  headerMode: 'none',
})
