import {CycleModel} from "../models/CycleModel";
import {cycleRepository} from "../repositories/cycleRepository";

class CycleService {

  public async getCyclesList(): Promise<CycleModel[]> {
    return cycleRepository.getCyclesList()
  }

  public async getCycle({ id }: { id: string }): Promise<CycleModel> {
    return cycleRepository.getCycle({ id })
  }
}

export const cycleService = new CycleService()