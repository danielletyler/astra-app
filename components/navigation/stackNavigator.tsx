import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/auth';
import SignupScreen from '../../screens/signup';
import ForgotPasswordScreen from '../../screens/forgot-password';
import {UserContext} from '../../config/user-context';
import HomePage from '../Homepage/home';
import Splash from '../shared/loading-splash';

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
        <Navigator headerMode="none">
          <Screen name="Main" component={HomePage} />
        </Navigator>
      )}
    </>
  );
}
