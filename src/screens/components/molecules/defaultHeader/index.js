import React from 'react';
import {Text, View} from 'react-native';

import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GradView from 'react-native-linear-gradient';

import StarWarsLogo from '_molecules/starWarsLogo';
import color from '_theme/color';
import style from './style';

const DefaultHeader = ({route, navigation: nav}) => {
  const app = useSelector(state => state.app);
  return (
    <GradView
      start={{x: 1, y: 0}}
      end={{x: 1, y: 1.8}}
      colors={
        route.name === 'films'
          ? ['rgba(250,250,250,0)', 'rgba(250,250,250,0)']
          : [color.neutral, color.resistance]
      }
      style={[style.container, {elevation: route.name === 'films' ? 0 : 8}]}>
      {route.name === 'landing' ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'transparent',
            marginBottom: 18,
          }}>
          <StarWarsLogo width={20} color={'yellow'} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              onPress={() => nav.goBack()}
              name={'chevron-left'}
              style={[style.title, {marginRight: 8}]}
            />
            <Text
              lineBreakMode="tail"
              numberOfLines={1}
              style={{
                color: color.primary,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {route.params.title || route.name}
            </Text>
          </View>
          <View style={{paddingRight: 12, marginBottom: 12}}>
            <Text style={{color: color.primary}}>
              {app['name'] && `Hi, ${app['name']}`}
            </Text>
          </View>
        </View>
      )}
      {/* {back && (
        <Icon name={'chevron-left'} style={[style.title, {marginRight: 8}]} />
      )}
      <Text style={style.title}>{route.name}</Text> */}
    </GradView>
  );
};

export default DefaultHeader;
