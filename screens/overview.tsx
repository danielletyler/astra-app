import React from 'react';
import {SafeAreaView} from 'react-native';
import Layout from '../components/shared/layout';
import Overview from '../components/Overview/overview';

const OverviewScreen = () => {
  return (
    <Layout>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <Overview />
      </SafeAreaView>
    </Layout>
  );
};

export default OverviewScreen;
