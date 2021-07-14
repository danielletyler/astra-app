import React from 'react';
import {SafeAreaView} from 'react-native';

import {Divider} from '@ui-kitten/components';

import LoginForm from '../components/auth/login-form';

export default function LoginScreen() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Divider />
      <LoginForm />
    </SafeAreaView>
  );
}
