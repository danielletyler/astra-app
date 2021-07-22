import React, {useState} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {Text} from '@ui-kitten/components';
import {format, addDays} from 'date-fns';

const Calendar: React.FC<{setCurrentDay: (args: any) => void}> = ({
  setCurrentDay,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(3);

  const currentDay = addDays(new Date(), 0);

  const week = [...Array(7)].map((_, index) => {
    return {
      dayOfWeek: format(addDays(currentDay, index - 3), 'E'),
      day: format(addDays(currentDay, index - 3), 'd'),
      date: addDays(currentDay, index - 3),
    };
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
      }}>
      {week.map((data, index) => {
        const formatDay = format(data.date, 'M-dd-yyyy');
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              if (data.date > new Date()) return;
              setSelectedIndex(index);
              setCurrentDay(formatDay);
            }}>
            <View
              style={
                selectedIndex === index
                  ? {
                      borderWidth: 1,
                      borderColor: 'white',
                      padding: 10,
                      borderRadius: 10,
                      margin: 5,
                      overflow: 'scroll',
                    }
                  : {padding: 10, margin: 5}
              }>
              <Text style={{color: 'white'}}>{data.dayOfWeek}</Text>
              <Text style={{color: 'white'}}>{data.day}</Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default Calendar;
