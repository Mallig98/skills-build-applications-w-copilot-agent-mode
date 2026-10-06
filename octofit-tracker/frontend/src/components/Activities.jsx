import CollectionPage from './CollectionPage.jsx'
import useFetchCollection from '../hooks/useFetchCollection.js'

function ActivityCard({ activity }) {
  const activityType = activity.type || activity.activityType || 'Activity'
  const userName = activity.user?.name || activity.user?.username || 'OctoFit member'

  return (
    <article className="card h-100 data-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <h2 className="card-title">{activityType}</h2>
          <span className="badge text-bg-primary">{activity.points ?? 0} pts</span>
        </div>
        <p className="card-subtitle">{userName}</p>
        <dl className="detail-list">
          <div><dt>Duration</dt><dd>{activity.durationMinutes ?? '—'} min</dd></div>
          <div><dt>Distance</dt><dd>{activity.distanceKm ?? '—'} km</dd></div>
          <div><dt>Calories</dt><dd>{activity.caloriesBurned ?? '—'}</dd></div>
          <div><dt>Completed</dt><dd>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : '—'}</dd></div>
        </dl>
      </div>
    </article>
  )
}

export default function Activities() {
  const { items, error, loading } = useFetchCollection('/api/activities/', fetch)

  return (
    <CollectionPage
      description="Track every session and celebrate the work you put in."
      error={error}
      items={items}
      loading={loading}
      renderItem={(activity) => <ActivityCard activity={activity} />}
      title="Activities"
    />
  )
}
