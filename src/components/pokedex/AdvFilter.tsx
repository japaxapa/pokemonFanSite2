import { Box, Button, Card, Flex } from '@radix-ui/themes'
import FilterOffIcon from '../icons/FilterOffIcon'
import { useState } from 'react'
import FilterModal from './FilterModal/FilterModal'
import { useADVFilter } from '#/contexts/FilterContext'

export default function AdvancedFilter() {
  const [hasFilter, setHasFilter] = useState(false)

  const { setFilters } = useADVFilter()

  const clearFilters = () => {
    setHasFilter(false)
    setFilters({ selectedGeneration: null })
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    // GEN Filter
    const generationValue = formData.get('generation') as string | null
    const generationIndex =
      generationValue && generationValue !== '' && generationValue !== '9'
        ? parseInt(generationValue, 10)
        : null

    setFilters({ selectedGeneration: generationIndex })

    // ALL
    setHasFilter(generationIndex !== null)
  }

  return (
    <Card size={'2'} mb={'3'}>
      <Box width={'100%'} px={'5'}>
        <Flex gap={'4'}>
          <FilterModal
            handleSubmit={handleSubmit}
          />
          {hasFilter && (
            <Button onClick={clearFilters}>
              <FilterOffIcon /> Remove Filters
            </Button>
          )}
        </Flex>
      </Box>
    </Card>
  )
}
