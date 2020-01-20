import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container, Item, Label, Form, Text, Button, Input, Picker, Icon } from 'native-base';
// import { Divider } from 'react-native-elements'  //Icon: See MaterialIcons sets
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { AppLoading } from "expo";
import { listOfItemCategories } from '../constants/Constants.js'
import _ from 'lodash';
import { //getItemData, getSearchItem, getBoxData, setCurrentBoxToEdit
} from '../actions/action'
import Constants from 'expo-constants';
const globalStyle = require('../styles/styles')


class ItemDetailScreenBarebone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // fontLoaded: false,
      valueForItemBrand: "",
      valueForItemName: "",
      valueForItemBarcode: "",
      valueForItemPrice: "",
      valueForItemWeightLbs: "",
      valueForItemWeightGram: "",
      valueForDateItemModified: "",
      selectedPickerKey: "key0",
    };
  }

  componentDidMount() {
  // async componentDidMount() {
    // await Font.loadAsync({
    //   Roboto: require('../../node_modules/native-base/Fonts/Roboto.ttf'),
    //   Roboto_medium: require('../../node_modules/native-base/Fonts/Roboto_medium.ttf')
    // });
    // this.setState({ fontLoaded: true });
  }

  componentDidUpdate(prevProps, prevState) {
    const { items, cur_item } = this.props
    // console.log("cur_item: ", cur_item);
    if(cur_item !== "no_item_found" && !_.isEqual(cur_item, prevProps.cur_item)) {
      // console.log("differ in cur_item: ", cur_item);
      this.setState({
        valueForItemBrand: cur_item.item_brand,
        valueForItemName: cur_item.item_name,
        valueForItemPrice: cur_item.item_price,
        valueForItemWeightLbs: cur_item.item_weight,
        valueForItemWeightGram: this.convertLbsToGram(cur_item.item_weight),
        valueForDateItemModified: cur_item.date_created

      }, () => {
        this.textInputForName.props.onChangeText(this.state.valueForItemName)
        this.textInputForBrand.props.onChangeText(this.state.valueForItemBrand)
        this.textInputForPrice.props.onChangeText(this.state.valueForItemPrice)
        this.textInputForWeightLbs.props.onChangeText(this.state.valueForItemWeightLbs)
        this.textInputForWeightGram.props.onChangeText(this.state.valueForItemWeightGram)
        this.textInputForDateModified.props.onChangeText(this.state.valueForDateItemModified)
      })
    }
  }

  onPickerValueChange(value: string, idx) {
    // console.log("onPickerValueChange: ", value.substring(3));
    this.setState({ selectedPickerKey: value });
  }

  convertLbsToGram = (lbs) => {
    return (Math.round((lbs * 453.592)*100)/100)
  }

  convertLbsToGram = (gram) => {
    return (Math.round((gram / 453.592)*100)/100)
  }

  convertDateToLocaleString = (date) => {
    return (new Date(this.state.valueForDateItemModified).toLocaleDateString() + ', ' +
            new Date(this.state.valueForDateItemModified).toLocaleTimeString())
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };


  render() {
    const { cur_item } = this.props;
    const { valueForItemBrand, valueForItemName, valueForItemPrice, valueForItemWeightLbs } = this.state;
    if(Object.keys(cur_item).length === 0) return <View><Text></Text></View>
    else if(cur_item === "no_item_found") return <View style={globalStyle.itemDetailScreenView}><Text>No item found</Text></View>

    // console.log("> cur_item.item_name: ", cur_item.item_name);
    // console.log("> valueForItemName: ", valueForItemName);

    return (
      <ScrollView style={globalStyle.MainContainer}>
        <Text style={globalStyle.itemDetailScreenView}>Item retrieved</Text>
        <Form>

          <Item stackedLabel>
            <Label style={globalStyle.nativeBaseLabelStyle}>Name: </Label>
            <Input placeholder="value for item name"
                ref={(ref) => this.textInputForName = ref}
                value={ this.state.valueForItemName}
                onChangeText={text => this.setState({ valueForItemName: text })}
              />
          </Item>

          <Item stackedLabel>
            <Label style={globalStyle.nativeBaseLabelStyle}>Brand: </Label>
            <Input placeholder="valueForItemBrand..."
                ref={(ref) => this.textInputForBrand = ref}
                value={ this.state.valueForItemBrand}
                onChangeText={text => this.setState({ valueForItemBrand: text })}
              />
          </Item>

          {
            // <Item stackedLabel>
            //   <Label style={globalStyle.nativeBaseLabelForPickerStyle}>Category: </Label>
            //   <Picker note mode="dropdown" selectedPickerKeyValue={this.state.selectedPickerKey}
            //     iosHeader="Branch" Header="Branch" placeholder='Select branch'
            //       onValueChange={this.onPickerValueChange.bind(this)}>
            //       <Picker.Item key={`picker_key_0`} label="" value={`key0`} />
            //       {
            //         listOfItemCategories.map((key, idx) => {
            //           return <Picker.Item key={`picker_key_${idx+1}`} label={key} value={`key${idx+1}`} />
            //         })
            //       }
            //   </Picker>
            // </Item>
          }

          <Item stackedLabel>
            <Label style={globalStyle.nativeBaseLabelStyle}>Price: </Label>
            <Input placeholder="value for item price"
                ref={(ref) => this.textInputForPrice = ref}
                value={ ('$'+String(this.state.valueForItemPrice)) }
                onChangeText={text => this.setState({ valueForItemPrice: String(text) })}
              />
          </Item>

          <Item stackedLabel>
            <Label style={globalStyle.nativeBaseLabelStyle}>Weight: </Label>
            <Input placeholder="value for item weight"
                ref={(ref) => this.textInputForWeightLbs = ref}
                value={ (String(this.state.valueForItemWeightLbs)+' (lbs)') }
                onChangeText={text => this.setState({ valueForItemWeightLbs: String(text) })}
              />
            <Input placeholder="value for item weight"
                ref={(ref) => this.textInputForWeightGram = ref}
                value={ (String(this.state.valueForItemWeightGram)+' (g)') }
                onChangeText={text => this.setState({
                  valueForItemWeightGram: String(text), valueForItemWeightLbs: String(text) })}
              />
          </Item>
          <Item stackedLabel>
            <Label style={globalStyle.nativeBaseLabelStyle}>Date modified: </Label>
            <Input placeholder="value for date item modified" disabled
                ref={(ref) => this.textInputForDateModified = ref}
                value={ this.convertDateToLocaleString() }
                onChangeText={text => this.setState({ valueForDateItemModified: String(text) })}
              />
          </Item>

          {
            // <Button iconRight onPress={this.onSearchItemBtnClickHandler}
            //   style={globalStyle.nativeBaseButtonTextStyleWhite}>
            //   <Text>Search</Text>
            //   <Icon name='beer' />
            // </Button>
          }
        </Form>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  // items: state.items,
  cur_item: state.cur_item,
  // count: state.count
})

function mapDispatchToProps (dispatch) {
  return {
    // getSearchItem: (reqObj) => dispatch(getSearchItem(reqObj)),
    // getItemData: () => dispatch(getItemData()),
    // setCurrentItemToEdit: item => dispatch(setCurrentItemToEdit(item)),
  }
}

export default ItemDetailScreen = connect(mapStateToProps, mapDispatchToProps)(ItemDetailScreenBarebone)
