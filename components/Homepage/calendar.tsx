import React, {useState, useRef} from 'react';
import {View, TouchableWithoutFeedback, Animated} from 'react-native';
import {Text} from '@ui-kitten/components';
import {format, addDays} from 'date-fns';

const Calendar = () => {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const [aValue, setAValue] = useState(140);

  const currentDay = addDays(new Date(), 0);

  const datePosition = [-20, 40, 100, 160, 210, 260, 310];

  const week = [...Array(7)].map((_, index) => {
    return {
      dayOfWeek: format(addDays(currentDay, index - 3), 'E'),
      day: format(addDays(currentDay, index - 3), 'd'),
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
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
      }}>
      <Animated.View
        style={{
          backgroundColor: 'rgba(0,0,0,0.1)',
          width: '20%',
          height: '100%',
          position: 'absolute',
          left: -20,
          transform: [{translateX: marginOf.current}],
          opacity: 1,
          borderRadius: 10,
        }}
      />
      {week.map((data, index) => {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              setSelectedIndex(index);
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
              <Text style={{color: 'white'}}>{data.dayOfWeek}</Text>
              <Text style={{color: 'white'}}>{data.day}</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        );
      })}
    </Animated.View>
  );
};

export default Calendar;
