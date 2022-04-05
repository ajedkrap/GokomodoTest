import React, {useEffect, useState} from 'react';
import {Text, View, Alert, Image, ActivityIndicator} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Label from '_atoms/label';
import {getKeyBasedData} from '_services/StarWarsAPI';
import DetailList from '_molecules/detailList';
import color from '_theme/color';

const VehicleDetail = ({route, navigation: nav}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const onGettingData = async () => {
    try {
      const gettinVehicle = await getKeyBasedData(route.params.url);
      setData(gettinVehicle);
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
              <Icon name={'truck'} size={72} color={color.primary} />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Label textStyle={{color: color.primary}}>
                {'Manufacturer : ' + data['manufacturer']}
              </Label>
              <Label textStyle={{color: color.primary}}>
                {'Model : ' + data['model']}
              </Label>
              <Label textStyle={{color: color.primary}}>
                {'Class : ' + data['vehicle_class']}
              </Label>
              <Label textStyle={{color: color.primary}}>
                {'Crew : ' + data['crew']}
              </Label>
            </View>
          </View>
          <DetailList
            section={'people'}
            data={data['pilots']}
            header={'Pilots'}
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

export default VehicleDetail;
