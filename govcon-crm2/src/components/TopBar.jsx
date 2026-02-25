export default function TopBar({
  view, search, setSearch,
  statusFilter, setStatusFilter,
  typeFilter, setTypeFilter,
  sortBy, setSortBy,
  onSync, syncing, loading, lastSync,
}) {
  const fmt = d => d ? d.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) : '—'

  return (
    <header className="crm-topbar" style={{
      background: 'var(--bg2)',
      borderBottom: '1px solid var(--border2)',
      padding: '13px 22px',
      display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
    }}>
      {/* View title */}
      <div style={{ flexShrink:0 }}>
        <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:17, color:'var(--text)' }}>
          {view === 'insights' ? 'Pipeline Insights' : 'Client Tracker'}
        </div>
        {lastSync && (
          <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'DM Mono', marginTop:1 }}>
            Synced {fmt(lastSync)}
          </div>
        )}
      </div>

      {/* Search — only on clients */}
      {view === 'clients' && (
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search name, email, company, meeting…"
          style={{ flex:'1 1 240px', minWidth:160 }}
        />
      )}

      {/* Filters — only on clients */}
      {view === 'clients' && (
        <>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width:'auto', flex:'0 0 auto' }}>
            <option value="all">All Status</option>
            <option value="Hot">🔴 Hot</option>
            <option value="Warm">🟡 Warm</option>
            <option value="Cold">🔵 Cold</option>
          </select>

          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ width:'auto', flex:'0 0 auto' }}>
            <option value="all">All Types</option>
            <option value="Discovery Call">Discovery Call</option>
            <option value="Opportunity Meeting">Opportunity Meeting</option>
            <option value="Coaching">Coaching</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Other">Other</option>
          </select>

          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width:'auto', flex:'0 0 auto' }}>
            <option value="lastContact">Sort: Last Contact</option>
            <option value="lastMeeting">Sort: Last Meeting</option>
            <option value="meetingCount">Sort: Most Meetings</option>
            <option value="name">Sort: Name A–Z</option>
          </select>
        </>
      )}

      {/* Spacer */}
      <div style={{ flex:'1 1 0', minWidth:0 }} />

      {/* Sync button */}
      <button onClick={onSync} disabled={loading || syncing} className="btn btn-primary" style={{ flexShrink:0 }}>
        <span style={{ display:'inline-block', animation: (loading||syncing) ? 'spin .7s linear infinite' : 'none' }}>
          ↻
        </span>
        {loading ? 'Loading…' : syncing ? 'Syncing…' : 'Sync Now'}
      </button>
    </header>
  )
}
