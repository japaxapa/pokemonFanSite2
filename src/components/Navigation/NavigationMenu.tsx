import { Flex, Text } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'
import NavButton from './NavButton'
import ProfileButton from './PofileButton'

const navLinks = [
  { to: '/', title: 'Home' },
  { to: '/pokedex', title: 'Pokedex' },
  { to: '/pokedex2', title: 'Pokedex 2.0' },
  { to: '/infpokedex', title: 'Infinite Scroll Pokedex' },
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

        <ProfileButton />
      </Flex>
    </nav>
  )
}
