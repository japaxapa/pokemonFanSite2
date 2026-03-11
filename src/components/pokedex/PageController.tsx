import { Button, Flex } from '@radix-ui/themes'
import ChevronLeftIcon from '../icons/ChevronLeftIcon'
import ChevronRightIcon from '../icons/CrevronRightIcon'

interface IPageController {
  hasPrev: boolean
  hasNext: boolean
  handlePageChange(page: number): void
}

export default function PageController({ hasPrev, hasNext, handlePageChange }: IPageController) {
  return (
    <Flex align={'center'} p={'3'} justify={'between'}>
      <Button
        variant="outline"
        onClick={() => handlePageChange(-1)}
        disabled={!hasPrev}
      >
        <ChevronLeftIcon /> Prev
      </Button>
      <Flex></Flex>
      <Button
        variant="outline"
        onClick={() => handlePageChange(1)}
        disabled={!hasNext}
      >
        Next
        <ChevronRightIcon />
      </Button>
    </Flex>
  )
}
