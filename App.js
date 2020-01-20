import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux'
import store from './src/store/store'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { createAppContainer } from 'react-navigation';
import { MainReduxNavigator } from './src/navigation/MainReduxNavigator'
import { enableScreens } from 'react-native-screens'; //# For better screen performance
import { FeatherIconsPack } from './src/styles/feather-icons.js'
import { MaterialIconsPack } from './src/styles/material-icons.js'
import { MaterialCommunityIconsPack } from './src/styles/material-community-icons.js'
import { FontAwesomeIconsPack } from './src/styles/fontawesome-icons.js'
import { IonIconsPack } from './src/styles/ion-icons.js'

enableScreens() // https://github.com/kmagiera/react-native-screens

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// const AppContainer = createAppContainer(MainDrawerNavigator)
// const AppContainer = createAppContainer(MainStackNavigator)
// const AppContainer = createAppContainer(MyTestNavigator)
// const AppContainer = createAppContainer(MyNestedNavigatorsOptions)
// const AppContainer = createAppContainer(MyReduxTestNavigator)
const AppContainer = createAppContainer(MainReduxNavigator)

export default class App extends React.Component {
  state = {}
  ComponentDidMount() {}

  render(){
    return (
      <Provider store = {store}>
        <IconRegistry icons={
          [ MaterialCommunityIconsPack ]} />
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <AppContainer/>
        </ApplicationProvider>
      </Provider>
    );
  }
}
