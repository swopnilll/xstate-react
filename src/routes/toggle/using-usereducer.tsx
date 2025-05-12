import { createFileRoute } from '@tanstack/react-router'
import { ToggleUseReducer } from '../../ToggleUseReducer'

export const Route = createFileRoute('/toggle/using-usereducer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ToggleUseReducer />
}
