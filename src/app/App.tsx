import { Outlet } from 'react-router-dom';
import { Container, Title } from '@mantine/core';

import { useStyles } from './styles';

export default function App() {
  const { classes } = useStyles()

  return (
    <Container size="xl" py="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Rent your bike NOW!
      </Title>
      <Outlet />
    </Container>
  );
}


