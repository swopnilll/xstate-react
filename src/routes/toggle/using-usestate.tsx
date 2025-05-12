import { createFileRoute } from '@tanstack/react-router'
import { ToggleUseState } from '../../ToggleUseState'

export const Route = createFileRoute('/toggle/using-usestate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ToggleUseState />
}
