import {createContext, PropsWithChildren, useEffect, useReducer} from "react";
import {requestCycle, setCycle, setCycleError} from "./actions";
import { initialState, cycleReducer } from "./cycleReducer";
import { cycleService } from "./services/cycleService";

export const CycleContext = createContext(initialState);

interface CycleProviderProps extends PropsWithChildren {
  cycleId?: string
}

export const CycleProvider = ({ children, cycleId }: CycleProviderProps) => {

  const [ state, dispatch ] = useReducer(cycleReducer, initialState)

  const getCycle = async ({ id }: { id: string }) => {
    dispatch(requestCycle())
    cycleService.getCycle({ id })
      .then(data => dispatch(setCycle(data)))
      .catch(e => dispatch(setCycleError()))
  }

  useEffect(() => {
    cycleId && getCycle({ id: cycleId })
  }, [ cycleId ])

  const value: any = {
    ...state,
  };

  return <CycleContext.Provider value={value}>{children}</CycleContext.Provider>;
};
