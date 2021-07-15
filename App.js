import React, {useEffect} from 'react'
import {StatusBar, LogBox} from 'react-native'
import 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import {NavigationContainer, DefaultTheme} from '@react-navigation/native'
import * as eva from '@eva-design/eva'
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import Layout from './components/shared/layout'

import StackNavigator from './components/navigation/stackNavigator'
import {UserProvider} from './config/user-context'

import '@react-native-firebase/app'

LogBox.ignoreAllLogs()

const myTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        dark: false,
        primary: '#944FF4',
        card: '#A165F6',
        text: '#fff',
    },
}

export default function App() {
    useEffect(() => {
        LogBox.ignoreLogs(['Setting a timer'])
    })

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={{...eva}}>
                <UserProvider>
                    <SafeAreaProvider>
                        <NavigationContainer theme={myTheme}>
                            <StatusBar />
                            <Layout>
                                <StackNavigator />
                            </Layout>
                            <Toast ref={ref => Toast.setRef(ref)} />
                        </NavigationContainer>
                    </SafeAreaProvider>
                </UserProvider>
            </ApplicationProvider>
        </>
    )
}
