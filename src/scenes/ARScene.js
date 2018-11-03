import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, StatusBar } from "react-native";

import { ViroARSceneNavigator } from 'react-viro';

import * as UIConstants from "../redux/UIConstants";
import * as LoadingConstants from "../redux/LoadingStateConstants";

import * as ModelData from '../model/ModelItems';
import renderIf from "../helpers/renderIf";

import { addModelWithIndex, changeModelLoadState, changeItemClickState } from "../redux/reducers/arObjectReducer";
import ARInitializationUI from "../components/ARInitializationUI";
import FigmentListView from "../components/FigmentListView";
import ARInitialScene from "./ARInitialScene";

class ARScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      viroAppProps: {
        loadingObjectCallback: this._onListItemLoaded,
        clickStateCallback: this._onItemClickedInScene
      },
    };
  }

  // Load data source for listview based on listview modes
  _getListItems = () => {
    if (this.props.listMode == UIConstants.LIST_MODE_MODEL) {
      return this._constructListArrayModel([this.props.selectedMenuItem], this.props.modelItems);
    }
    // else if (this.props.listMode == UIConstants.LIST_MODE_PORTAL) {
    //   return this._constructListArrayModel(PortalData.getPortalArray(), this.props.portalItems);
    // } 
    // else if (this.props.listMode == UIConstants.LIST_MODE_EFFECT) {
    //   return this.props.effectItems;
    // }
  }

  _onListPressed = (index) => {
    if (this.props.listMode == UIConstants.LIST_MODE_MODEL) {
      this.props.dispatchAddModel(index);
    }

    // if (this.props.listMode == UIConstants.LIST_MODE_PORTAL) {
    //   this.props.dispatchAddPortal(index);
    // }

    // if (this.props.listMode == UIConstants.LIST_MODE_EFFECT) {
    //   this.props.dispatchToggleEffectSelection(index);
    // }
  }

  // Helper to construct listview items
  _constructListArrayModel = (sourceArray, items) => {
    var listArrayModel = [];
    for (var i = 0; i < sourceArray.length; i++) {
      listArrayModel.push({ icon_img: sourceArray[i].icon_img, loading: this._getLoadingforModelIndex(i, items) })
    }
    return listArrayModel;
  }

  // Helper to determine which listview item to show the Loading spinner if an AR object or portal is being added to the scene
  _getLoadingforModelIndex = (index, items) => {
    if (items == null || items == undefined) {
      return LoadingConstants.NONE;
    }
    var loadingConstant = LoadingConstants.NONE;

    Object.keys(items).forEach(function (currentKey) {
      if (items[currentKey] != null && items[currentKey] != undefined) {
        if (items[currentKey].loading != LoadingConstants.NONE && items[currentKey].index == index) {
          loadingConstant = items[currentKey].loading;
        }
      }
    });

    return loadingConstant;
  }

  // Helper function called while initializing <ViroARSceneNavigator>
  _setARNavigatorRef = (ARNavigator) => {
    this._arNavigator = ARNavigator;
  }

  // Dispath correct event to redux for handling load states of Objects and Portals
  _onListItemLoaded = (index, loadState) => {
    if (this.props.listMode == UIConstants.LIST_MODE_MODEL) {
      this.props.dispatchChangeModelLoadState(index, loadState);
    }

    // if (this.props.listMode == UIConstants.LIST_MODE_PORTAL) {
    //   this.props.dispatchChangePortalLoadState(index, loadState);
    // }
  }

  // When an AR object (Object or Portal) in the scene is clicked; 
  // dispatch this event to redux -> which results in context menu appearing on top left
  _onItemClickedInScene = (index, clickState, itemType) => {
    this.props.dispatchChangeItemClickState(index, clickState, itemType);
  }

  render() {
    return (
      <View style={localStyles.flex}>
        <StatusBar hidden={true} />
        <ViroARSceneNavigator
          style={localStyles.arView}
          apiKey="0C9DEEB7-FC2C-4867-B8A1-6E771E565142"
          initialScene={{ scene: ARInitialScene }}
          ref={this._setARNavigatorRef}
          viroAppProps={this.state.viroAppProps}
        />

        {/* AR Initialization animation shown to the user for moving device around to get AR Tracking working*/}
        <ARInitializationUI style={{ position: 'absolute', top: 20, left: 0, right: 0, width: '100%', height: 140, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }} />

        {/* ListView at the bottom of the screen */}
        <View style={localStyles.listView}>
          <FigmentListView items={this._getListItems()} onPress={this._onListPressed} />
        </View>
      </View>
    );
  }
}

var localStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  arView: {
    flex: 1,
  },
  listView: {
    flex: 1,
    height: 72,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: '#000000aa'
  },
  topPhotoBar: {
    backgroundColor: '#000000aa',
    height: 50,
    width: '100%',
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    textAlign: 'right',
    color: '#d6d6d6',
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    marginRight: 10,
    backgroundColor: '#00000000',
    flex: 1,
  },
  photosText: {
    textAlign: 'center',
    color: '#d6d6d6',
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    backgroundColor: '#00000000',
    flex: 1,
  },
  previewScreenButtons: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewScreenButtonsAddPic: {
    height: 32,
    width: 37,
  },
  previewScreenButtonClose: {
    position: 'absolute',
    height: 23,
    width: 23,
  },
  previewScreenButtonShare: {
    position: 'absolute',
    height: 35,
    width: 35,
  },
  screenIcon: {
    position: 'absolute',
    height: 58,
    width: 58,
  },
  recordIcon: {
    position: 'absolute',
    height: 58,
    width: 58,
    top: 10,
    left: 10,
  },
  cameraIcon: {
    position: 'absolute',
    height: 30,
    width: 30,
    top: 25,
    left: 25,
  },
  recordingTimeText: {
    textAlign: 'center',
    color: '#d6d6d6',
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
  },
  previewPlayButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 90,
  },
  previewPlayButton: {
    position: 'absolute',
    height: 90,
    width: 90,
    left: 0,
    alignSelf: 'center',
  },
  previewSavedSuccess: {
    position: 'absolute',
    height: 115,
    width: 100,
    alignSelf: 'center',
  },
  shareScreenContainerTransparent: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    resizeMode: 'stretch',
  },
  photosSelectorStyle: {
    position: 'absolute',
    width: '100%',
    height: '40%',
    bottom: 0
  }
});

const selectProps = store => {
  return {
    modelItems: store.arObject.modelItems,
    // portalItems: store.arobjects.portalItems,
    // effectItems: store.arobjects.effectItems,
    // currentScreen: store.ui.currentScreen,
    listMode: store.ui.listMode,
    // listTitle: store.ui.listTitle,
    currentItemSelectionIndex: store.ui.currentItemSelectionIndex,
    // currentItemClickState: store.ui.currentItemClickState,
    // currentSelectedItemType: store.ui.currentSelectedItemType,
    selectedMenuItem: store.menu.selectedMenuItem 
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatchAddPortal: (index) => dispatch(addPortalWithIndex(index)),
    // dispatchRemovePortalWithUUID: (uuid) => dispatch(removePortalWithUUID(uuid)),
    dispatchAddModel: (index) => dispatch(addModelWithIndex(index)),
    // dispatchRemoveModelWithUUID: (uuid) => dispatch(removeModelWithUUID(uuid)),
    // dispatchRemoveAll:() => dispatch(removeAll()),
    // dispatchToggleEffectSelection: (index) => dispatch(toggleEffectSelection(index)),
    dispatchChangeModelLoadState: (index, loadState) => dispatch(changeModelLoadState(index, loadState)),
    // dispatchChangePortalLoadState:(index, loadState) =>dispatch(changePortalLoadState(index, loadState)),
    // dispatchDisplayUIScreen: (uiScreenState) => dispatch(displayUIScreen(uiScreenState)),
    // dispatchSwitchListMode: (listMode, listTitle) =>dispatch(switchListMode(listMode, listTitle)),
    // dispatchChangePortalPhoto:(index, source)=>dispatch(changePortalPhoto(index, source)),
    dispatchChangeItemClickState: (index, clickState, itemType) => dispatch(changeItemClickState(index, clickState, itemType)),
  }
}

export default connect(selectProps, mapDispatchToProps)(ARScene);