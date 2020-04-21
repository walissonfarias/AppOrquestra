import React from 'react';
import {StyleSheet, Modal, View, Text} from 'react-native';

import colors from '../constants/colors';
import Button from './Button';

export default ({
  visible,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirmPress,
  onCancelPress,
}) => {
  return (
    <Modal visible={visible} animationType={'fade'} transparent={true}>
      <View style={styles.container}>
        <View style={styles.alert}>
          <View style={styles.containerMessage}>
            <Text style={styles.textTilte}>{title.toUpperCase()}</Text>
            <Text style={styles.textMessage}>{message}</Text>
          </View>

          <View style={styles.options}>
            <Button
              styleButton={styles.button}
              styleText={styles.buttonTextCancel}
              text={cancelText}
              onPress={onCancelPress}
            />
            <Button
              styleButton={styles.button}
              styleText={styles.buttonTextConfirm}
              text={confirmText}
              onPress={onConfirmPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonArrow: {
    width: '25%',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000' + '80',
  },
  alert: {
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerMessage: {
    width: '90%',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTilte: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: colors.danger,
  },
  textMessage: {
    width: '90%',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  options: {
    flexDirection: 'row',
  },
  button: {
    width: '50%',
    backgroundColor: 'transparent',
  },
  buttonTextCancel: {
    fontWeight: 'normal',
    color: colors.black,
  },
  buttonTextConfirm: {
    color: colors.danger,
  },
});
