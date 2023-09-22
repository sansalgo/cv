const dialogReducer = (state, action) => {
  switch (action.type) {
    case 'action_d':
      return { ...state, action_d: !state.action_d }
    case 'rename_d':
      return { ...state, rename_d: !state.rename_d }
    default:
      return state
  }
}

export default dialogReducer
