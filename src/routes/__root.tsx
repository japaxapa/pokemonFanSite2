import { Outlet, createRootRoute } from '@tanstack/react-router'
import NavigationMenu from '#/components/Navigation/NavigationMenu'
import { Theme } from '@radix-ui/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@radix-ui/themes/styles.css'
import '../styles.css'
import { FilterProvider } from '#/contexts/FilterContext'
import { ThemeProvider } from 'next-themes'

export const Route = createRootRoute({
  component: RootComponent,
})

const queryClient = new QueryClient()

function RootComponent() {
  return (
    <>
      <ThemeProvider attribute={'class'}>
        <Theme>
          <QueryClientProvider client={queryClient}>
            <FilterProvider>
              <div>
                <NavigationMenu />
                <Outlet />
              </div>
            </FilterProvider>
          </QueryClientProvider>
        </Theme>
      </ThemeProvider>
    </>
  )
}
