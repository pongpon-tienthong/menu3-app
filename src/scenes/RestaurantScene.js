import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import Restaurant from '../components/Restaurant';

import { getRestaurants } from "../redux/reducers/restaurantReducer";

// import { SearchBar } from 'react-native-elements'

class RestaurantScene extends Component {

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
            return <Restaurant restaurant={item} navigator={this.props.navigator} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantScene);

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 0,
    backgroundColor: '#fcfdff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  }
});