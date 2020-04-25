import React from 'react';
import {Dimensions, StyleSheet, View, Image, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const {width} = Dimensions.get('window');

import getFormatedDate from '../utils/formatDate';

import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import fontFamily from '../constants/fontFamily';

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
          <Text allowFontScaling={false} style={styles.textTitle}>
            {news.briefTitle.toUpperCase()}
          </Text>
          <Text allowFontScaling={false} style={styles.textSubTitle}>
            {'POR ADMIN'}
          </Text>
        </View>

        <Text allowFontScaling={false} style={styles.textDescription}>
          {news.description}
        </Text>
      </View>

      <View style={styles.textInfos}>
        <Text allowFontScaling={false} style={styles.textDate}>
          {getFormatedDate(news.date, 'LL')}
        </Text>
        <Button
          text={'Ler mais'}
          styleText={{fontSize: fontSize.small}}
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
  textTitle: {
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    color: colors.primary,
    fontSize: fontSize.medium,
  },
  textSubTitle: {
    fontFamily: fontFamily.medium,
    textAlign: 'center',
    color: colors.gray,
    fontSize: fontSize.mini,
  },
  textDescription: {
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    color: colors.black,
    fontSize: fontSize.small,
  },
  textInfos: {
    fontFamily: fontFamily.regular,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDate: {
    fontFamily: fontFamily.medium,
    width: '50%',
    textAlign: 'center',
    color: colors.gray,
    fontSize: fontSize.small,
  },
});
