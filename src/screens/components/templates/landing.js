import React, {useEffect, useCallback} from 'react';
import {BackHandler} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

import StarContainer from '_organisms/starContainer';
import LandingList from '_organisms/landingList';

const Landing = props => {
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        BackHandler.exitApp();
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => {
        backHandler.remove('hardwareBackPress', backAction);
      };
    }, []),
  );

  return (
    <StarContainer>
      <LandingList section={'films'} {...props} />
      <LandingList section={'people'} {...props} />
      <LandingList section={'planets'} {...props} />
      <LandingList section={'species'} {...props} />
      <LandingList section={'starships'} {...props} />
      <LandingList section={'vehicles'} {...props} />
    </StarContainer>
  );
};

export default Landing;
