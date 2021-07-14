import React from 'react';
import {SafeAreaView} from 'react-native';
import SignUpForm from '../components/auth/signup-form';

import {
  TopNavigation,
  TopNavigationAction,
  Divider,
  Icon,
  Layout,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <TopNavigation alignment="center" accessoryLeft={BackAction} />
      <Divider />
      <Layout
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SignUpForm />
      </Layout>
    </SafeAreaView>
  );
};

export default SignUpScreen;
