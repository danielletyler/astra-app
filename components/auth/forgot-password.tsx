import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button} from '@ui-kitten/components';

import {sendRecoveryEmail} from '../../controllers/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [email]);

  async function recover() {
    const result = await sendRecoveryEmail(email);

    if (result.status === 'success') {
      // TODO: Replace with toast
      console.log('Recovery email sent.');
    } else {
      console.log(`Error: ${result.message}`);
    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.textview}>
        <Text style={styles.header}>Password Reset</Text>
        <Text style={styles.instructions}>
          Enter a recovery email below and reset instructions will be sent to
          you.
        </Text>
        <Input
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={email => setEmail(email)}
          autoCapitalize="none"
          status={error ? 'danger' : 'basic'}
        />
        <View style={styles.error}>
          <Text
            style={error ? {color: 'red', display: 'flex'} : {display: 'none'}}>
            Please enter a valid email.
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button disabled={!email} onPress={() => recover()}>
          Send Recovery Email
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    color: 'blue',
    marginLeft: 6,
  },
  root: {
    marginTop: '5%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    height: 20,
    marginBottom: 24,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: 24,
  },
  instructions: {
    paddingBottom: 24,
  },
  textview: {
    width: '80%',
  },
  spinner: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10%',
  },
});
