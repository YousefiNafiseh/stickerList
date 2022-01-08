import { ACTIONS } from './actionCreator';

export const INIT_STATE = {
  stickers: [],
  loading: true,
  hasNextPage: true,
  categories:[],
  sorts:[],
  initialized: false
}

export function reducer(state, action) {
  return (ACTION_HANDLERS[action.type] || (() => state))(state, action.payload)
}

const ACTION_HANDLERS = {
  [ACTIONS.SET_LIST_DATA]: handleSetList,
  [ACTIONS.INITIALIZE_STATE]: handleInitializeState
}

function handleSetList(state, payload) {
  return {
    ...state,
    stickers: payload.stickers,
    hasNextPage: payload.hasNextPage,
  }
}

function handleInitializeState(state, payload) {
  return {
    ...state,
    stickers: payload.stickers,
    hasNextPage: payload.hasNextPage,
    categories: payload.categories,
    sorts: payload.sorts,
    initialized: true
  }
}