import { Avatar, Card, Flex, Text } from '@radix-ui/themes'
import type { Pokemon } from 'pokenode-ts'

export default function PokedexCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Card key={pokemon.id}>
      <Flex gap={'2'} align={'center'} justify={'center'} direction={'column'}>
        <Avatar
          src={pokemon.sprites.front_default || ''}
          fallback={pokemon.name[0]}
          size={'6'}
        />
        <Text>
          #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
        </Text>
      </Flex>
    </Card>
  )
}
