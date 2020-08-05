/**
 * InfoBar Component
 *
 * 
 * This component handles the Infobar under the staging area, 
 * includes the timer, brightness and end incident
 */

import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import Timer from '../timer';

class InfoBar extends Component {
  _onEndPressed = () => {
    this.props.navigation.navigate('EndScreen');
  };

  _onToggleThemePressed = () => {
    //this.props.toggleTheme();
  };

  render() {
    const { initialEpoch} = this.props;
    return (
      <View style={styles.container}>
        <Timer initialEpoch={initialEpoch}/>
        <TouchableOpacity
          style={styles.option}
          onPress={this._onToggleThemePressed}
        >
          <Text style={styles.optionContent}>{' '}LIGHT{' '}</Text>
          <Icon name="theme-light-dark" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={this._onEndPressed}
        >
          <Text style={styles.optionContent}>{' '}END{' '}</Text>
          <Icon name= "arrow-right-bold-hexagon-outline" style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

// props validation
InfoBar.propTypes = {
  endHandler: PropTypes.func,
  navigation: PropTypes.object,
  initialEpoch: PropTypes.number
};

export default withNavigation(InfoBar);
