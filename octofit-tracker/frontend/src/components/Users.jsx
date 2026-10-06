import CollectionPage from './CollectionPage.jsx'
import useFetchCollection from '../hooks/useFetchCollection.js'

function UserCard({ user }) {
  const name = user.name || user.username || 'OctoFit member'
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
  const teamName = user.team?.name || 'No team yet'

  return (
    <article className="card h-100 data-card">
      <div className="card-body d-flex align-items-center gap-3">
        <span className="avatar" aria-hidden="true">{initials}</span>
        <div>
          <h2 className="card-title">{name}</h2>
          <p className="card-subtitle">{user.email || 'Member profile'}</p>
          <span className="badge rounded-pill text-bg-light mt-2">{teamName}</span>
        </div>
      </div>
    </article>
  )
}

export default function Users() {
  const { items, error, loading } = useFetchCollection('/api/users/', fetch)

  return (
    <CollectionPage
      description="Meet the people showing up, putting in the work, and making progress."
      error={error}
      items={items}
      loading={loading}
      renderItem={(user) => <UserCard user={user} />}
      title="Members"
    />
  )
}
