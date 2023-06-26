import { createContext, PropsWithChildren, useEffect, useReducer } from "react";
import { format, isDate } from "date-fns";

import { requestCycle, setCycle, setCycleError } from "../actions";
import { RentRequestModel } from "../models/RentRequestModel";
import { initialState, rentReducer, RentState } from "../reducers/rentReducer";
import { cycleService } from "../services/cycleService";
import { rentService } from "../services/rentService";
import { RentDetailModalItem } from "../types/RentDetailItem";
import { RentFormValues } from "../types/RentFormValues";

interface PresenterContext {
  state: RentState
  getRentRequestDetails: (formValues: RentFormValues) => RentDetailModalItem[]
  saveRentRequest: (formValues: RentFormValues) => Promise<void>
}

interface RentPresenterProps extends PropsWithChildren {
  cycleId?: string
}

export const RentPresenterContext = createContext<PresenterContext>({
  state: initialState,
  getRentRequestDetails: (formValues) => [],
  saveRentRequest: async (formValues) => {}
});

export const RentPresenter = ({ children, cycleId }: RentPresenterProps) => {

  const [ state, dispatch ] = useReducer(rentReducer, initialState)

  useEffect(() => {
    cycleId && getCycleById({ id: cycleId })
  }, [ cycleId ])

  const value: PresenterContext = {
    state,
    getRentRequestDetails,
    saveRentRequest
  };

  return <RentPresenterContext.Provider value={value}>{children}</RentPresenterContext.Provider>;

  async function getCycleById({ id }: { id: string }) {
    dispatch(requestCycle())
    cycleService.getCycle({ id })
      .then(data => dispatch(setCycle(data)))
      .catch(e => dispatch(setCycleError()))
  }

  function createRentRequestFromValues(formValues: RentFormValues): RentRequestModel | undefined {
    if (!state.cycle) {
      return
    }

    const { rentConditions } = state.cycle

    const basePrice = rentService.calculateBasePriceWithOvercharge({
      basePrice: rentConditions.basePrice,
      startingDate: formValues.startingDate as Date
    })

    const rentFinalPrice = rentService.calculateCycleRentFinalPrice({
      basePrice,
      gracePeriod: rentConditions.gracePeriod,
      rentingDays: formValues.rentingDays,
    })

    const rentRequestValues = { ...formValues, finalPrice: rentFinalPrice }

    return rentService.getRentRequestFromValues(rentRequestValues)
  }

  async function saveRentRequest(formValues: RentFormValues) {
    const rentRequestModel = createRentRequestFromValues(formValues)

    if (!rentRequestModel || !state.cycle) {
      return
    }

    rentRequestModel.cycle = state.cycle

    return rentService.saveRentRequest(rentRequestModel)
  }

  function getRentRequestDetails(formValues: RentFormValues): RentDetailModalItem[] {
    const rentRequestModel = createRentRequestFromValues(formValues)

    if (!rentRequestModel) {
      return []
    }

    return Object.keys(rentRequestModel).map((key) => {
      const rentFormValueKey = key as keyof RentRequestModel

      if (isDate(rentRequestModel[ rentFormValueKey ])) {
        return { label: key, value: format(rentRequestModel[ rentFormValueKey ] as Date, 'PPP') }
      }

      return { label: key, value: rentRequestModel[ rentFormValueKey ] }
    }).filter(it => it.value)
  }
};
