import React, {useState, useContext, useEffect} from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from '@ui-kitten/components';
import {FlatGrid} from 'react-native-super-grid';
import {getAllHistory} from '../../controllers/user';
import {UserContext} from '../../config/user-context';
import {History} from '~models/user';
import NavLayout from '../../components/shared/layout';

const Overview = () => {
  const {user} = useContext(UserContext);
  const [data, setData] = useState<History[]>([]);

  function getColor(feeling: string): string {
    if (feeling == 'good') return '#79edbf';
    if (feeling == 'neutral') return '#f2f18d';
    if (feeling == 'bad') return '#f28dab';
    return 'grey';
  }

  useEffect(() => {
    getAllHistory(user?.id as string).then(res => {
      if (!res.data) return;
      return setData(res.data);
    });
  }, []);

  return (
    <LinearGradient
      style={{height: '100%'}}
      colors={['#f0e390', '#e879d2', '#80ade0']}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}>
      <NavLayout>
        <View style={{padding: 20}}>
          <Text
            style={{
              color: 'white',
              fontSize: 25,
              fontWeight: '700',
              paddingBottom: 5,
            }}>
            Yearly Overview
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                paddingRight: 5,
              }}>
              Starting with
            </Text>

            {data[0] ? (
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  paddingRight: 5,
                }}>
                {data[0].date}
              </Text>
            ) : (
              <Text>no start date</Text>
            )}
          </View>
          <View style={{paddingTop: 20}}>
            <FlatGrid
              itemDimension={25}
              data={data}
              renderItem={({item}) => (
                <View
                  style={{
                    backgroundColor: getColor(item.feeling),
                    padding: 5,
                    borderRadius: 20,
                  }}>
                  <Text style={{color: 'black'}}>{}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </NavLayout>
    </LinearGradient>
  );
};

export default Overview;
