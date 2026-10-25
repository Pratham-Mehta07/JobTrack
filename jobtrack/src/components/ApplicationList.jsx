import StatusBadge from './StatusBadge'

// "2026-10-25" -> "Oct 25, 2026". Adding a time makes it a local date,
// so it can't shift to the previous day in some time zones.
function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`)
  if (Number.isNaN(date.getTime())) return 'No date'
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function ApplicationList({ applications, emptyMessage }) {
  if (applications.length === 0) {
    return <p className="py-6 text-center text-gray-500">{emptyMessage}</p>
  }

  return (
    <ul className="divide-y divide-gray-200">
      {applications.map((app) => (
        <li
          key={app.id}
          className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <p className="font-semibold text-gray-900">{app.company}</p>
            <p className="text-sm text-gray-500">{app.role}</p>
            {app.notes && (
              <p className="mt-1 text-sm text-gray-400">{app.notes}</p>
            )}
          </div>
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <span className="text-sm text-gray-500">
              {formatDate(app.applicationDate)}
            </span>
            <StatusBadge status={app.status} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ApplicationList
