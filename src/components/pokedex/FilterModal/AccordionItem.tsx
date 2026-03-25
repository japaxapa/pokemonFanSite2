import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { FormLabel } from '@radix-ui/react-form'
import { Card, ChevronDownIcon, Flex, Text } from '@radix-ui/themes'

interface IFilterModalAccordionItem {
  children: React.ReactNode
  title: string
}

export default function FilterModalAccordionItem({
  children,
  title,
}: IFilterModalAccordionItem) {
  return (
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
                <Text weight={'medium'}>{title}</Text>
              </FormLabel>
              <ChevronDownIcon />
            </Flex>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Flex direction={'column'} gap={'4'}>
            {children}
          </Flex>
        </AccordionContent>
      </AccordionItem>
    </Card>
  )
}
