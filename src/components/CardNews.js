import React from 'react';
import {Dimensions, StyleSheet, View, Image, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const {width} = Dimensions.get('window');

import getFormatedDate from '../utils/formatDate';

import colors from '../constants/colors';
import Button from './Button';

export default ({navigation, news}) => {
  async function handleOnPress() {
    await AsyncStorage.removeItem('@view_news');
    navigation.navigate('ViewNews', {id: news._id});
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: news.image}} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{news.briefTitle.toUpperCase()}</Text>
          <Text style={styles.subTitle}>{'POR ADMIN'}</Text>
        </View>

        <Text style={styles.description}>{news.description}</Text>
      </View>

      <View style={styles.infos}>
        <Text style={styles.date}>{getFormatedDate(news.date, 'LL')}</Text>
        <Button
          text={'Ler mais'}
          width={'50%'}
          onPress={handleOnPress}
          buttonColor={colors.black}
          type={'outline'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  image: {
    height: width * 0.9 * 0.370117,
    width: width * 0.9,
    resizeMode: 'cover',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  content: {
    alignItems: 'center',
    width: '90%',
  },
  titleContainer: {
    marginVertical: 10,
  },
  title: {
    textAlign: 'center',
    color: colors.primary,
    fontWeight: 'bold',
  },
  subTitle: {
    textAlign: 'center',
    color: colors.gray,
  },
  description: {
    textAlign: 'center',
    color: colors.black,
  },
  infos: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    width: '50%',
    textAlign: 'center',
    color: colors.gray,
  },
});
