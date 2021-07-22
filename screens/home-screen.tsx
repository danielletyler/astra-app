import React from 'react';
import {SafeAreaView} from 'react-native';
import Layout from '../components/shared/layout';
import Homepage from '../components/Homepage/home';

const HomeScreen = () => {
  return (
    <Layout>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <Homepage />
      </SafeAreaView>
    </Layout>
  );
};

export default HomeScreen;
