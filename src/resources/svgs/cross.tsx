import React from 'react';

export const CrossIcon = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size ? props.size : '15'}
      height={props?.size ? props.size : '15'}
      viewBox="0 0 15 15">
      <g fill="none" fill-rule="evenodd">
        <g fill={props?.fill ? props.fill : '#0c0b10'}>
          <g>
            <g>
              <path
                d="M7.218 8.5L1.25 2.532c-.354-.354-.354-.928 0-1.282s.928-.354 1.282 0L8.5 7.218l5.968-5.968c.354-.354.928-.354 1.282 0s.354.928 0 1.282L9.782 8.5l5.968 5.968c.354.354.354.928 0 1.282s-.928.354-1.282 0L8.5 9.782 2.532 15.75c-.354.354-.928.354-1.282 0s-.354-.928 0-1.282L7.218 8.5z"
                transform="translate(-1857 -1027) translate(0 989) translate(1856 37)"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
