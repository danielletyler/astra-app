import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Layout, useTheme} from '@ui-kitten/components';

const Screen2 = () => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme['background-basic-color-1'],
      }}>
      <Layout></Layout>
    </SafeAreaView>
  );
};

Screen2.navigationOptions = {
  title: 'Messages',
  headerStyle: {
    backgroundColor: '#008080',
    borderBottomWidth: 0,
  },
  headerTintColor: 'white',
};

export default Screen2;
