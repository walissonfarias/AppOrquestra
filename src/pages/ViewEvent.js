import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';

const {width} = Dimensions.get('window');

const AnimatableView = Animatable.createAnimatableComponent(View);

import getFormatedDate from '../utils/formatDate';

import api from '../services/api';

import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import fontFamily from '../constants/fontFamily';

import Button from '../components/Button';
import Alert from '../components/Alert';
import Loading from '../components/Loading';

export default ({route}) => {
  const {id} = route.params;
  const [event, setEvent] = useState(null);

  const [isScheduled, setIsScheduled] = useState(false);
  const [removeAlertVisible, setRemoveAlertVisible] = useState(false);
  const [locationAlertVisible, setLocationAlertVisible] = useState(false);

  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const data = await retrieveData();
      setEvent(data);

      const _response = await AsyncStorage.getItem('@user');
      const response = JSON.parse(_response);
      setUser(response);

      if (response !== 'guest') {
        await checkSchedule();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function retrieveData() {
    const {data} = await api.get(`/events/${id}`).catch(async () => {
      return {data: 'NetworkError'};
    });
    return data;
  }

  async function checkSchedule() {
    const response =
      (await AsyncStorage.getItem('@schedule')) || JSON.stringify({data: []});
    const {data} = JSON.parse(response);

    const schedule = data.filter(item => item._id === id).length;
    setIsScheduled(Boolean(schedule));
  }

  async function handleScheduleEvents() {
    const response =
      (await AsyncStorage.getItem('@schedule')) || JSON.stringify({data: []});
    const {data} = JSON.parse(response);
    data.push(event);

    data.sort((first, second) => {
      const firstKey = new Date(first.date);
      const secondKey = new Date(second.date);
      return firstKey < secondKey ? -1 : 1;
    });

    const newData = JSON.stringify({data});
    // GRAVAR NO ALTERAÇÃO DA AGENDA NO BACKEND
    // ANTES DE TUDO SALVAR LOCALMENTE E MOSTRAR AO USUARIO
    // POIS PODE ACONTECER ALGUM ERRO E ISSO DEVE SER EXIBIDO
    // EM FORMA DE ALERTA PARA QUE USUARIO ESTEJA CIENTE

    // ADCIONAR EVENTO NAS NOTIFICAÇÕES DO USUARIO
    await AsyncStorage.setItem('@schedule', newData);

    setIsScheduled(!isScheduled);
  }

  async function handleRemoveEvent() {
    const response =
      (await AsyncStorage.getItem('@schedule')) || JSON.stringify({data: []});
    const {data} = JSON.parse(response);
    data.pop(event);

    const newData = JSON.stringify({data});
    // GRAVAR NO ALTERAÇÃO DA AGENDA NO BACKEND
    // ANTES DE TUDO SALVAR LOCALMENTE E MOSTRAR AO USUARIO
    // POIS PODE ACONTECER ALGUM ERRO E ISSO DEVE SER EXIBIDO
    // EM FORMA DE ALERTA PARA QUE USUARIO ESTEJA CIENTE

    // RETIRAR EVENTO DAS NOTIFICAÇÕES DO USUARIO
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
    <View style={styles.background}>
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}>
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
        {event ? (
          event !== 'NetworkError' ? (
            <View style={styles.containerEvent}>
              <View style={styles.content}>
                <AnimatableView animation={'fadeIn'} delay={150}>
                  <Text allowFontScaling={false} style={styles.textName}>
                    {event.name}
                  </Text>
                </AnimatableView>
                <AnimatableView animation={'fadeIn'} delay={300}>
                  <Text allowFontScaling={false} style={styles.textDate}>
                    {getFormatedDate(event.date, 'LL')}
                  </Text>
                </AnimatableView>

                <AnimatableView animation={'fadeIn'} delay={450}>
                  <Text allowFontScaling={false} style={styles.textDescription}>
                    {event.description}
                  </Text>
                </AnimatableView>

                <View style={styles.containerInfos}>
                  <AnimatableView animation={'fadeIn'} delay={600}>
                    <Text allowFontScaling={false} style={styles.textInfo}>
                      <Text allowFontScaling={false} style={styles.textLabel}>
                        Local:{' '}
                      </Text>
                      {event.local}
                    </Text>
                  </AnimatableView>
                  <AnimatableView animation={'fadeIn'} delay={750}>
                    <Text allowFontScaling={false} style={styles.textInfo}>
                      <Text allowFontScaling={false} style={styles.textLabel}>
                        Endereço:{' '}
                      </Text>
                      {event.address}
                    </Text>
                  </AnimatableView>
                </View>
                <View>
                  <AnimatableView animation={'fadeIn'} delay={900}>
                    <Text allowFontScaling={false} style={styles.textInfo}>
                      <Text allowFontScaling={false} style={styles.textLabel}>
                        Duração:{' '}
                      </Text>
                      {event.duration}
                    </Text>
                  </AnimatableView>
                  <AnimatableView animation={'fadeIn'} delay={1050}>
                    <Text allowFontScaling={false} style={styles.textInfo}>
                      <Text allowFontScaling={false} style={styles.textLabel}>
                        Classificação:{' '}
                      </Text>
                      {event.classification}
                    </Text>
                  </AnimatableView>
                </View>
              </View>
            </View>
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
      {event ? (
        event !== 'NetworkError' ? (
          <View style={styles.buttonContainer}>
            {user.token !== 'guest' ? (
              <AnimatableView animation={'fadeIn'} delay={150}>
                <Button
                  styleButton={{width: width * 0.9}}
                  text={
                    isScheduled ? 'Remover da agenda' : 'Adicionar a agenda'
                  }
                  onPress={
                    isScheduled
                      ? handleRemoveAlertVisible
                      : handleScheduleEvents
                  }
                  buttonColor={isScheduled ? colors.danger : colors.primary}
                />
              </AnimatableView>
            ) : (
              <></>
            )}
            <AnimatableView animation={'fadeIn'}>
              <Button
                text={'Visualizar localização'}
                type={'outline'}
                onPress={handleViewLocation}
                buttonColor={colors.primary}
              />
            </AnimatableView>
          </View>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    marginBottom: 158,
  },
  containerLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  containerEvent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  content: {
    width: '90%',
  },
  textName: {
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    color: colors.black,
    marginVertical: 20,
    fontSize: fontSize.large,
  },
  textDate: {
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    color: colors.gray,
    fontSize: fontSize.small,
  },
  textDescription: {
    marginVertical: 20,
    color: colors.black,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
  },
  containerInfos: {
    marginBottom: 10,
  },
  textLabel: {
    color: colors.black,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.bold,
  },
  textInfo: {
    color: colors.black,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.regular,
  },
  buttonContainer: {
    position: 'absolute',
    width,
    alignItems: 'center',
    bottom: 20,
  },
});
