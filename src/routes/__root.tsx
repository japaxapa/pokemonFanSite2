import { Outlet, createRootRoute } from '@tanstack/react-router'
import NavigationMenu from '#/components/Navigation/NavigationMenu'
import { Theme } from '@radix-ui/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@radix-ui/themes/styles.css'
import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

const queryClient = new QueryClient()

function RootComponent() {
  return (
    <>
      <Theme>
        <QueryClientProvider client={queryClient}>
          <div>
            <NavigationMenu />
            <Outlet />
          </div>
        </QueryClientProvider>
      </Theme>
    </>
  )
}
