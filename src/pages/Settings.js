import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  AsyncStorage,
  View,
  Text,
  Switch,
} from 'react-native';

import IconUser from '../assets/icons/IconUser';

import Button from '../components/Button';
import Alert from '../components/Alert';

import colors from '../constants/colors';

export default ({navigation}) => {
  const [notifications, setNotifications] = useState(false);
  const [logoutAlertVisible, setLogoutAlertVisible] = useState(false);
  // const [darkMode, setDarkMode] = useState(false)

  async function handleOnPress() {
    await AsyncStorage.setItem('@colorScheme', 'dark');
  }

  function handleOnPressLogout() {
    setLogoutAlertVisible(!logoutAlertVisible);
  }

  function handleLougoutOnConfirm() {
    setLogoutAlertVisible(!logoutAlertVisible);
    navigation.reset({routes: [{name: 'Login'}]});
  }

  return (
    <ScrollView style={styles.scroll} showsHorizontalScrollIndicator={false}>
      <Alert
        visible={logoutAlertVisible}
        title={'Sair'}
        // message={'Você deseja sair da conta atual?'}
        message={'Você deseja sair?'}
        onCancelPress={() => setLogoutAlertVisible(!logoutAlertVisible)}
        onConfirmPress={() => handleLougoutOnConfirm()}
        cancelText={'Voltar'}
        confirmText={'Sair'}
      />

      <View style={styles.container}>
        <View style={styles.content}>
          {/* <View style={styles.profileContainer}>
            <IconUser size={100} color={colors.gray} />
            <Text>{'Nome do Usuário'}</Text>
            <Text>{'email@email.com'}</Text>
          </View> */}

          <View style={styles.switchContainer}>
            <Text>{'Notificações'}</Text>
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
                        <Text>{'Dark mode'}</Text>
                        <Switch
                        trackColor={{ false: colors.lightGray + '88', true: colors.primary + '88' }}
                        thumbColor={darkMode ? colors.primary : colors.lightGray}
                        onValueChange={setDarkMode}
                        value={darkMode}
                        />
                    </View> */}

          {/* <Button
            styleButton={styles.button}
            styleText={styles.buttonText}
            text={'Alterar senha'}
            onPress={handleOnPress}
          /> */}
          {/* <Button
                    styleButton={styles.button}
                    styleText={styles.buttonText}
                    text={'Excluir minha conta'}
                    onPress={handleOnPress}
                    /> */}
          <Button
            styleButton={{...styles.button, ...styles.logoutButton}}
            styleText={styles.buttonText}
            // text={'Sair da minha conta'}
            text={'Sair'}
            onPress={handleOnPressLogout}
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
  button: {
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: colors.black,
    fontWeight: 'normal',
  },
});
