import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Layout, useTheme} from '@ui-kitten/components';

const Screen3 = () => {
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

Screen3.navigationOptions = {
  title: 'Messages',
  headerStyle: {
    backgroundColor: '#008080',
    borderBottomWidth: 0,
  },
  headerTintColor: 'white',
};

export default Screen3;
