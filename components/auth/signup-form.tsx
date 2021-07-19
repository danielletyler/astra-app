import React, {useState, useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import {
  Button,
  Text,
  Input,
  Layout,
  Spinner,
  Icon,
  IconProps,
} from '@ui-kitten/components';
import {signup} from '../../controllers/auth';

export default function SignUpForm() {
  const [info, setInfo] = useState({
    email: '',
    password: '',
    confirmpassword: '',
    first_name: '',
    last_name: '',
    birthdayMonth: '',
    birthdayDay: '',
  });
  const [error, setError] = useState({
    type: '',
    response: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    error.type = '';
  }, [info]);

  async function signupPress() {
    function validateEmail(email: string) {
      const regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(String(email).toLowerCase());
    }

    Keyboard.dismiss();

    try {
      if (!validateEmail(info.email))
        setError({
          type: 'email',
          response: 'Please enter a valid email address.',
        });
      else if (info.password.length < 6)
        setError({
          type: 'password',
          response: 'Password must be at least 6 characters long.',
        });
      else if (info.password != info.confirmpassword)
        setError({
          type: 'confirmpassword',
          response: 'Passwords must match.',
        });
      else {
        setIsLoading(true);
        const result = await signup(info.email, info.password, {
          id: '',
          first_name: info.first_name,
          last_name: info.last_name,
          birthdayMonth: info.birthdayMonth,
          birthdayDay: info.birthdayDay,
        });
        if (result.status === 'success') {
          Toast.show({type: 'success', text1: 'Success'});
          setIsLoading(false);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: result.message,
          });
          setIsLoading(false);
          setError({
            type: 'email',
            response: result.message,
          });
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const showPasswordButton = (props: IconProps) => (
    <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
      <Icon {...props} name={showPassword ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  return isLoading ? (
    <Spinner size="giant" />
  ) : (
    <Layout style={styles.root}>
      <KeyboardAvoidingView
        behavior="position"
        contentContainerStyle={styles.formGroup}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text category="h3" style={styles.title}>
              Sign Up
            </Text>
            <View style={styles.names}>
              <Input
                style={styles.inputNames}
                placeholder="First Name*"
                value={info.first_name}
                onChangeText={name =>
                  setInfo(prevState => ({
                    ...prevState,
                    first_name: name,
                  }))
                }
                status={error.type === 'firstname' ? 'danger' : 'basic'}
              />
              <Input
                style={styles.inputNames}
                placeholder="Last Name*"
                value={info.last_name}
                onChangeText={name =>
                  setInfo(prevState => ({
                    ...prevState,
                    last_name: name,
                  }))
                }
                status={error.type === 'lastname' ? 'danger' : 'basic'}
              />
            </View>
            <Text style={styles.response}>
              {error.type === 'firstname' || error.type === 'lastname'
                ? error.response
                : ''}
            </Text>
            <Input
              placeholder="Email Address*"
              value={info.email}
              onChangeText={email =>
                setInfo(prevState => ({
                  ...prevState,
                  email: email,
                }))
              }
              autoCapitalize="none"
              status={error.type === 'email' ? 'danger' : 'basic'}
            />
            <Text style={styles.response}>
              {error.type === 'email' ? error.response : ''}
            </Text>
            <Input
              placeholder="Password*"
              value={info.password}
              onChangeText={value =>
                setInfo(prevState => ({
                  ...prevState,
                  password: value,
                }))
              }
              autoCapitalize="none"
              status={
                error.type === 'password' || error.type === 'confirmpassword'
                  ? 'danger'
                  : 'basic'
              }
              accessoryRight={showPasswordButton}
              secureTextEntry={!showPassword}
            />
            <Text style={styles.response}>
              {error.type === 'password' ? error.response : ''}
            </Text>
            <Input
              placeholder="Confirm Password*"
              value={info.confirmpassword}
              onChangeText={value =>
                setInfo(prevState => ({
                  ...prevState,
                  confirmpassword: value,
                }))
              }
              autoCapitalize="none"
              status={error.type === 'confirmpassword' ? 'danger' : 'basic'}
              secureTextEntry={!showPassword}
            />
            <Text style={styles.response}>
              {error.type === 'confirmpassword' ? error.response : ''}
            </Text>
            <Input
              placeholder="Birth Month as a number*"
              value={info.birthdayMonth}
              onChangeText={value =>
                setInfo(prevState => ({
                  ...prevState,
                  birthdayMonth: value,
                }))
              }
              autoCapitalize="none"
              status={error.type === 'birthmonth' ? 'danger' : 'basic'}
            />
            <Text style={styles.response}>
              {error.type === 'birthmonth' ? error.response : ''}
            </Text>
            <Input
              placeholder="Birth Day*"
              value={info.birthdayDay}
              onChangeText={value =>
                setInfo(prevState => ({
                  ...prevState,
                  birthdayDay: value,
                }))
              }
              autoCapitalize="none"
              status={error.type === 'birthday' ? 'danger' : 'basic'}
            />
            <Text style={styles.response}>
              {error.type === 'birthday' ? error.response : ''}
            </Text>
            <Button onPress={() => signupPress()}>Sign Up</Button>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    width: '100%',
  },
  formGroup: {
    width: '85%',
  },
  title: {
    paddingBottom: 24,
    paddingTop: 24,
    textAlign: 'center',
  },
  response: {
    color: '#d12e3e',
    paddingBottom: 6,
    fontSize: 13,
  },
  buttons: {
    backgroundColor: '#008080',
    marginTop: 8,
  },
  names: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputNames: {
    width: '49%',
  },
});
