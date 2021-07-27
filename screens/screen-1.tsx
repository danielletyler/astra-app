import React from 'react';
import {SafeAreaView} from 'react-native';
import {useTheme} from '@ui-kitten/components';
import NavLayout from '../components/shared/layout';

const Screen1 = () => {
  const theme = useTheme();

  return (
    <NavLayout>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme['background-basic-color-1'],
        }}></SafeAreaView>
    </NavLayout>
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
