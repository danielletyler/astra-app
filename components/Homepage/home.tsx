import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import Video from 'react-native-video';
import auth from '@react-native-firebase/auth';

import Gradient from '../../ios/gradient.mp4';
import {UserContext} from '../../config/user-context';
import {getMeditation} from '../../controllers/meditation';
import {Meditation} from '~models/meditation';
import {useEffect} from 'react';
import Calendar from './calendar';

const Homepage = () => {
  const [feeling, setFeeling] = useState<String | undefined>(undefined);

  const {user} = useContext(UserContext);
  const [currentMeditation, setCurrentMeditation] = useState<
    Meditation | undefined
  >(undefined);

  useEffect(() => {
    if (!feeling) return;

    getMeditation(
      user?.zodiacSign as string,
      feeling as string,
      '7-21-2021',
    ).then(res => {
      if (!res.data) return;
      return setCurrentMeditation(res.data);
    });
  }, [feeling]);

  return (
    <View style={{padding: 20, height: '100%'}}>
      <Video
        source={Gradient}
        rate={0.5}
        resizeMode={'cover'}
        repeat
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
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

      {feeling && currentMeditation?.message ? (
        <View>
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
          <Text
            style={{
              padding: 20,
              paddingBottom: 44,
              lineHeight: 25,
              color: 'white',
            }}>
            {currentMeditation?.message as string}... Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur.
          </Text>
          <Calendar />
        </View>
      ) : (
        <View style={{paddingVertical: 44}}>
          <Text
            style={{
              padding: 20,
              paddingTop: 44,
              color: 'white',
              fontSize: 20,
              alignSelf: 'center',
            }}>
            How are you feeling today?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            <Button
              style={{borderColor: 'white'}}
              onPress={() => setFeeling('good')}>
              {evaProps => (
                <Text {...evaProps} style={{color: 'white'}}>
                  Pretty good!
                </Text>
              )}
            </Button>
            <Button
              style={{borderColor: 'white'}}
              onPress={() => setFeeling('neutral')}>
              {evaProps => (
                <Text {...evaProps} style={{color: 'white'}}>
                  Alright
                </Text>
              )}
            </Button>
            <Button
              style={{borderColor: 'white'}}
              onPress={() => setFeeling('bad')}>
              {evaProps => (
                <Text {...evaProps} style={{color: 'white'}}>
                  Not great
                </Text>
              )}
            </Button>
          </View>
        </View>
      )}
      <View style={{height: '20%'}}></View>
    </View>
  );
};

export default Homepage;
