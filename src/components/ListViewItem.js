import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  TouchableHighlight,
  Animated,
  Easing,
  View,
} from 'react-native';

/**
 * Component for individual items on the listview at the bottom of the screen. This class
 * encapsulates the onClick animation behavior of the listview items.
 */
class ListViewItem extends Component {
  constructor(props) {
    super(props);
    this.scaleValue = new Animated.Value(0);

    var imgSource = this.props.stateImageArray[1];
    var imgClickSource = this.props.stateImageArray[0];

    this.buttonScale = this.scaleValue.interpolate({
      inputRange: [0, 0.5, 0.8, 1],
      outputRange: [1, 0.8, 1.1, 1]
    });

    this.state = {
      showSelection: false,
    };
  }

  _onPress = () => {
    this.scale();

    requestAnimationFrame(() => {
      this.props.onPress();
    });
  }

  scale = () => {
    this.scaleValue.setValue(0);
    
    Animated.timing(
      this.scaleValue,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.easeInOutBack,
        useNativeDriver: true,
      }
    ).start(this.props.animationDoneCallBack());
  }

  render() {
    return (
      <TouchableHighlight underlayColor="#00000000" onPress={this._onPress}>
        <View>
          <Animated.Image
            source={this.props.stateImageArray[0]}
            style={[this.props.style,
            {
              transform: [
                { scale: this.buttonScale }
              ]
            }
            ]} />
        </View>
      </TouchableHighlight>
    );
  }
}

ListViewItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  stateImageArray: PropTypes.array.isRequired,
  style: PropTypes.any,
  selected: PropTypes.bool,
  animationDoneCallBack: PropTypes.func,
};

export default ListViewItem;
