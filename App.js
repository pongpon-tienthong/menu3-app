import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';

import configureStore from './src/store/configureStore';
import RestaurantScreen from "./src/screens/RestaurantScreen/RestaurantScreen";
import MenuScreen from "./src/screens/MenuScreen/MenuScreen";
import ARScreen from "./src/screens/ARScreen/ARScreen";

const store = configureStore()
const RouterWithRedux = connect()(Router);

export default class Menu3App extends Component {
  state = {
    isReady: false
  }

  async componentWillMount() {
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
            <Scene key="restaurantScreen" component={RestaurantScreen} title="Restaurants" initial />
            <Scene key="menuScreen" component={MenuScreen} title="Menus" />
            <Scene key="arScreen" component={ARScreen} title="AR" />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}
