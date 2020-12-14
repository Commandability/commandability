/**
 * GroupList Component
 *
 * Manages displaying personnel in a group by groupName, as well as  adding selected personnel to
 * the group when it is selected.
 */

import React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { selectTheme } from '../../redux/selectors';
import ListItem from '../list-item';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const GroupList = ({ locationId, personnel }) => {
  const theme = useSelector(state => selectTheme(state));

  const renderItem = ({ item: { id } }) => <ListItem locationId={locationId} id={id} />;

  const keyExtractor = item => item.id;

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      <FlatList
        data={personnel}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

// props validation
GroupList.propTypes = {
  locationId: PropTypes.string,
  personnel: PropTypes.array
};

export default React.memo(GroupList);
