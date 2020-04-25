import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimatableView = Animatable.createAnimatableComponent(View);

const {width} = Dimensions.get('window');

import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import fontFamily from '../constants/fontFamily';

import Loading from '../components/Loading';

import api from '../services/api';

export default ({route}) => {
  const {id} = route.params;
  const [news, setNews] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await retrieveData();
      setNews(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function retrieveData() {
    const {data} = await api.get(`/news/${id}`).catch(async () => {
      return {data: 'NetworkError'};
    });
    return data;
  }

  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      {news ? (
        news !== 'NetworkError' ? (
          <>
            <AnimatableView
              animation={'fadeIn'}
              delay={150}
              style={styles.content}>
              <Image source={{uri: news.image}} style={styles.image} />
            </AnimatableView>
            <View style={styles.content}>
              <View style={styles.containerText}>
                <AnimatableView animation={'fadeIn'} delay={300}>
                  <Text allowFontScaling={false} style={styles.textTitle}>
                    {news.title.toUpperCase()}
                  </Text>
                </AnimatableView>
                <AnimatableView animation={'fadeIn'} delay={450}>
                  <Text allowFontScaling={false} style={styles.textDescription}>
                    {news.description}
                  </Text>
                </AnimatableView>
                <AnimatableView animation={'fadeIn'} delay={600}>
                  <Text allowFontScaling={false} style={styles.textNews}>
                    {news.text}
                  </Text>
                </AnimatableView>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.containerLoading}>
            <Text allowFontScaling={false} style={styles.text}>
              Sem conexão com a internet
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
    backgroundColor: colors.white,
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
    paddingBottom: 20,
  },
  containerText: {
    width: width * 0.85,
  },
  textTitle: {
    textAlign: 'center',
    color: colors.primary,
    fontFamily: fontFamily.bold,
    fontSize: fontSize.large,
  },
  textDescription: {
    textAlign: 'center',
    color: colors.gray,
    marginVertical: 20,
    fontFamily: fontFamily.regular,
  },
  textNews: {
    color: colors.black,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.regular,
  },
  image: {
    height: width * 0.370117,
    width,
    resizeMode: 'cover',
  },
});
