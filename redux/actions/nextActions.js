import * as action_types from './action_types.js'

export const serverRenderClock = (isServer) => dispatch => {
    return dispatch({ type: action_types.TICK, light: !isServer, ts: Date.now() })
  }
  
export const startClock = dispatch => {
  return setInterval(() => {
    // Dispatch `TICK` every 1 second
    dispatch({ type: action_types.TICK, light: true, ts: Date.now() })
  }, 1000)
}

export const incrementCount = () => dispatch => {
  return dispatch({ type: action_types.INCREMENT })
}

export const decrementCount = () => dispatch => {
  return dispatch({ type: action_types.DECREMENT })
}

export const resetCount = () => dispatch => {
  return dispatch({ type: action_types.RESET })
}
  
