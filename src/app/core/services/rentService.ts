import {plainToInstance} from "class-transformer";
import {isBefore, set} from "date-fns";
import {calculateRentFinalPrice} from "../../utils/calculateRentFinalPrice";
import { RentRequestModel } from "../models/RentRequestModel";
import {rentRepository} from "../repositories/rentRepository";

class RentService {

  public getRentRequestFromValues(values: Record<string, unknown>): RentRequestModel {
    return plainToInstance(RentRequestModel, values)
  }

  public async saveRentRequest(rentRequest: RentRequestModel) {
    return rentRepository.saveRentRequest(rentRequest)
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

export const rentService = new RentService()