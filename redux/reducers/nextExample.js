import * as action_types from "../actions/action_types.js"


const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0
}


export const nextExample = (state = exampleInitialState, action) => {
    switch (action.type) {
      case action_types.TICK:
        return Object.assign({}, state, {
          lastUpdate: action.ts,
          light: !!action.light
        })
      case action_types.INCREMENT:
        return Object.assign({}, state, {
          count: state.count + 1
        })
      case action_types.DECREMENT:
        return Object.assign({}, state, {
          count: state.count - 1
        })
      case action_types.RESET:
        return Object.assign({}, state, {
          count: exampleInitialState.count
        })
      default: return state
    }
  }