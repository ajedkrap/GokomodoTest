import React, {useEffect} from 'react';
import {AppState as SystemState, StatusBar} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import BG from '_images/bg.png';
import SplashScreen2 from '_screens/splashScreen';
import LandingStack from '_routes/landingStack';
import color from '_theme/color';

const {Navigator, Screen} = createStackNavigator();

const MainStack = () => {
  // const dispatch = useDispatch();
  // const appState = useSelector(state => state.app);
  // const {isLoggedIn, isIdle} = appState;

  // const systemState = useRef(SystemState.currentState);

  // //APP STATE STUFF
  // useEffect(() => {
  //   const subscription = SystemState.addEventListener(
  //     'change',
  //     nextAppState => {
  //       if (
  //         systemState.current.match(/inactive|background/) &&
  //         nextAppState === 'active'
  //       )
  //         dispatch(userActive());
  //       else dispatch(userIdle());
  //       systemState.current = nextAppState;
  //     },
  //   );

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);
  // useEffect(() => {
  //   if (!isIdle) {
  //     if (isLoggedIn) {
  //       dispatch(idleCount());
  //     }
  //   }
  // }, [isIdle]);

  //SplashScreen
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        hidden={false}
        barStyle={'dark-content'}
        backgroundColor={color.primary}
        translucent={false}
      />
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name={'splash'} component={SplashScreen2} />
        <Screen name={'landing-stack'} component={LandingStack} />
      </Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
