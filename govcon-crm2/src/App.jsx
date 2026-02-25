import { useState, useCallback, useEffect } from 'react'
import { fetchCRMData } from './lib/claude'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import InsightsView from './components/InsightsView'
import ClientsView from './components/ClientsView'
import ErrorBanner from './components/ErrorBanner'

export default function App() {
  const [view, setView]       = useState('insights')  // 'insights' | 'clients'
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [error, setError]     = useState(null)
  const [lastSync, setLastSync] = useState(null)

  // Filters
  const [search, setSearch]     = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter]     = useState('all')
  const [sortBy, setSortBy]             = useState('lastContact')

  const sync = useCallback(async (isBackground = false) => {
    if (isBackground) setSyncing(true); else setLoading(true)
    setError(null)
    try {
      const result = await fetchCRMData()
      setData(result)
      setLastSync(new Date())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
      setSyncing(false)
    }
  }, [])

  useEffect(() => { sync() }, [sync])

  const clients = filterClients(data?.clients || [], { search, statusFilter, typeFilter, sortBy })

  return (
    <div className="app-shell">
      <div className="app-frame">
      <Sidebar view={view} setView={setView} insights={data?.insights} loading={loading} />

      <div className="app-content">
        <TopBar
          view={view}
          search={search} setSearch={setSearch}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          typeFilter={typeFilter} setTypeFilter={setTypeFilter}
          sortBy={sortBy} setSortBy={setSortBy}
          onSync={() => sync()} syncing={syncing} loading={loading}
          lastSync={lastSync}
        />

        {error && <ErrorBanner error={error} onDismiss={() => setError(null)} onRetry={() => sync()} />}

        <main className="app-main">
          {view === 'insights'
            ? <InsightsView insights={data?.insights} clients={data?.clients || []} loading={loading} />
            : <ClientsView clients={clients} loading={loading} allClients={data?.clients || []} />
          }
        </main>
      </div>
    </div>
    </div>
  )
}

function filterClients(clients, { search, statusFilter, typeFilter, sortBy }) {
  let out = [...clients]

  if (search) {
    const q = search.toLowerCase()
    out = out.filter(c =>
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.company?.toLowerCase().includes(q) ||
      c.lastMeetingTitle?.toLowerCase().includes(q)
    )
  }

  if (statusFilter !== 'all') out = out.filter(c => c.status === statusFilter)
  if (typeFilter   !== 'all') out = out.filter(c => c.lastMeetingType === typeFilter)

  out.sort((a, b) => {
    if (sortBy === 'lastContact')  return (a.daysSinceContact ?? 999) - (b.daysSinceContact ?? 999)
    if (sortBy === 'lastMeeting')  return new Date(b.lastMeetingDate) - new Date(a.lastMeetingDate)
    if (sortBy === 'meetingCount') return (b.meetingCount ?? 0) - (a.meetingCount ?? 0)
    if (sortBy === 'name')         return a.name?.localeCompare(b.name)
    return 0
  })

  return out
}
