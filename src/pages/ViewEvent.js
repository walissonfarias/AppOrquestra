import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import getFormatedDate from '../utils/formatDate';

import api from '../services/api';

import colors from '../constants/colors';
import Button from '../components/Button';
import Alert from '../components/Alert';

export default ({route}) => {
  const [locationAlertVisible, setLocationAlertVisible] = useState(false);
  const [removeAlertVisible, setRemoveAlertVisible] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [event, setEvent] = useState({});

  const {id} = route.params;

  useEffect(() => {
    (async () => {
      const ___temp = await api.get(`/events/${id}`);
      setEvent(___temp.data);
      console.log(___temp.data);
      // EVENTS AINDA NÂO ESTÀ PRONTO
      const response =
        (await AsyncStorage.getItem('@schedule')) || JSON.stringify({data: []});
      const {data} = JSON.parse(response);

      data.map(item =>
        item === event._id ? setIsScheduled(true) : setIsScheduled(false),
      );
    })();
  }, [event._id]);

  async function handleScheduleEvents() {
    const response =
      (await AsyncStorage.getItem('@schedule')) || JSON.stringify({data: []});
    const {data} = JSON.parse(response);
    data.push(event._id);

    const newData = JSON.stringify({data});
    await AsyncStorage.setItem('@schedule', newData);

    setIsScheduled(!isScheduled);
  }

  async function handleRemoveEvent() {
    const response =
      (await AsyncStorage.getItem('@schedule')) || JSON.stringify({data: []});
    const {data} = JSON.parse(response);
    data.pop(event._id);

    const newData = JSON.stringify({data});
    await AsyncStorage.setItem('@schedule', newData);

    setIsScheduled(!isScheduled);
    setRemoveAlertVisible(!removeAlertVisible);
  }

  function handleRemoveAlertVisible() {
    setRemoveAlertVisible(!removeAlertVisible);
  }

  function handleViewLocation() {
    const {coordinates} = event.location;
    const lat = coordinates[0];
    const lon = coordinates[1];

    if (!(event && lon)) {
      return handleLocationAlertVisible();
    }
    Linking.openURL(`http://maps.google.com/maps?daddr=${lat},${lon}`);
  }

  function handleLocationAlertVisible() {
    setLocationAlertVisible(!locationAlertVisible);
  }

  return (
    <View style={styles.container}>
      <Alert
        visible={removeAlertVisible}
        title={'Remover'}
        message={'Você deseja remover este evendo da sua agenda?'}
        onCancelPress={handleRemoveAlertVisible}
        onConfirmPress={handleRemoveEvent}
        cancelText={'Cancelar'}
        confirmText={'Remover'}
      />

      <Alert
        visible={locationAlertVisible}
        title={'Localização'}
        message={'A localização será disponibilizada em breve.'}
        onConfirmPress={handleLocationAlertVisible}
        cancelText={''}
        confirmText={'OK'}
      />

      <View style={styles.content}>
        <Text style={styles.textName}>{event.name}</Text>
        <Text style={styles.textDate}>{getFormatedDate(event.date, 'LL')}</Text>

        <Text style={styles.textDescription}>{event.description}</Text>

        <View style={{marginBottom: 10}}>
          <Text style={{color: colors.black}}>
            <Text style={{fontWeight: 'bold', color: colors.black}}>
              Local:{' '}
            </Text>
            {event.local}
          </Text>
          <Text style={{color: colors.black}}>
            <Text style={{fontWeight: 'bold', color: colors.black}}>
              Endereço:{' '}
            </Text>
            {event.address}
          </Text>
        </View>
        <View>
          <Text style={{color: colors.black}}>
            <Text style={{fontWeight: 'bold', color: colors.black}}>
              Duração:{' '}
            </Text>
            {event.duration}
          </Text>
          <Text style={{color: colors.black}}>
            <Text style={{fontWeight: 'bold', color: colors.black}}>
              Classificação:{' '}
            </Text>
            {event.classification}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {/* <Button
          text={isScheduled ? 'Remover da agenda' : 'Adicionar a agenda'}
          onPress={
            isScheduled ? handleRemoveAlertVisible : handleScheduleEvents
          }
          buttonColor={isScheduled ? colors.danger : colors.primary}
        /> */}
        <Button
          text={'Visualizar localização'}
          type={'outline'}
          onPress={handleViewLocation}
          buttonColor={colors.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  content: {
    width: '90%',
  },
  textName: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.black,
    marginVertical: 20,
  },
  textDate: {
    textAlign: 'center',
    color: colors.gray,
  },
  textDescription: {
    marginVertical: 20,
    color: colors.black,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    bottom: 20,
  },
});
