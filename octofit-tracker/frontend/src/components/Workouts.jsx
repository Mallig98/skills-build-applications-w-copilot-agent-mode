import CollectionPage from './CollectionPage.jsx'
import useFetchCollection from '../hooks/useFetchCollection.js'

function WorkoutCard({ workout }) {
  const exercises = Array.isArray(workout.exercises) ? workout.exercises : []

  return (
    <article className="card h-100 data-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <h2 className="card-title">{workout.title || 'Workout'}</h2>
          <span className="badge text-bg-primary">{workout.durationMinutes ?? '—'} min</span>
        </div>
        <p className="card-subtitle">
          {[workout.category, workout.difficulty].filter(Boolean).join(' · ') || 'Suggested session'}
        </p>
        <p className="mt-3">{workout.description || 'A session to help you keep moving.'}</p>
        {exercises.length > 0 && (
          <ul className="exercise-list">
            {exercises.map((exercise, index) => <li key={`${exercise}-${index}`}>{exercise}</li>)}
          </ul>
        )}
      </div>
    </article>
  )
}

export default function Workouts() {
  const { items, error, loading } = useFetchCollection('/api/workouts/', fetch)

  return (
    <CollectionPage
      description="Choose a session that fits your goals, energy, and experience."
      error={error}
      items={items}
      loading={loading}
      renderItem={(workout) => <WorkoutCard workout={workout} />}
      title="Workouts"
    />
  )
}
