export type User = {
  id: string;
  first_name: string;
  last_name: string;
  birthdayMonth: string;
  birthdayDay: string;
  zodiacSign: string;
};

export type InsertUser = {
  id: string;
  first_name: string;
  last_name: string;
  birthdayMonth: string;
  birthdayDay: string;
};

export type UpdateUser = {
  first_name?: string;
  last_name?: string;
  birthdayMonth?: string;
  birthdayDay?: string;
  zodiacSign?: string;
};

export type DBResult<T> = {
  status: 'success' | 'error';
  message: string;
  data?: T;
};
