import { Expose } from "class-transformer";

export class CycleRentConditionsModel {

  id!: number;

  @Expose()
  gracePeriod!: number;

  @Expose()
  basePrice!: number;
}