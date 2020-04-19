import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimatableView = Animatable.createAnimatableComponent(View);

import CardNews from '../components/CardNews';

export default ({navigation, news}) => {
  return (
    <View style={styles.content}>
      {news.map((item, index) => (
        <AnimatableView
          animation={'fadeInLeft'}
          delay={200 * (index + 1)}
          key={item._id}>
          <CardNews navigation={navigation} news={item} />
        </AnimatableView>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});
