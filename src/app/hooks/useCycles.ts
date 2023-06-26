import {useContext} from "react";
import {CycleListContext} from "../core/entities/cycles/cycleListContext";


const useCycles = () => {
  const context = useContext(CycleListContext)

  if (context === undefined) {
    throw new Error("useCycles must be used within ShopContext")
  }

  return context
}

export default useCycles