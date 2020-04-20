import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

import getFormatedDate from '../utils/formatDate';

import colors from '../constants/colors';

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
            <Text style={styles.textName}>{event.name}</Text>
          </View>
        </View>

        <View style={styles.containerCardLeftInfos}>
          <View style={styles.containerCardLeftInfoHour}>
            <Text style={styles.textLabel}>Horário</Text>
            <Text style={styles.textInfo}>
              {getFormatedDate(event.hour.start, 'HH:mm')} -{' '}
              {getFormatedDate(event.hour.end, 'HH:mm')}
            </Text>
          </View>
          <View style={styles.containerCardLeftInfoLocation}>
            <Text style={styles.textLabel}>Local</Text>
            <Text style={styles.textInfo}>{event.local}</Text>
          </View>
        </View>
      </View>

      <View style={styles.containerCardRight}>
        <Text style={styles.textDate}>{getFormatedDate(event.date, 'DD')}</Text>
        <Text style={styles.textLabel}>
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
    width: '80%',
    marginLeft: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  containerCardLeftInfos: {
    flexDirection: 'row',
  },
  textLabel: {
    color: colors.gray,
  },
  textInfo: {
    color: colors.black,
  },
  containerCardLeftInfoHour: {
    width: '40%',
  },
  containerCardLeftInfoLocation: {
    width: '60%',
  },
  containerCardRight: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDate: {
    fontWeight: 'bold',
    color: colors.black,
  },
});
