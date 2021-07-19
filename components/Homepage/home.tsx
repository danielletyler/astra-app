import React, {useContext} from 'react';
import {View} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import {UserContext} from '../../config/user-context';
// import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import starsVideo from '../../ios/starsVideo.mp4';
import pinkVideo from '../../ios/pinkVideo.mp4';
import {useNavigation} from '@react-navigation/native';

const Homepage = () => {
  const {user} = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View style={{padding: 20}}>
      <Video
        source={pinkVideo}
        rate={1.0}
        muted={false}
        resizeMode={'cover'}
        repeat
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
      />
      <View>
        <Text style={{fontSize: 30, color: 'white', fontWeight: '700'}}>
          Meditation{' '}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{fontSize: 20, color: 'white'}}>for&nbsp;</Text>
          <Text style={{fontSize: 20, color: 'white'}}>
            {new Date().toDateString()}
          </Text>
        </View>
      </View>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 44,
          fontSize: 20,
          color: 'white',
        }}>
        {user?.zodiacSign.toUpperCase()}
      </Text>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 20,
          fontSize: 15,
          color: 'white',
        }}>
        Current Phenom
      </Text>
      <Text style={{padding: 20, lineHeight: 25, color: 'white'}}>
        Meditation ... Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </Text>
      <View style={{height: '25%'}}></View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Button style={{width: '30%', borderColor: 'white'}}>
          {evaProps => (
            <Text {...evaProps} style={{color: 'white'}}>
              Daily
            </Text>
          )}
        </Button>
        <Button style={{width: '30%', borderColor: 'white'}}>
          {evaProps => (
            <Text {...evaProps} style={{color: 'white'}}>
              Account
            </Text>
          )}
        </Button>
      </View>
    </View>
  );
};

export default Homepage;
