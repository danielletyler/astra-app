import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {FirestoreCollections} from './firebase-constants';
import {User} from '../models/user';
// import firebase from 'firebase';

export const UserContext = React.createContext<UserProviderType>({
  user: undefined,
  isLoading: true,
  userId: '',
});

type UserProviderType = {
  user: User | undefined;
  isLoading: boolean;
  userId: string;
};

export const UserProvider = ({children}: {children: React.ReactNode}) => (
  <UserContext.Provider value={{...useUser()}}>{children}</UserContext.Provider>
);

function useUser(): UserProviderType {
  const [{user, isLoading}, setUser] = useState<{
    user: User | undefined;
    isLoading: boolean;
  }>({
    user: undefined,
    isLoading: true,
  });
  const [userId, setUserId] = useState('');

  useEffect(() => {
    auth().onAuthStateChanged(userAuth => {
      if (userAuth) setUserId(userAuth.uid);
      else setUser({user: undefined, isLoading: false});
    });
  }, []);

  useEffect(() => {
    if (auth().currentUser?.uid) {
      setUserId(auth().currentUser!.uid);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    firestore()
      .collection(FirestoreCollections.USERS)
      .doc(userId)
      .onSnapshot(doc => {
        setUser({user: doc.data() as User, isLoading: false});
      });
  }, [userId]);

  return {
    user,
    isLoading,
    userId,
  };
}
