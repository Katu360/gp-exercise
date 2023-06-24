import {useContext} from "react";
import {CycleContext} from "../core/cycles/context";


const useCycles = () => {
  const context = useContext(CycleContext)

  if (context === undefined) {
    throw new Error("useCycles must be used within ShopContext")
  }

  return context
}

export default useCycles