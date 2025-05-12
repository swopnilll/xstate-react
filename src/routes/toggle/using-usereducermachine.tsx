import { createFileRoute } from '@tanstack/react-router'
import { ToggleUseReducerMachine } from '../../ToggleUseReducerMachine'

export const Route = createFileRoute('/toggle/using-usereducermachine')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ToggleUseReducerMachine />
}
