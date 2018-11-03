import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';

import configureStore from './src/redux/configureStore';
import RestaurantScene from "./src/scenes/RestaurantScene";
import MenuScene from "./src/scenes/MenuScene";
import ARScene from "./src/scenes/ARScene";

const store = configureStore()
const RouterWithRedux = connect()(Router);

export default class Menu3App extends Component {
  state = {
    isReady: false
  }

  componentDidMount() {
    this.setState({ isReady: true });
  }

  render() {
    // if (!this.state.isReady) {
    //   return <Do sth later />;
    // }

    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="restaurantScene" component={RestaurantScene} title="Restaurants" initial />
            <Scene key="menuScene" component={MenuScene} title="Menus" />
            <Scene key="arScene" component={ARScene} title="AR" />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}
