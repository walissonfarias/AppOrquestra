import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text, Switch} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import IconUser from '../assets/icons/IconUser';

import colors from '../constants/colors';
import fontFamily from '../constants/fontFamily';

import Button from '../components/Button';
import Alert from '../components/Alert';

export default ({navigation}) => {
  const [notifications, setNotifications] = useState(false);
  const [logoutAlertVisible, setLogoutAlertVisible] = useState(false);
  // const [darkMode, setDarkMode] = useState(false)

  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const _response = await AsyncStorage.getItem('@user');
      const response = JSON.parse(_response);
      setUser(response);
    })();
  }, []);

  // async function handleOnPress() {
  //   await AsyncStorage.setItem('@colorScheme', 'dark');
  // }

  async function handleLougoutOnConfirm() {
    setLogoutAlertVisible(!logoutAlertVisible);
    await AsyncStorage.clear();
    navigation.reset({routes: [{name: 'Login'}]});
  }

  return (
    <ScrollView style={styles.scroll} showsHorizontalScrollIndicator={false}>
      <Alert
        visible={logoutAlertVisible}
        title={'Sair'}
        message={
          user.token !== 'guest'
            ? 'Você deseja sair da conta atual?'
            : 'Você deseja sair?'
        }
        onCancelPress={() => setLogoutAlertVisible(!logoutAlertVisible)}
        onConfirmPress={() => handleLougoutOnConfirm()}
        cancelText={'Voltar'}
        confirmText={'Sair'}
      />

      <View style={styles.container}>
        <View style={styles.content}>
          {user.token !== 'guest' ? (
            <View style={styles.profileContainer}>
              <IconUser size={100} color={colors.gray} />
              <Text allowFontScaling={false} style={styles.textUser}>
                {user.name}
              </Text>
              <Text allowFontScaling={false} style={styles.textUser}>
                {user.email}
              </Text>
            </View>
          ) : (
            <></>
          )}

          <View style={styles.switchContainer}>
            <Text allowFontScaling={false} style={styles.textButton}>
              {'Notificações'}
            </Text>
            <Switch
              trackColor={{
                false: colors.lightGray + '88',
                true: colors.primary + '88',
              }}
              thumbColor={notifications ? colors.primary : colors.lightGray}
              // onValueChange={setNotifications}
              value={notifications}
            />
          </View>
          {/* <View style={styles.switchContainer}>
              <Text allowFontScaling={false}>{'Dark mode'}</Text>
              <Switch
                trackColor={{ false: colors.lightGray + '88', true: colors.primary + '88' }}
                thumbColor={darkMode ? colors.primary : colors.lightGray}
                onValueChange={setDarkMode}
                value={darkMode}
              />
            </View> */}
          {user.token !== 'guest' ? (
            <>
              <Button
                styleButton={styles.button}
                styleText={styles.textButton}
                text={'Alterar senha'}
              />
              <Button
                styleButton={styles.button}
                styleText={styles.textButton}
                text={'Excluir minha conta'}
              />
            </>
          ) : (
            <></>
          )}

          <Button
            styleButton={{...styles.button, ...styles.logoutButton}}
            styleText={styles.textButton}
            // text={'Sair da minha conta'}
            text={user.token !== 'guest' ? 'Sair da minha conta' : 'Sair'}
            onPress={() => setLogoutAlertVisible(!logoutAlertVisible)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: colors.white,
  },
  container: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  content: {
    width: '90%',
    alignItems: 'center',
  },
  profileContainer: {
    width: '90%',
    marginTop: 30,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchContainer: {
    width: '90%',
    height: 58,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textUser: {
    color: colors.black,
    fontFamily: fontFamily.regular,
    marginVertical: 5,
  },
  button: {
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  textButton: {
    color: colors.black,
    fontFamily: fontFamily.medium,
  },
});
