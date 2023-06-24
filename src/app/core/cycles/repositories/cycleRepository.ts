import {plainToInstance} from "class-transformer";
import {CycleModel} from "../models/CycleModel";

class CycleRepository {

  public async getCyclesList(): Promise<CycleModel[]> {
    const response: { data: Object[] } = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/bicycle`).then( response => response.json())

    return plainToInstance(CycleModel, response.data)
  }
}

export const cycleRepository = new CycleRepository()