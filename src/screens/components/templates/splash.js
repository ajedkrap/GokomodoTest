import React from 'react';
import {View} from 'react-native';

import StarWarsLogo from '_molecules/starWarsLogo';
import SplashForm from '_organisms/splashForm';
import color from '_theme/color';

const Splash = props => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.primary,
      }}>
      <StarWarsLogo width={50} color={'black'} />
      <SplashForm {...props} />
    </View>
  );
};

export default Splash;
