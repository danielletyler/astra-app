import React, {useContext, useEffect, useState} from 'react'
import {View, SafeAreaView, ScrollView} from 'react-native'
import {Text, Layout} from '@ui-kitten/components'
import {useTheme} from '@react-navigation/native'
import Calendar from '~components/calendar/calendar'

const Screen4 = () => {
    const theme = useTheme()

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.colors.primary,
            }}>
            <Layout>
                <Calendar />
            </Layout>
        </SafeAreaView>
    )
}

Screen4.navigationOptions = {
    title: 'Messages',
    headerStyle: {
        backgroundColor: '#008080',
        borderBottomWidth: 0,
    },
    headerTintColor: 'white',
}

export default Screen4
