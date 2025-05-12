import { createFileRoute } from '@tanstack/react-router'
import TimerXState from '../../components/TimerXState'

export const Route = createFileRoute('/timer/using-xstate-timer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TimerXState />
}
