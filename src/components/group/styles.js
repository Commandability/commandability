import { StyleSheet } from 'react-native';

export default colors =>
  StyleSheet.create({
    overlay: {
      backgroundColor: colors.overlay,
      position: 'absolute',
      zIndex: 1,
      width: '100%',
      height: '100%',
      opacity: 0.2,
      borderRadius: 5,
    },
    container: {
      height: '50%',
      width: `${100 / 3}%`,
      paddingBottom: 16,
      paddingRight: 8,
      paddingLeft: 8,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 4,
      width: '100%',
      backgroundColor: colors.background.two,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    headerContent: {
      fontSize: 14,
      color: colors.primary,
    },
  });
