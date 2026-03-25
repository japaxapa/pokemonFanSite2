import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  localStorage.setItem(
    'favorites',
    JSON.stringify([{ id: 1, name: 'bulbasaur' }]),
  )
  return (
    <>
      <main></main>
    </>
  )
}
