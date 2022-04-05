import React, {useEffect, useState} from 'react';
import {Text, View, Alert, Image, ActivityIndicator} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Label from '_atoms/label';
import {getKeyBasedData} from '_services/StarWarsAPI';
import DetailList from '_molecules/detailList';
import color from '_theme/color';

const PlanetDetail = ({route, navigation: nav}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const onGettingData = async () => {
    try {
      const gettingPlanet = await getKeyBasedData(route.params.url);
      setData(gettingPlanet);
    } catch (e) {
      Alert.alert('Fetching People Failed', e.message);
      nav.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      onGettingData();
    }
  }, []);

  return (
    <View>
      {data && (
        <View style={{paddingHorizontal: 16}}>
          <Label
            contStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 18,
            }}
            textStyle={{
              color: color.primary,
              fontWeight: 'bold',
              fontSize: 22,
            }}>
            {data['name']}
          </Label>
          <View style={{flexDirection: 'row', minHeight: 120}}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Icon name={'earth'} size={72} color={color.primary} />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Label textStyle={{color: color.primary}}>
                {'Climate : ' + data['climate']}
              </Label>
              <Label textStyle={{color: color.primary}}>
                {'Terrain : ' + data['terrain']}
              </Label>
              <Label textStyle={{color: color.primary}}>
                {'Diameter : ' + data['diameter']}
              </Label>
              <Label textStyle={{color: color.primary}}>
                {'Population : ' + data['population']}
              </Label>
            </View>
          </View>
          <DetailList
            section={'people'}
            data={data['residents']}
            header={'Residents'}
            nav={nav}
          />
          <DetailList
            section={'films'}
            data={data['films']}
            header={'Appearance in Film'}
            nav={nav}
          />
        </View>
      )}
    </View>
  );
};

export default PlanetDetail;
