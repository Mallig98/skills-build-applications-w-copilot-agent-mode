export default function CollectionPage({ title, description, items, loading, error, renderItem }) {
  return (
    <section aria-labelledby="page-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OCTOFIT TRACKER</p>
          <h1 id="page-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        {!loading && !error && (
          <span className="badge rounded-pill text-bg-light item-count">
            {items.length} {items.length === 1 ? 'record' : 'records'}
          </span>
        )}
      </div>

      {loading && (
        <div className="alert alert-light d-flex align-items-center gap-3" role="status">
          <span className="spinner-border spinner-border-sm text-primary" aria-hidden="true" />
          Loading {title.toLowerCase()}…
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Could not load {title.toLowerCase()}.</strong> {error}
        </div>
      )}
      {!loading && !error && items.length === 0 && (
        <div className="empty-state">
          <h2>No {title.toLowerCase()} yet</h2>
          <p>When data is available, it will appear here.</p>
        </div>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="row g-3">
          {items.map((item, index) => (
            <div className="col-12 col-md-6 col-xl-4" key={item._id || item.id || index}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
