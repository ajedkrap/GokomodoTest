import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Label from '_atoms/label';
import {getKeyBasedData} from '_services/StarWarsAPI';
import DetailList from '_molecules/detailList';
import color from '_theme/color';

const SpeciesDetail = ({route, navigation: nav}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const onGettingData = async () => {
    try {
      const gettingSpecies = await getKeyBasedData(route.params.url);
      setData(gettingSpecies);
    } catch (e) {
      Alert.alert('Fetching Species Failed', e.message);
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
              <Icon name={'space-invaders'} size={72} color={color.primary} />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Label textStyle={{color: color.primary}}>
                {'Classification : ' + data['classification']}
              </Label>
              <Label textStyle={{color: color.primary}}>
                {'Language : ' + data['language']}
              </Label>
              <Label textStyle={{color: color.primary}}>
                {'Lifespan : ' + data['average_lifespan']}
              </Label>
              <Label textStyle={{color: color.primary}}>
                {'Designation : ' + data['designation']}
              </Label>
            </View>
          </View>
          {data['homeworld'] && (
            <DetailList
              section={'planets'}
              data={[data['homeworld']]}
              header={'Homeworld'}
              nav={nav}
            />
          )}
          <DetailList
            section={'people'}
            data={data['people']}
            header={'People'}
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

export default SpeciesDetail;
