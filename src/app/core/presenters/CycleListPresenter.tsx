import {createContext, PropsWithChildren, useEffect, useReducer} from "react";
import {requestCycleList, setCycleList, setCycleListError} from "../actions";
import { initialState, cycleListReducer, CycleListState } from "../reducers/cycleListReducer";
import { cycleService } from "../services/cycleService";

interface PresenterContext {
  state: CycleListState
  getCycleList: () => Promise<void>
}

export const CycleListPresenterContext = createContext<PresenterContext>({
  state: initialState,
  getCycleList: async () => {}
});

export const CycleListPresenter = ({ children }: PropsWithChildren) => {

  const [ state, dispatch ] = useReducer(cycleListReducer, initialState)

  useEffect(() => {
    getCycleList()
  }, [])

  const value: any = {
    state,
    getCycleList
  };

  return <CycleListPresenterContext.Provider value={value}>{children}</CycleListPresenterContext.Provider>;

  async function getCycleList() {
    dispatch(requestCycleList())
    cycleService.getCyclesList()
      .then(data => dispatch(setCycleList(data)))
      .catch(e => dispatch(setCycleListError()))
  }

};
