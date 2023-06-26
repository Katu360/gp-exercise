import {useContext} from "react";
import {CyclePresenterContext} from "../core/entities/cycles/presenters/CyclePresenter";


const useCyclePresenter = () => {
  const context = useContext(CyclePresenterContext)

  if (context === undefined) {
    throw new Error("useCycle must be used within CycleListContext")
  }

  return context
}

export default useCyclePresenter