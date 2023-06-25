import {SimpleGrid, Loader, Container, Center, Text} from '@mantine/core';
import {useEffect} from "react";
import { useParams } from 'react-router-dom';
import { CycleCard } from '../../components/CycleCard/CycleCard';
import { RentForm } from '../../components/RentForm/RentForm';
import {CycleModel} from "../../core/cycles/models/CycleModel";
import {RentFormValues} from "../../core/types/RentFormValues";
import useCycles from "../../hooks/useCycles";
import {emailValidator} from "../../utils/validators/emailValidator";

import { useStyles } from './styles';

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

export function RentPage() {
  const { cycleId } = useParams()
  const { currentCycle, getCycle } = useCycles()

  const { classes } = useStyles();

  useEffect(() => {
    cycleId && getCycle({ id: cycleId })
  }, [cycleId])

  const onSubmitHandler = (values: RentFormValues) => console.log(values)

  return (
    <Container>
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Osur price list section will introduce you to the wide range of rental bikes we offer accompanied by an easy to understand chart showing prices for each bike.
      </Text>
      <Center mt={50}>
        {
          !currentCycle ?
            renderLoader() :
            renderRentCycleSection(currentCycle)
        }
      </Center>
    </Container>
  );

  function renderLoader() {
    return (
        <Loader size="xl" />
      )
  }

  function renderRentCycleSection(cycle: CycleModel) {
    return (
      <SimpleGrid cols={2} spacing="xl"  breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        <CycleCard id={ cycle.id } name={ cycle.name } description={ cycle.description }/>
        <RentForm initialValues={ InitialRentFormValues } validate={ RentFormValidations } onSubmit={ onSubmitHandler }/>
      </SimpleGrid>
    )
  }

}
