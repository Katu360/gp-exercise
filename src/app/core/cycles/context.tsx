import {createContext, PropsWithChildren, useEffect, useReducer} from "react";
import {requestCycleList, setCycleList, setCycleListError} from "./actions";
import {CycleState, initialState, userReducer} from "./reducer";
import { cycleService } from "./services/cycleService";

export const CycleContext: React.Context<CycleState> = createContext(initialState);

export const CycleProvider = ({ children }: PropsWithChildren) => {

  const [ state, dispatch ] = useReducer(userReducer, initialState)

  const getCycleList = async () => {
    dispatch(requestCycleList())
    cycleService.getCyclesList()
      .then(data => dispatch(setCycleList(data)))
      .catch(e => dispatch(setCycleListError()))
  }

  useEffect(() => {
    getCycleList()
  }, [])

  const value = {
    ...state,
    getCycleList
  };

  return <CycleContext.Provider value={value}>{children}</CycleContext.Provider>;
};
