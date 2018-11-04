import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight } from "react-native";
// import { Actions } from "../../../node_modules/react-native-router-flux";

class MenuItem extends Component {

  render() {
    return (
      <View style={styles.shadow}>
        <View style={styles.PicContainer}>
          <TouchableHighlight
            underlayColor='white'
            onPress={() => this.props.onPressMenuItem(this.props.menuItem)}
          >
            <ImageBackground style={styles.pic} source={{ uri: this.props.menuItem.imgSrc }}>
              <View>
                <Text style={[styles.textName, { backgroundColor: 'transparent' }]}>
                  {this.props.menuItem.name}
                </Text>
                <Text style={[styles.textPrice, { backgroundColor: 'transparent' }]}>
                  {this.props.menuItem.price}
                </Text>
              </View>
            </ImageBackground>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default MenuItem;

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  PicContainer: {
    marginLeft: 18,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    // borderWidth: .5,
    //borderColor: '#D9DBDB',
  },
  pic: {
    width: 160, //will eventually need to progromatically match these to size of screen
    height: 160,

  },
  textName: {
    fontFamily: 'System',
    fontWeight: '800',
    color: 'white',
    textShadowColor: 'rgba(21,21,21,.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontSize: 16,
    paddingTop: 100,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 4,
  },
  textPrice: {
    fontFamily: 'System',
    fontWeight: '600',
    color: 'white',
    textShadowColor: 'rgba(21,21,21,.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontSize: 14,
    paddingBottom: 0,
    paddingLeft: 4,
  }
});