export const ACTIONS = {
  SET_LIST_DATA:'INITIALIZE_LIST',
  INITIALIZE_STATE:'INITIALIZE_STATE',
}

export const initializeState = (data) => ({ type: ACTIONS.INITIALIZE_STATE, payload: data  });
export const setListData = (data) => ({ type: ACTIONS.SET_LIST_DATA, payload: data  });
