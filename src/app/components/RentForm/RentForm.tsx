import {TextInput, Button, Group, Card, NumberInput} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

import { useForm } from '@mantine/form';
import {FormValidateInput} from "@mantine/form/lib/types";

import { RentFormValues } from '../../core/types/RentFormValues';
import {useStyles} from "./styles";

interface RestFormProps {
  initialValues?: RentFormValues
  validate?: FormValidateInput<RentFormValues>
  onSubmit: ( values: RentFormValues ) => void
}

export function RentForm(props: RestFormProps) {
  const { initialValues, validate, onSubmit } = props

  const form = useForm({ initialValues, validate });

  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.formSection} >
        <form className={ classes.formContainer } onSubmit={ form.onSubmit(onSubmit) }>
          <TextInput
            mt="md"
            label="Name"
            placeholder="Enter your name"
            {...form.getInputProps('name')}
          />
          <TextInput
            mt="md"
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <TextInput
            mt="md"
            label="Phone Number"
            placeholder="+34 123 456 789"
            {...form.getInputProps('phoneNumber')}
          />
          <DatePickerInput
            mt="md"
            popoverProps={{ withinPortal: true }}
            label="Departure date"
            placeholder="When will you leave?"
            minDate={new Date()}
            clearable={false}
            {...form.getInputProps('startingDate')}
          />
          <NumberInput
            min={ 1 }
            max={ 10 }
            mt="md"
            label="Days of rent"
            {...form.getInputProps('rentingDays')}
          />

          <Group position="right" mt="md">
            <Button type="submit">Rent!</Button>
          </Group>
        </form>
      </Card.Section>
    </Card>
  );
}