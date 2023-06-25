import * as CycleActionType from "../constants/cycleActionTypes";

export const requestCycleList = () => ({
  type: CycleActionType.REQUEST_CYCLE_LIST
});

export const setCycleList = (payload: Record<string, any>) => ({
  type: CycleActionType.SUCCESS_CYCLE_LIST,
  payload
});

export const setCycleListError = () => ({
  type: CycleActionType.ERROR_CYCLE_LIST
});

export const requestCycle = () => ({
  type: CycleActionType.REQUEST_CYCLE
});

export const setCycle = (payload: Record<string, any>) => ({
  type: CycleActionType.SUCCESS_CYCLE,
  payload
});

export const setCycleError = () => ({
  type: CycleActionType.ERROR_CYCLE
});
