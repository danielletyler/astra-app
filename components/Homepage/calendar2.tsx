import React, {useState, useRef} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from 'react-native';
import {Text} from '@ui-kitten/components';
import {format, addDays} from 'date-fns';

const Calendar: React.FC<{setCurrentDay: (args: any) => void}> = ({
  setCurrentDay,
}) => {
  const seven = Dimensions.get('window').width / 9;
  const [selectedIndex, setSelectedIndex] = useState(4);
  const [aValue, setAValue] = useState(seven * 3);

  const currentDay = addDays(new Date(), 0);

  const datePosition = [seven, seven * 2, seven * 3, seven * 4];

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
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  return (
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
                <Text style={{color: 'white'}}>{data.dayOfWeek}</Text>
                <Text style={{color: 'white'}}>{data.day}</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

export default Calendar;
