import ChevronLeftIcon from '#/components/icons/ChevronLeftIcon'
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
} from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/error/')({
  component: ErrorComponent,
})

function ErrorComponent() {
  return (
    <Container size={'2'} height={'90vh'}>
      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        height={'100%'}
      >
        <Card size={'5'}>
          <Flex justify={'center'} p={'6'}>
            <Avatar
              src="https://placehold.co/1000"
              fallback={'Error'}
              size={'9'}
            />
          </Flex>
          <Flex direction={'column'} align={'center'} p={'9'} gap={'3'}>
            <Heading as="h1" weight={'bold'} size={'7'}>
              Oops! Something went wrong
            </Heading>
            <Text as="p" align={'center'} size={'3'}>
              An error occurred while fetching data. Please try again later.
            </Text>
            <Button
              onClick={() => window.history.back()}
              style={{ marginTop: '2rem' }}
            >
              <ChevronLeftIcon /> Go Back
            </Button>
          </Flex>
        </Card>
      </Flex>
    </Container>
  )
}
