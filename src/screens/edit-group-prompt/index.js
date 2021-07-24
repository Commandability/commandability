/**
 * EditGroupPrompt Component
 */

import React, {useState} from 'react';
import {Platform, Alert, StatusBar, Text, TextInput, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ErrorBoundary} from 'react-error-boundary';
import {Picker} from '@react-native-picker/picker';
import PropTypes from 'prop-types';

import {BackButton, LargeButton} from '../../components';
import ErrorFallbackScreen from '../error-fallback-screen';
import {selectTheme} from '../../redux/selectors';
import {editGroup} from '../../redux/actions';
import {DARK} from '../../utils/themes';
import themeSelector from '../../utils/themes';
import createGlobalStyleSheet from '../../utils/global-styles';
import createStyleSheet from './styles';

const alerts = [5, 10, 15, 20, 25, 30];

const EditGroupPrompt = ({navigation, route}) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => selectTheme(state));

  const {
    params: {
      group: {name: currName, alert: currAlert},
    },
  } = route;

  const [newName, setNewName] = useState(currName);
  const [newAlert, setNewAlert] = useState(currAlert);

  const onSavePressed = () => {
    if (!newName) {
      Alert.alert('Please enter a group name', '', [
        {
          text: 'OK',
        },
      ]);

      return;
    }

    const {
      params: {group},
    } = route;

    if (currName !== newName || currAlert !== newAlert) {
      dispatch(
        editGroup(group, {
          ...(newName !== currName && {name: newName}),
          ...(newAlert !== currAlert && {alert: newAlert}),
        }),
      );
    }

    const {goBack} = navigation;
    goBack();
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);
  const globalStyles = createGlobalStyleSheet(colors);

  const onReset = () => {
    setNewName('');
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackScreen}
      onReset={onReset}
      resetKeys={[newName]}>
      <StatusBar
        barStyle={theme === DARK ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <BackButton />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.container}
        scrollEnabled={false}>
        <View style={globalStyles.flex} />
        <View style={globalStyles.flex}>
          <View style={globalStyles.content}>
            <Text style={globalStyles.label}>Group name *</Text>
            <TextInput
              style={globalStyles.input}
              onChangeText={(_newName) => setNewName(_newName)}
              value={newName}
              maxLength={22}
              selectionColor={colors.primary}
              disableFullscreenUI={true}
            />
            <Text style={globalStyles.label}>Group alerts</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={newAlert}
                onValueChange={(_newAlert) => setNewAlert(_newAlert)}
                style={styles.picker}>
                <Picker.Item
                  key={0}
                  label="Disabled"
                  value={0}
                  color={
                    Platform.OS === 'ios'
                      ? colors.text.main
                      : colors.text.alternate
                  }
                />
                {alerts.map((time) => (
                  <Picker.Item
                    key={time}
                    label={`${time} minutes`}
                    value={time}
                    color={
                      Platform.OS === 'ios'
                        ? colors.text.main
                        : colors.text.alternate
                    }
                  />
                ))}
              </Picker>
            </View>
            <LargeButton text="Save" onPress={onSavePressed} icon="check" />
          </View>
        </View>
        <View style={globalStyles.flex} />
      </KeyboardAwareScrollView>
    </ErrorBoundary>
  );
};

EditGroupPrompt.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default EditGroupPrompt;
