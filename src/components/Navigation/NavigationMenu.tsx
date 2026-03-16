import { Avatar, Box, Flex, Text } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'
import NavButton from './NavButton'

const navLinks = [
  { to: '/', title: 'Home' },
  { to: '/pokedex', title: 'Pokedex' },
  { to: '/pokedex2', title: 'Pokedex 2.0' },
]

export default function NavigationMenu() {
  return (
    <nav>
      <Flex justify={'between'}>
        <Flex align={'center'} justify={'center'} p={'4'}>
          <Text weight={'bold'}>LOGO</Text>
        </Flex>
        <Flex
          gap={'4'}
          align={'center'}
          justify={'center'}
          width={'100%'}
          p={'4'}
        >
          {navLinks.map((link) => (
            <NavButton key={link.title}>
              <Link to={link.to}>{link.title}</Link>
            </NavButton>
          ))}
        </Flex>
        <Flex p={'4'}>
          <Avatar
            src="https://placehold.co/600x400.png"
            fallback={'P'}
            radius="full"
          />
        </Flex>
      </Flex>
    </nav>
  )
}
