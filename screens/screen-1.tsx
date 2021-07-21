import React from 'react';
import {SafeAreaView} from 'react-native';
import {useTheme} from '@ui-kitten/components';
import Layout from '../components/shared/layout';

const Screen1 = () => {
  const theme = useTheme();

  return (
    <Layout>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme['background-basic-color-1'],
        }}></SafeAreaView>
    </Layout>
  );
};

Screen1.navigationOptions = {
  title: 'Messages',
  headerStyle: {
    backgroundColor: '#008080',
    borderBottomWidth: 0,
  },
  headerTintColor: 'white',
};

export default Screen1;
