import {ERROR_CYCLE_LIST, REQUEST_CYCLE_LIST, SUCCESS_CYCLE_LIST} from "../constants/cycleActionTypes";

export const requestCycleList = () => ({
  type: REQUEST_CYCLE_LIST
});

export const setCycleList = (payload: Record<string, any>) => ({
  type: SUCCESS_CYCLE_LIST,
  payload
});

export const setCycleListError = () => ({
  type: ERROR_CYCLE_LIST
});
