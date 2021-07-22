import * as React from 'react';
import {DrawerActions} from 'react-navigation-drawer';

export const navigationRef = React.createRef();

export function openDrawer(...args) {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
