import { Expose, Type } from "class-transformer";

import { CycleRentConditionsModel } from "./CycleRentConditionsModel";

export class CycleModel {

  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  type!: string;

  @Expose()
  description!: string;

  @Expose()
  @Type(() => CycleRentConditionsModel)
  rentConditions!: CycleRentConditionsModel
}
