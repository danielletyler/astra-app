import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout} from '@ui-kitten/components';
import Homepage from '../components/Homepage/home';

const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Layout>
        <Homepage />
      </Layout>
    </SafeAreaView>
  );
};

export default HomeScreen;
