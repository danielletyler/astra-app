import React from 'react';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';

const Homepage = () => {
  return (
    <View style={{padding: 20}}>
      <View>
        <Text style={{fontSize: 30}}>Meditation </Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{fontSize: 20}}>for&nbsp;</Text>
          <Text style={{fontSize: 20}}>Current Day</Text>
        </View>
      </View>
      <Text style={{alignSelf: 'center', marginTop: 44, fontSize: 20}}>
        Zodiac Sign
      </Text>
      <Text style={{alignSelf: 'center', marginTop: 20, fontSize: 15}}>
        Current Phenom
      </Text>
      <Text style={{padding: 20, lineHeight: 25}}>
        Meditation ... Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </Text>
    </View>
  );
};

export default Homepage;
