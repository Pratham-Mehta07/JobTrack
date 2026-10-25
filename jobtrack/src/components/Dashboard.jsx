import { useState } from 'react'
import StatCard from './StatCard'
import SearchBar from './SearchBar'
import ApplicationList from './ApplicationList'
import ApplicationForm from './ApplicationForm'

// Shows the stats, the search box, the list and the Add form.
// It only displays the `applications` it is given, so the numbers update
// automatically whenever the list changes (add, edit or delete).
// onAddApplication(data) is called when the form is saved.
function Dashboard({ applications = [], onAddApplication }) {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // All numbers are calculated from the applications prop
  const countByStatus = (status) =>
    applications.filter((app) => app.status === status).length

  const search = searchTerm.trim().toLowerCase()
  const isSearching = search !== ''

  // Newest first. Copy the array before sorting so the prop isn't changed.
  const sorted = [...applications].sort(
    (a, b) => new Date(b.applicationDate) - new Date(a.applicationDate),
  )

  // Searching shows every match; otherwise show the 5 most recent.
  const visible = isSearching
    ? sorted.filter((app) => app.company.toLowerCase().includes(search))
    : sorted.slice(0, 5)

  const handleSubmit = (data) => {
    onAddApplication(data)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 text-gray-700">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            JobTrack – Job Application Tracker
          </h1>
          {!showForm && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
            >
              + Add New Job
            </button>
          )}
        </div>

        {showForm && (
          <ApplicationForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}

        <div className="mb-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-4">
          <StatCard label="Total Applications" value={applications.length} />
          <StatCard label="Interviews" value={countByStatus('Interview')} />
          <StatCard label="Offers" value={countByStatus('Offer')} />
          <StatCard label="Rejected" value={countByStatus('Rejected')} />
        </div>

        <section className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {isSearching ? 'Search Results' : 'Recent Applications'}
            </h2>
            <div className="sm:w-64">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
          </div>

          <ApplicationList
            applications={visible}
            emptyMessage={
              isSearching
                ? 'No applications match that company name.'
                : 'No applications yet. Click "Add New Job" to add your first one.'
            }
          />
        </section>
      </div>
    </div>
  )
}

export default Dashboard
