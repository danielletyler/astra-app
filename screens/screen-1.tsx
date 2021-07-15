import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {Text, Layout, useTheme} from '@ui-kitten/components';

const Screen1 = () => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme['background-basic-color-1'],
      }}>
      <Layout>
        <View>
          <Text>Hello</Text>
          <Text>Hello 2</Text>
        </View>
      </Layout>
    </SafeAreaView>
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
