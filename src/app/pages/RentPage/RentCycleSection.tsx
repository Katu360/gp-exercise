import {SimpleGrid, Loader} from '@mantine/core';
import { CycleCard } from '../../components/CycleCard/CycleCard';
import { RentForm } from '../../components/RentForm/RentForm';
import {RentFormValues} from "../../core/types/RentFormValues";
import useCycle from "../../hooks/useCycle";
import {emailValidator} from "../../utils/validators/emailValidator";

const InitialRentFormValues = {
  name: '',
  email: '',
  phoneNumber: '',
  startingDate: null,
  rentingDays: 1,
}

const RentFormValidations = {
  email: emailValidator
}

export function RentCycleSection() {
  const { cycle } = useCycle()

  const onSubmitHandler = (values: RentFormValues) => console.log(values)

  if (!cycle) {
    return <Loader size="xl" />
  }

  console.log(cycle)

  return (
    <SimpleGrid cols={2} spacing="xl"  breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
      <CycleCard id={ cycle.id } name={ cycle.name } description={ cycle.description } basePrice={ cycle.rentConditions.basePrice }/>
      <RentForm initialValues={ InitialRentFormValues } validate={ RentFormValidations } onSubmit={ onSubmitHandler }/>
    </SimpleGrid>
  );
}
