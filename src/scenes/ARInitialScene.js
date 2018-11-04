import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import { ARTrackingInitialized } from "../redux/reducers/uiReducer";
import { hideMenuItem } from "../redux/reducers/arObjectReducer";

import {
  ViroARScene,
  ViroConstants,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroSpotLight
} from 'react-viro';

import ModelItemRender from "../components/ModelItemRender";

class ARInitialScene extends Component {
  constructor() {
    super();
  }

  componentWillUnmount() {
    this.props.dispatchHideMenuItem();
  }

  render() {
    const model = this.props.showMenuItem ? this._renderModels() : null;

    return (
      <ViroARScene
        ref="arscene"
        physicsWorld={{ gravity: [0, -9.81, 0] }}
        // postProcessEffects={[this.props.postProcessEffects]}
        onTrackingUpdated={this._onTrackingUpdated}>
        <ViroAmbientLight color="#ffffff" intensity={20} />

        {/* DirectionalLight with the direction away from the user, pointed upwards, to light up the "face" of the model */}
        <ViroDirectionalLight color="#ffffff" direction={[0, -1, -.2]} />

        {/* Spotlight on top of the model to highlight this model*/}
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, 1, 0]}
          // position={[0, -7, 0]}
          position={[0, 3, 1]}
          color="#ffffff"
          // intensity={250}
          castsShadow={true}
        />
        {model}
      </ViroARScene>
    );
  }

  // Back up
  // <ViroARScene onTrackingUpdated={this._onTrackingUpdated} >
  //   <ViroAmbientLight color={"#aaaaaa"} />
  //   <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]}
  //     position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
  //   <ViroARPlaneSelector>
  //     <Viro3DObject
  //       source={{ uri: "https://s3.us-east-1.amazonaws.com/staging-menu3-s3/1540429085819-nachos.vrx" }}
  //       resources={[
  //         { uri: "https://s3.amazonaws.com/staging-menu3-s3/DiffuseMap_0.jpg" },
  //         { uri: "https://s3.amazonaws.com/staging-menu3-s3/NormalMap_0.jpg" }
  //       ]}
  //       position={[0, 0, -1]}
  //       scale={[.1, .1, .1]}
  //       type="VRX" />
  //   </ViroARPlaneSelector>
  // </ViroARScene>

  // Render models added to the scene. 
  // modelItems - list of models added by user; comes from redux, see js/redux/reducers/arobjects.js
  // startingBitMask - used for adding shadows for each of the, for each new object added to the scene,
  //           pass a bitMask as {Math.pow(2,objBitMask)}. This is done since each object has it's own 
  //           spotlight and a corresponding shadow plane. So each new set of these components are assigned a 
  //           consistent bitMask that's used in SpotLight's "influenceBitMask",
  //           Viro3DObject's "shadowCastingBitMask" and "lightReceivingBitMask" and Shadow plane (ViroQuad)'s "lightReceivingBitMask"

  // _renderModels = (modelItems, startingBitMask) => {
  //   var renderedObjects = [];
  //   if (modelItems) {
  //     var root = this;
  //     let objBitMask = startingBitMask;
  //     Object.keys(modelItems).forEach(function (currentKey) {
  //       if (modelItems[currentKey] != null && modelItems[currentKey] != undefined) {
  //         renderedObjects.push(
  //           <ModelItemRender
  //             menuItems={[root.props.selectedMenuItem]}
  //             key={modelItems[currentKey].uuid}
  //             modelIDProps={modelItems[currentKey]}
  //             hitTestMethod={root._performARHitTest}
  //             onLoadCallback={root._onLoadCallback}
  //             onClickStateCallback={root._onModelsClickStateCallback}
  //             bitMask={Math.pow(2, objBitMask)} />
  //         );
  //       }
  //       objBitMask++;
  //     });

  //   }
  //   return renderedObjects;
  // }

  _renderModels = () => (
    <ModelItemRender
      menuItem={this.props.selectedMenuItem}
      key={this.props.selectedMenuItem.id}
      hitTestMethod={this._performARHitTest}
      onLoadCallback={this._onLoadCallback}
      onClickStateCallback={this._onModelsClickStateCallback}
      bitMask={Math.pow(2, 0)} // startingBitMask = 0;
    />
  )

  // Callback fired when the app receives AR Tracking state changes from ViroARScene.
  // If the tracking state is not NORMAL -> show the user AR Initialization animation 
  // to guide them to move the device around to get better AR tracking.
  _onTrackingUpdated = (state, reason) => {
    var trackingNormal = false;
    if (state == ViroConstants.TRACKING_NORMAL) {
      trackingNormal = true;
    }
    this.props.dispatchARTrackingInitialized(trackingNormal);
  }

  // Performed to find the correct position where to place a new object being added to the scene
  // Get's camera's current orientation, and performs an AR Hit Test with Ray along the camera's orientation
  // the object is then placed at the intersection of the Ray and identified AR point returned by the system
  // along that ray.
  _performARHitTest = (callback) => {
    this.refs["arscene"].getCameraOrientationAsync().then((orientation) => {
      this.refs["arscene"].performARHitTestWithRay(orientation.forward).then((results) => {
        callback(orientation.position, orientation.forward, results);
      })
    });
  }

  _onLoadCallback = (uuid, loadState) => {
    this.props.arSceneNavigator.viroAppProps.loadingObjectCallback(uuid, loadState);
  }

  _onModelsClickStateCallback = (uuid, clickState, itemType) => {
    this.props.arSceneNavigator.viroAppProps.clickStateCallback(uuid, clickState, itemType);
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

// ViroAnimations.registerAnimations({
//   rotate: {
//     properties: {
//       rotateY: "+=90"
//     },
//     duration: 250, //.25 seconds
//   },
// });

// -- REDUX STORE
const mapStateToProps = store => {
  return {
    modelItems: store.arObject.modelItems,
    selectedMenuItem: store.menu.selectedMenuItem,
    // postProcessEffects: store.arObject.postProcessEffects,

    showMenuItem: store.arObject.showMenuItem
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchARTrackingInitialized: (trackingNormal) => dispatch(ARTrackingInitialized(trackingNormal)),
    dispatchHideMenuItem: () => dispatch(hideMenuItem())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ARInitialScene);