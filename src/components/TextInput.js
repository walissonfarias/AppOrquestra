import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';

import colors from '../constants/colors';

export default ({
  placeholder = 'Input',
  value = '',
  onChangeText = () => {},
  inputColor = '#FBFBFB',
  borderColor = '#E8E8E8',
  onFocusColor = 'deepskyblue',
  width = '90%',
  height = 58,
  keyboardType = 'default',
  secureTextEntry = false,
  style = {},
  placeholderTextColor = colors.gray,
}) => {
  const [_borderColor, _setBorderColor] = useState(borderColor);

  function handleOnFocus() {
    _setBorderColor(onFocusColor);
  }

  function handleOnBlur() {
    _setBorderColor(borderColor);
  }

  return (
    <>
      <TextInput
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        style={[
          styles.container,
          style,
          {
            backgroundColor: inputColor,
            borderColor: _borderColor,
            width,
            height,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={placeholderTextColor}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: colors.white,
    color: colors.black,
  },
});
