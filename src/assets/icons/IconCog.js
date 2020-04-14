import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default ({size = 24, color = 'black'}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M2.34404 15.271L4.34404 18.731C4.47682 18.9605 4.69531 19.1279 4.95147 19.1963C5.20763 19.2648 5.48049 19.2287 5.71004 19.096L7.10604 18.29C7.68604 18.747 8.32704 19.122 9.00104 19.402V21C9.00104 21.2652 9.1064 21.5196 9.29394 21.7071C9.48147 21.8946 9.73583 22 10.001 22H14.001C14.2663 22 14.5206 21.8946 14.7082 21.7071C14.8957 21.5196 15.001 21.2652 15.001 21V19.402C15.6803 19.1192 16.3179 18.7451 16.896 18.29L18.292 19.096C18.769 19.371 19.383 19.206 19.658 18.731L21.658 15.271C21.7897 15.0412 21.8251 14.7687 21.7568 14.5129C21.6884 14.257 21.5217 14.0385 21.293 13.905L19.921 13.112C20.0282 12.3745 20.0276 11.6253 19.919 10.888L21.291 10.095C21.767 9.82 21.932 9.205 21.656 8.729L19.656 5.269C19.5233 5.0395 19.3048 4.87212 19.0486 4.80367C18.7925 4.73523 18.5196 4.77131 18.29 4.904L16.894 5.71C16.3166 5.25438 15.6793 4.88022 15 4.598V3C15 2.73478 14.8947 2.48043 14.7072 2.29289C14.5196 2.10536 14.2653 2 14 2H10C9.73483 2 9.48047 2.10536 9.29294 2.29289C9.1054 2.48043 9.00004 2.73478 9.00004 3V4.598C8.32077 4.88081 7.68323 5.25492 7.10504 5.71L5.71004 4.904C5.59641 4.83817 5.47091 4.79539 5.34073 4.7781C5.21055 4.76082 5.07824 4.76937 4.95136 4.80327C4.82449 4.83717 4.70555 4.89576 4.60134 4.97567C4.49713 5.05559 4.40969 5.15526 4.34404 5.269L2.34404 8.729C2.21243 8.9588 2.17694 9.2313 2.24531 9.48715C2.31367 9.74299 2.48035 9.96147 2.70904 10.095L4.08104 10.888C3.97318 11.6254 3.97318 12.3746 4.08104 13.112L2.70904 13.905C2.23304 14.18 2.06804 14.795 2.34404 15.271V15.271ZM12 8C14.206 8 16 9.794 16 12C16 14.206 14.206 16 12 16C9.79404 16 8.00004 14.206 8.00004 12C8.00004 9.794 9.79404 8 12 8Z"
        fill={color}
      />
    </Svg>
  );
};
