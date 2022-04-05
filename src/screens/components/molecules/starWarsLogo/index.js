import React from 'react';
import {View, Image} from 'react-native';

import SWLogoBlack from '_images/sw-black.png';
import SWLogoYellow from '_images/sw-yellow.png';
import SWLogoWhite from '_images/sw-white.png';
import {wS} from '_theme/metrics';

const getLogo = color => {
  switch (color) {
    case 'yellow':
      return SWLogoYellow;
    case 'white':
      return SWLogoWhite;
    default:
      return SWLogoBlack;
  }
};

const SplashLogo = ({width = 24, color = 'black'}) => {
  return (
    <View style={{width: wS * (width / 100), aspectRatio: 248 / 110}}>
      <Image
        style={{height: null, width: null, flex: 1}}
        resizeMode="cover"
        source={getLogo(color)}
      />
    </View>
  );
};

export default SplashLogo;
