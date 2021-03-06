export type User = {
  id: string;
  first_name: string;
  last_name: string;
  birthday: string;
  zodiacSign: string;
};

export type InsertUser = {
  id: string;
  first_name: string;
  last_name: string;
  birthday: string;
};

export type UpdateUser = {
  first_name?: string;
  last_name?: string;
  birthday: string;
  zodiacSign?: string;
};

export type UserPrivate = {
  email: string;
};

export type History = {
  date: string;
  feeling: string;
};
