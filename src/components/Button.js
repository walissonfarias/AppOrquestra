import React from 'react';
import {StyleSheet, TouchableOpacity, Text, Keyboard} from 'react-native';

import colors from '../constants/colors';
import fontFamily from '../constants/fontFamily';

export default ({
  text = 'Button',
  Icon,
  onPress = () => {},
  type = 'solid',
  buttonColor = colors.primary,
  textColor = 'white',
  width = '90%',
  height = 58,
  fontSize,
  styleButton = {},
  styleText = {},
}) => {
  function handleOnPress() {
    Keyboard.dismiss();
    onPress();
  }

  return (
    <>
      {type === 'solid' ? (
        <TouchableOpacity
          style={[
            styles.container,
            {backgroundColor: buttonColor, width, height},
            styleButton,
          ]}
          onPress={handleOnPress}
          activeOpacity={0.6}>
          {Icon ? (
            <Icon color={colors.primary} />
          ) : (
            <Text
              allowFontScaling={false}
              style={[
                styles.textButton,
                {color: textColor, fontSize},
                styleText,
              ]}>
              {text}
            </Text>
          )}
        </TouchableOpacity>
      ) : type === 'clear' ? (
        <TouchableOpacity
          style={[
            styles.container,
            {borderColor: buttonColor, borderWidth: 1, width, height},
            styleButton,
          ]}
          onPress={handleOnPress}
          activeOpacity={0.6}>
          <Text
            allowFontScaling={false}
            style={[
              styles.textButton,
              {color: buttonColor, fontSize},
              styleText,
            ]}>
            {text}
          </Text>
        </TouchableOpacity>
      ) : type === 'outline' ? (
        <TouchableOpacity
          style={[
            styles.container,
            {backgroundColor: 'transparent', width, height},
            styleButton,
          ]}
          onPress={handleOnPress}
          activeOpacity={0.6}>
          <Text
            allowFontScaling={false}
            style={[
              styles.textButton,
              {color: buttonColor, fontSize},
              styleText,
            ]}>
            {text}
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textButton: {
    fontFamily: fontFamily.bold,
  },
});
