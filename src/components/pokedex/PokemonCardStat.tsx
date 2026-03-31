import { Card, Flex, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'

interface IPokemonCardStat {
  title: string
  value: string | number
  children: ReactNode
}

export default function PokemonCardStat({
  title,
  value,
  children,
}: IPokemonCardStat) {
  return (
    <Card>
      <Flex gap={'4'} align={'center'} minWidth={'6rem'}>
        {children}
        <Flex direction={'column'}>
          <Text size={'1'}>{title}</Text>
          <Text weight={'bold'}>{value}</Text>
        </Flex>
      </Flex>
    </Card>
  )
}
