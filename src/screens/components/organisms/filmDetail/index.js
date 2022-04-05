import React, {useEffect, useState} from 'react';
import {Text, View, Alert, Image, ActivityIndicator} from 'react-native';

import Label from '_atoms/label';
import {getKeyBasedData} from '_services/StarWarsAPI';
import DetailList from '_molecules/detailList';
import color from '_theme/color';

import SW1 from '_images/posters/sw1.jpg';
import SW2 from '_images/posters/sw2.jpg';
import SW3 from '_images/posters/sw3.jpg';
import SW4 from '_images/posters/sw4.jpg';
import SW5 from '_images/posters/sw5.jpg';
import SW6 from '_images/posters/sw6.jpg';

const getPosters = id => {
  switch (id) {
    case 4:
      return SW1;
    case 5:
      return SW2;
    case 6:
      return SW3;
    case 1:
      return SW4;
    case 2:
      return SW5;
    case 3:
      return SW6;
  }
};

const FilmDetail = ({route, navigation: nav}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const onGettingData = async () => {
    try {
      const gettingFilm = await getKeyBasedData(route.params.url);
      setData(gettingFilm);
    } catch (e) {
      Alert.alert('Fetching Film Failed', e.message);
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
      <View
        style={{
          height: 360,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
          overflow: 'hidden',
          borderBottomColor: color.text,
          borderBottomWidth: 4,
        }}>
        {isLoading && (
          <View>
            <ActivityIndicator />
          </View>
        )}
        {data && (
          <Image
            style={{flex: 1, paddingTop: 12, opacity: 0.6}}
            resizeMode="cover"
            source={getPosters(data['episode_id'])}
          />
        )}
      </View>
      {data && (
        <View style={{paddingHorizontal: 16}}>
          <Label
            contStyle={{marginVertical: 18}}
            textStyle={{color: color.primary}}>
            <Text style={{fontSize: 22}}>{data.title}</Text>
            {'\n EPISODE ' + data['episode_id']}
          </Label>
          <Label textStyle={{color: color.primary}}>
            {'Directed by ' + data['director']}
          </Label>
          <Label textStyle={{color: color.primary}}>
            {'Produced by ' + data['producer']}
          </Label>
          <Label
            contStyle={{
              marginBottom: 200,
              transform: [{perspective: 120}, {rotateX: '15deg'}],
            }}
            textStyle={{
              paddingBottom: 8,
              fontWeight: 'bold',
              color: 'skyblue',
              textAlign: 'center',
              lineHeight: 20,
            }}>
            {data['opening_crawl']}
          </Label>
          <DetailList
            section={'planets'}
            data={data['planets']}
            header={'Plot'}
            nav={nav}
          />
          <DetailList
            section={'people'}
            data={data['characters']}
            header={'Character Appearance'}
            nav={nav}
          />
          <DetailList
            section={'species'}
            data={data['species']}
            header={'Species Exist'}
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

export default FilmDetail;
