import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimatableView = Animatable.createAnimatableComponent(View);

import CardEvents from '../components/CardEvents';

export default ({navigation, events}) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});
