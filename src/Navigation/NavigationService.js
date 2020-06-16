import {createRef} from 'react';

let _navigator;

function navigationProps() {
  return _navigator;
}

export const navigationRef = createRef();
export function navigate(routeName, params) {
  navigationRef.current?.navigate(routeName, params);
}

export default {
  navigationProps,
};
