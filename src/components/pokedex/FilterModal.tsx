import {
  Button,
  Card,
  ChevronDownIcon,
  Dialog,
  Flex,
  RadioCards,
  Text,
} from '@radix-ui/themes'
import FilterIcon from '../icons/FilterIcon'
import { Form, FormField, FormLabel } from '@radix-ui/react-form'
import { GENERATIONS_PARAMS } from '#/constants/consts'
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'

// TODO check if selectedGeneration should be a global state

interface IFilterModal {
  handleSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void
  selectedGeneration: number | null
}

export default function FilterModal({
  handleSubmit,
  selectedGeneration,
}: IFilterModal) {
  return (
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
              <Accordion type="multiple">
                <FormField name="generationWrapper">
                  <Card>
                    <AccordionItem value="generation">
                      <AccordionHeader>
                        <AccordionTrigger
                          style={{
                            width: '100%',
                          }}
                        >
                          <Flex
                            width={'100%'}
                            align={'center'}
                            justify={'between'}
                            gap={'4'}
                            px={'4'}
                            py={'2'}
                          >
                            <FormLabel>
                              <Text weight={'medium'}>Generation</Text>
                            </FormLabel>
                            <ChevronDownIcon />
                          </Flex>
                        </AccordionTrigger>
                      </AccordionHeader>
                      <AccordionContent>
                        <Flex direction={'column'} gap={'4'}>
                          <RadioCards.Root
                            mt={'4'}
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
                      </AccordionContent>
                    </AccordionItem>
                  </Card>
                </FormField>
              </Accordion>

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
  )
}
