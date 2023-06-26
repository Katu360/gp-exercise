import { Loader, SimpleGrid } from '@mantine/core';
import { CycleCard } from '../../../../components/CycleCard/CycleCard';
import useCycles from "../../../../hooks/useCycles";

export function CycleListSection() {
  const { cycles } = useCycles()

  if (!cycles || !cycles.length) {
    return <Loader size="xl" />
  }

  return (
    <SimpleGrid cols={4} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
      { cycles?.map(({ id, name, description , rentConditions }) => <CycleCard key={ id } id={ id } name={ name } basePrice={ rentConditions.basePrice } description={ description }/>) }
    </SimpleGrid>
  );
}
