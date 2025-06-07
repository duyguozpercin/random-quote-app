import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { createContext, useEffect, useReducer, useContext } from 'react';
import { auth } from './firebase';
import type { User } from 'firebase/auth';
import { authReducer, AuthState, AuthAction } from './reducers/authReducer';
import { ReactNode } from 'react';


type AuthContextType = {
  user: User | null;
  logIn: (email: string, password: string) => Promise<any>;
  createAccount: (email: string, password: string) => Promise<any>;
  logOut: () => Promise<void>;
};


export const AuthContext = createContext<AuthContextType | null>(null);


export const useAuthContext = () => useContext(AuthContext);


const initialState: AuthState = {
  user: null,
  loading: true,
};

type AuthProviderProps = {
  children: ReactNode;
};


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: 'SET_USER', payload: user });
      } else {
        dispatch({ type: 'REMOVE_USER' });
      }
    });

    return () => unsubscribe();
  }, []);

  
  const logIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const createAccount = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logOut = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        logIn,
        createAccount,
        logOut,
      }}
    >
      {!state.loading && children}
    </AuthContext.Provider>
  );
};
