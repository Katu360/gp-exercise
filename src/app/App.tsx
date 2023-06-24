import {Container, Title} from '@mantine/core';
import { Outlet } from 'react-router-dom';

import {CycleProvider} from "./core/cycles/context";

import { useStyles } from './styles';

export default function App() {
  const { classes } = useStyles()

  return (
    <Container size="xl" py="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Rent your bike NOW!
        <CycleProvider>
          <Outlet />
        </CycleProvider>
      </Title>

    </Container>
  );
}


