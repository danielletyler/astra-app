import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from '@ui-kitten/components';
import Screen1 from '../../screens/screen-1';

const Stack1 = createStackNavigator();

export default function GroupStackScreen() {
  return (
    <Stack1.Navigator>
      <Stack1.Screen
        name="1"
        component={Screen1}
        options={{
          header: () => <Text style={{alignSelf: 'center'}}>Stack1</Text>,
        }}
      />
    </Stack1.Navigator>
  );
}
