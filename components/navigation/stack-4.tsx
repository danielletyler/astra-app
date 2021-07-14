import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from '@ui-kitten/components';
import Screen4 from '../../screens/screen-4';

const Stack4 = createStackNavigator();

export default function SearchStackScreen() {
  return (
    <Stack4.Navigator>
      <Stack4.Screen
        name="4"
        component={Screen4}
        options={{
          header: () => <Text style={{alignSelf: 'center'}}>Stack4</Text>,
        }}
      />
    </Stack4.Navigator>
  );
}
