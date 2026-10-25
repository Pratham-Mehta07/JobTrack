const badgeColors = {
  Applied: 'bg-blue-100 text-blue-700',
  Interview: 'bg-amber-100 text-amber-700',
  Offer: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
}

// Colored pill for Applied / Interview / Offer / Rejected
function StatusBadge({ status }) {
  const colors = badgeColors[status] || 'bg-gray-100 text-gray-600'

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colors}`}
    >
      {status || 'Unknown'}
    </span>
  )
}

export default StatusBadge
