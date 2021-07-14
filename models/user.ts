export type User = {
  id: string;
  first_name: string;
  last_name: string;
  birthdayMonth: number;
  birthdayDay: number;
  zodiacSign: string;
};

export type InsertUser = {
  id: string;
  first_name: string;
  last_name: string;
  birthdayMonth: number;
  birthdayDay: number;
  zodiacSign: string;
};

export type UpdateUser = {};

export type DBResult<T> = {
  status: 'success' | 'error';
  message: string;
  data?: T;
};
