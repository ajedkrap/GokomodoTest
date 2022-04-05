import {StyleSheet} from 'react-native';
import color from '_theme/color';

const ANDROID_HEADER_HEIGHT = 90;

export default StyleSheet.create({
  container: {
    height: ANDROID_HEADER_HEIGHT,
    width: '100%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  title: {
    paddingLeft: 14,
    paddingBottom: 14,
    fontSize: 28,
    fontWeight: 'bold',
    color: color.primary,
    textTransform: 'capitalize',
  },
});
