import AsyncStorage from '@react-native-community/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../service/api';
import * as auth from '../service/auth';

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@RNAuth:user');
      const storageToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storageToken && storageUser) {
        api.defaults.headers.Authorization = `Bearer ${storageToken}`;
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  //Login
  async function signIn() {
    const response = await auth.signIn();

    setUser(response.user);

    /*Em toda requisição da aplicação terá um header default chamado 
    Authirization com o token como conteúdo*/
    api.defaults.headers.Authorization = `Bearer ${response.token}`;

    //Persistindo dados na aplicação
    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
  }

  //Logout
  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

//Criando hook
export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
