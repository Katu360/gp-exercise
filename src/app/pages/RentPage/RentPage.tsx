import {Container, Center, Text} from '@mantine/core';
import { useParams } from 'react-router-dom';
import {CyclePresenter} from "../../core/entities/cycles/presenters/CyclePresenter";
import {RentCycleSection} from "./components/RentCycleSection";

import { useStyles } from './styles';

export function RentPage() {
  const { cycleId } = useParams()

  const { classes } = useStyles();

  return (
    <Container>
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Osur price list section will introduce you to the wide range of rental bikes we offer accompanied by an easy to understand chart showing prices for each bike.
      </Text>
      <Center mt={50}>
        <CyclePresenter cycleId={ cycleId }>
          <RentCycleSection />
        </CyclePresenter>
      </Center>
    </Container>
  );

}
