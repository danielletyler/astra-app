import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from '@ui-kitten/components';
import Screen2 from '../../screens/screen-2';

const Stack2 = createStackNavigator();

export default function SearchStackScreen() {
  return (
    <Stack2.Navigator>
      <Stack2.Screen
        name="2"
        component={Screen2}
        options={{
          header: () => <Text style={{alignSelf: 'center'}}>Stack2</Text>,
        }}
      />
    </Stack2.Navigator>
  );
}
