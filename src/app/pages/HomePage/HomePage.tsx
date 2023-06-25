import {SimpleGrid, Text} from '@mantine/core';
import { CycleCard } from '../../components/CycleCard/CycleCard';
import useCycles from "../../hooks/useCycles";

import { useStyles } from './styles';

export function HomePage() {
  const { cycles } = useCycles()
  const { classes } = useStyles();



  console.log(cycles)

  return (
    <>
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Our price list section will introduce you to the wide range of rental bikes we offer accompanied by an easy to understand chart showing prices for each bike.
      </Text>

      {
        cycles &&
        <SimpleGrid cols={4} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          { cycles?.map(cycle => <CycleCard key={ cycle.id } name={ cycle.name } description={ cycle.description }/>) }
        </SimpleGrid>
      }
    </>
  );
}
