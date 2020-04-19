import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Modal, View, Text} from 'react-native';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

const AnimatableView = Animatable.createAnimatableComponent(View);

import colors from '../constants/colors';
import Button from './Button';

import IconArrowLeft from '../assets/icons/IconArrowLeft';
import IconArrowRight from '../assets/icons/IconArrowRight';

export default ({
  visible,
  setVisible,
  type,
  confirmText = 'Selecionar',
  cancelText = 'Cancelar',
  dateValue,
  setDateValue,
  setTextVisible,
}) => {
  const [scrollRef, setScrollRef] = useState(null);
  const [scrollValue, setScrollValue] = useState(0);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!scrollRef) {
      if (type === 'month') {
        const months = [...Array(12)].map((_, index) =>
          moment()
            .month(index)
            .format('MMMM'),
        );
        setData(months);
      }
      if (type === 'year') {
        const years = [...Array(50)].map((_, index) => 2001 + index);
        setData(years);
      }
    } else {
      const value = (dateValue - 1) * 58;
      scrollRef.scrollTo({x: 0, y: value, animated: true});
      setScrollValue(value);
    }
  }, [dateValue, scrollRef, type]);

  function handleOnPressArrow(direction) {
    const value = direction === 'RIGHT' ? scrollValue + 58 : scrollValue - 58;

    if (value < 0) {
      return;
    }
    if (value > (data.length - 1) * 58) {
      return;
    }

    scrollRef.scrollTo({x: 0, y: value, animated: true});
    setScrollValue(value);
  }

  function handleOnConfirm() {
    const date = scrollValue / 58 + 1;
    setDateValue(date);
    setVisible(!visible);
    setTextVisible(true);
  }

  return (
    <Modal visible={visible} animationType={'fade'} transparent={true}>
      <View style={styles.container}>
        <View style={styles.alert}>
          <View style={styles.containerPicker}>
            <AnimatableView
              animation={'fadeInRight'}
              delay={100}
              style={styles.containerButton}>
              <Button
                Icon={IconArrowLeft}
                styleButton={styles.buttonArrow}
                styleText={styles.buttonText}
                onPress={() => handleOnPressArrow('LEFT')}
              />
            </AnimatableView>

            <AnimatableView
              animation={'fadeIn'}
              delay={300}
              style={styles.containerItemPicker}>
              <ScrollView
                ref={setScrollRef}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}>
                {data.map((value, index) => (
                  <View style={styles.itemPicker} key={index}>
                    <Text>{value}</Text>
                  </View>
                ))}
              </ScrollView>
            </AnimatableView>

            <AnimatableView
              animation={'fadeInLeft'}
              delay={100}
              style={styles.containerButton}>
              <Button
                Icon={IconArrowRight}
                styleButton={styles.buttonArrow}
                styleText={styles.buttonText}
                onPress={() => handleOnPressArrow('RIGHT')}
              />
            </AnimatableView>
          </View>

          <View style={styles.options}>
            <Button
              styleButton={styles.button}
              styleText={styles.buttonTextCancel}
              text={cancelText}
              onPress={() => setVisible(!visible)}
            />
            <Button
              styleButton={styles.button}
              styleText={styles.buttonTextConfirm}
              text={confirmText}
              onPress={handleOnConfirm}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000' + '80',
  },
  alert: {
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPicker: {
    height: 58,
    width: '100%',
    marginTop: 35,
    marginBottom: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  containerButton: {
    width: '25%',
  },
  buttonArrow: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  containerItemPicker: {
    width: '50%',
  },
  itemPicker: {
    height: 58,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    flexDirection: 'row',
  },
  button: {
    width: '50%',
    backgroundColor: 'transparent',
  },
  buttonTextCancel: {
    fontWeight: 'normal',
    color: colors.black,
  },
  buttonTextConfirm: {
    color: colors.black,
  },
});
