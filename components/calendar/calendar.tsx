import React, {useContext, useEffect, useState} from 'react'
import {
    View,
    SafeAreaView,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native'
import {Text, Layout, withStyles} from '@ui-kitten/components'
import {useTheme} from '@react-navigation/native'
import {format, addDays} from 'date-fns'
import {option, options} from 'yargs'
// import LinearGradient from 'react-native-linear-gradient'

const Calendar = () => {
    const theme = useTheme()

    const [isH, setIsH] = useState(false)

    const [selectedIndex, setSelectedIndex] = useState(-1)

    const currentDay = addDays(new Date(), 0)

    const week = [...Array(7)].map((_, index) => {
        return {
            dayOfWeek: format(addDays(currentDay, index - 3), 'E'),
            day: format(addDays(currentDay, index - 3), 'd'),
        }
    })

    return (
        <View
            style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
            }}>
            {week.map((data, index) => {
                return (
                    // <LinearGradient
                    //     colors={['blue, yellow', 'green']}
                    //     style={{flex: 1}}>
                    <TouchableWithoutFeedback
                        onPress={() => setSelectedIndex(index)}>
                        <View
                            style={
                                selectedIndex === index
                                    ? {
                                          backgroundColor: theme.colors.card,
                                          padding: 10,
                                          borderRadius: 10,
                                          margin: 5,
                                          overflow: 'scroll',
                                      }
                                    : {padding: 10, margin: 5}
                            }>
                            <Text style={{color: theme.colors.text}}>
                                {data.dayOfWeek}
                            </Text>
                            <Text style={{color: theme.colors.text}}>
                                {data.day}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    // </LinearGradient>
                )
            })}
        </View>
    )
}

export default Calendar
