import React, {useContext} from 'react';
import {View} from 'react-native';
import {Text, Avatar, Input} from '@ui-kitten/components';
import {UserContext} from '../config/user-context';
import defaultProfile from '../images/default_avatar.jpg';
import LinearGradient from 'react-native-linear-gradient';
import NavLayout from '../components/shared/layout';

const Profile = () => {
  const {user} = useContext(UserContext);
  const {email} = useContext(UserContext);

  const bday = new Date(user?.birthday as string);

  return (
    <LinearGradient
      style={{height: '100%'}}
      colors={['#f0e390', '#e879d2', '#80ade0']}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}>
      <NavLayout>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '80%',
              padding: 20,
              paddingTop: 40,
            }}>
            <Avatar source={defaultProfile} size="large" />
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 25,
                    paddingRight: 5,
                    paddingBottom: 10,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  {user?.first_name}
                </Text>
                <Text
                  style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>
                  {user?.last_name}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{flexDirection: 'column', paddingTop: 20, paddingLeft: 44}}>
            <Text style={{paddingRight: 5, color: 'white', fontWeight: 'bold'}}>
              Email:
            </Text>
            <Text style={{color: 'white'}}>{email}</Text>
          </View>
          <View
            style={{flexDirection: 'column', paddingTop: 20, paddingLeft: 44}}>
            <Text style={{paddingRight: 5, color: 'white', fontWeight: 'bold'}}>
              Birthday:
            </Text>
            <Text style={{color: 'white'}}>{bday.toLocaleDateString()}</Text>
          </View>
          <View
            style={{flexDirection: 'column', paddingTop: 20, paddingLeft: 44}}>
            <Text style={{paddingRight: 5, color: 'white', fontWeight: 'bold'}}>
              Field 3:
            </Text>
            <Text style={{color: 'white'}}>field 3 content</Text>
          </View>
          <View style={{padding: 44}}>
            <Text
              style={{
                fontWeight: 'bold',
                paddingBottom: 10,
                color: 'white',
                fontSize: 20,
              }}>
              Change Password
            </Text>
            <View
              style={{flexDirection: 'column', paddingVertical: 10}}
              width="100%">
              <Text style={{paddingTop: 5, color: 'white', fontWeight: 'bold'}}>
                Current Password:{' '}
              </Text>
              <Input
                style={{
                  borderColor: 'transparent',
                  borderBottomWidth: 2,
                  borderBottomColor: 'white',
                  borderRadius: 0,
                  flex: 1,
                }}
                placeholder="current password"
                color="white"
                placeholderTextColor="rgba(255, 255, 255, .50)"
                size="small"></Input>
            </View>
            <View
              style={{flexDirection: 'column', paddingVertical: 10}}
              width="100%">
              <Text
                style={{paddingTop: 20, color: 'white', fontWeight: 'bold'}}>
                New Password:{' '}
              </Text>
              <Input
                style={{
                  borderColor: 'transparent',
                  borderBottomWidth: 2,
                  borderBottomColor: 'white',
                  borderRadius: 0,
                  flex: 1,
                }}
                placeholder="new password"
                color="white"
                placeholderTextColor="rgba(255, 255, 255, .50)"
                size="small"></Input>
            </View>
            <View style={{flexDirection: 'column', paddingVertical: 10}}>
              <Text
                style={{color: 'white', paddingTop: 20, fontWeight: 'bold'}}>
                Repeat New Password:{' '}
              </Text>
              <Input
                style={{
                  borderColor: 'transparent',
                  borderBottomWidth: 2,
                  borderBottomColor: 'white',
                  borderRadius: 0,
                  flex: 1,
                }}
                placeholder="new password"
                color="white"
                placeholderTextColor="rgba(255, 255, 255, .50)"
                size="small"></Input>
            </View>
            <LinearGradient
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}
              colors={['#E840F4', '#EC65F6']}
              style={{
                alignSelf: 'center',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                marginTop: 40,
              }}>
              <Text style={{color: 'white'}}>Change</Text>
            </LinearGradient>
          </View>
        </View>
      </NavLayout>
    </LinearGradient>
  );
};

export default Profile;
