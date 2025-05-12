import { createFileRoute } from '@tanstack/react-router'
import Timer from '../../Timer'

export const Route = createFileRoute('/timer/using-reducer-machine')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Timer />
}
