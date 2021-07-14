export type User = {
  id: string;
};

export type InsertUser = {
  id: string;
};

export type UpdateUser = {};

export type DBResult<T> = {
  status: 'success' | 'error';
  message: string;
  data?: T;
};
