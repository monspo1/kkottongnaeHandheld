import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Text, ScrollView, Alert, Avatar, SectionList, TouchableOpacity } from 'react-native';
// import { Container, Item, Label, Form, Text, Button, Input, Picker, Icon } from 'native-base';
import { Layout, Input, Button, Icon, Select, List, ListItem, } from '@ui-kitten/components';
import * as Font from 'expo-font';
import { AppLoading } from "expo";
import { listOfItemCategories } from '../constants/Constants.js'
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
      preset_colors: [],
    };
  }

  componentDidMount() {
    // console.log("* Calling getItemData() !!");
    this.props.getItemData()
    this.setState({ preset_colors: this.getPresetColors() })
  }

  componentDidUpdate(prevProps, prevState) {
    const { items } = this.props
    const { all_items } = this.state

    console.log("- items: ", items, "\n** - all_items: ", all_items);
    if(!_.isEqual(items, prevProps.items)){
      this.setState({ all_items: items }, () => {
          console.log("this.state.all_items: ", this.state.all_items);
      })
    }
  }

  getPresetColors = () => {
    const { preset_colors, numOfColor } = this.state;
    var tempColors = []
    for(var i = 0; i < numOfColor; i++)
      tempColors.push( 'rgba(' + Math.floor(Math.random()*256) + ',' +
              Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256)+',0.7)')
    return tempColors;
  }

  getSectionsOfData = () => {
    const { sortBy, sortDirection, all_items } = this.state
    var sectionDataLoc = []

    if(all_items.length === 0) return []
    switch (sortBy) {
      case 'name':
        sectionDataLoc = all_items.reduce((groupedObj, c) => {
          var title = c.item_name[0] // Grouping by the first character
          groupedObj[title] = (groupedObj[title] || []).concat(c)
          // console.log("groupedObj: ", groupedObj, " - c: ", c)
          return groupedObj
        }, {})

        //# Sorting
        sectionDataLoc = Object.entries(sectionDataLoc).map(([title, data]) => {
          return {title, data}
        }).sort((a,b) => (sortDirection === "asc") ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title))

        break;

      case 'date':
        sectionDataLoc = all_items.reduce((groupedObj, c) => {
          var title = new Date(Number(c.date)).toLocaleString()
          // console.log("new Date(c.date).toLocaleString(): ", new Date(c.date).toLocaleString());
          groupedObj[title] = (groupedObj[title] || []).concat(c)
          // console.log("groupedObj: ", groupedObj, " - c: ", c)
          return groupedObj
        }, {})

        sectionDataLoc = Object.entries(sectionDataLoc).map(([title, data]) => {
          // console.log("title: ", title, " >> names: ", data);
          return {title, data}
        }).sort((a,b) => (sortDirection === "asc") ? (new Date(a).getTime()) - (new Date(b).getTime()) : (new Date(b).getTime()) - (new Date(a).getTime()))

        break;

      default:
        break;
    }
    return sectionDataLoc
  }

  onSectionListItemPressHandler = (item, idx, that) => {
    console.log("> clicked item (idx: ", idx, "): ", item);
    // console.log("> that.props: ", that.props);
    // that.props.navigation.navigate("BoxDetailScreen", { item })
  }

  flatListItemSeparator = () => {
    return (
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
    )
  }


  render() {
    const { cur_item, items, valueForItemBarcode } = this.props;
    const { all_items, preset_colors } = this.state;
    // console.log("** items: ", items);

    return (
      <View style={globalStyle.itemListCoreMainViewStyle}>
        <Text category='h5'>ITEM LIST</Text>
        {
          (all_items.length > 0) &&
          <SectionList
            sections={ this.getSectionsOfData() }
            renderSectionHeader={({ section }) => (
              <View style={globalStyle.sectionHeaderViewStyle}>
                <Text style={globalStyle.sectionListHeaderTextStyle}> {section.title.toUpperCase()} </Text>
              </View>
            )}
            renderItem={({item, idx}) => (
              <TouchableOpacity style={globalStyle.sectionListItemTouchableOpacityRowStyle}
                onPress={() => this.onSectionListItemPressHandler(item, idx, this)}>
                <View style={globalStyle.sectionListItemColumnForIcon}>
                  <Icon name={`alpha-${item.item_name.charAt(0)}-circle`}
                      style={{ fontSize: 45, width: 45, color: `#2221EECC` }} />
                </View>
                <View style={globalStyle.sectionListItemColumnForText}>
                  <Text style={globalStyle.sectionListItemName}>{item.item_name}</Text>
                  <View style={globalStyle.sectionListItemSubtitleRow}>
                    <Text style={globalStyle.sectionListItemSubtitleStyle}>${item.item_price}</Text>
                    <Text style={globalStyle.sectionListItemSubtitleStyle}>{item.item_weight} (lbs)</Text>
                    <Text style={globalStyle.sectionListItemSubtitleStyle}>{
                        moment(new Date(item.date_created)).format('MM/DD/YY HH:mm')}
                    </Text>
                  </View>
                </View>
                <View style={globalStyle.sectionListItemColumnForArrowIcon}>
                  <Icon name={'arrow-right-circle'} style={{ fontSize: 25, width: 25, color: `#ccc` }}/>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={this.flatListItemSeparator}
            keyExtractor={(item, index) => index}

          />
        }
      </View>
    );

  }
}

const mapStateToProps = state => ({
  items: state.items,
  boxes: state.boxes,
  // cur_item: state.cur_item,
  // count: state.count
})

function mapDispatchToProps (dispatch) {
  return {
    getBoxData: () => dispatch(getBoxData()),
    getItemData: () => dispatch(getItemData()),
  }
}

export default ItemListCore = connect(mapStateToProps, mapDispatchToProps)(ItemListCoreBarebone)
