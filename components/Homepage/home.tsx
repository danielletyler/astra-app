import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import Video from 'react-native-video';
import {format} from 'date-fns';

import Gradient from '../../ios/gradient.mp4';
import {UserContext} from '../../config/user-context';
import {getMeditation} from '../../controllers/meditation';
import {Meditation, User} from '../../models';
import {useEffect} from 'react';
import Calendar from './calendar';
import Calendar2 from './calendar2';
import {addHistory, getHistory} from '../../controllers/user';
// import { Layout } from '@react-navigation/drawer/lib/typescript/src/types';
import NavLayout from '../../components/shared/layout';

const Homepage = () => {
  const date = format(new Date(), 'M-dd-yyyy');
  const [currentDay, setCurrentDay] = useState(date);
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
      currentDay,
    ).then(res => {
      if (!res.data) return;
      return setCurrentMeditation(res.data);
    });
  }, [feeling]);

  useEffect(() => {
    if (!feeling) return;
    // if (!currentMeditation) return;
    addHistory(user as User, {
      date: currentDay,
      feeling: feeling as string,
    });
  }, [feeling]);

  useEffect(() => {
    getHistory(user?.id as string, currentDay).then(r => {
      if (!r.data) return setFeeling('default');
      return setFeeling(r.data.feeling);
    });
  }, [currentDay]);

  return (
    <View style={{paddingBottom: 20, height: '100%'}}>
      <Video
        source={Gradient}
        rate={0.5}
        resizeMode={'cover'}
        repeat={true}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      <NavLayout>
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <Text style={{fontSize: 30, color: 'white', fontWeight: '700'}}>
            Meditation{' '}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{fontSize: 20, color: 'white'}}>for&nbsp;</Text>
            <Text style={{fontSize: 20, color: 'white'}}>{currentDay}</Text>
          </View>
        </View>

        {feeling && currentMeditation?.message ? (
          <View>
            <View style={{height: 400}}>
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
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </Text>
            </View>
            {/* <Calendar setCurrentDay={setCurrentDay} /> */}
            <Calendar2 setCurrentDay={setCurrentDay} />
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
      </NavLayout>
      <View style={{height: '20%'}}></View>
    </View>
  );
};

export default Homepage;
