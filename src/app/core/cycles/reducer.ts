import * as CycleActionType from "../constants/cycleActionTypes";
import {CycleModel} from "./models/CycleModel";

export interface CycleState {
  total: number
  cycles?: CycleModel[]
  isLoading: boolean
  error?: string
  currentCycle?: CycleModel
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

  console.log(type, payload)

  switch (type) {
    case CycleActionType.REQUEST_CYCLE_LIST:
      return { ...state, isLoading: true }
    case CycleActionType.SUCCESS_CYCLE_LIST:
      return { ...state, isLoading: false, cycles: payload as CycleModel[] }
    case CycleActionType.ERROR_CYCLE_LIST:
      return { ...state, isLoading: false }
    case CycleActionType.REQUEST_CYCLE:
      return { ...state, isLoading: true }
    case CycleActionType.SUCCESS_CYCLE:
      return { ...state, isLoading: false, currentCycle: payload as CycleModel }
    case CycleActionType.ERROR_CYCLE:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
