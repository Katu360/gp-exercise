import {useContext} from "react";
import {CycleContext} from "../core/entities/cycles/cycleContext";


const useCycle = () => {
  const context = useContext(CycleContext)

  if (context === undefined) {
    throw new Error("useCycle must be used within CycleListContext")
  }

  return context
}

export default useCycle