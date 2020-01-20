import React, { Component } from 'react';
import { connect } from 'react-redux'
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import { AppLoading } from "expo";
import { StyleSheet, View, ScrollView, Alert, BackHandler } from 'react-native';
import { Fab, Icon as NativeBaseIcon } from 'native-base';
import { Layout, Text, Input, Button, Menu, Modal, Icon, Avatar } from '@ui-kitten/components';
import { Overlay } from 'react-native-elements'

import _ from 'lodash';
import { getItemData, getBoxData, getSearchItem, setCurrentItem, setCurrentBoxToEdit } from '../actions/action'
import { listOfItemCategories } from '../constants/Constants.js'
import HomeScreen from './HomeScreen'
import ItemListResult from './ItemListResult'
import ItemDetailScreen from './ItemDetailScreen'
import ItemDetailEditScreen from './ItemDetailEditScreen'
import BarcodeScannerComp from './BarcodeScannerComp'
const globalStyle = require('../styles/styles')
export const SearchIcon = (style) => ( <Icon name='magnify' {...style} />);
export const PlusCircleIcon = (style) => (<Icon name='plus-circle' {...style} />)
export const EditIcon = (style) => ( <Icon name='border-color' {...style} />);
export const PlusIcon = (style) => ( <Icon name='plus-circle' {...style} />);
export const SubmitIcon = (style) => ( <Icon name='arrow-up-bold-circle' {...style} />);
export const CancelIcon = (style) => ( <Icon name='alpha-x-circle' {...style} />);
export const BarcodeIcon = (style) => ( <Icon name='barcode-scan' {...style} />);


class ItemListScreenBarebone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      valueForItemBarcode: "",
      prevItemBarcodeValue: "",
      isTheBarcodeSame: false,
      valueForItemName: "",
      valueForItemBrand: "",
      menuItemForSearchTarget: [],
      visibleItemSearchModal: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('../../node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('../../node_modules/native-base/Fonts/Roboto_medium.ttf')
    });

    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
       this.setState({ visibleItemSearchModal: false }, () => {
         this.props.setCurrentItem({})
       })
    });

    this.setState({
      fontLoaded: true,
      // menuItemForSearchTarget: [{
      //   title: "Search Target",
      //   subItems: [ { title: "Item Barcode" }, { title: "Item Name" }, { title: "Item Brand" }]
      // }],
    }, () => {
      // this.props.getItemData()
      // this.props.getBoxData()
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { items, cur_item, barcode_scanned } = this.props
    const { valueForItemBarcode, visibleItemSearchModal, isTheBarcodeSame } = this.state

    if(barcode_scanned !== "" && !_.isEqual(barcode_scanned, prevProps.barcode_scanned)) {
      console.log("differ in valueForItemBarcode: ", barcode_scanned);
      console.log("cur_item: ", cur_item, " <> prevProps.cur_item: ", prevProps.cur_item);
      // this.setState({ valueForItemBarcode: barcode_scanned }, () => {
      //   // this.textInputForBarcode.props.onChangeText(this.state.valueForItemBarcode) // Error
      // })
      this.setState( (prevState, prevProps) => {
          return {
            visibleItemSearchModal: true,
            prevItemBarcodeValue: prevProps.barcode_scanned,
            isTheBarcodeSame: true
          }
      }, () => {
        this.props.getSearchItem({ item_barcode: barcode_scanned });
      })
    }

    if( (cur_item !== undefined && Object.keys(cur_item).length > 0 && !_.isEqual(prevProps.cur_item, cur_item))
      ) {
      // if(!_.isEqual(prevProps.cur_item, cur_item) && isTheBarcodeSame === true)
      //   this.setState({ isTheBarcodeSame: false })
      // else if(_.isEqual(prevProps.cur_item, cur_item) && isTheBarcodeSame === false)
      //   this.setState({ isTheBarcodeSame: true })
      this.setState({ isTheBarcodeSame: false })
    }
  }


  onBarcodeValueChange = (val) => {
    const { valueForItemBarcode, prevItemBarcodeValue } = this.state
    this.setState({ valueForItemBarcode: val, valueForItemName: "", valueForItemBrand: "" })
  }


  onItemNameChange = (val) => {
    this.setState({ valueForItemName: val, valueForItemBrand: "", valueForItemBarcode: "" })
  }


  onItemBrandChange = (val) => {
    this.setState({ valueForItemBrand: val, valueForItemName: "", valueForItemBarcode: "" })
  }

  goToBarcodeScreen = () => {
    this.props.navigation.navigate("BarcodeScannerComp")
  }

  onManuallyAddNewItemBtnClickHandler = (e, action) => {
    // console.log("clicked onManuallyAddNewItemBtnClickHandler: ", this.props);
    const { cur_item } = this.props;
    this.setState({ visibleItemSearchModal: false }, () => {
      this.props.navigation.navigate("ItemDetailScreen")
    })
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }


  elementsOfManualItemAdd = () => {
    return (
      <>
        <Text style={globalStyle.manuallyAddItemTextStyle}>OR</Text>
        <Button status='info' style={globalStyle.nativeBaseButtonTextStyleWhite } icon={PlusCircleIcon}
            onPress={this.onManuallyAddNewItemBtnClickHandler}>Manually add a new item</Button>
      </>
    )
  }


  toggleItemSearchResultModal = (e) => {
    this.setState({ visibleItemSearchModal: !this.state.visibleItemSearchModal })
  }


  onSearchItemBtnClickHandler = ( ) => {
    const { cur_item, barcode_scanned } = this.props
    const { valueForItemBarcode, visibleItemSearchModal, prevItemBarcodeValue } = this.state;
    this.setState( prevState => {
        return {
          visibleItemSearchModal: true,
          prevItemBarcodeValue: valueForItemBarcode,
          isTheBarcodeSame: (valueForItemBarcode === prevState.valueForItemBarcode)
        }
    }, () => {
      this.props.getSearchItem({ item_barcode: valueForItemBarcode })
    })
    // this.setState( prevState => { return {
    //   visibleItemSearchModal: true, prevItemBarcodeValue: valueForItemBarcode
    //   }
    // }, () => {
    //   this.props.getSearchItem({ item_barcode: valueForItemBarcode })
    // })
  }


  elementOfItemFoundReactiveElement = (action) => {
    const { cur_item } = this.props;
    const { visibleItemSearchModal, isTheBarcodeSame } = this.state
    let item_found_local = !('text' in cur_item && cur_item.text === "no_item_found")

    if(!visibleItemSearchModal) return <View></View>
    else return (
      <Overlay isVisible={visibleItemSearchModal} windowBackgroundColor="rgba(0, 0, 0, .5)"
              width="80%" height={ (isTheBarcodeSame) ? "45%" : (item_found_local ? "85%" : "40%")} borderRadius={5}
              containerStyle={ globalStyle.overlayStyleForItemSearch}
              onBackdropPress={() => this.setState({ visibleItemSearchModal: false })}>
        {
          (isTheBarcodeSame) ? <View></View> :
          (item_found_local) ? // 8809379950617
            <View style={{ marginLeft: 10, marginRight: 10, }}>
              <Text category='h6' style={{ marginTop: 15, marginBottom: 15 }}>Search Result:</Text>

              <Input label='Item barcode:' size='small' disabled value={cur_item.item_barcode} style={{ marginBottom: 5,  }}/>
              <Input label='Item name:' size='small' disabled value={cur_item.item_name} style={{ marginBottom: 5 }}/>
              <Input label='Item brand:' size='small' disabled value={cur_item.item_brand} style={{ marginBottom: 5 }}/>
              <Input label='Item category:' size='small' disabled value={cur_item.item_category} style={{ marginBottom: 5 }}/>
              <Input label='Item price:' size='small' disabled value={String(cur_item.item_price)} style={{ marginBottom: 5 }}/>
              <Input label='Item weight:' size='small' disabled value={String(cur_item.item_weight)} style={{ marginBottom: 5 }}/>

              <View style={globalStyle.viewForButtonGroupRowInModal}>
                <Button status='basic' size='medium' style={globalStyle.buttonGroupColumnStyle }
                    icon={CancelIcon} onPress={() => this.setState({ visibleItemSearchModal: false, })}> Close </Button>
                <Button status='primary' size='medium' style={globalStyle.buttonGroupColumnStyle }
                    icon={SubmitIcon} onPress={(e) => this.onManuallyAddNewItemBtnClickHandler(e, "edit")}> EDIT </Button>
              </View>
            </View> :

            <View>
              <Text category='h6' style={ globalStyle.textStyleForItemSearchUiKitten }>Search Result:</Text>
              <Text category='s1' style={{ margin: 15, color: "#ca3333" }}>No item found!</Text>
              <Text  style={ globalStyle.textStyleForItemSearchUiKitten }>Do you want to add a new item?</Text>
              <View style={globalStyle.viewForButtonGroupRowInModal}>
                <Button status='basic' size='medium' style={globalStyle.buttonGroupColumnStyle }
                    icon={CancelIcon} onPress={() => this.setState({ visibleItemSearchModal: false, })}> Close </Button>
                <Button status='primary' size='medium' style={globalStyle.buttonGroupColumnStyle }
                    icon={PlusCircleIcon} onPress={(e) => this.onManuallyAddNewItemBtnClickHandler(e, "add")}> ADD </Button>
              </View>
            </View>
        }
      </Overlay>
    )
  }

  render() {
    const { barcode_scanned, cur_item, navigation } = this.props
    const { valueForItemBarcode, valueForItemName, valueForItemBrand, prevItemBarcodeValue } = this.state
    if (!this.state.fontLoaded) return <AppLoading />;

    // console.log("valueForItemBarcode in ItemListScreen: ", valueForItemBarcode, " | prevState.valueForItemBarcode: ", prevState.valueForItemBarcode);
    // console.log("cur_item in ItemListScreen: ", cur_item, " | prevProps.cur_item: ", prevProps.cur_item);

    return (
      <ScrollView style={globalStyle.MainContainer}>
        <Layout style={globalStyle.uiKittenBaseLayoutStyle}>
          <Text category='h1'></Text>

          <Button status='info' style={{width: "92%"}}
              icon={BarcodeIcon} onPress={this.goToBarcodeScreen}>Scan Barcode</Button>

          <Text category='h2'></Text>
          {
            // <Fab active={true} direction="left" containerStyle={{ top: 10, right: 15 }} style={{ backgroundColor: '#5067FF' }}
            //       position="bottomRight" onPress={() =>  this.goToBarcodeScreen()}>
            //   <NativeBaseIcon name='barcode' />
            // </Fab>
          }
          <Text style={globalStyle.manuallyAddItemTextStyle}>Or manually enter</Text>

          <Input label='Barcode:' status='info' placeholder='Enter item barcode' style={globalStyle.inputForSearchItem }
              value={valueForItemBarcode} onChangeText={this.onBarcodeValueChange }/>
          {
            (valueForItemBarcode === "" || prevItemBarcodeValue === valueForItemBarcode)
              ? <Button disabled icon={SearchIcon} style={globalStyle.nativeBaseButtonTextStyleDisabled }>Search</Button>
              : <Button status='info' style={globalStyle.nativeBaseButtonTextStyleWhite }
                  icon={SearchIcon} onPress={this.onSearchItemBtnClickHandler}>Search</Button>
          }
          <Text style={globalStyle.infoTextBelowItemSearchButton}>* The search button would be disabled if the barcode is the same as the previous one.</Text>
          {
            // <Text category='h5'></Text>
            // <View style={globalStyle.horizontalLineStyle}/>
            // <Button onPress={(e) => this.toggleItemSearchResultModal(e)}>TOGGLE MODAL</Button>
          }
          {
            this.elementOfItemFoundReactiveElement()
          }
          {
            //this.elementsOfManualItemAdd()
          }
          {
            // (Object.keys(cur_item).length > 0) ?
            // <ItemListResult item={cur_item} navigation={navigation} valueForItemBarcode={valueForItemBarcode} barcode_scanned={barcode_scanned}/>
            // : this.elementsOfManualItemAdd()
            // // <ItemDetailScreen valueForItemBarcode={valueForItemBarcode} onBarcodeValueChange={this.onBarcodeValueChange}/>
          }
        </Layout>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    cur_item: state.cur_item,
    count: state.count,
    barcode_scanned: state.barcode_scanned,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getSearchItem: (reqObj) => dispatch(getSearchItem(reqObj)),
    getBoxData: () => dispatch(getBoxData()),
    setCurrentItem: (obj) => dispatch(setCurrentItem(obj))
    // getItemData: () => dispatch(getItemData()),
    // setCurrentBoxToEdit: box => dispatch(setCurrentBoxToEdit(box)),
  }
}

export default ItemListScreen = connect(mapStateToProps, mapDispatchToProps)(ItemListScreenBarebone)
