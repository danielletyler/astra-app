import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {View} from 'react-native';

import {User, InsertUser, UpdateUser, DBResult} from '../models/user';

const usersRef = firestore().collection('users');

export function getZodiacSign(day: number, month: number): string {
  let astro_sign = '';

  // checks month and date within the
  // valid range of a specified zodiac
  if (month == 12) {
    if (day < 22) astro_sign = 'Sagittarius';
    else astro_sign = 'capricorn';
  } else if (month == 1) {
    if (day < 20) astro_sign = 'Capricorn';
    else astro_sign = 'aquarius';
  } else if (month == 2) {
    if (day < 19) astro_sign = 'Aquarius';
    else astro_sign = 'pisces';
  } else if (month == 3) {
    if (day < 21) astro_sign = 'Pisces';
    else astro_sign = 'aries';
  } else if (month == 4) {
    if (day < 20) astro_sign = 'Aries';
    else astro_sign = 'taurus';
  } else if (month == 5) {
    if (day < 21) astro_sign = 'Taurus';
    else astro_sign = 'gemini';
  } else if (month == 6) {
    if (day < 21) astro_sign = 'Gemini';
    else astro_sign = 'cancer';
  } else if (month == 7) {
    if (day < 23) astro_sign = 'Cancer';
    else astro_sign = 'leo';
  } else if (month == 8) {
    if (day < 23) astro_sign = 'Leo';
    else astro_sign = 'virgo';
  } else if (month == 9) {
    if (day < 23) astro_sign = 'Virgo';
    else astro_sign = 'libra';
  } else if (month == 10) {
    if (day < 23) astro_sign = 'Libra';
    else astro_sign = 'scorpio';
  } else if (month == 11) {
    if (day < 22) astro_sign = 'scorpio';
    else astro_sign = 'sagittarius';
  }

  return astro_sign;
}

export async function createUser(user: InsertUser): Promise<DBResult<User>> {
  try {
    const dbUser: User = {
      ...user,
      first_name: '',
      last_name: '',
      birthdayMonth: 0,
      birthdayDay: 0,
      zodiacSign: getZodiacSign(user.birthdayDay, user.birthdayMonth),
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
