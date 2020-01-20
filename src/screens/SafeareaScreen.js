import React,  { Component } from 'react';
import { StyleSheet, Text, View, Button, Platform, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import DeviceInfo from 'react-native-device-info'; // Not working

// if (Platform.OS === 'android') {
//   SafeAreaView.setStatusBarHeight() // Not working
// }

export default class SafeareaScreen extends Component {
  state = {
    top: 'always',
    bottom: 'always'
  }

  toggleForceIncet = (side) => {
    console.log("clicked: ", side);
    this.setState({
      [side]: (this.state[side] === 'always') ? 'never' : 'always'
    }, () => {
      console.log("converted to: ", this.state[side]);
    })
  }

  render() {
    //https://www.npmjs.com/package/react-native-safe-area-view
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} forceIncet={{ top: this.state.top, bottom: this.state.bottom }}>
          <StatusBar hidden={true} />
          <Text style={styles.paragraph}>This is top text</Text>
          <View>
            <Button title="Toggle top padding" onPress={() => this.toggleForceIncet('top')}/>
            <Text>SafeArea Screen</Text>
            <Button title="Toggle bottom padding" onPress={() => this.toggleForceIncet('bottom')}/>
          </View>
          <Text style={styles.paragraph}>This is bottom text</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    justifyContent: 'space-between',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
