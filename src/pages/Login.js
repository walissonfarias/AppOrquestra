import React, {useState} from 'react';
import {StyleSheet, StatusBar, View, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimatableView = Animatable.createAnimatableComponent(View);

import colors from '../constants/colors';

import Button from '../components/Button';
import TextInput from '../components/TextInput';

export default ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleOnPressLogin() {
    navigation.reset({routes: [{name: 'Home'}]});
  }

  function handleOnPressSignIn() {
    navigation.navigate('SignIn');
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
          value={email}
          style={styles.input}
          onChangeText={setEmail}
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
          text={'Cadastrar'}
          buttonColor={colors.primary}
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
    fontWeight: 'bold',
    color: colors.white,
  },
  button: {
    marginVertical: 10,
  },
});
