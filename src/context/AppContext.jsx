import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export default function ContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedValue = localStorage.getItem('user');
    return storedValue ? Boolean(JSON.parse(storedValue)) : false;
  });

  const [cart, setCart] = useState(() => {
    const storedValue = localStorage.getItem('cart');
    return storedValue ? JSON.parse(storedValue) : [];
  });

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, cart, setCart }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const value = useContext(AppContext);
  if (!value) throw new Error('Context provider was used outside of context');
  return value;
}
