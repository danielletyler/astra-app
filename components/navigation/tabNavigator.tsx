import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Divider,
  Text,
} from '@ui-kitten/components';

import Stack1Screen from './stack-1';
import Stack2Screen from './stack-2';
import Stack3Screen from './stack-3';
import Stack4Screen from './stack-4';
import {useNavigation} from '@react-navigation/native';

const FirstIcon = () => <Text>One</Text>;
const SecondIcon = () => <Text>Two</Text>;
const ThirdIcon = () => <Text>Three</Text>;
const FourthIcon = () => <Text>Four</Text>;

const BottomTabBar: React.FC<{state: any}> = ({state}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <>
      <Divider />
      <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab
          style={{
            paddingTop: 7,
            paddingBottom: Math.max(insets.bottom, 10),
          }}
          icon={FirstIcon}
        />
        <BottomNavigationTab
          style={{
            paddingTop: 7,
            paddingBottom: Math.max(insets.bottom, 10),
          }}
          icon={SecondIcon}
        />
        <BottomNavigationTab
          style={{
            paddingTop: 7,
            paddingBottom: Math.max(insets.bottom, 10),
          }}
          icon={ThirdIcon}
        />
        <BottomNavigationTab
          style={{
            paddingTop: 7,
            paddingBottom: Math.max(insets.bottom, 10),
          }}
          icon={FourthIcon}
        />
      </BottomNavigation>
    </>
  );
};

export default function TabNavigator() {
  const {Navigator, Screen} = createBottomTabNavigator();

  return (
    <Navigator
      tabBar={props => <BottomTabBar {...props} />}
      initialRouteName={'Profile'}>
      <Screen name="1" component={Stack1Screen} />
      <Screen name="2" component={Stack2Screen} />
      <Screen name="3" component={Stack3Screen} />
      <Screen name="4" component={Stack4Screen} />
    </Navigator>
  );
}
