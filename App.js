import React, {useEffect} from 'react';
import {StatusBar, LogBox} from 'react-native';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import DrawerNavigator from './components/navigation/drawer-navigator.tsx';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {UserProvider} from './config/user-context';

import '@react-native-firebase/app';

LogBox.ignoreAllLogs();

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['Setting a timer']);
  });

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva}}>
        <UserProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar />
              <DrawerNavigator />
              <Toast ref={ref => Toast.setRef(ref)} />
            </NavigationContainer>
          </SafeAreaProvider>
        </UserProvider>
      </ApplicationProvider>
    </>
  );
}
