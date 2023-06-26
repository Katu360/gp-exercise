import * as CycleActionType from "../../../constants/cycleActionTypes";
import {CycleModel} from "../models/CycleModel";

export interface CycleListState {
  cycles?: CycleModel[]
  isLoading: boolean
  error?: string
}

export interface CycleActions {
  type: string,
  payload?: Record<string, any>
}

export const initialState: CycleListState = {
  cycles: [],
  isLoading: false,
};

export const cycleListReducer = (state: CycleListState, action: CycleActions) => {
  const { type, payload } = action

  switch (type) {
    case CycleActionType.REQUEST_CYCLE_LIST:
      return { ...state, isLoading: true }
    case CycleActionType.SUCCESS_CYCLE_LIST:
      return { ...state, isLoading: false, cycles: payload as CycleModel[] }
    case CycleActionType.ERROR_CYCLE_LIST:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
