import React, {useState, useEffect} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

import Button from '_atoms/button';
import TextInput from '_atoms/textInput';
import {settingName} from '_redux/actions/app';
import color from '_theme/color';

const SplashForm = ({route, navigation: nav}) => {
  const dispatch = useDispatch();
  const app = useSelector(state => state.app);

  const [loadingText, setLoadingText] = useState('Identity Check...');
  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState('');

  const onHandleText = text => {
    setName(text && text !== '' ? text : '');
  };

  const onSigningUp = () => {
    if (name.length > 1) {
      setLoading(true);
      try {
        dispatch(settingName(name));
      } catch (e) {
        Alert.alert('Sign Up Failed', e.message);
      } finally {
        setLoadingText('May the force be with you..\nOr not?');
        setTimeout(() => {
          nav.navigate('landing-stack');
          setLoading(false);
        }, 3000);
      }
    } else {
      Alert.alert(
        'Invalid Name',
        'Name should consist of two or more character',
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (app.name && app.name.length > 1) {
        nav.navigate('landing-stack');
      } else {
        setLoading(false);
      }
    }, 2000);
  }, []);

  return (
    <View
      style={{
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 58,
      }}>
      {isLoading ? (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator color={color.neutral} size={28} />
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              fontStyle: 'italic',
              marginTop: 12,
            }}>
            {loadingText}
          </Text>
        </View>
      ) : (
        <>
          <View
            style={{
              borderRadius: 8,
              borderWidth: 4,
              borderColor: color.text,
              backgroundColor: color.neutral,
              overflow: 'hidden',
              minHeight: 64,
              elevation: 6,
              width: '80%',
              margin: 8,
            }}>
            <TextInput
              align={'center'}
              value={name}
              placeholder="State your name..."
              placeholderColor={'grey'}
              style={{fontSize: 20, color: 'skyblue'}}
              editable={!isLoading}
              onChangeText={onHandleText}
            />
          </View>
          <Button
            onPress={onSigningUp}
            center
            style={{
              height: 60,
              aspectRatio: 4 / 3,
              borderRadius: 8,
              overflow: 'hidden',
              marginTop: 24,
              elevation: 6,
              margin: 18,
            }}
            contentStyle={{backgroundColor: color.secondary, width: '100%'}}>
            <Icon name={'rocket'} color={color.neutral} size={36} />
          </Button>
        </>
      )}
    </View>
  );
};

export default SplashForm;
