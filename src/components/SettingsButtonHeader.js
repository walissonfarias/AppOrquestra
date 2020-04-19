import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import colors from '../constants/colors';

import IconCog from '../assets/icons/IconCog';

export default ({navigation}) => {
  function handleOnPress() {
    navigation.navigate('Settings');
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleOnPress}
      activeOpacity={0.6}>
      <IconCog size={28} color={colors.gray} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20},
});
