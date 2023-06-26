import { Expose, Type } from "class-transformer";

import { CycleModel } from "./CycleModel";

export class RentRequestModel {

  name!: string

  email!: string

  phoneNumber!: string

  rentingDays!: number

  startingDate!: Date

  finalPrice!: number

  @Expose({ toPlainOnly: true })
  @Type(() => CycleModel)
  cycle!: CycleModel
}