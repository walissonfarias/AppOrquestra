import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

const {width} = Dimensions.get('window');

import getFormatedDate from '../utils/formatDate';

import colors from '../constants/colors';

import IconTour from '../assets/icons/IconTour';

export default ({navigation, event}) => {
  function hanldeOnPress() {
    navigation.navigate('ViewEvent', {event});
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={hanldeOnPress}
      activeOpacity={0.4}>
      <View
        style={{
          width: '80%',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRightWidth: 1,
          borderRightColor: colors.lightGray,
        }}>
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <View style={{width: '15%'}}>
            <IconTour size={45} color={event.tour} />
          </View>
          <View style={{width: '90%'}}>
            <Text
              style={{
                width: '80%',
                marginLeft: 20,
                fontWeight: 'bold',
                color: colors.black,
              }}>
              {event.name}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{width: '40%'}}>
            <Text style={{color: colors.gray}}>Horário</Text>
            <Text style={{color: colors.black}}>
              {getFormatedDate(event.hour.start, 'HH:mm')} -{' '}
              {getFormatedDate(event.hour.end, 'HH:mm')}
            </Text>
          </View>
          <View style={{width: '60%'}}>
            <Text style={{color: colors.gray}}>Local</Text>
            <Text style={{color: colors.black}}>{event.local}</Text>
          </View>
        </View>
      </View>

      <View
        style={{width: '20%', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontWeight: 'bold', color: colors.black}}>
          {getFormatedDate(event.date, 'DD')}
        </Text>
        <Text style={{color: colors.gray}}>
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
