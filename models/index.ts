export * from '~models/user';
export * from '~models/meditation';

export type DBResult<T> = {
  status: 'success' | 'error';
  message: string;
  data?: T;
};
