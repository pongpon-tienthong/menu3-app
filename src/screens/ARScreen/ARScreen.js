import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';

import HelloWorldARScene from "./HelloWorldARScene";

class ARScreen extends Component {

  render() {
    return (
      <ViroARSceneNavigator
        apiKey="0C9DEEB7-FC2C-4867-B8A1-6E771E565142"
        initialScene={{ scene: HelloWorldARScene }}
      />
    );
  }
}

export default ARScreen;