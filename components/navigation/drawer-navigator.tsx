import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/auth';
import SignupScreen from '../../screens/signup';
import ForgotPasswordScreen from '../../screens/forgot-password';
import {UserContext} from '../../config/user-context';
import HomePage from '../Homepage/home';
import Splash from '../shared/loading-splash';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Profile from '../../screens/profile';
import Screen1 from '../../screens/screen-1.tsx';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function StackNavigator() {
  const {user, isLoading} = useContext(UserContext);

  const {Navigator, Screen} = createStackNavigator();

  if (isLoading) return <Splash />;
  return (
    <>
      {!user ? (
        <Navigator headerMode="none">
          <Screen name="Login" component={LoginScreen} />
          <Screen name="SignUp" component={SignupScreen} />
          <Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </Navigator>
      ) : (
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="Screen 1" component={Screen1} />
        </Drawer.Navigator>
      )}
    </>
  );
}
