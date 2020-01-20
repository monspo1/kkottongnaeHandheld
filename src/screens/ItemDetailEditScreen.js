import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
// import { Container, Item, Label, Form, Text, Button, Input, Picker, Icon } from 'native-base';
import { Menu, Text, Input, Button, ButtonGroup, Icon, Select } from '@ui-kitten/components';
// import { Divider } from 'react-native-elements'  //Icon: See MaterialIcons sets
// import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { AppLoading } from "expo";
import { listOfItemCategories, colorByCategories } from '../constants/Constants.js'
import _ from 'lodash';
import { setCurrentItem, addNewItemToDB, //getItemData, getSearchItem, getBoxData, setCurrentBoxToEdit
} from '../actions/action'
import Constants from 'expo-constants';
import KeyboardSpacer from 'react-native-keyboard-spacer';
const globalStyle = require('../styles/styles')
const moment = require('moment');
export const EditIcon = (style) => ( <Icon name='border-color' {...style} />);
// export const MaterialIconTest = (style) => ( <Icon name='adb' {...style} pack='material'/>);
// export const FAIconTest = (style) => ( <Icon name='gamepad' {...style} pack='fontawesome'/>);
// export const CheckIcon = (style) => ( <Icon name='check' {...style} pack='fontawesome'/>);
export const PlusIcon = (style) => ( <Icon name='plus-circle' {...style} />);
export const SubmitIcon = (style) => ( <Icon name='arrow-up-bold-circle' {...style} />);
export const CancelIcon = (style) => ( <Icon name='alpha-x-circle' {...style} />);



class ItemDetailEditScreenBarebone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // fontLoaded: false,
      valueForItemBrand: "",
      valueForItemName: "",
      valueForItemBarcodeLocal: "",
      valueForItemPrice: "",
      valueForItemWeightLbs: "",
      valueForItemWeightGram: "",
      valueForDateItemModified: "",
      valueForItemCategory: null,
      shouldDisableInputs: true,
    };
  }

  componentDidMount() {
    const { cur_item, valueForItemBarcode, barcode_scanned } = this.props
    const { valueForItemBarcodeLocal, valueForItemCategory } = this.state

    // console.log("this.props in Detail Page: ", this.props);
    // console.log("> Cur_item in Detailed page: ", cur_item);
    // console.log("> this.props.valueForItemBarcode: ", valueForItemBarcode);
    // console.log("> barcode_scanned: ", barcode_scanned);
    // 8809379950617

    if(Object.keys(cur_item).length > 0 && cur_item.text !== "no_item_found") {
      //# Two series of this.setState() is called because it doesn't update the select
      //# (it requires a transition time to update) even though the category value is received.
      // console.log("case 1, cur_item: ", cur_item);
      // console.log("valueForItemCategory: ", valueForItemCategory);
      this.setState({
        valueForItemBarcodeLocal: (barcode_scanned === "") ? cur_item.item_barcode : barcode_scanned,
        valueForItemCategory: this.getFormattedItemCategory(cur_item.item_category),
      }, () => {
        this.setState({
          valueForItemBrand: cur_item.item_brand,
          valueForItemName: cur_item.item_name,
          valueForItemPrice: String(cur_item.item_price),
          valueForItemWeightLbs: String(cur_item.item_weight),
          valueForItemWeightGram: this.convertLbsToGram(cur_item.item_weight),
          valueForDateItemModified: this.convertDateToLocaleString(cur_item.date_created),
        })
      })
    } else { // if(Object.keys(cur_item).length > 0 && cur_item.text === "no_item_found") {
      // console.log("item_barcode: ", cur_item.item_barcode);
      console.log("case 2, cur_item: ", cur_item);
      this.setState({ shouldDisableInputs: false, valueForItemBarcodeLocal: cur_item.item_barcode })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { cur_item } = this.props
    const { valueForItemBarcodeLocal } = this.state
    // console.log("cur_item: ", cur_item);
    // if(cur_item !== "no_item_found" && !_.isEqual(cur_item, prevProps.cur_item)) {
    //   // console.log("differ in cur_item: ", cur_item);
    //
    //   //# Two series of this.setState() is called because it doesn't update the select
    //   //# (it requires a transition time to update) even though the category value is received.
    //   this.setState({
    //     valueForItemCategory: (valueForItemBarcodeLocal === '') ? null : this.getFormattedItemCategory(cur_item.item_category)
    //   }, () => {
    //     this.setState({
    //       valueForItemBrand: cur_item.item_brand,
    //       valueForItemName: cur_item.item_name,
    //       valueForItemPrice: String(cur_item.item_price),
    //       valueForItemWeightLbs: String(cur_item.item_weight),
    //       valueForItemWeightGram: this.convertLbsToGram(cur_item.item_weight),
    //       valueForDateItemModified: (cur_item.date_created),
    //     })
    //   })
    // }
  }

  onEditItemBtnClickHandler = () => {
    this.setState({ shouldDisableInputs: !this.state.shouldDisableInputs })
  }

  onAddNewItemBtnClickHandler = () => {
    let new_item = {
      item_brand: '', item_name: '', item_price: '', item_weight: '', item_category: '',
      date_created: (new Date().toLocaleString()),
    }

    this.setState({
      shouldDisableInputs: false, valueForItemBarcodeLocal: '', valueForItemCategory: null,
    }, () => {  this.props.setCurrentItem(new_item) })
    //valueForItemBarcodeLocal onBarcodeValueChange
  }

  onSubmitItemEditClickHandler = () => {
    const {  valueForItemName, valueForItemBrand, valueForItemBarcodeLocal, valueForItemPrice,
      valueForItemWeightLbs, valueForDateItemModified, valueForItemCategory, } = this.state
    // console.log("onSubmitItemEditClickHandler clicked")

    let reqItemToSubmitNewItem = {
      item_id: "itmid-" + Date.now() + "-" + Math.random().toString(16).slice(2, 10),
      item_barcode: valueForItemBarcodeLocal,
      item_name: valueForItemName,
      item_brand: valueForItemBrand,
      item_category: valueForItemCategory.text,
      item_price: valueForItemPrice,
      item_weight: valueForItemWeightLbs,
      date_created: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }

    this.setState({
      shouldDisableInputs: true, valueForItemBarcodeLocal: '', valueForItemCategory: null,
    }, () => {
      // console.log("\n- SUBMITTED reqItemToSubmitNewItem: ", reqItemToSubmitNewItem);
      this.props.addNewItemToDB(reqItemToSubmitNewItem)
    })
  }

  onCancelItemEditClickHandler = () => {
    this.props.setCurrentItem({})
    this.props.navigation.goBack()
    // this.props.navigation.navigate("ItemListScreen")
  }

  onBarcodeValueChange = (val) => {
    this.setState({ valueForItemBarcodeLocal: val })
  }

  onItemNameChange = (val) => {
    this.setState({ valueForItemName: val })
  }

  onItemBrandChange = (val) => {
    this.setState({ valueForItemBrand: val })
  }

  onItemPriceChange = (val) => {
    this.setState({ valueForItemPrice: val })
  }

  onItemWeightLbsChange = (val) => {
    this.setState({ valueForItemWeightLbs: val })
  }

  onCategorySelect = (val) => {
    console.log("onCategorySelect val: ", val);
    this.setState({ valueForItemCategory: val })
  }

  onItemDateModifiedChange = (val) => {
    this.setState({ valueForDateItemModified: val })
  }

  getFormattedItemCategory = (received_category) => { // 8809379950617
      // console.log("received_category: ", received_category);
      // console.log("listOfItemCategories: ", listOfItemCategories);
      let found_index = listOfItemCategories.findIndex(category => category.text === received_category)
      return listOfItemCategories[found_index]

      // var keys = Object.keys(listOfItemCategories)
      // // let keys = _.map(listOfItemCategories, 'text')
      // var randkey = listOfItemCategories[keys[ keys.length * Math.random() << 0]];
      // console.log("randkey: ", randkey);
      // return randkey

      // return Math.floor(Math.random() * Object.keys(listOfItemCategories).length)
  }

  convertLbsToGram = (lbs) => {
    return (Math.round((lbs * 453.592)*100)/100)
  }

  convertLbsToGram = (gram) => {
    return (Math.round((gram / 453.592)*100)/100)
  }

  convertDateToLocaleString = (date) => {
    // console.log("date: ", date);
    return (new Date(date).toLocaleDateString() + ', ' +
            new Date(date).toLocaleTimeString())
    // return (new Date(this.state.valueForDateItemModified).toLocaleDateString() + ', ' +
    //         new Date(this.state.valueForDateItemModified).toLocaleTimeString())
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  alertForNewItem = () => {
    let reqObj = {
      date_created: "",
      item_brand: "",
      item_category: "",
      item_name: "",
      item_price: "",
      item_weight: "",
    }

    return Alert.alert(
      'No item found in the DB',
      `Do you want to add a new item?`,
      [
        { text: 'Cancel', onPress: () => {
              console.log("Cancel clicked");
              // this.props.setCurrentItem({})
          }, style: 'cancel'
        },
        { text: 'Add a new Item ', onPress: () => {
            // this.props.setCurrentItem(reqObj)
            console.log("OK clicked");
          }
        },
      ],
      { cancelable: false },
    );
  }

  shouldDisableSubmitButtonInItemDetail = () => {
    const { valueForItemBrand, valueForItemName, valueForItemPrice, valueForItemWeightLbs,
        valueForItemCategory } = this.state;

    return ( valueForItemBrand === "" || valueForItemName === "" || valueForItemPrice === "" || valueForItemWeightLbs === ""
        || valueForItemCategory === null)
  }

  elementsOfNoItemFound = () => {
    // this.alertForNewItem()
    return (
      <>
      <Text>No item found</Text>
      <Button status='info' style={globalStyle.nativeBaseButtonTextStyleWhite}
          icon={PlusIcon} onPress={this.onAddNewItemBtnClickHandler}>Add a new item</Button>
      </>
    )
  }

  render() {
    const { cur_item, valueForItemBarcode } = this.props;
    const { valueForItemBrand, valueForItemName, valueForItemPrice, valueForItemWeightLbs,
            valueForItemCategory, valueForDateItemModified, shouldDisableInputs, valueForItemBarcodeLocal } = this.state;

    // console.log("> Detailed page > this.props.cur_item", this.props.cur_item);

    if(Object.keys(cur_item).length === 0) return (
      <Button status='info' style={globalStyle.nativeBaseButtonTextStyleWhite}
          icon={PlusIcon} onPress={this.onAddNewItemBtnClickHandler}>Add a new item</Button>
    )

    // console.log("cur_item in Detail Screen: ", cur_item);
    console.log("valueForItemCategory: ", valueForItemCategory);
    // else  if(Object.keys(cur_item).length === 1 && cur_item.text === "no_item_found") return this.elementsOfNoItemFound()
    let isPriceNumber = (valueForItemPrice === "" || valueForItemPrice.match(/^[\d.]+$/) !== null )

    return (

        <ScrollView style={{ width: "100%", flex: 1 }}>

          {
            // <View style={globalStyle.horizontalLineStyle}/>
          }
          <Text style={globalStyle.itemDetailScreenView} category='h3'>Item info</Text>

          {
            (Object.keys(cur_item).length > 0 && cur_item.text !== "no_item_found") &&
            <Button status='info' appearance='outline' size='small' style={globalStyle.editItemDetailBtnStyle}
                icon={EditIcon} onPress={this.onEditItemBtnClickHandler}>EDIT</Button>
          }

          {
            // <Button status='info' appearance='outline' size='small'
            //     icon={MaterialIconTest} onPress={this.onEditItemBtnClickHandler}>Material Icon Sample</Button>
            //
            // <Button status='info' appearance='outline' size='small'
            //     icon={FAIconTest} onPress={this.onEditItemBtnClickHandler}>FontAwesome Icon Sample</Button>
          }

          {
            // (valueForItemBarcodeLocal !== null) &&
            // <Input label='Barcode:' placeholder='Barcode' style={globalStyle.styleForItemDetailInputs}
            //   value={valueForItemBarcode} onChangeText={this.props.onBarcodeValueChange } disabled={shouldDisableInputs}/>
          }
          <Input label='Barcode:' placeholder='Barcode' style={globalStyle.styleForItemDetailInputs}
            value={valueForItemBarcodeLocal} onChangeText={this.onBarcodeValueChange } disabled={shouldDisableInputs}/>

          <Input label='Name:' placeholder='Item name' style={globalStyle.styleForItemDetailInputs}
              value={valueForItemName} onChangeText={this.onItemNameChange } disabled={shouldDisableInputs}/>

          <Input label='Brand:' placeholder='Item brand' style={globalStyle.styleForItemDetailInputs}
              value={valueForItemBrand} onChangeText={this.onItemBrandChange } disabled={shouldDisableInputs}/>

          <Select label='Category:' placeholder='Item category' style={globalStyle.styleForItemDetailInputs}
            disabled={shouldDisableInputs} data={ listOfItemCategories } onSelect={this.onCategorySelect}
            selectedOption={valueForItemCategory}
            />


          <Input label='Price ($):' placeholder='Item price' style={globalStyle.styleForItemDetailInputs}
              status={isPriceNumber ? 'basic' : 'danger'} caption={isPriceNumber ? '' : 'Can have only numbers'}
              value={valueForItemPrice} onChangeText={this.onItemPriceChange } disabled={shouldDisableInputs}/>

          <Input label='Weight (lbs):' placeholder='Item weight' style={globalStyle.styleForItemDetailInputs}
              value={valueForItemWeightLbs} onChangeText={this.onItemWeightLbsChange } disabled={shouldDisableInputs}/>

          {
            (cur_item !== null && Object.keys(cur_item).length > 0 && cur_item.text !== "no_item_found")
            ? <Input label='Date modified:' placeholder='Date item info was modified'
                style={{ marginTop: 8, marginBottom: 8, marginLeft: 15, marginRight: 15 }}
                value={valueForDateItemModified} onChangeText={this.onItemDateModifiedChange } disabled={true}/>
            : <View></View>
            // <Input label='Date modified:' placeholder='Date item info was modified'
            //     style={{ marginTop: 8, marginBottom: 8, marginLeft: 15, marginRight: 15,
            //         display:  ? 'block' : 'none'
            //     }} value={valueForDateItemModified} onChangeText={this.onItemDateModifiedChange } disabled={shouldDisableInputs}/>

          }
          <View style={globalStyle.viewForButtonGroupRow}>
            <Button status='danger' size='small' style={globalStyle.buttonGroupColumnStyle }
                icon={CancelIcon} onPress={this.onCancelItemEditClickHandler}>Cancel</Button>
            <Button status='info' size='small' style={globalStyle.buttonGroupColumnStyle }
                disabled={this.shouldDisableSubmitButtonInItemDetail()}
                icon={SubmitIcon} onPress={this.onSubmitItemEditClickHandler}>Submit</Button>
          </View>

          <KeyboardSpacer/>
        </ScrollView>

    );
  }
}

const mapStateToProps = state => ({
  // items: state.items,
  cur_item: state.cur_item,
  barcode_scanned: state.barcode_scanned,
  valueForItemBarcode: state.valueForItemBarcode
})

function mapDispatchToProps (dispatch) {
  return {
    // getSearchItem: (reqObj) => dispatch(getSearchItem(reqObj)),
    // getItemData: () => dispatch(getItemData()),
    // setCurrentItemToEdit: item => dispatch(setCurrentItemToEdit(item)),
    setCurrentItem: (obj) => dispatch(setCurrentItem(obj)),
    addNewItemToDB: (obj) => dispatch(addNewItemToDB(obj))
  }
}

export default ItemDetailEditScreen = connect(mapStateToProps, mapDispatchToProps)(ItemDetailEditScreenBarebone)
