import { createFileRoute } from '@tanstack/react-router'
import { ToggleXState } from '../../components/ToggleXState'

export const Route = createFileRoute('/toggle/using-xstate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ToggleXState />
}
