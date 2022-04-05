import React from 'react';
import {View, ImageBackground, StatusBar} from 'react-native';

import BG from '_images/bg.png';

import Scroll from '_atoms/scroll';
import color from '_theme/color';
import {hS} from '_theme/metrics';

const statusBarHeight = StatusBar.currentHeight || 20;
const ANDROID_HEADER_HEIGHT = 90;

const headerHeight = statusBarHeight + ANDROID_HEADER_HEIGHT;

const StarContainer = ({children, film = false, padding = 16}) => {
  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        marginTop: !film ? -10 : -headerHeight,
        minHeight: !film ? hS + 10 : hS + headerHeight,
        backgroundColor: color.neutral,
      }}>
      <StatusBar
        barStyle={'light-content'}
        translucent={film}
        backgroundColor={film ? 'rgba(255,255,255,0)' : color.neutral}
      />
      <ImageBackground
        style={{flex: 1, justifyContent: 'center'}}
        resizeMode={'cover'}
        source={BG}>
        <Scroll
          nested
          style={{
            flexGrow: 1,
            paddingTop: 14,
            paddingHorizontal: padding,
            paddingBottom: hS * (50 / 100),
          }}
          bgColor={'transparent'}>
          {children}
        </Scroll>
      </ImageBackground>
    </View>
  );
};

export default StarContainer;
