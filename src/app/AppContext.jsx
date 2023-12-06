"use client";
import { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState({user:{}});
  const [authToken, setAuthToken ] = useState('');
  const [chatWith, setChatWith ] = useState({});
  const [currentFriend, setCurrentFriend ] = useState(5);

  return (
    <AppContext.Provider value={{ globalData, setGlobalData,authToken, setAuthToken,chatWith, setChatWith,currentFriend, setCurrentFriend }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };