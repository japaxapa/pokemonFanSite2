import { GENERATIONS_PARAMS } from '#/constants/consts'
import { Form, FormField, FormLabel } from '@radix-ui/react-form'
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  RadioCards,
  Text,
} from '@radix-ui/themes'
import FilterIcon from '../icons/FilterIcon'
import FilterOffIcon from '../icons/FilterOffIcon'
import { useState } from 'react'

interface IADVFilter {
  selectedGeneration: number | null
  setSelectedGeneration: (generation: number | null) => void
}

export default function AdvancedFilter({
  selectedGeneration,
  setSelectedGeneration,
}: IADVFilter) {
  const [hasFilter, setHasFilter] = useState(false)

  const clearFilters = () => {
    setHasFilter(false)
    setSelectedGeneration(null)
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    // GEN Filter
    const generationValue = formData.get('generation') as string | null
    const generationIndex =
      generationValue && (generationValue !== '' && generationValue !== '9')
        ? parseInt(generationValue, 10)
        : null

    setSelectedGeneration(generationIndex)

    // ALL
    setHasFilter(generationIndex !== null)
  }

  return (
    <Card size={'2'} mb={'3'}>
      <Box width={'100%'} px={'5'}>
        <Flex gap={'4'}>
          <Dialog.Root>
            <Dialog.Trigger>
              <Button>
                <FilterIcon /> Filter
              </Button>
            </Dialog.Trigger>
            <Dialog.Content
              aria-description="Filters for pokedex query"
              aria-describedby="filters"
            >
              <Dialog.Title>
                <Text weight={'bold'}>Filters</Text>
              </Dialog.Title>
              <Dialog.Description>
                <Text weight={'medium'} size={'3'}>
                  Select Filters to apply to the pokedex
                </Text>
              </Dialog.Description>
              <Card my={'2'} size={'2'}>
                <Flex direction={'column'} gap={'4'}>
                  <Form onSubmit={handleSubmit}>
                    <FormField name="generationWrapper">
                      <Flex direction={'column'} gap={'4'}>
                        <FormLabel>
                          <Text weight={'medium'}>Generation</Text>
                        </FormLabel>
                        <RadioCards.Root
                          mt={'1'}
                          defaultValue={
                            selectedGeneration
                              ? selectedGeneration.toString()
                              : '9'
                          }
                          name="generation"
                        >
                          {GENERATIONS_PARAMS.map((GENERATION, idx) => (
                            <RadioCards.Item value={idx.toString()} key={idx}>
                              <Text>{GENERATION.name}</Text>
                            </RadioCards.Item>
                          ))}
                        </RadioCards.Root>
                      </Flex>
                    </FormField>

                    <Flex gap="3" mt="4" justify="end">
                      <Dialog.Close>
                        <Button variant="soft" color="gray">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Dialog.Close>
                        <Button type="submit">Apply</Button>
                      </Dialog.Close>
                    </Flex>
                  </Form>
                </Flex>
              </Card>
            </Dialog.Content>
          </Dialog.Root>
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
