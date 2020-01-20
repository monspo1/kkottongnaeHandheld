import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

const globalStyle = require('../styles/styles')
// import { Button } from 'react-native-material-ui';
// import { LinearGradient } from 'expo-linear-gradient';


export default class LandingScreen extends Component {

  onTouchOpactyPress = (evt, index) => {
    // console.log("index: ", index, "\n", "evt: ", evt);
    switch(index){
      case 1:
        this.props.navigation.navigate("Screen1")
        break;
      case 2:
        this.props.navigation.navigate("Screen2")
        break;
      case 3:
        this.props.navigation.navigate("Screen3")
        break;
      case 4:
        this.props.navigation.navigate("LandingScreen")
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <View style={globalStyle.LandingPageMainContainer}>
        <Text style={globalStyle.LandingScreenTitle} h2> Kkottongnae Mobile </Text>
        <Text style={globalStyle.LandingScreenSubtitle }> 꽃동네 모바일 </Text>

        <View style={globalStyle.LandingPageParentViewComp}>
          <TouchableOpacity onPress={(e) => this.onTouchOpactyPress(e, 1)}
            style={[globalStyle.LandingPageChildViewComp, {backgroundColor: 'rgba(55,105,15,0.0)'}]}>
            <Icon reverse name='add-box' color='#00aced' />
            <Text style={globalStyle.LandingPageTextForLinkIcon}>New Box</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={(e) => this.onTouchOpactyPress(e, 2)}
            style={[globalStyle.LandingPageChildViewComp, {backgroundColor: 'rgba(15,35,55,0.0)'}]} >
            <Icon reverse name="md-list-box" type="ionicon"  color='#00aced'/>
            <Text style={globalStyle.LandingPageTextForLinkIcon}>Existing Boxes</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={(e) => this.onTouchOpactyPress(e, 3)}
            style={[globalStyle.LandingPageChildViewComp, {backgroundColor: 'rgba(155,95,95,0.0)'}]}>
            <Icon reverse name='gear' type='evilicon' color='#00aced'/>
            <Text style={globalStyle.LandingPageTextForLinkIcon}>Settings</Text>
          </TouchableOpacity>
        </View>
        {
          // <LinearGradient
          //   // colors={['rgba(255,255,0,0.3)', 'transparent']}
          //   // colors={['#4c669f', '#3b5998', '#192f6a', 'transparent']}
          //   colors={['#52aad845', 'transparent']}
          //
          //   style={{
          //     position: 'absolute',
          //     left: 0,
          //     right: 0,
          //     top: 0,
          //     height: 300,
          //   }}
          // />
        }
        {
          // <TouchableOpacity onPress={(e) => this.onTouchOpactyPress(e, 2)}
          //   style={[globalStyle.LandingPageChildViewComp, {backgroundColor: 'rgba(15,35,55,0.0)'}]} >
          //   {
          //     // <Icon color="white" name="rocket" type="font-awesome" size={62} />
          //     // <MaterialIcon reverse name="checkbox-multiple-blank" size={28} color="#fff" style={{
          //     //   backgroundColor: '#00aced',
          //     //   borderRadius:45/2,
          //     //   height: 45,
          //     //   width: 45,
          //     //   justifyContent: 'center',
          //     //   alignItems: 'center'
          //     // }}/>
          //   }
          //   {
          //     // <FontAwesome5 reverse name={'boxes'} light color='#00aced' size={62}/>
          //     // <MaterialIcon reverse name="locker-multiple" color='#00aced'/>
          //   }
          //   <Icon reverse name="md-list-box" type="ionicon"  color='#00aced'/>
          //   <Text style={globalStyle.LandingPageTextForLinkIcon}>Existing Boxes</Text>
          // </TouchableOpacity>
        }

        <View style={globalStyle.LandingPageViewCompForCredit}>
          <Text style={globalStyle.LandingPageTextCompForCredit}> v.1.0 </Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <MaterialIcon  name='copyright' color='#fff' size={15}/>
            <Text style={globalStyle.LandingPageTextCompForCopyright}> All copyrights are reserved to Kkottongnae.</Text>
          </View>
        </View>
      </View>
    );
  }
}
