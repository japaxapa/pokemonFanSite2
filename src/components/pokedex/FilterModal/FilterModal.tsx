import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import FilterIcon from '../../icons/FilterIcon'
import { Form } from '@radix-ui/react-form'
import FilterModalButtons from './Buttons'
import FilterModalAccordion from './Accordion'

interface IFilterModal {
  handleSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void
}

export default function FilterModal({
  handleSubmit,
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

        <Flex direction={'column'} gap={'4'} mt={'4'}>
          <Form onSubmit={handleSubmit}>
            <FilterModalAccordion />

            <FilterModalButtons />
          </Form>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
