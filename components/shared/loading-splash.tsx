import React from 'react';
import {SafeAreaView, Text} from 'react-native';

export default function Splash() {
  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
      }}>
      <Text>splash</Text>
    </SafeAreaView>
  );
}
