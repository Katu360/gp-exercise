import {Container, Center, Text} from '@mantine/core';
import { useParams } from 'react-router-dom';
import {CycleProvider} from "../../core/entities/cycles/cycleContext";
import {RentCycleSection} from "./RentCycleSection";

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
        <CycleProvider cycleId={ cycleId }>
          <RentCycleSection />
        </CycleProvider>
      </Center>
    </Container>
  );

}
