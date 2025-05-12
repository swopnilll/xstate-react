import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="h-dvh p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}