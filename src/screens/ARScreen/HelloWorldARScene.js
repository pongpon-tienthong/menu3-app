import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { ARTrackingInitialized } from "../../reducers/uiReducer";

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
} from 'react-viro';

import { connect } from 'react-redux';

class HelloWorldSceneAR extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onTrackingUpdated} >
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        <ViroARPlaneSelector>
          <Viro3DObject
            source={{ uri: "https://s3.us-east-1.amazonaws.com/staging-menu3-s3/1540429085819-nachos.vrx" }}
            resources={[
              { uri: "https://s3.amazonaws.com/staging-menu3-s3/DiffuseMap_0.jpg" },
              { uri: "https://s3.amazonaws.com/staging-menu3-s3/NormalMap_0.jpg" }
            ]}
            position={[0, 0, -1]}
            scale={[.1, .1, .1]}
            type="VRX" />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }

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

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchARTrackingInitialized: (trackingNormal) => dispatch(ARTrackingInitialized(trackingNormal)),
  }
}

export default connect(null, mapDispatchToProps)(HelloWorldSceneAR);