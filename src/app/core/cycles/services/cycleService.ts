import {cycleRepository} from "../repositories/cycleRepository";

class CycleService {

  public async getCyclesList(): Promise<any> {
    return cycleRepository.getCyclesList()
  }
}

export const cycleService = new CycleService()