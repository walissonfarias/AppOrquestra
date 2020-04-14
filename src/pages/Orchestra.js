import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimatableView = Animatable.createAnimatableComponent(View);

import colors from '../constants/colors';
import orchestraData from '../constants/orchestraData';

import CardOrchestra from '../components/CardOrchestra';

export default () => {
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {orchestraData.map((item, index) => (
          <AnimatableView
            animation={'fadeInUpBig'}
            delay={100 * (index + 1)}
            key={index}>
            <CardOrchestra item={item} />
          </AnimatableView>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteSmoke,
    alignItems: 'center',
    paddingVertical: 20,
  },
});
