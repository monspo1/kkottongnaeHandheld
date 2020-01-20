'use strict';
import {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  //## Landing Screen
  LandingPageMainContainer: {
    flex: 1,
    paddingTop: 20,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aceda2',
  },
  LandingScreenTitle: {
    fontSize: 23,
    color: '#fff',
    marginBottom: 5,
  },
  LandingScreenSubtitle: {
    fontSize: 10,
    color: '#fff',
    marginBottom: 35,
  },
  LandingPageParentViewComp: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: '10%',
    marginRight: '5%',
  },
  LandingPageChildViewComp: {
    width: '30%',
    margin: '1%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LandingPageViewCompForCredit: {
    width: '100%',
    height: 100,
    marginTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LandingPageTextForLinkIcon: {
    color: '#192f6a',
  },
  LandingPageTextCompForCredit: {
    color: '#fff',
  },
  LandingPageTextCompForCopyright: {
    color: '#fff',
    fontSize: 12,
  },


  //## Drawer styles
  DrawerHeaderStyle: {
    backgroundColor: '#00aced9e',
  },

  //## Screen 1
  Screen1MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },

  //## Screen 2
  Screen2MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },

  //## Screen 3
  Screen3MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },

  // For Native Base Components
  nativeBaseLabelStyle: {
    fontWeight: "700",
    color: "#00aced94"
  },

  nativeBaseLabelForPickerStyle: {
    fontWeight: "700",
    fontSize: 15
  },

  nativeBaseButtonTextStyleWhite: {
    color: "#FFF",
    backgroundColor: "#00acedee",
    borderColor: "#00acedee",
    width: "92%",
  },

  nativeBaseButtonTextStyleDisabled: {
    color: "#FFF",
    width: "92%",
  },

  nativeBaseRoundedButtonStyle: {
    width: "100%",
    right: 0
  },

  manuallyAddItemTextStyle: {
    marginBottom: 5
  },

  //# For UI kitten components
  uiKittenBaseLayoutStyle: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },

  textStyleForItemSearchUiKitten: {
    margin: 15
  },

  inputStyleForItemSearchUiKitten: {
    marginLeft: 20,
    marginRight: 20,
  },

  infoTextBelowItemSearchButton: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    fontSize: 11,
    color: "gray"
  },

  horizontalLineStyle: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },

  menuForSearchTargetStyle: {
    width: '65%',
    marginLeft: 15,
    marginRight: 15,
  },

  inputForSearchItem: {
    margin: 15
  },

  itemDetailScreenView: {
    margin: 15,
    fontWeight: "700",
    fontSize: 25,
    color: "#00acedee",
  },

  editItemDetailBtnStyle: {
    position: 'absolute',
    top: 30,
    right: 15,
  },

  styleForItemDetailInputs: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 15,
    marginRight: 15,
  },

  itemListCoreMainViewStyle: {
    marginTop: 0,
    flex: 1,
    justifyContent: "center",
    width: "100%",
    marginLeft: 15,
    marginRight: 15
  },

  viewForButtonGroupRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15
  },

  viewForButtonGroupRowInModal: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
  },

  buttonGroupColumnStyle: {
    flex: 2,
    flexDirection: 'column',
    marginBottom: 20,
  },

  cardItemViewRow: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },

  cardItemName: {
    fontSize: 23,
    fontWeight: "700",
    color: '#000',
    textAlign: 'left',
    marginBottom: 5,
    marginLeft: 10,
  },

  cardItemSubtitleStyle: {
    fontSize: 10,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5
  },

  cardItemSubTitleLabelStyle: {
    fontSize: 11,
    flex: 1,
    flexDirection: 'column',
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5
  },

  cardItemSubtitleValueStyle: {
    fontSize: 11,
    flex: 2,
    flexDirection: 'column',
    fontWeight: "700",
    backgroundColor: '#e4eeff',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5
  },

  cardItemButtonStyle:{
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#00aced"
  },

  cardItemButtonIconStyle: {
    fontSize: 15,
    width: 25,
    color: `#FFF`,
    marginLeft: 10
  },

  cardNoItemFoundStyle: {
    flex:1,
    flexDirection: 'row',
    color: `#ca3333`,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionHeaderViewStyle: {
    marginLeft: 0,
    flex:1,
    paddingRight: 0
  },

  sectionListHeaderTextStyle: {
    backgroundColor: '#CDDC89',
    // backgroundColor: '#88ddfd',
    fontSize: 20,
    padding: 3,
    fontWeight: "900",
    color: '#fff',
  },

  sectionListItemTouchableOpacityRowStyle: {
    width: '95%',
    flex: 1,
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionListItemColumnForIcon: {
    flex: 1,
    flexDirection: 'column',
  },

  sectionListItemColumnForText: {
    flex: 5,
    flexDirection: 'column',
    width: '85%',
    marginLeft: 30,
    marginRight: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  sectionListItemColumnForArrowIcon: {
    flex: 1,
    flexDirection: 'column',
  },

  sectionListItemName: {
    fontSize: 23,
    fontWeight: "700",
    color: '#000',
    textAlign: 'left',
    marginBottom: 5,
  },

  sectionListItemSubtitleRow: {
    flexDirection: 'row',
    // alignItems: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  sectionListItemSubtitleStyle: {
    fontSize: 10,
    color: '#99a',
    backgroundColor: '#e4eeff',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5

  },

});
