import { useContext } from "react";

import { CycleListPresenterContext } from "../core/presenters/CycleListPresenter";


const useCycleListPresenter = () => {
  const context = useContext(CycleListPresenterContext)

  if (context === undefined) {
    throw new Error("useCycleListPresenter must be used within ShopContext")
  }

  return context
}

export default useCycleListPresenter