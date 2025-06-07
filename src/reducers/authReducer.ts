
import { User } from 'firebase/auth';


export type AuthState = {
  user: User | null;
  loading: boolean;
};


export type AuthAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'REMOVE_USER' }
  | { type: 'SET_LOADING'; payload: boolean };


export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false };
    case 'REMOVE_USER':
      return { ...state, user: null, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
