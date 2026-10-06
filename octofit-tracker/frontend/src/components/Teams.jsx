import CollectionPage from './CollectionPage.jsx'
import useFetchCollection from '../hooks/useFetchCollection.js'

function TeamCard({ team }) {
  const members = Array.isArray(team.members) ? team.members : []

  return (
    <article className="card h-100 data-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <h2 className="card-title">{team.name || 'Team'}</h2>
          <span className="badge text-bg-primary">{team.totalPoints ?? 0} pts</span>
        </div>
        <p className="card-subtitle mb-3">
          {members.length} {members.length === 1 ? 'member' : 'members'}
        </p>
        <p>{team.description || 'Ready to reach the next goal together.'}</p>
        {members.length > 0 && (
          <ul className="member-list">
            {members.map((member, index) => (
              <li key={member._id || member.id || index}>
                {member.name || member.username || member.email || 'Member'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

export default function Teams() {
  const { items, error, loading } = useFetchCollection('/api/teams/', fetch)

  return (
    <CollectionPage
      description="Find your crew, share your goals, and build momentum together."
      error={error}
      items={items}
      loading={loading}
      renderItem={(team) => <TeamCard team={team} />}
      title="Teams"
    />
  )
}
