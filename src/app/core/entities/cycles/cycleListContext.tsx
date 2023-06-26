import {createContext, PropsWithChildren, useEffect, useReducer} from "react";
import {requestCycleList, setCycleList, setCycleListError} from "./actions";
import { initialState, cycleListReducer } from "./cycleListReducer";
import { cycleService } from "./services/cycleService";

export const CycleListContext = createContext(initialState);

export const CycleListProvider = ({ children }: PropsWithChildren) => {

  const [ state, dispatch ] = useReducer(cycleListReducer, initialState)

  const getCycleList = async () => {
    dispatch(requestCycleList())
    cycleService.getCyclesList()
      .then(data => dispatch(setCycleList(data)))
      .catch(e => dispatch(setCycleListError()))
  }

  useEffect(() => {
    getCycleList()
  }, [])
  const value: any = {
    ...state
  };

  return <CycleListContext.Provider value={value}>{children}</CycleListContext.Provider>;
};
