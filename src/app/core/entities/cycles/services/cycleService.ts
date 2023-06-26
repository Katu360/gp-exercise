import {isBefore, set } from "date-fns";
import {calculateRentFinalPrice} from "../../../../utils/calculateRentFinalPrice";
import {CycleModel} from "../models/CycleModel";
import {cycleRepository} from "../repositories/cycleRepository";

class CycleService {

  public async getCyclesList(): Promise<CycleModel[]> {
    return cycleRepository.getCyclesList()
  }

  public async getCycle({ id }: { id: string }): Promise<CycleModel> {
    return cycleRepository.getCycle({ id })
  }

  public calculateCycleRentFinalPrice({ basePrice = 0, rentingDays = 0, gracePeriod = 0 }): number {
    return calculateRentFinalPrice({ basePrice, rentingDays, gracePeriod })
  }

  public calculateBasePriceWithOvercharge({ basePrice = 0, startingDate = new Date() }): number {
    const overchargePercentage = Number(process.env.REACT_APP_CYCLE_RENTING_OVERCHARGE_PERCENTAGE)
    const overchargeStartingDay = Number(process.env.REACT_APP_CYCLE_RENTING_OVERCHARGE_STARTING_DAY)

    const overchargeDay = set(startingDate, { date: overchargeStartingDay })

    if (isBefore(startingDate, overchargeDay)) {
      return basePrice
    }

    return basePrice + ( (basePrice * overchargePercentage) / 100 )
  }
}

export const cycleService = new CycleService()