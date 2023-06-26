import { Loader, SimpleGrid } from '@mantine/core';

import { CycleCard } from '../../../../components/CycleCard/CycleCard';
import useCycleListPresenter from "../../../../hooks/useCycleListPresenter";

export function CycleListSection() {
  const { state } = useCycleListPresenter()

  if (!state.cycles || !state.cycles.length) {
    return <Loader size="xl" />
  }

  return (
    <SimpleGrid cols={4} spacing="xl" mt={50} breakpoints={[ { maxWidth: 'md', cols: 1 } ]}>
      { state.cycles?.map(({ id, name, description , rentConditions }) => <CycleCard key={ id } id={ id } name={ name } basePrice={ rentConditions.basePrice } description={ description }/>) }
    </SimpleGrid>
  );
}
