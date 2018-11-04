import React, { Component } from "react";
import { connect } from "react-redux";
import { View, FlatList, StyleSheet } from 'react-native';
import { Actions } from "react-native-router-flux";

import MenuItem from "../components/MenuItem";
import { getMenuItems, selectedMenuItem } from "../redux/reducers/menuReducer";

class MenuScene extends Component {

  componentDidMount() {
    this.props.getMenuItems(this.props.selectedRestaurant.id);
  }

  onPressMenuItem = (menuItem) => {
    this.props.selectedMenuItem(menuItem);

    if (menuItem.arSrc) {
      Actions.ArScene({ title: menuItem.name });
    }
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.menuItems}
          contentContainerStyle={styles.container}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => {
            return <MenuItem menuItem={item} onPressMenuItem={this.onPressMenuItem} />
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    selectedRestaurant: state.restaurant.selectedRestaurant,
    menuItems: state.menu.menuItems
  }
};

const mapDispatchToProps = {
  getMenuItems,
  selectedMenuItem
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScene);