import { Flex } from '@radix-ui/themes'
import { Link, useLocation } from '@tanstack/react-router'
import { getComponentStyles } from '#/constants/themeConfig'
import { useTheme } from 'next-themes'

export default function NavButton({
  link,
}: {
  link: { to: string; title: string }
}) {
  const location = useLocation()
  const { theme } = useTheme()
  const isActive = location.pathname === link.to
  const currentTheme = (theme || 'light') as 'light' | 'dark'
  const styles = getComponentStyles(currentTheme)

  return (
    <Flex
      align={'center'}
      justify={'center'}
      style={isActive ? styles.activeButton : styles.button}
      asChild
    >
      <Link to={link.to}>{link.title}</Link>
    </Flex>
  )
}
