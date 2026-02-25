import { useState } from 'react'
import ClientRow from './ClientRow'
import ClientCard from './ClientCard'

export default function ClientsView({ clients, loading, allClients }) {
  const [viewMode, setViewMode] = useState('table') // 'table' | 'grid'
  const [expanded, setExpanded] = useState(null)

  if (loading) return <ClientsSkeleton viewMode={viewMode} />

  return (
    <div className="crm-section">
      {/* Result count + view toggle */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <span style={{ fontFamily:'DM Mono', fontSize:12, color:'var(--muted)' }}>
          {clients.length} client{clients.length !== 1 ? 's' : ''} shown
          {allClients.length !== clients.length ? ` of ${allClients.length}` : ''}
        </span>
        <div style={{ display:'flex', gap:4 }}>
          {['table','grid'].map(m => (
            <button key={m} onClick={() => setViewMode(m)}
              style={{
                padding:'5px 12px', border:'1px solid var(--border2)', borderRadius:6, cursor:'pointer',
                background: viewMode === m ? 'rgba(0,200,255,.1)' : 'transparent',
                color: viewMode === m ? 'var(--accent)' : 'var(--muted)',
                borderColor: viewMode === m ? 'rgba(0,200,255,.3)' : 'var(--border2)',
                fontSize:12, fontFamily:'DM Mono', transition:'all .15s',
              }}>
              {m === 'table' ? '☰ Table' : '⊞ Grid'}
            </button>
          ))}
        </div>
      </div>

      {clients.length === 0 ? (
        <Empty />
      ) : viewMode === 'table' ? (
        <TableView clients={clients} expanded={expanded} setExpanded={setExpanded} />
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(400px,1fr))', gap:14 }}>
          {clients.map((c, i) => <ClientCard key={c.id || c.email} client={c} index={i} />)}
        </div>
      )}
    </div>
  )
}

function TableView({ clients, expanded, setExpanded }) {
  const cols = ['Client', 'Company', 'Status', 'Meetings', 'Last Meeting', 'Last Contact', 'Days Since', 'Actions']

  return (
    <div className="card" style={{ background:'var(--bg2)', border:'1px solid var(--border2)', borderRadius:12, overflow:'hidden' }}>
      {/* Header */}
      <div style={{
        display:'grid',
        gridTemplateColumns:'2fr 1.5fr 90px 80px 130px 130px 80px 100px',
        padding:'10px 16px',
        background:'var(--bg3)',
        borderBottom:'1px solid var(--border2)',
      }}>
        {cols.map(c => (
          <div key={c} style={{ fontSize:10, fontFamily:'DM Mono', color:'var(--muted)', letterSpacing:'.08em', fontWeight:600 }}>
            {c.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Rows */}
      {clients.map((client, i) => (
        <div key={client.id || client.email}>
          <ClientRow
            client={client}
            index={i}
            expanded={expanded === client.email}
            onToggle={() => setExpanded(expanded === client.email ? null : client.email)}
          />
        </div>
      ))}
    </div>
  )
}

function Empty() {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      height:'45vh', gap:12, textAlign:'center' }}>
      <div style={{ fontSize:40 }}>🔍</div>
      <h3 style={{ fontFamily:'Syne', fontSize:18, color:'var(--text)' }}>No clients match your filters</h3>
      <p style={{ color:'var(--muted)', fontSize:13 }}>Try clearing the search or adjusting filters</p>
    </div>
  )
}

function ClientsSkeleton({ viewMode }) {
  if (viewMode === 'grid') return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(400px,1fr))', gap:14 }}>
      {Array(6).fill(0).map((_,i) => <div key={i} className="skeleton" style={{ height:180, borderRadius:12 }} />)}
    </div>
  )
  return (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--border2)', borderRadius:12, overflow:'hidden' }}>
      <div className="skeleton" style={{ height:40, borderRadius:0 }} />
      {Array(8).fill(0).map((_,i) => (
        <div key={i} style={{ padding:'12px 16px', borderTop:'1px solid var(--border2)', display:'flex', gap:12 }}>
          <div className="skeleton" style={{ height:14, flex:2, borderRadius:4 }} />
          <div className="skeleton" style={{ height:14, flex:1, borderRadius:4 }} />
          <div className="skeleton" style={{ height:14, width:60, borderRadius:4 }} />
        </div>
      ))}
    </div>
  )
}
