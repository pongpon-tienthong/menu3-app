import React, { Component } from "react";
import { connect } from "react-redux";
import { View, FlatList, StyleSheet } from 'react-native';

import MenuItemCard from "../../components/MenuItemCard/MenuItemCard";

import { Actions } from "react-native-router-flux";

import { getMenuItems, selectedMenuItem } from "../../reducers/menuReducer";

class MenuScreen extends Component {

  componentDidMount() {
    this.props.getMenuItems(this.props.selectedRestaurant.id);
  }

  onPressMenuItem = (menuItem) => {
    this.props.selectedMenuItem(menuItem);
    Actions.arScreen({ title: menuItem.name });
  }

  render() {
    return (
      <View style={styles.itemContainer}>
        <FlatList
          data={this.props.menuItems}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => {
            return <MenuItemCard menuItem={item} onPressMenuItem={this.onPressMenuItem} />
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedRestaurant: state.restaurant.selectedRestaurant,
    menuItems: state.menu.menuItems
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getMenuItems: (restaurantId) => dispatch(getMenuItems(restaurantId)),
    selectedMenuItem: menuItem => dispatch(selectedMenuItem(menuItem))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 0,
    backgroundColor: '#F8F8F8',
  },
});