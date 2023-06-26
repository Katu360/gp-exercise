import {Center, Container, Text} from '@mantine/core';
import {CycleListPresenter} from "../../core/entities/cycles/presenters/CycleListPresenter";
import {CycleListSection} from "./components/CycleListSection";

import { useStyles } from './styles';

export function HomePage() {
  const { classes } = useStyles();

  return (
    <Container>
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Our price list section will introduce you to the wide range of rental bikes we offer accompanied by an easy to understand chart showing prices for each bike.
      </Text>

      <Center mt={50}>
      <CycleListPresenter>
        <CycleListSection />
      </CycleListPresenter>
      </Center>
    </Container>
  );
}
