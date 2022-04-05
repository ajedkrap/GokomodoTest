import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  ImageBackground,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Label from '_atoms/label';
import Button from '_atoms/button';
import alert from '_helpers/alert';
import {getKeyBasedData} from '_services/StarWarsAPI';
import color from '_theme/color';
import {hS} from '_theme/metrics';

import SW1 from '_images/posters/sw1.jpg';
import SW2 from '_images/posters/sw2.jpg';
import SW3 from '_images/posters/sw3.jpg';
import SW4 from '_images/posters/sw4.jpg';
import SW5 from '_images/posters/sw5.jpg';
import SW6 from '_images/posters/sw6.jpg';

import style from './style';

const SWURL = 'https://swapi.dev/api/';

const initialError = {status: false, message: ''};

const getPosters = id => {
  switch (id + 1) {
    case 1:
      return SW1;
    case 2:
      return SW2;
    case 3:
      return SW3;
    case 4:
      return SW4;
    case 5:
      return SW5;
    case 6:
      return SW6;
  }
};

const getIcon = section => {
  switch (section) {
    case 'films':
      return 'movie-open';
    case 'people':
      return 'human-handsdown';
    case 'planets':
      return 'earth';
    case 'species':
      return 'space-invaders';
    case 'starships':
      return 'rocket';
    case 'vehicles':
      return 'truck';
  }
};

const RenderView = ({item, index, section, nav}) => {
  return (
    <Button
      ripple
      onPress={() => nav.navigate(section, {url: item.url, title: item.name})}
      style={{
        minHeight: section === 'films' ? 240 : 60,
        width: '45%',
        alignItems: 'flex-end',
        borderWidth: 4,
        borderColor: color.primary,
        borderRadius: 8,
        margin: 8,
      }}
      contentStyle={{backgroundColor: color.neutral, width: '100%'}}>
      {section === 'films' ? (
        <ImageBackground
          style={{flex: 1}}
          resizeMode={'cover'}
          source={getPosters(index)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(100,100,100,0.5)',
            }}>
            <Text
              lineBreakMode="tail"
              numberOfLines={1}
              style={{
                color: color.primary,
                fontSize: 18,
                paddingLeft: 8,
                paddingBottom: 8,
                textShadowRadius: 4,
                textShadowColor: color.neutral,
                textShadowOffset: {
                  height: 2,
                  width: -2,
                },
              }}>
              {item.name}
            </Text>
          </View>
        </ImageBackground>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 12}}>
          <Text
            lineBreakMode="tail"
            numberOfLines={1}
            style={{color: color.text}}>
            {item.name}
          </Text>
        </View>
      )}
    </Button>
  );
};

const LoadingView = () => {
  return (
    <View style={style.height}>
      <ActivityIndicator size={24} color={color.primary} />
    </View>
  );
};

const LandingList = ({section, route, navigation: nav}) => {
  const [fetching, setFetching] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(initialError);
  const [list, setList] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [lastUrl, setLastUrl] = useState(false);

  const onGettingData = async () => {
    if (isError.status || list.length === 0) setLoading(true);
    setError(initialError);
    const url = nextUrl || SWURL + section;
    try {
      const getData = await getKeyBasedData(url);
      const {next, results} = getData;
      if (next) setNextUrl(next);
      else setLastUrl(true);
      setList(state => [
        ...state,
        ...results.map(val => ({
          name: val[section === 'films' ? 'title' : 'name'],
          url: val['url'],
        })),
      ]);
    } catch (e) {
      alert(e.message, 'Get ' + section + ' Error');
      setError(state => ({status: true, message: e.message}));
    } finally {
      setFetching(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      onGettingData();
    }
  }, []);

  if (isLoading) {
    return <LoadingView />;
  }

  if (isError.status) {
    return (
      <View style={[style.height, style.center]}>
        <Text style={{color: color.primary}} onPress={() => onGettingData()}>
          {'Ada Masalah Dalam Mengambil Data\n' + isError.message}
        </Text>
      </View>
    );
  }

  if (list.length === 0) {
    return (
      <View style={[style.height, style.center]}>
        <Text onPress={() => onGettingData()} style={{color: color.primary}}>
          Data Kosong
        </Text>
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 12,
        }}>
        <Icon name={getIcon(section)} size={22} color={color.primary} />
        <Label
          textStyle={{
            color: color.primary,
            fontSize: 22,
            fontWeight: 'bold',
            textTransform: 'capitalize',
            marginLeft: 12,
          }}>
          {section}
        </Label>
      </View>
      <FlatList
        nestedScrollEnabled={true}
        data={list}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        keyExtractor={(val, idx) => val['name'] + idx}
        renderItem={props => (
          <RenderView section={section} nav={nav} {...props} />
        )}
        ListFooterComponent={() => {
          if (fetching) {
            return <LoadingView />;
          }

          if (!lastUrl)
            return (
              <View
                style={{
                  alignItems: 'flex-end',
                  marginRight: 12,
                  marginTop: 12,
                }}>
                <Button
                  onPress={() => {
                    setFetching(true);
                    onGettingData();
                  }}
                  center
                  style={{
                    minWidth: '20%',
                    height: 50,
                    overflow: 'hidden',
                    borderRadius: 8,
                  }}
                  contentStyle={{
                    flex: 1,
                    width: '100%',
                    paddingHorizontal: 12,
                    backgroundColor: color.primary,
                  }}>
                  <Text>See More</Text>
                </Button>
              </View>
            );
          else return <></>;
        }}
      />
    </>
  );
};

export default LandingList;
