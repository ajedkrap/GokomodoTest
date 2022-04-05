import React, {useEffect, useState} from 'react';
import {Text, View, Alert, Image, ActivityIndicator} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Label from '_atoms/label';
import {getKeyBasedData} from '_services/StarWarsAPI';
import DetailList from '_molecules/detailList';
import color from '_theme/color';

const PeopleDetail = ({route, navigation: nav}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const onGettingData = async () => {
    try {
      const gettingPeople = await getKeyBasedData(route.params.url);
      setData(gettingPeople);
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
              fontSize: 32,
            }}>
            {data['name']}
          </Label>
          <View style={{flexDirection: 'row', minHeight: 120}}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Icon name={'human-handsdown'} size={72} color={color.primary} />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Label textStyle={{color: color.primary}}>
                {'Birth Year : ' + data['birth_year']}
              </Label>
              <Label textStyle={{color: color.primary}}>
                {'Hair Color : ' + data['hair_color']}
              </Label>
              <Label textStyle={{color: color.primary}}>
                {'Eye Color : ' + data['eye_color']}
              </Label>
              <Label textStyle={{color: color.primary}}>
                {'Gender : ' + data['gender']}
              </Label>
            </View>
          </View>
          <DetailList
            section={'planets'}
            data={[data['homeworld']]}
            header={'Homeworld'}
            nav={nav}
          />
          <DetailList
            section={'films'}
            data={data['films']}
            header={'Appearance'}
            nav={nav}
          />
          <DetailList
            section={'species'}
            data={data['species']}
            header={'Species friend'}
            nav={nav}
          />
          <DetailList
            section={'starships'}
            data={data['starships']}
            header={'Starships'}
            nav={nav}
          />
          <DetailList
            section={'vehicles'}
            data={data['vehicles']}
            header={'Vehicles'}
            nav={nav}
          />
        </View>
      )}
    </View>
  );
};

export default PeopleDetail;
