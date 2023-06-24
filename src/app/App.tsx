import {Container, Title} from '@mantine/core';
import {useReducer} from "react";
import { Outlet } from 'react-router-dom';

import AppContext from './core/context/AppContext';
import appReducer from "./core/reducers/appReducer";

import { useStyles } from './styles';

export default function App() {
  const [state, dispatch] = useReducer(appReducer, {})

  const { classes } = useStyles()

  return (
    <Container size="xl" py="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Rent your bike NOW!

        <AppContext.Provider value={{ state, dispatch }}>
          <Outlet />
        </AppContext.Provider>
      </Title>

    </Container>
  );
}


