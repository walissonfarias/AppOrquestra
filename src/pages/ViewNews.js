import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';
import * as Animatable from 'react-native-animatable';

const AnimatableView = Animatable.createAnimatableComponent(View);

const {width} = Dimensions.get('window');

import colors from '../constants/colors';

import Loading from '../components/Loading';

import api from '../services/api';

export default ({route}) => {
  const {id} = route.params;
  const netInfo = useNetInfo();
  const [news, setNews] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await retrieveData();
      setNews(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [netInfo]);

  async function retrieveData() {
    const {data} = await api.get(`/news/${id}`).catch(async () => {
      return {
        data:
          JSON.parse(await AsyncStorage.getItem('@view_news')) ||
          'NetworkError',
      };
    });
    await AsyncStorage.setItem('@view_news', JSON.stringify(data));
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
                  <Text style={styles.title}>{news.title.toUpperCase()}</Text>
                </AnimatableView>
                <AnimatableView animation={'fadeIn'} delay={450}>
                  <Text style={styles.description}>{news.description}</Text>
                </AnimatableView>
                <AnimatableView animation={'fadeIn'} delay={600}>
                  <Text style={styles.textNews}>{news.text}</Text>
                </AnimatableView>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.containerLoading}>
            <Text style={styles.text}>Sem conexão com a internet</Text>
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
    paddingVertical: 20,
  },
  containerText: {
    width: width * 0.85,
  },
  title: {
    textAlign: 'center',
    color: colors.primary,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    color: colors.gray,
    marginVertical: 20,
  },
  textNews: {
    color: colors.black,
  },
  image: {
    height: width * 0.370117,
    width: width,
    resizeMode: 'cover',
  },
});
