import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Text, ScrollView, Alert, Avatar, SectionList, TouchableOpacity } from 'react-native';
// import { Container, Item, Label, Form, Text, Button, Input, Picker, Icon } from 'native-base';
import { Layout, Input, Icon, Select, List, ListItem, Button as ButtonKitten } from '@ui-kitten/components';
import { Card, Button } from 'react-native-elements'
import * as Font from 'expo-font';
import { AppLoading } from "expo";
import { listOfItemCategories } from '../constants/Constants.js'
import ItemDetailScreen from './ItemDetailScreen'
import _ from 'lodash';
import { getItemData, getBoxData, //getSearchItem, setCurrentBoxToEdit
} from '../actions/action'
import Constants from 'expo-constants';
const globalStyle = require('../styles/styles')
const moment = require('moment');

export const RightAngleIcon = (style) => ( <Icon name='angle-right' {...style} />);
export const CircleItem = (style) => ( <Icon name='search' {...style} />);

class ItemListCoreBarebone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      all_items: [],
      sortBy: 'name',
      sortDirection: 'asc',
    };
  }

  componentDidMount() {
    console.log("A. componentDidMount in Result ");
    // console.log("* Calling getItemData() !!");
    // this.props.getItemData()
  }

  componentDidUpdate(prevProps, prevState) {
    const { items } = this.props
    const { all_items } = this.state
    console.log("B. componentDidUpdate in Result ");
    // console.log("- items: ", items, "\n** - all_items: ", all_items);
    // if(!_.isEqual(items, prevProps.items)){
    //   this.setState({ all_items: items }, () => {
    //       console.log("this.state.all_items: ", this.state.all_items);
    //   })
    // }
  }

  goToDetailScreen = (event) => {
    // console.log("view button clicked -> goToBarcodeScreen\n", this)
    this.props.navigation.navigate("ItemDetailScreen")
  }

  onAddNewItemBtnClickHandler = () => {
    this.props.navigation.navigate("ItemDetailScreen")
  }


  elementsOfNoItemFound = () => {
    return (
      <View style={globalStyle.itemListCoreMainViewStyle}>
        <Card title="Search result">
          <Text style={globalStyle.cardNoItemFoundStyle}>No item found</Text>
          <Button title='Add a new item' onPress={this.onAddNewItemBtnClickHandler}
              buttonStyle={globalStyle.cardItemButtonStyle}
              icon={<Icon name={'plus-circle'} style={globalStyle.cardItemButtonIconStyle}/>}
            />
        </Card>
      </View>
    )
  }


  render() {
    const { item, items, valueForItemBarcode } = this.props;
    const { all_items, preset_colors } = this.state;
    if(Object.keys(item).length === 0) return <View></View>
    else if(item.text === "no_item_found") return this.elementsOfNoItemFound()

    // TEMP
    // let keys = Object.keys(colorByCategories)
    let keys = _.map(listOfItemCategories, 'text')
    let randColor = keys[keys.length * Math.random() << 0]

    // let colorkeys = _.map(listOfItemCategories, 'color')
    // console.log("colors: ", colorkeys);

    return (
      <View style={globalStyle.itemListCoreMainViewStyle}>
        <Card title="Search result">
          <View style={globalStyle.cardItemViewRow}>
            <Icon name={`alpha-${item.item_category.charAt(0)}-circle`} style={{
                    fontSize: 40, width: 40, color: randColor, marginBottom: 5, }} />
            <Text style={globalStyle.cardItemName}>{item.item_name}</Text>
          </View>
          <View >
            <View style={globalStyle.cardItemViewRow}>
              <Text style={globalStyle.cardItemSubTitleLabelStyle}>CATEGORY: </Text>
              <Text style={globalStyle.cardItemSubtitleValueStyle}>{item.item_category}</Text>
            </View>
            <View style={globalStyle.cardItemViewRow}>
              <Text style={globalStyle.cardItemSubTitleLabelStyle}>PRICE: </Text>
              <Text style={globalStyle.cardItemSubtitleValueStyle}>${item.item_price}</Text>
            </View>
            <View style={globalStyle.cardItemViewRow}>
              <Text style={globalStyle.cardItemSubTitleLabelStyle}>WEIGHT: </Text>
              <Text style={globalStyle.cardItemSubtitleValueStyle}>{item.item_weight} (lbs)</Text>
            </View>
            <View style={globalStyle.cardItemViewRow}>
              <Text style={globalStyle.cardItemSubTitleLabelStyle}>Date Created: </Text>
              <Text style={globalStyle.cardItemSubtitleValueStyle}>{
                  moment(new Date(item.date_created)).format('MM/DD/YY HH:mm')}
              </Text>
            </View>
          </View>

          <Button title='VIEW' onPress={this.goToDetailScreen}
              buttonStyle={globalStyle.cardItemButtonStyle} iconRight
              icon={<Icon name={'arrow-right-circle'} style={globalStyle.cardItemButtonIconStyle}/>}
            />
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items,
  boxes: state.boxes,
  // item: state.item,
  // count: state.count
})

function mapDispatchToProps (dispatch) {
  return {
    getBoxData: () => dispatch(getBoxData()),
    getItemData: () => dispatch(getItemData()),
  }
}

export default ItemListCore = connect(mapStateToProps, mapDispatchToProps)(ItemListCoreBarebone)
