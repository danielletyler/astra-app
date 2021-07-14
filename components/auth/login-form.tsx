import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Button,
  Text,
  Input,
  Layout,
  Icon,
  IconProps,
  Spinner,
  useTheme,
} from '@ui-kitten/components';

import {login} from '../../controllers/auth';
import {validateEmail} from '../shared/utils';

export default function LoginForm() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [info, setInfo] = useState({
    email: '',
    password: '',
    response: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  async function signupPress() {
    navigation.navigate('SignUp');
    Keyboard.dismiss();
  }

  async function loginPress() {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Timeout',
        text2:
          'This seems to be taking too long.  Check your internet connection and try again.',
      });
    }, 7500);
    const result = await login(info.email, info.password);
    if (result.status === 'success') {
      Toast.show({type: 'success', text1: 'Success'});
    } else {
      Toast.show({type: 'error', text1: 'Error', text2: result.message});
    }
    clearTimeout(timeout);
    setLoading(false);
  }

  const showPasswordButton = (props: IconProps) => (
    <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
      <Icon {...props} name={showPassword ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.formGroup}>
          <Text
            category="h3"
            style={{
              textAlign: 'center',
              marginBottom: 20,
              color: theme['color-primary-500'],
              fontWeight: 'bold',
            }}>
            LS-imPACt
          </Text>
          <Input
            style={styles.input}
            placeholder="Email Address"
            value={info.email}
            onChangeText={email =>
              setInfo(prevState => ({
                ...prevState,
                email: email.trim(),
              }))
            }
            status={
              info.email.length === 0 || validateEmail(info.email)
                ? 'basic'
                : 'danger'
            }
            autoCapitalize="none"
          />
          <Text style={styles.response}>{info.response}</Text>
          <Input
            style={styles.input}
            placeholder="Password"
            value={info.password}
            onChangeText={password =>
              setInfo(prevState => ({
                ...prevState,
                password: password,
              }))
            }
            autoCapitalize="none"
            accessoryRight={showPasswordButton}
            secureTextEntry={!showPassword}
            status={
              info.password.length > 0 && info.password.length < 6
                ? 'danger'
                : 'basic'
            }
          />
          <Text style={styles.response}>{info.response}</Text>
          <Button onPress={loginPress} disabled={loading}>
            {loading
              ? () => <Spinner status="control" />
              : evaProps => <Text {...evaProps}>Log In</Text>}
          </Button>

          <View style={styles.signup}>
            <Text>Don't have an account?</Text>
            <Text
              style={{
                marginLeft: 6,
                color: theme['color-primary-500'],
              }}
              onPress={() => signupPress()}>
              Sign up.
            </Text>
          </View>
          <View style={styles.signup}>
            <Text
              style={{color: theme['color-primary-500']}}
              onPress={() => navigation.navigate('ForgotPassword')}>
              Forgot password?
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Layout>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    padding: 48,
  },
  buttons: {
    marginTop: 8,
    backgroundColor: '#008080',
  },
  rememberMe: {
    paddingTop: 24,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    paddingRight: 12,
  },
  signup: {
    paddingTop: 24,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  link: {
    marginLeft: 6,
  },
  response: {
    color: '#d12e3e',
    paddingBottom: 6,
  },
  input: {
    width: '100%',
  },
});
