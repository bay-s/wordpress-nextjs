import { createContext } from 'react';
import { GET_ALL_POSTS } from '../source/get-all-post';

export const AuthContext = createContext();

export const StateProvider = ({ children, value }) => {
 
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

 