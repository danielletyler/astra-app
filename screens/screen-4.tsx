import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Layout, useTheme} from '@ui-kitten/components';

const Screen4 = () => {
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

Screen4.navigationOptions = {
  title: 'Messages',
  headerStyle: {
    backgroundColor: '#008080',
    borderBottomWidth: 0,
  },
  headerTintColor: 'white',
};

export default Screen4;
