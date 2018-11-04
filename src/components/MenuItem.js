import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight } from "react-native";

const menuItem = props => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <TouchableHighlight
        underlayColor='white'
        onPress={() => props.onPressMenuItem(props.menuItem)}
      >
        <ImageBackground style={styles.imageContainer} source={{ uri: props.menuItem.imgSrc }}>
          <View>
            <Text style={[styles.textName, { backgroundColor: 'transparent' }]}>
              {props.menuItem.name}
            </Text>
            <Text style={[styles.textPrice, { backgroundColor: 'transparent' }]}>
              {props.menuItem.price}
            </Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 170,
    height: 170,
    margin: 10
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 10
  },
  shadow: {
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "grey",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
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

export default menuItem;