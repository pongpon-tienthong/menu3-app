import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';

import { getRestaurants } from "../../reducers/restaurantReducer";

// import { SearchBar } from 'react-native-elements'

class RestaurantScreen extends Component {

  componentDidMount() {
    this.props.getRestaurants();
  }

  render() {
    return (
      <View style={styles.itemContainer}>
        <FlatList
          data={this.props.restaurants}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return <RestaurantCard restaurant={item} navigator={this.props.navigator} />
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    restaurants: state.restaurant.restaurants
  };
};

const mapDispatchToProps = {
  getRestaurants
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantScreen);

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 0,
    backgroundColor: '#fcfdff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  }
});