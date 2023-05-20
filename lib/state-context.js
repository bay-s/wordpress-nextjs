import { createContext, useEffect } from 'react';
 
export const AuthContext = createContext();

export const StateProvider = ({ children, value }) => {
 
  return (
    <AuthContext.Provider value={value} >
      {children}
    </AuthContext.Provider>
  );
};

 