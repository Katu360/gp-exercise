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
}

export const cycleService = new CycleService()