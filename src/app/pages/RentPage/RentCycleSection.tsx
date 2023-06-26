import {SimpleGrid, Loader, Title} from '@mantine/core';
import {modals} from "@mantine/modals";
import {notifications} from "@mantine/notifications";
import React from "react";
import { CycleCard } from '../../components/CycleCard/CycleCard';
import { RentForm } from '../../components/RentForm/RentForm';
import { RentDetailModalItem} from "../../core/types/RentDetailItem";
import {RentFormValues} from "../../core/types/RentFormValues";
import useCycle from "../../hooks/useCycle";
import {emailValidator} from "../../utils/validators/emailValidator";
import { RentDetailItem } from './components/RentDetailItem';
import {RentDetailModal} from "./RentDetailModal";

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

  const openModal = (items: RentDetailModalItem[]) => modals.openConfirmModal({
    title: <Title order={2}>Rent { cycle?.name }</Title>,
    children: <RentDetailModal>{ items.map( item => <RentDetailItem {...item}/>) }</RentDetailModal>,
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onConfirm: onModalConfirmHandler,
  });

  const onSubmitHandler = (values: RentFormValues) => {
    const detailsItem = calculateRentDetails(values)
    openModal(detailsItem)
  }

  const onModalConfirmHandler = () => {
    notifications.show({
      title: 'Your rent has been processed successfully',
      message: 'Hey there, your code is awesome! 🤥',
    })
  }

  if (!cycle) {
    return <Loader size="xl" />
  }

  return (
    <SimpleGrid cols={2} spacing="xl"  breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
      <CycleCard id={ cycle.id } name={ cycle.name } description={ cycle.description } basePrice={ cycle.rentConditions.basePrice }/>
      <RentForm initialValues={ InitialRentFormValues } validate={ RentFormValidations } onSubmit={ onSubmitHandler }/>
    </SimpleGrid>
  );

  function calculateRentDetails(values: RentFormValues): RentDetailModalItem[] {
    const rentDetails = [
      { label: 'Name', value: values.name },
      { label: 'Email', value: values.email },
      { label: 'Phone number', value: values.phoneNumber },
      { label: 'Starting renting day', value: values.startingDate },
      { label: 'Renting days', value: values.rentingDays }
    ]

    return rentDetails
  }


}
