import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimatableView = Animatable.createAnimatableComponent(View);

import colors from '../constants/colors';

import Loading from '../components/Loading';
import CardEvents from '../components/CardEvents';
import Button from '../components/Button';
import DatePicker from '../components/DatePicker';

import Events from '../MockEvents';

export default ({navigation}) => {
  const [events, setEvents] = useState(null);

  const [visibleMonthPicker, setVisibleMonthPicker] = useState(false);
  const [visibleYearPicker, setVisibleYearPicker] = useState(false);

  useEffect(() => {
    (async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setEvents(Events);
    })();
  }, []);

  return (
    <>
      <DatePicker
        visible={visibleMonthPicker}
        setVisible={setVisibleMonthPicker}
        type={'month'}
      />
      <DatePicker
        visible={visibleYearPicker}
        setVisible={setVisibleYearPicker}
        type={'year'}
      />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.whiteSmoke,
        }}>
        <View
          style={{
            width: '90%',
            backgroundColor: colors.white,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: colors.lightGray,
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 10,
          }}>
          <View
            style={{
              width: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRightColor: colors.lightGray,
              borderRightWidth: 1,
            }}>
            <Button
              text={'Mês'}
              width={'50%'}
              buttonColor={colors.black}
              type={'outline'}
              onPress={() => setVisibleMonthPicker(!visibleMonthPicker)}
            />
          </View>
          <View
            style={{
              width: '50%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              text={'Ano'}
              width={'50%'}
              buttonColor={colors.black}
              type={'outline'}
              onPress={() => setVisibleYearPicker(!visibleYearPicker)}
            />
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}>
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
              <Text style={styles.text}>Eventos em breve</Text>
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
    </>
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
  content: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});
