import { Box, Button, Flex, TextField } from '@radix-ui/themes'
import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon'
import { useState } from 'react'

interface ISearchBar {
  handleSearchName(name: string): void
}

// TODO autocomplete

export default function SearchBar({ handleSearchName }: ISearchBar) {
  const [query, setQuery] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchName(query.trim())
    }
    if (e.key === 'Escape') {
      handleSearchName('')
      setQuery('')
    }
  }

  const handleClick = () => {
    handleSearchName(query.trim())
  }

  return (
    <Flex align={'center'} justify={'between'} p={'2'}>
      <Box width={'100%'}>
        <TextField.Root
          placeholder="Search pokemon by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon />
          </TextField.Slot>

          <Button
            onClick={handleClick}
            variant="outline"
          >
            Search
          </Button>
        </TextField.Root>
      </Box>
    </Flex>
  )
}
