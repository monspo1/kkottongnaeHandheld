import * as React from 'react';
import { connect } from 'react-redux'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { setBarcodeScanned, getSearchItem } from '../actions/action'
import { StyleSheet, View, ScrollView, Alert, BackHandler } from 'react-native';
import { Layout, Text, Input, Button, Menu, Modal, Icon, Avatar } from '@ui-kitten/components';
import { Overlay } from 'react-native-elements'
const globalStyle = require('../styles/styles')
export const SubmitIcon = (style) => ( <Icon name='arrow-up-bold-circle' {...style} />);
export const CancelIcon = (style) => ( <Icon name='alpha-x-circle' {...style} />);


class BarcodeScannerCompBarebone extends React.Component {

  state = {
    hasCameraPermission: null,
    scanned: false,
    barcodeScannedData: "",
    showBarcodeScanOverlay: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
    // console.log("this.props in BarcodeScannerComp: ", this.props);
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    // console.log(">> status: ", status);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  onCancelToUseBarcode = () => {
    this.setState({ showBarcodeScanOverlay: false }, () => {
        this.props.setBarcodeScanned("")
    })
  }

  onSubmitToUseBarcode = () => {
    const { showBarcodeScanOverlay, barcodeScannedData } = this.state;
    this.props.setBarcodeScanned(barcodeScannedData);
    this.props.navigation.goBack()
  }

  //# Original barcode scan handler
  // handleBarCodeScanned = ({ type, data }) => {
  //   this.setState({ scanned: true });
  //   // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  //   Alert.alert(
  //     'Barcode Info',
  //     `Barcode scanned:  ${data}`,
  //     [
  //       { text: 'Cancel', onPress: () => { this.props.setBarcodeScanned("") }, style: 'cancel' },
  //       { text: 'Use this barcode ', onPress: () => {
  //           this.props.setBarcodeScanned(data);
  //           this.props.navigation.goBack()
  //         }
  //       },
  //     ],
  //     { cancelable: false },
  //   );
  // };

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true, barcodeScannedData: data, showBarcodeScanOverlay: true });
  }

  elementOfBarcodeScanResultOverlay = () => {
    const { showBarcodeScanOverlay, barcodeScannedData } = this.state;

    return (
      <Overlay isVisible={ showBarcodeScanOverlay } windowBackgroundColor="rgba(0, 0, 0, .5)"
             width="80%" height={"30%"} borderRadius={5} containerStyle={ globalStyle.overlayStyleForItemSearch}
             onBackdropPress={() => this.setState({ showBarcodeScanOverlay: false })}>
        <View style={{ marginLeft: 10, marginRight: 10, }}>
          <Text category='h6' style={{ marginTop: 15, marginBottom: 15 }}>Scanned Barcode: </Text>
          <Text category='h6' style={{ marginTop: 15, marginBottom: 15, color: "#512DA8" }}>{barcodeScannedData}</Text>
          <Text category='h6'></Text>
          <View style={{ flex: 1, flexDirection: 'row', }}>
            <Button status='danger' size='large' style={globalStyle.buttonGroupColumnStyle }
                icon={CancelIcon} onPress={ this.onCancelToUseBarcode }>Cancel</Button>
            <Button status='info' size='large' style={globalStyle.buttonGroupColumnStyle }
                icon={SubmitIcon} onPress={ this.onSubmitToUseBarcode }>Use</Button>
          </View>
        </View>
      </Overlay>
    )
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;
    if (hasCameraPermission === null) { return <Text>Requesting for camera permission</Text>; }
    if (hasCameraPermission === false) { return <Text>No access to camera</Text>; }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>

        <BarCodeScanner style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}/>

        { this.elementOfBarcodeScanResultOverlay() }

        {
          //<Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        }
        { scanned && (
          <Button status='primary' size='medium'
              onPress={ this.onSubmitToUseBarcode }>Tap to Scan Again</Button>
        )}

      </View>
    );
  }
}

const mapStateToProps = state => ({
  barcode_scanned: state.barcode_scanned,
  cur_item: state.cur_item,
})

function mapDispatchToProps (dispatch) {
  return {
    setBarcodeScanned: (code) => dispatch(setBarcodeScanned(code)),
    getSearchItem: (reqObj) => dispatch(getSearchItem(reqObj)),
  }
}

export default BarcodeScannerComp = connect(mapStateToProps, mapDispatchToProps)(BarcodeScannerCompBarebone)
