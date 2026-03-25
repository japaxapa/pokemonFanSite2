import { GENERATIONS_PARAMS } from '#/constants/consts'
import { Accordion } from '@radix-ui/react-accordion'
import { FormField } from '@radix-ui/react-form'
import { RadioCards, Text } from '@radix-ui/themes'
import FilterModalAccordionItem from './AccordionItem'
import { useADVFilter } from '#/contexts/FilterContext'

export default function FilterModalAccordion() {
  const { filters } = useADVFilter()

  return (
    <Accordion type="multiple">
      <FormField name="generationWrapper">
        <FilterModalAccordionItem title="Generation">
          <RadioCards.Root
            mt={'4'}
            defaultValue={
              filters.selectedGeneration
                ? filters.selectedGeneration.toString()
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
        </FilterModalAccordionItem>
      </FormField>
    </Accordion>
  )
}
