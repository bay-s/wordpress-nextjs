import { createContext } from 'react';
 
export const AuthContext = createContext();

export const StateProvider = ({ children, value }) => {
  console.log(value);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

 
 