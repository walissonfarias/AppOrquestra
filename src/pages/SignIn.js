import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import colors from '../constants/colors';

import Button from '../components/Button';
import TextInput from '../components/TextInput';

export default ({navigation}) => {
  // Nome Completo *
  // Nome de usuário *
  // Data nascimento
  // Sexo
  // Email *
  // Telefone
  // Senha *
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [sex, setSex] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleOnPressSignIn() {
    navigation.navigate('News');
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={'Nome completo'}
        value={name}
        onChangeText={setName}
        borderColor={colors.lightGray}
        onFocusColor={colors.primary}
      />
      <TextInput
        style={styles.input}
        placeholder={'Nome de usuário'}
        value={username}
        onChangeText={setUsername}
        borderColor={colors.lightGray}
        onFocusColor={colors.primary}
      />
      <TextInput
        style={styles.input}
        placeholder={'Email'}
        value={email}
        onChangeText={setEmail}
        borderColor={colors.lightGray}
        onFocusColor={colors.primary}
      />
      <TextInput
        style={styles.input}
        placeholder={'Sexo'}
        value={name}
        onChangeText={setName}
        borderColor={colors.lightGray}
        onFocusColor={colors.primary}
      />
      <TextInput
        style={styles.input}
        placeholder={'Data de nascimento'}
        value={name}
        onChangeText={setName}
        borderColor={colors.lightGray}
        onFocusColor={colors.primary}
      />
      <TextInput
        style={styles.input}
        placeholder={'Telefone'}
        value={phone}
        onChangeText={setPhone}
        borderColor={colors.lightGray}
        onFocusColor={colors.primary}
      />
      <TextInput
        style={styles.input}
        placeholder={'Senha'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        borderColor={colors.lightGray}
        onFocusColor={colors.primary}
      />
      <TextInput
        style={styles.input}
        placeholder={'Confirmar senha'}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        borderColor={colors.lightGray}
        onFocusColor={colors.primary}
      />
      <Button
        styleButton={styles.button}
        text={'Cadastrar'}
        onPress={handleOnPressSignIn}
        buttonColor={colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingTop: 20,
  },
  input: {
    marginVertical: 5,
  },
  button: {
    position: 'absolute',
    bottom: 20,
  },
});
