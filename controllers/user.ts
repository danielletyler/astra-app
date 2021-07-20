import firestore from '@react-native-firebase/firestore';
import {getMonth, getDate} from 'date-fns';

import {
  User,
  InsertUser,
  UpdateUser,
  UserPrivate,
  DBResult,
} from '../models/user';

const usersRef = firestore().collection('users');

export function getZodiacSign(day: number, month: number): string {
  let astro_sign = '';

  // checks month and date within the
  // valid range of a specified zodiac
  if (month == 12) {
    if (day < 22) astro_sign = 'Sagittarius';
    else astro_sign = 'Capricorn';
  } else if (month == 1) {
    if (day < 20) astro_sign = 'Capricorn';
    else astro_sign = 'Aquarius';
  } else if (month == 2) {
    if (day < 19) astro_sign = 'Aquarius';
    else astro_sign = 'Pisces';
  } else if (month == 3) {
    if (day < 21) astro_sign = 'Pisces';
    else astro_sign = 'Aries';
  } else if (month == 4) {
    if (day < 20) astro_sign = 'Aries';
    else astro_sign = 'Taurus';
  } else if (month == 5) {
    if (day < 21) astro_sign = 'Taurus';
    else astro_sign = 'Gemini';
  } else if (month == 6) {
    if (day < 21) astro_sign = 'Gemini';
    else astro_sign = 'Cancer';
  } else if (month == 7) {
    if (day < 23) astro_sign = 'Cancer';
    else astro_sign = 'Leo';
  } else if (month == 8) {
    if (day < 23) astro_sign = 'Leo';
    else astro_sign = 'Virgo';
  } else if (month == 9) {
    if (day < 23) astro_sign = 'Virgo';
    else astro_sign = 'Libra';
  } else if (month == 10) {
    if (day < 23) astro_sign = 'Libra';
    else astro_sign = 'Scorpio';
  } else if (month == 11) {
    if (day < 22) astro_sign = 'Scorpio';
    else astro_sign = 'Sagittarius';
  }

  return astro_sign;
}

export async function createUser(
  user: InsertUser,
  userPrivate: UserPrivate,
): Promise<DBResult<User>> {
  try {
    const birthdate = new Date(user.birthday);
    const month = getMonth(birthdate) + 1;
    const day = getDate(birthdate);
    const dbUser: User = {
      zodiacSign: getZodiacSign(day, month),
      ...user,
    };

    await usersRef.doc(user.id).set(dbUser);

    await usersRef
      .doc(user.id)
      .collection('UserPrivate')
      .doc('UserPrivate')
      .set(userPrivate);

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

export async function getUserPrivate(
  userId: string,
): Promise<DBResult<UserPrivate>> {
  try {
    const userPrivate = await usersRef
      .doc(userId)
      .collection('UserPrivate')
      .doc('UserPrivate')
      .get();
    return {
      status: 'success',
      message: `Succesfully returned userPrivate`,
      data: userPrivate.data() as UserPrivate,
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      message: `Failed to get userPrivate`,
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
