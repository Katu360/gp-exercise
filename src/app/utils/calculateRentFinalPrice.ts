
interface CalculateRentFinalPriceParams {
  basePrice: number
  rentingDays: number
  gracePeriod?: number
}

export function calculateRentFinalPrice({ basePrice, rentingDays, gracePeriod = 0 }: CalculateRentFinalPriceParams): number {
  let extraCost = 0

  if (rentingDays > gracePeriod) {
      extraCost = basePrice * (rentingDays - gracePeriod)
  }

  return basePrice + extraCost
}