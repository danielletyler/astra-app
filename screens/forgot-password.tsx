import React from 'react';
import {SafeAreaView} from 'react-native';
import ForgotPassword from '../components/auth/forgot-password';

import {
  TopNavigation,
  TopNavigationAction,
  Divider,
  Icon,
  Layout,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation();

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <TopNavigation alignment="center" accessoryLeft={BackAction} />
      <Divider />
      <Layout
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <ForgotPassword />
      </Layout>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
