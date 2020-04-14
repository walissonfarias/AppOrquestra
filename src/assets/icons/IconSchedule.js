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
            d="M15.3 15.3V3.4C15.3 2.46245 14.5375 1.7 13.6 1.7H11.9V0H10.2V1.7H5.1V0H3.4V1.7H1.7C0.76245 1.7 0 2.46245 0 3.4V15.3C0 16.2376 0.76245 17 1.7 17H13.6C14.5375 17 15.3 16.2376 15.3 15.3ZM5.1 13.6H3.4V11.9H5.1V13.6ZM5.1 10.2H3.4V8.5H5.1V10.2ZM8.5 13.6H6.8V11.9H8.5V13.6ZM8.5 10.2H6.8V8.5H8.5V10.2ZM11.9 13.6H10.2V11.9H11.9V13.6ZM11.9 10.2H10.2V8.5H11.9V10.2ZM13.6 5.95H1.7V4.25H13.6V5.95Z"
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
          <Path
            d="M3.40002 7.64999H5.10002V9.34999H3.40002V7.64999ZM3.40002 11.05H5.10002V12.75H3.40002V11.05ZM6.80002 7.64999H8.50002V9.34999H6.80002V7.64999ZM6.80002 11.05H8.50002V12.75H6.80002V11.05ZM10.2 7.64999H11.9V9.34999H10.2V7.64999ZM10.2 11.05H11.9V12.75H10.2V11.05Z"
            fill={color}
          />
          <Path
            d="M1.7 17H13.6C14.5375 17 15.3 16.2376 15.3 15.3V3.4C15.3 2.46245 14.5375 1.7 13.6 1.7H11.9V0H10.2V1.7H5.1V0H3.4V1.7H1.7C0.76245 1.7 0 2.46245 0 3.4V15.3C0 16.2376 0.76245 17 1.7 17ZM13.6 5.1L13.6009 15.3H1.7V5.1H13.6Z"
            fill={color}
          />
        </Svg>
      )}
    </>
  );
};
