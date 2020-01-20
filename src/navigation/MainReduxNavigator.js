import React,  { Component } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Provider, connect } from 'react-redux';
import { Icon } from 'react-native-elements'  //See MaterialIcons sets

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
// import { createStore, combineReducers } from 'redux';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';

import NavigationDrawerStructure from './NavigationDrawerStructure'
import ItemListScreen from '../screens/ItemListScreen';
import BoxListScreen from '../screens/BoxListScreen';
import Screen1 from '../screens/Screen1'
import Screen2 from '../screens/Screen2'
import Screen3 from '../screens/Screen3'
import LandingScreen from '../screens/LandingScreen';
import BarcodeScannerComp from '../screens/BarcodeScannerComp';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import ItemDetailEditScreen from '../screens/ItemDetailEditScreen';

// import FirstScreen from '../screens/FirstScreen';
// import SecondScreen from '../screens/SecondScreen';
// import HomeScreen from '../screens/HomeScreen';


const globalStyle = require('../styles/styles.js')


/* Working
let ItemListContainer = connect(state => ({ count: state.count }))(ItemList);
// let ItemDetailContainer = connect(state => ({ value: state.count }))(ItemDetail);
let BoxListContainer = connect(state => ({ count: state.count }))(BoxList);

export const MainReduxNavigator = createStackNavigator({
  Items: ItemListContainer,
  // ItemDetail: ItemDetailContainer,
  Boxs: BoxListContainer,
})
*/

const ItemListStackNavigator = createStackNavigator({
  ItemListScreen: {
    screen: ItemListScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Check Item',
      headerLeft: <NavigationDrawerStructure navigationProps = { navigation }/>,
      headerStyle: {
        backgroundColor: globalStyle.DrawerHeaderStyle.backgroundColor, //'#FF9800',
      },
      headerTintColor: '#fff',
    })
  },
  BarcodeScannerComp: {
    screen: BarcodeScannerComp,
    navigationOptions: {
      title: 'BarCodeScanner',
    },
  },
  ItemDetailScreen: {
    screen: ItemDetailScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Item Details',
      headerLeft: <NavigationDrawerStructure navigationProps = { navigation }/>,
      headerStyle: {
        backgroundColor: globalStyle.DrawerHeaderStyle.backgroundColor, //'#FF9800',
      },
      headerTintColor: '#fff',
    })
  },
  ItemDetailEditScreen: {
    screen: ItemDetailEditScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Item Details',
      headerLeft: <NavigationDrawerStructure navigationProps = { navigation }/>,
      headerStyle: {
        backgroundColor: globalStyle.DrawerHeaderStyle.backgroundColor, //'#FF9800',
      },
      headerTintColor: '#fff',
    })
  }
})

const BoxListStackNavigator = createStackNavigator({
  Screen2: {
    screen: BoxListScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Box List',
      headerLeft: <NavigationDrawerStructure navigationProps = { navigation }/>,
      headerStyle: {
        backgroundColor: globalStyle.DrawerHeaderStyle.backgroundColor, //'#FF9800',
      },
      headerTintColor: '#fff',
    })
  },
})

const Screen3_StackNavigator = createStackNavigator({
  Screen3: {
    screen: Screen3,
    navigationOptions: ({ navigation }) => ({
      title: 'Settings',
      headerLeft: <NavigationDrawerStructure navigationProps = { navigation }/>,
      headerStyle: {
        backgroundColor: globalStyle.DrawerHeaderStyle.backgroundColor, //'#FF9800',
      },
      headerTintColor: '#fff',

    })
  },
})


export const MainReduxNavigator = createDrawerNavigator({

    ItemDetailContainer: {
      screen: ItemListStackNavigator,
      navigationOptions : {
        drawerLabel: 'Check Item',
        drawerIcon: ({ tintColor }) => (
          <Icon name='list' light color='#00acedee' size={18}/>
        ),
      }
    },

    BoxListScreen: {
      screen: BoxListStackNavigator,
      navigationOptions : {
        drawerLabel: 'Box List',
        drawerIcon: ({ tintColor }) => (
          <Icon name='filter-none' light color='#00aced' size={18}/>
        ),
      }
    },

    Screen3: {
      screen: Screen3_StackNavigator,
      navigationOptions : {
        drawerLabel: 'Settings',
        drawerIcon: ({ tintColor }) => (
          <Icon name='gear' solid type='evilicon' color='#00aced'size={18}/>
        ),
      }
    },

  },
  {
    contentOptions: {
      activeTintColor: 'black',
      activeBackgroundColor: '#00aced33',
      inactiveTintColor: 'black',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 15,
        marginLeft: 10,
      },
    },
    // drawerBackgroundColor: 'cyan'
  }
)
