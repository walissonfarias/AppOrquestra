import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default ({type = 'fill', size = 24, color = 'black'}) => {
  return (
    <>
      {type === 'fill' ? (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 25 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M0 0V17.5C0 17.5 0 20 2.5 20H22.5C22.5 20 25 20 25 17.5V0H0ZM8.75 11.25H3.75V3.75H8.75V11.25ZM21.25 11.25H11.25V8.75H21.25V11.25ZM21.25 6.25H11.25V3.75H21.25V6.25Z"
            fill={color}
          />
        </Svg>
      ) : (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 25 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M22.5 2.5V17.5H2.5V2.5H22.5ZM25 0H0V17.5C0 17.5 0 20 2.5 20H22.5C22.5 20 25 20 25 17.5V0ZM10 11.25H5V5H10V11.25ZM20 11.25H11.25V8.75H20V11.25ZM20 7.5H11.25V5H20V7.5Z"
            fill={color}
          />
        </Svg>
      )}
    </>
  );
};
