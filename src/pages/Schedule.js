import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';

const AnimatableView = Animatable.createAnimatableComponent(View);

import colors from '../constants/colors';

import Loading from '../components/Loading';
import CardEvents from '../components/CardEvents';

export default ({navigation}) => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const response =
        (await AsyncStorage.getItem('@schedule')) || JSON.stringify({data: []});
      const {data} = JSON.parse(response);
      setEvents(data);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      {events ? (
        events.length ? (
          <View style={styles.content}>
            {events.map((item, index) => (
              <AnimatableView
                animation={'fadeInRight'}
                delay={200 * (index + 1)}
                key={item._id}>
                <CardEvents navigation={navigation} event={item} />
              </AnimatableView>
            ))}
          </View>
        ) : (
          <View style={styles.containerLoading}>
            <Text allowFontScaling={false} style={styles.text}>
              {'Adicione eventos a sua agenda'}
            </Text>
          </View>
        )
      ) : (
        <View style={styles.containerLoading}>
          <Loading
            size={12}
            background={colors.primary}
            activeBackground={colors.primary + '88'}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteSmoke,
  },
  containerLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    color: colors.gray,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});
