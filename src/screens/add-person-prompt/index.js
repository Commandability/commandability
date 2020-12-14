/**
 * AddPersonPrompt Component
 *
 * Provides functionality for adding temporary personnel to the incident.
 */

import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { addPerson } from '../../redux/actions';
import { selectTheme } from '../../redux/selectors';
import { NEW_PERSONNEL } from '../../modules/location-ids';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const AddPersonPrompt = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => selectTheme(state));

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [badge, setBadge] = useState('');
  const [organization, setOrganization] = useState('');

  const onAddPersonPressed = () => {
    const { navigate } = navigation;

    dispatch(
      addPerson({ firstName, lastName, badge, organization }, NEW_PERSONNEL)
    );
    navigate('PersonnelPrompt');
  };

  const onCancelPressed = () => {
    const { goBack } = navigation;
    goBack();
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      {Platform.OS === 'android' && (
        <View style={styles.backBar}>
          <TouchableOpacity onPress={onCancelPressed}>
            <Icon name="chevron-left" style={styles.backButton} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.promptContainer}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <Text style={styles.label}>First Name*</Text>
          <TextInput
            style={styles.input}
            maxLength={36}
            value={firstName}
            onChangeText={firstName => setFirstName(firstName)}
          />
          <Text style={styles.label}>Last Name*</Text>
          <TextInput
            style={styles.input}
            maxLength={36}
            value={lastName}
            onChangeText={lastName => setLastName(lastName)}
          />
          <Text style={styles.label}>Badge Number</Text>
          <TextInput
            style={styles.input}
            keyboardType={'numeric'}
            maxLength={10}
            value={badge}
            onChangeText={badge => setBadge(badge)}
          />
          <Text style={styles.label}>Organization</Text>
          <TextInput
            style={styles.input}
            maxLength={36}
            value={organization}
            onChangeText={organization => setOrganization(organization)}
          />
          <TouchableOpacity
            style={styles.opacity}
            onPress={onAddPersonPressed}
            disabled={firstName === '' || lastName === ''}
          >
            <Icon name="account-plus" style={styles.icon} />
            <Text style={styles.opacityText}> Add Person </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

// props validation
AddPersonPrompt.propTypes = {
  navigation: PropTypes.object,
};

export default AddPersonPrompt;
