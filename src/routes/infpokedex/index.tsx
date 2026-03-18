import { Container } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'

import { useState } from 'react'
import AdvancedFilter from '#/components/pokedex/AdvFilter'
import INFCardsDisplay from '#/components/pokedex/InfCardsDisplay'

export const Route = createFileRoute('/infpokedex/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [limit, setLimit] = useState(50)
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(
    null,
  )

  return (
    <Container align={'center'} p={'7'}>
      <AdvancedFilter
        selectedGeneration={selectedGeneration}
        setSelectedGeneration={setSelectedGeneration}
      />
      <INFCardsDisplay
        selectedGeneration={selectedGeneration}
        limit={limit}
      />
    </Container>
  )
}
