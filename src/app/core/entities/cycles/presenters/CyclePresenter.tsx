import {createContext, PropsWithChildren, useEffect, useReducer} from "react";
import {requestCycle, setCycle, setCycleError} from "../actions";
import {initialState, cycleReducer, CycleState} from "../cycleReducer";
import { cycleService } from "../services/cycleService";

interface PresenterContext {
  state: CycleState
  getCycleById: ({ id }: { id: string }) => Promise<void>
}

interface CyclePresenterProps extends PropsWithChildren {
  cycleId?: string
}

export const CyclePresenterContext = createContext<PresenterContext>({
  state: initialState,
  getCycleById: async({ id }) => {}
});

export const CyclePresenter = ({ children, cycleId }: CyclePresenterProps) => {

  const [ state, dispatch ] = useReducer(cycleReducer, initialState)

  useEffect(() => {
    cycleId && getCycleById({ id: cycleId })
  }, [ cycleId ])

  const value: PresenterContext = {
    state,
    getCycleById
  };

  return <CyclePresenterContext.Provider value={value}>{children}</CyclePresenterContext.Provider>;

  async function getCycleById({ id }: { id: string }) {
    dispatch(requestCycle())
    cycleService.getCycle({ id })
      .then(data => dispatch(setCycle(data)))
      .catch(e => dispatch(setCycleError()))
  }
};
