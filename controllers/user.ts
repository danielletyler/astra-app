import firestore from '@react-native-firebase/firestore';

import {User, InsertUser, UpdateUser, DBResult} from '../models/user';

const usersRef = firestore().collection('users');

export async function createUser(user: InsertUser): Promise<DBResult<User>> {
  try {
    const dbUser: User = {
      ...user,
    };

    await usersRef.doc(user.id).set(dbUser);
    return {
      status: 'success',
      message: `Successfully created user with id ${user.id}`,
      data: dbUser,
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      message: `Failed to create user with id ${user.id}: ${e}`,
    };
  }
}

export async function getUser(userId: string): Promise<DBResult<User>> {
  try {
    const user = await usersRef.doc(userId).get();
    return {
      status: 'success',
      message: `Successfully returned user with id ${user.id}`,
      data: user.data() as User,
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      message: `Failed to get user with id ${userId}: ${e}`,
    };
  }
}

export async function updateUser(
  userId: string,
  updateUserData: UpdateUser,
): Promise<DBResult<undefined>> {
  try {
    await usersRef.doc(userId).update({
      ...updateUserData,
    });
    return {
      status: 'success',
      message: `Successfully updated user with id ${userId}`,
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      message: `Failed to update user with id ${userId}: ${e}`,
    };
  }
}

export async function deleteUser(userId: string): Promise<DBResult<undefined>> {
  try {
    await usersRef.doc(userId).delete();
    return {
      status: 'success',
      message: `Successfully deleted user with id ${userId}`,
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      message: `Failed to delete user with id ${userId}: ${e}`,
    };
  }
}
