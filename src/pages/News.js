import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';
import * as Animatable from 'react-native-animatable';

const AnimatableView = Animatable.createAnimatableComponent(View);

import colors from '../constants/colors';

import Loading from '../components/Loading';
import CardNews from '../components/CardNews';

import api from '../services/api';

export default ({navigation}) => {
  const netInfo = useNetInfo();
  const [news, setNews] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      const data = await retrieveData();
      setNews(data);

      if (netInfo.isConnected) {
        setMessage('Notícias em breve');
      } else {
        setMessage('Sem conexão com a internet');
      }
    })();
  }, [netInfo]);

  async function retrieveData() {
    const {data} = await api.get('/news').catch(async () => {
      return {
        data: JSON.parse(await AsyncStorage.getItem('@cards_news')) || [],
      };
    });
    await AsyncStorage.setItem('@cards_news', JSON.stringify(data));
    return data;
  }

  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      {news ? (
        news.length ? (
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
        ) : (
          <View style={styles.containerLoading}>
            <Text style={styles.text}>{message}</Text>
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
