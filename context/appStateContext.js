import React, { createContext, useContext } from 'react';

const AppStateContext = createContext({});

const useAppState = () => {
  const appState = useContext(AppStateContext);
  return appState;
}

const Provider = ({ state, ...rest }) => {
  const appState = React.useMemo(() => state, [state]);
  return <AppStateContext.Provider value={appState} {...rest} />
}

export {
  Provider,
  useAppState
}