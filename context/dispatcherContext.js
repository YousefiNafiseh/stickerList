import React, { createContext, useContext } from 'react';

const DispatcherContext = createContext({});

const useDispatch = () => {
  const appState = useContext(DispatcherContext);
  return appState;
}

const Provider = ({ dispatch, ...rest }) => {
  const dispatcher = React.useMemo(() => dispatch, [dispatch]);
  return <DispatcherContext.Provider value={dispatcher} {...rest} />
}

export {
  Provider,
  useDispatch
}