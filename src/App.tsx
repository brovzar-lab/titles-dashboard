import { isDemoMode } from './config'
import { Dashboard } from './components/Dashboard'
import { DemoBadge } from './components/DemoBadge'

export default function App() {
  return (
    <>
      {isDemoMode && <DemoBadge />}
      <Dashboard />
    </>
  )
}
