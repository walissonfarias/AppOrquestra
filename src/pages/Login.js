import React, {useState} from 'react';
import {StyleSheet, StatusBar, View, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';

const AnimatableView = Animatable.createAnimatableComponent(View);

import colors from '../constants/colors';
import fontFamily from '../constants/fontFamily';

import Button from '../components/Button';
import TextInput from '../components/TextInput';

export default ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  async function handleOnPressLogin() {
    // CRIAR AUTENTICAÇÃO COM userName e password
    // const {user} = (userName, password);

    const token = '123';
    const name = 'Nome do Usuário';
    const email = 'email@email.com';

    const user = {token, name, email};

    await AsyncStorage.setItem('@user', JSON.stringify(user));
    navigation.reset({routes: [{name: 'Home'}]});
  }

  async function handleOnPressLoginWithoutUser() {
    const token = 'guest';
    const name = '';
    const email = '';

    const user = {token, name, email};

    await AsyncStorage.setItem('@user', JSON.stringify(user));

    navigation.reset({routes: [{name: 'Home'}]});
  }

  function handleOnPressSignIn() {
    // navigation.navigate('SignIn');
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />

      <Image
        source={require('../assets/background.png')}
        style={styles.background}
      />

      <AnimatableView
        animation={'fadeIn'}
        delay={200}
        duration={2000}
        style={styles.containerAnimation}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <TextInput
          placeholder={'Usuário ou Email'}
          placeholderTextColor={colors.gray}
          value={userName}
          style={styles.input}
          onChangeText={setUserName}
          inputColor={colors.gray + '50'}
          borderColor={colors.gray + '50'}
          onFocusColor={colors.primary}
        />

        <TextInput
          placeholder={'Senha'}
          placeholderTextColor={colors.gray}
          value={password}
          style={styles.input}
          onChangeText={setPassword}
          secureTextEntry={true}
          inputColor={colors.gray + '50'}
          borderColor={colors.gray + '50'}
          onFocusColor={colors.primary}
        />

        <Button
          styleButton={styles.button}
          text={'Entrar'}
          buttonColor={colors.primary}
          onPress={handleOnPressLogin}
        />

        <Button
          styleText={styles.textGuest}
          text={'Entrar como convidado'}
          buttonColor={colors.primary}
          onPress={handleOnPressLoginWithoutUser}
          type={'outline'}
        />

        <Button
          styleText={styles.textSingin}
          text={'Cadastrar'}
          buttonColor={colors.white}
          onPress={handleOnPressSignIn}
          type={'outline'}
        />
      </AnimatableView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  background: {
    height: '100%',
    position: 'absolute',
    opacity: 0.2,
  },
  containerAnimation: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: '90%',
    resizeMode: 'contain',
    marginVertical: 20,
  },
  input: {
    marginVertical: 10,
    color: colors.white,
    fontFamily: fontFamily.medium,
  },
  button: {
    marginVertical: 10,
  },
  textGuest: {
    fontFamily: fontFamily.bold,
  },
  textSingin: {
    fontFamily: fontFamily.regular,
  },
});
