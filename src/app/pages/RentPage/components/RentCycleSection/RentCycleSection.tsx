import {SimpleGrid, Loader, Title} from '@mantine/core';
import {modals} from "@mantine/modals";
import {notifications} from "@mantine/notifications";
import React from "react";
import { CycleCard } from '../../../../components/CycleCard/CycleCard';
import { RentForm } from '../../../../components/RentForm/RentForm';
import { RentDetailModalItem} from "../../../../core/types/RentDetailItem";
import {RentFormValues} from "../../../../core/types/RentFormValues";
import useCyclePresenter from "../../../../hooks/useCyclePresenter";
import {emailValidator} from "../../../../utils/validators/emailValidator";
import { RentDetailItem } from '../RentDetailItem';
import {RentDetailModal} from "../RentDetailModal";

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
  const { state, calculateCycleRentDetails } = useCyclePresenter()

  const openModal = (items: RentDetailModalItem[]) => modals.openConfirmModal({
    title: <Title order={2}>Rent { state.cycle?.name }</Title>,
    children: <RentDetailModal>{ items.map( item => <RentDetailItem {...item}/>) }</RentDetailModal>,
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onConfirm: onModalConfirmHandler,
  });

  const onSubmitHandler = (values: RentFormValues) => {
    const detailsItem = calculateCycleRentDetails(values)
    openModal(detailsItem)
  }

  const onModalConfirmHandler = () => {
    notifications.show({
      title: 'Your rent has been processed successfully',
      message: 'Hey there, your code is awesome! 🤥',
    })
  }

  if (!state.cycle) {
    return <Loader size="xl" />
  }

  return (
    <SimpleGrid cols={2} spacing="xl"  breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
      <CycleCard id={ state.cycle.id } name={ state.cycle.name } description={ state.cycle.description } basePrice={ state.cycle.rentConditions.basePrice }/>
      <RentForm initialValues={ InitialRentFormValues } validate={ RentFormValidations } onSubmit={ onSubmitHandler }/>
    </SimpleGrid>
  );

}
