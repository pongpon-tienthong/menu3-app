import React from 'react'
import { Scene, Router } from "react-native-router-flux";

import RestaurantScreen from "./screens/RestaurantScreen/RestaurantScreen";

const router = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="restaurantScene" component={RestaurantScreen} title="Restaurants" />
      </Scene>
    </Router>
  );
}

export default router;