import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/auth';
import SignupScreen from '../../screens/signup';
import ForgotPasswordScreen from '../../screens/forgot-password';
import {UserContext} from '../../config/user-context';
import Splash from '../shared/loading-splash';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Profile from '../../screens/profile';
import Home from '../../screens/home-screen';
import OverviewScreen from '../../screens/overview';

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
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="Overview" component={OverviewScreen} />
        </Drawer.Navigator>
      )}
    </>
  );
}
