import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from '@ui-kitten/components';
import Screen3 from '../../screens/screen-3';

const Stack3 = createStackNavigator();

export default function SearchStackScreen() {
  return (
    <Stack3.Navigator>
      <Stack3.Screen
        name="3"
        component={Screen3}
        options={{
          header: () => <Text style={{alignSelf: 'center'}}>Stack3</Text>,
        }}
      />
    </Stack3.Navigator>
  );
}
