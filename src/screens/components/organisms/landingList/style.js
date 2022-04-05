import {StyleSheet} from 'react-native';
import color from '_theme/color';
import {hS} from '_theme/metrics';

export default StyleSheet.create({
  container: {},
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  height: {
    minHeight: hS * (10 / 100),
  },
});
