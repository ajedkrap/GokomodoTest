import React, {useState, useEffect} from 'react';
import {Text, View, Alert, ActivityIndicator} from 'react-native';

import Label from '_atoms/label';
import {getBulkData} from '_services/StarWarsAPI';
import color from '_theme/color';

const DetailList = ({data, section, header, nav}) => {
  const [isLoading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const onGettingList = async () => {
    setLoading(true);
    try {
      const getList = await getBulkData(data).then(res =>
        res.map(val => ({
          name: val[section === 'films' ? 'title' : 'name'],
          url: val['url'],
        })),
      );

      if (getList.length > 0) setList([...getList]);
    } catch (e) {
      Alert.alert('Getting List Failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (list.length === 0 && data.length > 0) {
      onGettingList();
    }
  }, []);

  if (isLoading) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color={color.primary} size={48} />
      </View>
    );
  }

  if (list.length === 0) {
    return <></>;
  }

  return (
    <View style={{marginBottom: 12}}>
      <Label
        textStyle={{
          color: color.primary,
          fontSize: 26,
          fontWeight: 'bold',
          marginBottom: 12,
        }}>
        {header}
      </Label>
      <View>
        {isLoading && (
          <ActivityIndicator
            style={{marginTop: 16}}
            color={color.primary}
            size={18}
          />
        )}
        {list.length > 0 && (
          <View style={{paddingLeft: 12}}>
            {list.map((val, idx) => (
              <Label
                key={val['name'] + idx}
                contStyle={{marginVertical: 12}}
                textStyle={{
                  color: 'skyblue',
                  fontSize: 18,
                  textShadowColor: 'grey',
                  textShadowOffset: {height: 2, width: -2},
                  textShadowRadius: 20,
                }}>
                <Text
                  onPress={() =>
                    nav.navigate(section, {title: val['name'], url: val['url']})
                  }>
                  {val['name']}
                </Text>
              </Label>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default DetailList;
