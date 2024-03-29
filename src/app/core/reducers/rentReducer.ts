import * as CycleActionType from "../constants/cycleActionTypes";
import { CycleModel } from "../models/CycleModel";

export interface RentState {
  isLoading: boolean
  error?: string
  cycle?: CycleModel
}

export interface RentActions {
  type: string,
  payload?: Record<string, any>
}

export const initialState: RentState = {
  isLoading: false,
};

export const rentReducer = (state: RentState, action: RentActions) => {
  const { type, payload } = action

  switch (type) {
    case CycleActionType.REQUEST_CYCLE:
      return { ...state, isLoading: true }
    case CycleActionType.SUCCESS_CYCLE:
      return { ...state, isLoading: false, cycle: payload as CycleModel }
    case CycleActionType.ERROR_CYCLE:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
