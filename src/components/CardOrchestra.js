import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

const {width} = Dimensions.get('window');

import colors from '../constants/colors';
import fontSize from '../constants/fontSize';
import fontFamily from '../constants/fontFamily';

export default ({item}) => {
  async function handleOnpress() {
    const {uri} = item;
    Linking.openURL(uri);
  }

  return (
    <>
      {item.image ? (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.68}
          onPress={handleOnpress}>
          <Image source={item.image} style={styles.image} />
          <Text allowFontScaling={false} style={styles.text}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.card, {backgroundColor: colors.primary}]}
          activeOpacity={0.68}
          onPress={handleOnpress}>
          <Text allowFontScaling={false} style={styles.text}>
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: width * 0.9 * 0.370117,
    backgroundColor: colors.black,
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: width * 0.9 * 0.370117,
    width: width * 0.9,
    opacity: 0.6,
    resizeMode: 'cover',
    borderRadius: 5,
    position: 'absolute',
  },
  text: {
    color: colors.white,
    fontSize: fontSize.small,
    fontFamily: fontFamily.extraBold,
  },
});
