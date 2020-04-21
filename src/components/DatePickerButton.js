import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';

import colors from '../constants/colors';

import Button from '../components/Button';
import DatePicker from '../components/DatePicker';

import api from '../services/api';

export default ({
  month,
  year,
  setMonth,
  setYear,
  setIsSearch,
  setEvents,
  setPage,
  setPages,
}) => {
  const [visibleMonthPicker, setVisibleMonthPicker] = useState(false);
  const [visibleYearPicker, setVisibleYearPicker] = useState(false);

  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const {data} = await api
        .get(`/events?month=0${month}&year=${2000 + year}`)
        .catch(async () => {
          return {};
        });
      setEvents(data.docs);
      setPage(data.page);
      setPages(data.pages);
    })();
  }, [month, setEvents, setPage, setPages, year]);

  return (
    <>
      <DatePicker
        visible={visibleMonthPicker}
        setVisible={setVisibleMonthPicker}
        type={'month'}
        dateValue={month}
        setDateValue={setMonth}
        setTextVisible={setTextVisible}
        setIsSearch={setIsSearch}
      />
      <DatePicker
        visible={visibleYearPicker}
        setVisible={setVisibleYearPicker}
        type={'year'}
        dateValue={year}
        setDateValue={setYear}
        setTextVisible={setTextVisible}
        setIsSearch={setIsSearch}
      />

      <View style={styles.container}>
        <View style={styles.containerButton}>
          <View style={styles.buttonMonth}>
            <Button
              text={
                textVisible
                  ? moment()
                      .month(month - 1)
                      .format('MMMM')
                  : 'Mês'
              }
              width={'50%'}
              buttonColor={colors.black}
              type={'outline'}
              onPress={() => setVisibleMonthPicker(!visibleMonthPicker)}
            />
          </View>
          <View style={styles.buttonYear}>
            <Button
              text={textVisible ? year + 2000 : 'Ano'}
              width={'50%'}
              buttonColor={colors.black}
              type={'outline'}
              onPress={() => setVisibleYearPicker(!visibleYearPicker)}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.whiteSmoke,
  },

  containerButton: {
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.lightGray,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },

  buttonMonth: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: colors.lightGray,
    borderRightWidth: 1,
  },
  buttonYear: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
