import React, {useState} from 'react';
import * as eva from '@eva-design/eva';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {
  TopNavigation,
  TopNavigationAction,
  Icon,
  Text,
  IconRegistry,
  Button,
  MenuItem,
  OverflowMenu,
  Select,
  SelectItem,
  IndexPath,
  View,
  Card,
  Modal,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faBars, faTimes, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from '@react-navigation/native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Profile from '../../screens/profile.tsx';

import * as RootNavigation from '../../RootNavigation.js';

library.add(fab, faBars, faTimes, faUserCircle);

const Title = () => <Text category="h1">Astra</Text>;

function Account() {
  const navigation = useNavigation();
  return (
    <Button
      appearance="ghost"
      onPress={() => navigation.navigate('Profile')}
      accessoryLeft={() => <FontAwesomeIcon icon="user-circle" />}></Button>
  );
}

// export const ModalSimpleUsageShowcase = ({marg, setMarg}) => {
//   const [visible, setVisible] = useState(false);

//   return (
//     <React.Fragment>
//       <Button
//         onPress={
//           marg === '0%'
//             ? (() => setMarg('50%'), () => setVisible(true))
//             : () => setMarg('0%')
//         }
//         appearance="ghost">
//         <FontAwesomeIcon icon="bars" />
//       </Button>

//       <Modal
//         visible={visible}
//         style={{
//           backgroundColor: 'white',
//           height: '100%',
//           width: '100%',
//         }}>
//         <Button
//           onPress={() => setVisible(false)}
//           appearance="ghost"
//           style={{marginTop: '15%', marginRight: '80%'}}>
//           <FontAwesomeIcon icon="times" />
//         </Button>
//         <Button appearance="ghost">Page 1</Button>
//         <Button appearance="ghost">Page 2</Button>
//         <Button appearance="ghost">Page 3</Button>
//         <Button appearance="ghost">Page 4</Button>
//         <Button appearance="ghost">Page 5</Button>
//       </Modal>
//     </React.Fragment>
//   );
// };

const OpenMenu = () => {
  const navigation = useNavigation();
  return (
    <Button
      onPress={() => navigation.openDrawer()}
      appearance="ghost"
      accessoryLeft={() => <FontAwesomeIcon icon="bars" />}></Button>
  );
};

const Layout: React.FC<{children: any}> = ({children}) => {
  const [marg, setMarg] = useState('0%');
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginLeft: marg,
        position: 'relative',
        paddingTop: '0%',
      }}>
      <TopNavigation
        alignment="center"
        // accessoryLeft={() => (
        //   <ModalSimpleUsageShowcase marg={marg} setMarg={setMarg} />
        // )}
        accessoryLeft={OpenMenu}
        accessoryRight={Account}
        title={Title}
      />
      {children}
    </SafeAreaView>
  );
};

export default Layout;
