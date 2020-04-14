import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default ({type = 'fill', size = 24, color = 'black'}) => {
  return (
    <>
      {type === 'fill' ? (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M13.6 1.7H11.9V0H10.2V1.7H5.1V0H3.4V1.7H1.7C0.76245 1.7 0 2.46245 0 3.4V15.3C0 16.2376 0.76245 17 1.7 17H13.6C14.5375 17 15.3 16.2376 15.3 15.3V3.4C15.3 2.46245 14.5375 1.7 13.6 1.7ZM12.75 14.45H7.65V9.35H12.75V14.45ZM13.6 5.95H1.7V4.25H13.6V5.95Z"
            fill={color}
          />
        </Svg>
      ) : (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path d="M6.80005 8.5H11.9V13.6H6.80005V8.5Z" fill={color} />
          <Path
            d="M13.6 1.7H11.9V0H10.2V1.7H5.1V0H3.4V1.7H1.7C0.76245 1.7 0 2.46245 0 3.4V15.3C0 16.2376 0.76245 17 1.7 17H13.6C14.5375 17 15.3 16.2376 15.3 15.3V3.4C15.3 2.46245 14.5375 1.7 13.6 1.7ZM13.6009 15.3H1.7V5.1H13.6L13.6009 15.3Z"
            fill={color}
          />
        </Svg>
      )}
    </>
  );
};
