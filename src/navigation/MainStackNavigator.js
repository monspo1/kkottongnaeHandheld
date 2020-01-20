import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'

import FirstScreen from '../screens/FirstScreen';
import SecondScreen from '../screens/SecondScreen';
import HomeScreen from '../screens/HomeScreen'

const RootStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    key: 'HomeScreen',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  FirstScreen: {
    screen: FirstScreen,
    key: 'FirstScreen',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  SecondScreen: {
    screen: SecondScreen,
    key: 'SecondScreen',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
});

export const MainStackNavigator = createAppContainer(RootStack);
