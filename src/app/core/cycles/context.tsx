import {createContext, PropsWithChildren, useReducer} from "react";
import {requestCycle, requestCycleList, setCycle, setCycleError, setCycleList, setCycleListError} from "./actions";
import { initialState, userReducer } from "./reducer";
import { cycleService } from "./services/cycleService";

export const CycleContext = createContext({
  ...initialState,
  getCycleList: async () => {},
  getCycle: async({ id }: { id: string }) => {}
});

export const CycleProvider = ({ children }: PropsWithChildren) => {

  const [ state, dispatch ] = useReducer(userReducer, initialState)

  const getCycleList = async () => {
    dispatch(requestCycleList())
    cycleService.getCyclesList()
      .then(data => dispatch(setCycleList(data)))
      .catch(e => dispatch(setCycleListError()))
  }

  const getCycle = async ({ id }: { id: string }) => {
    dispatch(requestCycle())
    cycleService.getCycle({ id })
      .then(data => dispatch(setCycle(data)))
      .catch(e => dispatch(setCycleError()))
  }

  const value: any = {
    ...state,
    getCycleList,
    getCycle
  };

  return <CycleContext.Provider value={value}>{children}</CycleContext.Provider>;
};
