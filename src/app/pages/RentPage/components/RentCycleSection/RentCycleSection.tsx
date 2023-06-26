import React from "react";
import { Loader,SimpleGrid } from '@mantine/core';
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import { CycleCard } from '../../../../components/CycleCard/CycleCard';
import { RentForm } from '../../../../components/RentForm/RentForm';
import { RentDetailModalItem } from "../../../../core/types/RentDetailItem";
import { RentFormValues } from "../../../../core/types/RentFormValues";
import useCyclePresenter from "../../../../hooks/useCyclePresenter";
import { emailValidator } from "../../../../utils/validators/emailValidator";
import { RentDetailItem } from '../RentDetailItem';
import { RentDetailModal } from "../RentDetailModal";

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
  const { state, getRentRequestDetails, saveRentRequest } = useCyclePresenter()

  const openModal = (items: RentDetailModalItem[], formValues: RentFormValues) => modals.openConfirmModal({
    title: `Rent ${ state.cycle?.name }`,
    children: <RentDetailModal>{ items.map( item => <RentDetailItem key={ item.label }{...item}/>) }</RentDetailModal>,
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onConfirm: () => onModalConfirmHandler(formValues),
  });

  const onSubmitHandler = (values: RentFormValues) => {
    const detailsItem = getRentRequestDetails(values)
    openModal(detailsItem, values)
  }

  const onModalConfirmHandler = async (formValues: RentFormValues) => {
    await saveRentRequest(formValues)
    notifications.show({
      title: 'Your rent has been processed successfully',
      message: 'Hey there, your code is awesome! 🤥',
    })
  }

  if (!state.cycle) {
    return <Loader size="xl" />
  }

  return (
    <SimpleGrid cols={2} spacing="xl"  breakpoints={[ { maxWidth: 'md', cols: 1 } ]}>
      <CycleCard id={ state.cycle.id } name={ state.cycle.name } description={ state.cycle.description } basePrice={ state.cycle.rentConditions.basePrice }/>
      <RentForm initialValues={ InitialRentFormValues } validate={ RentFormValidations } onSubmit={ onSubmitHandler }/>
    </SimpleGrid>
  );

}
