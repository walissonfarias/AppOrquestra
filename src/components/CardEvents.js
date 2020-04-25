import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

import getFormatedDate from '../utils/formatDate';

import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import fontFamily from '../constants/fontFamily';

import IconTour from '../assets/icons/IconTour';

export default ({navigation, event}) => {
  function hanldeOnPress() {
    navigation.navigate('ViewEvent', {id: event._id});
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={hanldeOnPress}
      activeOpacity={0.4}>
      <View style={styles.contaienrCard}>
        <View style={styles.containerCardLeft}>
          <View style={styles.containerCardLeftIcon}>
            <IconTour size={45} color={event.tour} />
          </View>
          <View style={styles.containerCardLeftName}>
            <Text allowFontScaling={false} style={styles.textName}>
              {event.name}
            </Text>
          </View>
        </View>

        <View style={styles.containerCardLeftInfos}>
          <View style={styles.containerCardLeftInfoHour}>
            <Text allowFontScaling={false} style={styles.textLabel}>
              Horário
            </Text>
            <Text allowFontScaling={false} style={styles.textInfo}>
              {getFormatedDate(event.hour.start, 'HH:mm')} -{' '}
              {getFormatedDate(event.hour.end, 'HH:mm')}
            </Text>
          </View>
          <View style={styles.containerCardLeftInfoLocation}>
            <Text allowFontScaling={false} style={styles.textLabel}>
              Local
            </Text>
            <Text allowFontScaling={false} style={styles.textInfo}>
              {event.local}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.containerCardRight}>
        <Text allowFontScaling={false} style={styles.textDate}>
          {getFormatedDate(event.date, 'DD')}
        </Text>
        <Text allowFontScaling={false} style={styles.textLabel}>
          {getFormatedDate(event.date, 'MMMM')}
        </Text>
      </View>
    </TouchableOpacity>
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
    flexDirection: 'row',
  },
  contaienrCard: {
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRightWidth: 1,
    borderRightColor: colors.lightGray,
  },
  containerCardLeft: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  containerCardLeftIcon: {
    width: '15%',
  },
  containerCardLeftName: {
    width: '90%',
  },
  textName: {
    fontFamily: fontFamily.bold,
    width: '80%',
    marginLeft: 20,
    color: colors.black,
    fontSize: fontSize.medium,
  },
  containerCardLeftInfos: {
    flexDirection: 'row',
  },
  textLabel: {
    fontFamily: fontFamily.regular,
    color: colors.gray,
    fontSize: fontSize.small,
  },
  textInfo: {
    fontFamily: fontFamily.medium,
    color: colors.black,
    fontSize: fontSize.xsmall,
  },
  containerCardLeftInfoHour: {
    width: '45%',
  },
  containerCardLeftInfoLocation: {
    width: '55%',
  },
  containerCardRight: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDate: {
    color: colors.black,
    fontSize: fontSize.xlarge,
    fontFamily: fontFamily.bold,
  },
});
