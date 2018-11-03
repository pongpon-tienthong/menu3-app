import React, { Component } from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native';
import { Actions } from "react-native-router-flux";

import { selectRestaurant } from "../redux/reducers/restaurantReducer";

class Restaurant extends Component {

  onPressRestaurant = () => {
    this.props.selectRestaurant(this.props.restaurant);
    Actions.menuScene({ title: this.props.restaurant.name })
  }

  render() {
    return (
      <View style={styles.shadow}>
        <View style={styles.PicContainer}>
          <TouchableHighlight
            underlayColor='white'
            onPress={() => this.onPressRestaurant()}
          >
            <ImageBackground style={styles.pic} source={{ uri: this.props.restaurant.imgSrc }}>
              <View>
                <Text style={[styles.textName, { backgroundColor: 'transparent' }]}>
                  {this.props.restaurant.name}
                </Text>
              </View>
            </ImageBackground>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {
  selectRestaurant
};

export default connect(null, mapDispatchToProps)(Restaurant);

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,

  },
  PicContainer: {
    marginLeft: 15,
    marginBottom: 15,
    marginRight: 15,
    //borderWidth: .5,
    //borderColor: '#D9DBDB',
    borderRadius: 10,
    overflow: 'hidden',
  },
  pic: {
    width: 370, //will eventually need to progromatically match these to size of screen
    height: 100,
    shadowOffset: { width: 10, height: 10, },
    shadowColor: 'black',
    shadowOpacity: 1.0
  },
  textName: {
    fontFamily: 'System',
    fontWeight: '800',
    color: 'white',
    textShadowColor: 'rgba(21,21,21,.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontSize: 15,
    paddingTop: 75,
    paddingLeft: 10,
    paddingRight: 4
  }
});


