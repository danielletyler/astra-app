import auth from '@react-native-firebase/auth';
import {DBResult, InsertUser} from '../models/user';
import {validateEmail} from '../components/shared/utils';
import {createUser} from '../controllers/user';

export async function signup(
  email: string,
  password: string,
  insertUserData: InsertUser,
): Promise<DBResult<null>> {
  try {
    const newUser = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    await createUser({...insertUserData, id: newUser.user.uid});

    return {
      status: 'success',
      message: `Account ${email} successfully created.`,
    };
  } catch (error) {
    return {
      status: 'error',
      message: `Account ${email} could not be created: ${error.message}`,
    };
  }
}

export async function login(
  email: string,
  password: string,
): Promise<DBResult<null>> {
  try {
    if (!validateEmail(email)) {
      return {
        status: 'error',
        message: `Email ${email} is not valid.`,
      };
    } else if (!password) {
      return {
        status: 'error',
        message: `Password is not valid.`,
      };
    } else {
      await auth().signInWithEmailAndPassword(email, password);

      return {
        status: 'success',
        message: `${email} has been signed in.`,
      };
    }
  } catch (error) {
    console.error(`${email} could not be signed in: ${error.message}`);
    return {
      status: 'error',
      message: `${email} could not be signed in: ${error.message}`,
    };
  }
}

export async function sendRecoveryEmail(
  email: string,
): Promise<DBResult<null>> {
  if (!validateEmail(email)) {
    return {
      status: 'error',
      message: `Email ${email} is not valid.`,
    };
  } else {
    try {
      await auth().sendPasswordResetEmail(email);
      return {
        status: 'success',
        message: `${email} has been sent a recovery email.`,
      };
    } catch (e) {
      return {
        status: 'error',
        message: `Failed to send ${email} a recovery email.`,
      };
    }
  }
}
