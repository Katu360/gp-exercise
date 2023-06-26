import {format, isDate} from "date-fns";
import {createContext, PropsWithChildren, useEffect, useReducer} from "react";
import {RentDetailModalItem} from "../../../types/RentDetailItem";
import {RentFormValues} from "../../../types/RentFormValues";
import {requestCycle, setCycle, setCycleError} from "../actions";
import {initialState, cycleReducer, CycleState} from "../reducers/cycleReducer";
import { cycleService } from "../services/cycleService";

interface PresenterContext {
  state: CycleState
  getCycleById: ({ id }: { id: string }) => Promise<void>
  calculateCycleRentDetails: (formValues: RentFormValues) => RentDetailModalItem[]
}

interface CyclePresenterProps extends PropsWithChildren {
  cycleId?: string
}

export const CyclePresenterContext = createContext<PresenterContext>({
  state: initialState,
  getCycleById: async({ id }) => {},
  calculateCycleRentDetails: (formValues) => []
});

export const CyclePresenter = ({ children, cycleId }: CyclePresenterProps) => {

  const [ state, dispatch ] = useReducer(cycleReducer, initialState)

  useEffect(() => {
    cycleId && getCycleById({ id: cycleId })
  }, [ cycleId ])

  const value: PresenterContext = {
    state,
    getCycleById,
    calculateCycleRentDetails
  };

  return <CyclePresenterContext.Provider value={value}>{children}</CyclePresenterContext.Provider>;

  async function getCycleById({ id }: { id: string }) {
    dispatch(requestCycle())
    cycleService.getCycle({ id })
      .then(data => dispatch(setCycle(data)))
      .catch(e => dispatch(setCycleError()))
  }

  function calculateCycleRentDetails(formValues: RentFormValues): RentDetailModalItem[] {
    const rentDetails = Object.keys(formValues).map((key) => {
      const rentFormValueKey = key as keyof RentFormValues

      if (isDate(formValues[ rentFormValueKey ])) {
        return { label: key, value: format(formValues[ rentFormValueKey ] as Date, 'PPP')}
      }

      return { label: key, value: formValues[ rentFormValueKey ]}
    })

    if (!state.cycle) {
      return rentDetails
    }

    const { rentConditions } = state.cycle

    const basePrice = cycleService.calculateBasePriceWithOvercharge({
      basePrice: rentConditions.basePrice,
      startingDate: formValues.startingDate as Date
    })

    const rentFinalPrice = cycleService.calculateCycleRentFinalPrice({
      basePrice,
      gracePeriod: rentConditions.gracePeriod,
      rentingDays: formValues.rentingDays,
    })

    rentDetails.push({ label: 'Final price', value: `$ ${rentFinalPrice}` })

    return rentDetails
  }
};
