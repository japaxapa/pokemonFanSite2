import { Outlet, createRootRoute } from '@tanstack/react-router'
import NavigationMenu from '#/components/Navigation/NavigationMenu'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Theme>
        <div>
          <NavigationMenu />
          <Outlet />
        </div>
      </Theme>
    </>
  )
}
