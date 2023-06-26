import { plainToInstance } from "class-transformer";

import { CycleModel } from "../models/CycleModel";

class CycleRepository {

  public async getCyclesList(): Promise<CycleModel[]> {
    const response: Object[] = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/bicycle?_expand=rentConditions`).then( response => response.json())

    return plainToInstance(CycleModel, response, { excludeExtraneousValues: true })
  }

  public async getCycle({ id }: { id: string }): Promise<CycleModel> {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/bicycle/${ id }?_expand=rentConditions`).then( response => response.json())

    return plainToInstance(CycleModel, response, { excludeExtraneousValues: true })
  }
}

export const cycleRepository = new CycleRepository()