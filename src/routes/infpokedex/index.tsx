import { Container } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'

import { useState } from 'react'
import AdvancedFilter from '#/components/pokedex/AdvFilter'
import INFCardsDisplay from '#/components/pokedex/InfCardsDisplay'
import { FilterProvider } from '#/contexts/FilterContext'

export const Route = createFileRoute('/infpokedex/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [limit, setLimit] = useState(50)

  return (
    <FilterProvider>
      <Container align={'center'} p={'7'}>
        <AdvancedFilter />
        <INFCardsDisplay limit={limit} />
      </Container>
    </FilterProvider>
  )
}
