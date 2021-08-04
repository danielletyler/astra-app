import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import Video from 'react-native-video';
import {format} from 'date-fns';

import Gradient from '../../ios/gradient.mp4';
import {UserContext} from '../../config/user-context';
import {getMeditation, getMeditationLazy} from '../../controllers/meditation';
import {Meditation, User, DBResult, MeditationLazy} from '../../models';
import {useEffect} from 'react';
import Calendar2 from './calendar2';
import {addHistory, getHistory} from '../../controllers/user';
// import { Layout } from '@react-navigation/drawer/lib/typescript/src/types';
import NavLayout from '../../components/shared/layout';
// import he from 'date-fns/esm/locale/he/index.js';

const Homepage = () => {
  const date = format(new Date(), 'M-dd-yyyy');
  const [currentDay, setCurrentDay] = useState(date);
  const [feeling, setFeeling] = useState<String | undefined>(undefined);
  const {user} = useContext(UserContext);
  const [synonym, setSynonym] = useState('');
  const headerDate = new Date(currentDay.replaceAll('-', '/'));

  //CORRECT USESTATE FOR WHEN ACTUAL MEDITATIONS BEING MADE DAILY
  // const [currentMeditation, setCurrentMeditation] = useState<
  //   Meditation | undefined
  // >(undefined);

  //CORRECT USE EFFECT FOR WHEN ACTUAL MEDITATIONS ARE BEING MADE DAILY
  // useEffect(() => {
  //   if (!feeling) return;

  //   getMeditation(
  //     user?.zodiacSign as string,
  //     feeling as string,
  //     currentDay,
  //   ).then(res => {
  //     if (!res.data) return;
  //     return setCurrentMeditation(res.data);
  //   });
  // }, [feeling]);

  //using this useState since we arent making mediations everyday
  const [currentMeditation, setCurrentMeditation] = useState<
    MeditationLazy | undefined
  >(undefined);

  //using this useEffect since we arent making mediations everyday
  useEffect(() => {
    const index = Math.floor(Math.random() * 9) + 1;

    if (!feeling) return;

    getMeditationLazy(feeling as string, index).then(res => {
      if (!res.data) return;
      return setCurrentMeditation(res.data);
    });
  }, [feeling]);

  useEffect(() => {
    if (!feeling) return;
    if (!currentMeditation) return;
    addHistory(user as User, {
      date: currentDay,
      feeling: feeling as string,
    });
  }, [feeling]);

  useEffect(() => {
    getHistory(user?.id as string, currentDay).then(r => {
      if (!r.data) return;
      return setFeeling(r.data.feeling);
    });
  }, [currentDay]);

  useEffect(() => {
    getSynonym(feeling as string).then(r => {
      if (!r.data) return;
      return setSynonym(r.data);
    });
  }, [feeling]);

  async function getSynonym(feeling: string): Promise<DBResult<string>> {
    console.log(feeling);
    const good = ['wonderful', 'exceptional', 'pretty valued'];
    const bad = ['pretty down', 'unfortunate', 'discouraged'];
    const neutral = ['so-so', 'questionable', 'just okay'];
    if (feeling == 'good')
      return {
        status: 'success',
        message: '',
        data: good[Math.floor(Math.random() * 2)] as string,
      };
    if (feeling == 'neutral')
      return {
        status: 'success',
        message: '',
        data: neutral[Math.floor(Math.random() * 2)] as string,
      };
    if (feeling == 'bad')
      return {
        status: 'success',
        message: '',
        data: bad[Math.floor(Math.random() * 2)] as string,
      };
    if (feeling == 'default')
      return {status: 'success', message: '', data: '' as string};
    return {status: 'success', message: '', data: '' as string};
  }

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
          <Text
            style={{
              paddingTop: 44,
              fontSize: 30,
              color: 'white',
              fontWeight: '700',
            }}>
            Meditation{' '}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{fontSize: 20, color: 'white'}}>for&nbsp;</Text>
            <Text style={{fontSize: 20, color: 'white'}}>
              {headerDate.toDateString()}
            </Text>
          </View>
        </View>

        {feeling && currentMeditation?.message ? (
          <View>
            <View style={{height: 350}}>
              <Text
                style={{
                  alignSelf: 'center',
                  marginTop: 44,
                  fontSize: 20,
                  color: 'white',
                  paddingTop: 20,
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
              {feeling === 'default' ? (
                <Text></Text>
              ) : (
                <Text
                  style={{
                    paddingTop: 20,
                    paddingHorizontal: 20,
                    lineHeight: 25,
                    color: 'white',
                  }}>
                  As a {user?.zodiacSign as string} you are probably feeling{' '}
                  {synonym}
                </Text>
              )}
              <Text
                style={{
                  paddingHorizontal: 20,
                  paddingBottom: 44,
                  lineHeight: 25,
                  color: 'white',
                }}>
                {currentMeditation?.message as string}
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
