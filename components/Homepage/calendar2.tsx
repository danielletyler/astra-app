import React, {useState, useRef} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from 'react-native';
import {Text, Button, Layout} from '@ui-kitten/components';
import {format, addDays} from 'date-fns';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
library.add(fab, faAngleLeft, faAngleRight);

const Calendar: React.FC<{setCurrentDay: (args: any) => void}> = ({
  setCurrentDay,
}) => {
  const seven = Dimensions.get('window').width / 8.7;
  const [selectedIndex, setSelectedIndex] = useState(4);
  const [aValue, setAValue] = useState(seven * 4);

  const [weekPosition, setWeekPosition] = useState(0);
  const currentDay = addDays(new Date(), weekPosition);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = months[currentDay.getMonth()];

  const datePosition = [
    seven,
    seven * 2,
    seven * 3,
    seven * 4,
    seven * 5,
    seven * 6,
    seven * 7,
  ];

  const week = [...Array(7)].map((_, index) => {
    return {
      dayOfWeek: format(addDays(currentDay, index - 3), 'E'),
      day: format(addDays(currentDay, index - 3), 'd'),
      date: addDays(currentDay, index - 3),
      left: datePosition[index],
    };
  });
  const marginOf = useRef(new Animated.Value(160));

  React.useEffect(() => {
    slide();
  }, [selectedIndex]);

  const slide = () => {
    Animated.timing(marginOf.current, {
      toValue: aValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Layout level="3">
          <Button
            appearance="ghost"
            onPress={() => setWeekPosition(weekPosition - 7)}
            accessoryLeft={() => (
              <FontAwesomeIcon icon="angle-left" color="white" />
            )}></Button>
        </Layout>
        <Layout level="2" paddingTop={12}>
          <Text style={{color: 'white'}}>{month}</Text>
        </Layout>
        <Layout level="1">
          <Button
            appearance="ghost"
            onPress={() => setWeekPosition(weekPosition + 7)}
            accessoryRight={() => (
              <FontAwesomeIcon icon="angle-right" color="white" />
            )}></Button>
        </Layout>
      </Layout>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View
          style={{
            backgroundColor: 'rgba(0,0,0,0.1)',
            width: '13%',
            height: '100%',
            position: 'absolute',
            left: -10,
            transform: [{translateX: marginOf.current}],
            opacity: 1,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingHorizontal: 44,
          }}>
          {week.map((data, index) => {
            const formatDay = format(data.date, 'M-dd-yyyy');
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  if (data.date > new Date()) return;
                  setSelectedIndex(index);
                  setCurrentDay(formatDay);
                  setAValue(datePosition[index]);
                }}>
                <Animated.View
                  style={
                    selectedIndex === index
                      ? {
                          padding: 10,
                          borderRadius: 10,
                          margin: 5,
                          overflow: 'scroll',
                          zIndex: 99,
                        }
                      : {padding: 10, margin: 5, zIndex: 99}
                  }>
                  <View style={{width: 40}}>
                    <Text style={{color: 'white', alignSelf: 'center'}}>
                      {data.dayOfWeek}
                    </Text>
                    <Text style={{color: 'white', alignSelf: 'center'}}>
                      {data.day}
                    </Text>
                  </View>
                </Animated.View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Calendar;
