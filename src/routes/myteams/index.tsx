import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/myteams/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/myteams/"!</div>
}
