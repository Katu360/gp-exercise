import {SimpleGrid, Text} from '@mantine/core';
import {useEffect} from "react";
import { CycleCard } from '../../components/CycleCard/CycleCard';
import useCycles from "../../hooks/useCycles";

import { useStyles } from './styles';

export function HomePage() {
  const { cycles, getCycleList } = useCycles()
  const { classes } = useStyles();

  useEffect(() => {
    getCycleList()
  }, [])

  return (
    <>
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Our price list section will introduce you to the wide range of rental bikes we offer accompanied by an easy to understand chart showing prices for each bike.
      </Text>

      {
        cycles &&
        <SimpleGrid cols={4} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          { cycles?.map(({ id, name, description }) => <CycleCard key={ id } id={ id } name={ name } description={ description }/>) }
        </SimpleGrid>
      }
    </>
  );
}
