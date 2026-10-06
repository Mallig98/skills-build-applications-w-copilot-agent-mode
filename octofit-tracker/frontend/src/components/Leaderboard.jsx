import CollectionPage from './CollectionPage.jsx'
import useFetchCollection from '../hooks/useFetchCollection.js'

function LeaderboardCard({ entry }) {
  const userName = entry.user?.name || entry.user?.username || 'OctoFit member'
  const teamName = entry.team?.name || 'Independent'

  return (
    <article className="card h-100 data-card">
      <div className="card-body d-flex align-items-center gap-3">
        <span className="rank-badge" aria-label={`Rank ${entry.rank ?? 'unranked'}`}>
          {entry.rank ?? '—'}
        </span>
        <div className="flex-grow-1">
          <h2 className="card-title">{userName}</h2>
          <p className="card-subtitle">{teamName}</p>
          <p className="leaderboard-period">{entry.period || 'Current standings'}</p>
        </div>
        <span className="points-total">{entry.points ?? 0}<small> pts</small></span>
      </div>
    </article>
  )
}

export default function Leaderboard() {
  const { items, error, loading } = useFetchCollection('/api/leaderboard/', fetch)

  return (
    <CollectionPage
      description="See how members and teams are progressing this period."
      error={error}
      items={items}
      loading={loading}
      renderItem={(entry) => <LeaderboardCard entry={entry} />}
      title="Leaderboard"
    />
  )
}
