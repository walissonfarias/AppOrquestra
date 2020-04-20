import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';

import colors from '../constants/colors';

import Loading from '../components/Loading';
import TimelineEvents from '../components/TimelineEvents';
import DatePickerButton from '../components/DatePickerButton';

import api from '../services/api';

export default ({navigation}) => {
  const netInfo = useNetInfo();
  const [events, setEvents] = useState(null);
  const [page, setPage] = useState(null);
  const [pages, setPages] = useState(null);

  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      const data = await retrieveData();
      setEvents(data);

      if (netInfo.isConnected) {
        setMessage('Notícias em breve');
      } else {
        setMessage('Sem conexão com a internet');
      }
    })();
  }, [netInfo]);

  async function retrieveData() {
    const {data} = await api.get('/events').catch(async () => {
      return {
        data: {
          docs: JSON.parse(await AsyncStorage.getItem('@cards_events')) || [],
          page: 1,
          pages: 1,
        },
      };
    });

    await AsyncStorage.setItem('@cards_events', JSON.stringify(data.docs));
    setPage(data.page);
    setPages(data.pages);

    return data.docs;
  }

  async function handleMoreData({nativeEvent}) {
    const position = nativeEvent.contentOffset.y;
    const size = nativeEvent.contentSize.height;
    const layout = nativeEvent.layoutMeasurement.height;

    if (position < size - layout * 1.05) {
      return;
    }

    if (Number(page) > Number(pages)) {
      return;
    }

    const nextPage = Number(page) + 1;
    setPage(nextPage);
    const {data} = await api.get(`/events?page=${nextPage}`).catch(async () => {
      return {};
    });

    const _data = events.concat(data.docs);
    setEvents(_data);
    await AsyncStorage.setItem('@cards_events', JSON.stringify(_data));
  }

  return (
    <>
      <DatePickerButton setEvents={setEvents} />

      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        onScroll={handleMoreData}>
        {events ? (
          events.length ? (
            <TimelineEvents navigation={navigation} events={events} />
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
