import {CycleModel} from "../models/CycleModel";
import {cycleRepository} from "../repositories/cycleRepository";

class CycleService {

  public async getCyclesList(): Promise<CycleModel[]> {
    return cycleRepository.getCyclesList()
  }
}

export const cycleService = new CycleService()