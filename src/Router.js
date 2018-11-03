import React from 'react'
import { Scene, Router } from "react-native-router-flux";

import RestaurantScene from "./scenes/RestaurantScene";

const router = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="restaurantScene" component={RestaurantScene} title="Restaurants" />
      </Scene>
    </Router>
  );
}

export default router;