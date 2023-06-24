
interface AppState {}

interface AppAction {
  type: string
  payload?: unknown
}

export default (state: AppState = {}, action: AppAction = { type: "" }) => {
  switch (action.type) {
    default:
      return state;
  }
};