import { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import { loadApplications, saveApplications } from './utils/storage'

function App() {
  // The single shared list of applications. Teammates doing Edit/Delete
  // should change it with setApplications; the dashboard updates by itself.
  const [applications, setApplications] = useState(loadApplications)

  // Save to LocalStorage every time the list changes
  useEffect(() => {
    saveApplications(applications)
  }, [applications])

  const handleAddApplication = (data) => {
    const newApplication = { id: crypto.randomUUID(), ...data }
    setApplications([...applications, newApplication])
  }

  return (
    <Dashboard
      applications={applications}
      onAddApplication={handleAddApplication}
    />
  )
}

export default App
