import {ERROR_CYCLE_LIST, REQUEST_CYCLE_LIST, SUCCESS_CYCLE_LIST} from "../constants/cycleActionTypes";
import {CycleModel} from "./models/CycleModel";

export interface CycleState {
  total: number
  cycles?: CycleModel[]
  isLoading: boolean
  error?: string
}

export interface CycleActions {
  type: string,
  payload?: Record<string, any>
}

export const initialState: CycleState = {
  total: 0,
  cycles: [],
  isLoading: false,
};

export const userReducer = (state: CycleState, action: CycleActions) => {
  const { type, payload } = action

  switch (type) {
    case REQUEST_CYCLE_LIST:
      return { ...state, isLoading: true }
    case SUCCESS_CYCLE_LIST:
      return { ...state, isLoading: false, cycles: payload as CycleModel[] }
    case ERROR_CYCLE_LIST:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
