import {useContext} from "react";
import {RentPresenterContext} from "../core/entities/cycles/presenters/RentPresenter";


const useCyclePresenter = () => {
  const context = useContext(RentPresenterContext)

  if (context === undefined) {
    throw new Error("useCycle must be used within CycleListContext")
  }

  return context
}

export default useCyclePresenter