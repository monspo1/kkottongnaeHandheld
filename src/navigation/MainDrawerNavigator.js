import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import Screen1 from '../screens/Screen1'
import Screen2 from '../screens/Screen2'
import Screen3 from '../screens/Screen3'
import LandingScreen from '../screens/LandingScreen'
// import FirstScreen from '../screens/FirstScreen';
// import SecondScreen from '../screens/SecondScreen';
// import HomeScreen from '../screens/HomeScreen'
const globalStyle = require('../styles/styles')


class NavigationDrawerStructure extends React.Component {
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

const Screen1_StackNavigator = createStackNavigator({
  Screen1: {
    screen: Screen1,
    navigationOptions: ({ navigation }) => ({
      title: 'New Box',
      headerLeft: <NavigationDrawerStructure navigationProps = { navigation }/>,
      headerStyle: {
        backgroundColor: globalStyle.DrawerHeaderStyle.backgroundColor, //'#FF9800',
      },
      headerTintColor: '#fff',
    })
  },
})

const Screen2_StackNavigator = createStackNavigator({
  Screen2: {
    screen: Screen2,
    navigationOptions: ({ navigation }) => ({
      title: 'Existing Boxes',
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

export const MainDrawerNavigator = createDrawerNavigator({
    LandingScreen: {
      screen: LandingScreen,
      navigationOptions : {
        drawerLabel: 'Landing Screen',
        drawerIcon: ({ tintColor }) => (
          <Icon name='home' solid color='#00aced' size={18}/>
        ),
      }
    },
    Screen1: {
      screen: Screen1_StackNavigator,
      navigationOptions : {
        drawerLabel: 'New Box',
        drawerIcon: ({ tintColor }) => (
          <Icon name='add-box' light color='#00acedee' size={18}/>
        ),
      }
    },

    Screen2: {
      screen: Screen2_StackNavigator,
      navigationOptions : {
        drawerLabel: 'Existing Boxes',
        drawerIcon: ({ tintColor }) => (
          <Icon name='home' light color='#00aced' size={18}/>
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




// export const MainDrawerNavigator = createAppContainer(RootDrawerNavigator);
