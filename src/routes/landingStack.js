import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import DefaultHeader from '_molecules/defaultHeader';
import LandingScreen from '_screens/landingScreen';
import FilmScreen from '_screens/filmScreen';
import PeopleScreen from '_screens/peopleScreen';
import PlanetScreen from '_screens/planetScreen';
import SpeciesScreen from '_screens/speciesScreen';
import StarshipsScreen from '_screens/starshipsScreen';
import VehicleScreen from '_screens/vehicleScreen';

// const screens = [
//   {name: 'film', component: FilmScreen},
//   {name: 'people', component: PeopleScreen},
//   {name: 'planet', component: PlanetScreen},
//   {name: 'species', component: SpeciesScreen},
//   {name: 'starships', component: StarshipsScreen},
//   {name: 'vehicle', component: VehicleScreen},
// ];

const {Navigator, Screen} = createStackNavigator();

const MainStack = () => {
  return (
    <Navigator screenOptions={{header: props => <DefaultHeader {...props} />}}>
      <Screen
        name={'landing'}
        initialParams={{title: ''}}
        component={LandingScreen}
      />
      <Screen
        name={'films'}
        initialParams={{title: ''}}
        component={FilmScreen}
      />
      <Screen
        name={'people'}
        initialParams={{title: ''}}
        component={PeopleScreen}
      />
      <Screen
        name={'planets'}
        initialParams={{title: ''}}
        component={PlanetScreen}
      />
      <Screen
        name={'species'}
        initialParams={{title: ''}}
        component={SpeciesScreen}
      />
      <Screen
        name={'starships'}
        initialParams={{title: ''}}
        component={StarshipsScreen}
      />
      <Screen
        name={'vehicles'}
        initialParams={{title: ''}}
        component={VehicleScreen}
      />
      {/* {screens.map((val, idx) => (
        <Screen
          name={val['name']}
          key={idx + val['name']}
          initialParams={{title: ''}}
          component={val['component']}
        />
      ))} */}
    </Navigator>
  );
};

export default MainStack;
