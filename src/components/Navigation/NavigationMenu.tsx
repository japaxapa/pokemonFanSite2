import { Flex, Text } from '@radix-ui/themes'
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
      <Flex justify={'between'} style={styles.navMenuContainer}>
        <Flex align={'center'} justify={'center'} p={'4'}>
          <Text weight={'bold'}>LOGO</Text>
        </Flex>

        <Flex
          gap={'4'}
          align={'center'}
          justify={'between'}
          width={'100%'}
          p={'4'}
        >
          {navLinks.map((link) => (
            <NavButton key={link.title} link={link} />
          ))}
        </Flex>

        <ProfileButton />
      </Flex>
    </nav>
  )
}

const styles: Record<string, React.CSSProperties> = {
  navMenuContainer: {
    boxShadow: 'rgba(17, 17, 26, 0.1) 0px 1px 0px',
  },
}
