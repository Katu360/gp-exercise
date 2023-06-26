import {SimpleGrid, Loader, Title} from '@mantine/core';
import {modals} from "@mantine/modals";
import {notifications} from "@mantine/notifications";
import {format, isDate} from 'date-fns';
import React from "react";
import { CycleCard } from '../../../../components/CycleCard/CycleCard';
import { RentForm } from '../../../../components/RentForm/RentForm';
import { RentDetailModalItem} from "../../../../core/types/RentDetailItem";
import {RentFormValues} from "../../../../core/types/RentFormValues";
import useCycle from "../../../../hooks/useCyclePresenter";
import {calculateRentFinalPrice} from "../../../../utils/calculateRentFinalPrice";
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
  const { state } = useCycle()

  const openModal = (items: RentDetailModalItem[]) => modals.openConfirmModal({
    title: <Title order={2}>Rent { state.cycle?.name }</Title>,
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

  if (!state.cycle) {
    return <Loader size="xl" />
  }

  return (
    <SimpleGrid cols={2} spacing="xl"  breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
      <CycleCard id={ state.cycle.id } name={ state.cycle.name } description={ state.cycle.description } basePrice={ state.cycle.rentConditions.basePrice }/>
      <RentForm initialValues={ InitialRentFormValues } validate={ RentFormValidations } onSubmit={ onSubmitHandler }/>
    </SimpleGrid>
  );

  function calculateRentDetails(values: RentFormValues): RentDetailModalItem[] {
    const rentDetails = Object.keys(values).map((key) => {
      const rentFormValueKey = key as keyof RentFormValues

      if (isDate(values[ rentFormValueKey ])) {
        return { label: key, value: format(values[ rentFormValueKey ] as Date, 'PPP')}
      }

      return { label: key, value: values[ rentFormValueKey ]}
    })

    if (!state.cycle) {
      return rentDetails
    }

    const rentFinalPrice = calculateRentFinalPrice({
      basePrice: state.cycle.rentConditions.basePrice,
      gracePeriod: state.cycle.rentConditions.gracePeriod,
      rentingDays: values.rentingDays,
    })

    rentDetails.push({ label: 'Final price', value: `$ ${rentFinalPrice}` })

    return rentDetails
  }


}
