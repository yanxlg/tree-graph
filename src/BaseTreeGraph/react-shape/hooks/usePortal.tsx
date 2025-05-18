import React, {useCallback, useMemo, useReducer, createContext, ActionDispatch} from 'react'

interface Payload {
  id: string
  portal: React.ReactPortal
}

interface Action {
  type: 'add' | 'remove'
  payload: Partial<Payload>
}

const reducer = (state: Payload[], action: Action) => {
  const payload = action.payload as Payload
  switch (action.type) {
    case 'add': {
      const index = state.findIndex((item) => item.id === payload.id)
      if (index >= 0) {
        state[index] = payload
        return [...state]
      }
      return [...state, payload]
    }
    case 'remove': {
      const index = state.findIndex((item) => item.id === payload.id)
      if (index >= 0) {
        const result = [...state]
        result.splice(index, 1)
        return result
      }
      break
    }
    default: {
      break
    }
  }
  return state
}

export function usePortal(){
  const [items, mutate] = useReducer(reducer, []);

  const portals = useMemo(()=>{
    return items.map((item) => item.portal);
  },[items]);

  const disconnect = useCallback((id: string)=>{
    mutate({ type: 'remove', payload: { id } })
  },[]);

  const connect = useCallback((id: string, portal: React.ReactPortal)=>{
    mutate({ type: 'add', payload: { id, portal } });
  },[]);

  return {
    portals,
    disconnect,
    connect
  };
}
