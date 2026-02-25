const STATUS_STYLE = {
  Hot:  { bg:'rgba(255,77,109,.12)',  border:'rgba(255,77,109,.3)',  text:'var(--red)',    dot:'var(--red)'    },
  Warm: { bg:'rgba(255,184,0,.1)',    border:'rgba(255,184,0,.3)',   text:'var(--yellow)', dot:'var(--yellow)' },
  Cold: { bg:'rgba(107,140,174,.1)', border:'rgba(107,140,174,.2)', text:'var(--muted)',  dot:'var(--muted)'  },
}

export default function ClientRow({ client, index, expanded, onToggle }) {
  const s = STATUS_STYLE[client.status] || STATUS_STYLE.Cold
  const initials = (client.name || '??').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()
  const isEven = index % 2 === 0

  return (
    <>
      {/* Main row */}
      <div
        onClick={onToggle}
        style={{
          display:'grid',
          gridTemplateColumns:'2fr 1.5fr 90px 80px 130px 130px 80px 100px',
          padding:'11px 16px',
          background: expanded ? 'rgba(0,200,255,.04)' : isEven ? 'transparent' : 'rgba(255,255,255,.01)',
          borderTop: index > 0 ? '1px solid var(--border2)' : 'none',
          borderLeft: expanded ? '2px solid var(--accent)' : '2px solid transparent',
          cursor:'pointer',
          transition:'background .15s, border-color .15s',
          alignItems:'center',
        }}
        onMouseEnter={e => { if (!expanded) e.currentTarget.style.background = 'rgba(0,200,255,.03)' }}
        onMouseLeave={e => { if (!expanded) e.currentTarget.style.background = isEven ? 'transparent' : 'rgba(255,255,255,.01)' }}
      >
        {/* Client name + email */}
        <div style={{ display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
          <div style={{
            width:30, height:30, borderRadius:8, flexShrink:0,
            background:'linear-gradient(135deg, var(--navy), var(--accent))',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:11, fontFamily:'Syne', fontWeight:800, color:'#fff',
          }}>{initials}</div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--text)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
              {client.name}
            </div>
            <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'DM Mono', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {client.email}
            </div>
          </div>
        </div>

        {/* Company */}
        <div style={{ fontSize:12, color:'var(--accent)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
          {client.company || '—'}
        </div>

        {/* Status badge */}
        <div>
          <span style={{
            display:'inline-flex', alignItems:'center', gap:4,
            background: s.bg, border:`1px solid ${s.border}`, color: s.text,
            borderRadius:99, padding:'3px 9px',
            fontSize:10, fontFamily:'DM Mono', fontWeight:600,
          }}>
            <span className={client.status === 'Hot' ? 'pulse' : ''}
              style={{ width:5, height:5, borderRadius:'50%', background:s.dot, display:'inline-block', flexShrink:0 }} />
            {client.status}
          </span>
        </div>

        {/* Meeting count */}
        <div style={{ fontFamily:'DM Mono', fontSize:13, color:'var(--text)', fontWeight:600 }}>
          {client.meetingCount ?? 1}
          <span style={{ color:'var(--muted)', fontWeight:400, fontSize:10 }}> mtgs</span>
        </div>

        {/* Last meeting */}
        <div>
          <div style={{ fontSize:12, fontFamily:'DM Mono', color:'var(--text)' }}>{client.lastMeetingDate || '—'}</div>
          {client.lastMeetingType && (
            <div style={{ fontSize:10, color:'var(--muted)', marginTop:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
              {client.lastMeetingType}
            </div>
          )}
        </div>

        {/* Last contact */}
        <div>
          <div style={{ fontSize:12, fontFamily:'DM Mono', color:'var(--text)' }}>{client.lastContactDate || '—'}</div>
          {client.lastEmailDirection && (
            <span style={{
              fontSize:9, padding:'1px 5px', borderRadius:3, marginTop:2, display:'inline-block',
              background: client.lastEmailDirection === 'Sent' ? 'rgba(0,214,143,.15)' : 'rgba(0,200,255,.12)',
              color: client.lastEmailDirection === 'Sent' ? 'var(--green)' : 'var(--accent)',
              fontFamily:'DM Mono',
            }}>{client.lastEmailDirection}</span>
          )}
        </div>

        {/* Days since */}
        <div style={{
          fontFamily:'DM Mono', fontWeight:700, fontSize:16,
          color: client.daysSinceContact <= 7 ? 'var(--green)'
               : client.daysSinceContact <= 21 ? 'var(--yellow)' : 'var(--red)',
        }}>
          {client.daysSinceContact ?? '—'}
          <span style={{ fontSize:9, color:'var(--muted)', fontWeight:400 }}> d</span>
        </div>

        {/* Expand toggle */}
        <div style={{ display:'flex', gap:6, alignItems:'center' }}>
          <button
            onClick={e => { e.stopPropagation(); onToggle() }}
            style={{
              background:'transparent', border:'1px solid var(--border2)', borderRadius:6,
              color:'var(--muted)', fontSize:11, padding:'4px 10px', cursor:'pointer',
              fontFamily:'DM Mono', transition:'all .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.borderColor='rgba(0,200,255,.3)' }}
            onMouseLeave={e => { e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.borderColor='var(--border2)' }}
          >
            {expanded ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {/* Expanded detail panel */}
      {expanded && (
        <div style={{
          padding:'16px 20px 20px',
          background:'var(--bg3)',
          borderTop:'1px solid var(--border2)',
          borderBottom:'1px solid var(--border2)',
          display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:20,
        }}>
          {/* Meeting history */}
          <div>
            <PanelLabel color="var(--accent)">MEETING HISTORY ({client.meetingCount ?? 1})</PanelLabel>
            <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:8 }}>
              {(client.meetings || [{ date: client.lastMeetingDate, title: client.lastMeetingTitle, hasSummary: true }]).slice(0,5).map((m, i) => (
                <div key={i} style={{
                  background:'var(--bg4)', borderRadius:6, padding:'7px 10px',
                  display:'flex', alignItems:'flex-start', gap:8,
                }}>
                  <div style={{ flexShrink:0, width:6, height:6, borderRadius:'50%', background: m.hasSummary ? 'var(--green)' : 'var(--muted)', marginTop:5 }} />
                  <div>
                    <div style={{ fontSize:12, color:'var(--text)', lineHeight:1.3 }}>{m.title || '—'}</div>
                    <div style={{ fontSize:10, fontFamily:'DM Mono', color:'var(--muted)', marginTop:2 }}>
                      {m.date} {m.duration ? `· ${Math.round(m.duration)}min` : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Their action steps */}
          <div>
            <PanelLabel color="var(--accent)">THEIR ACTION STEPS</PanelLabel>
            <ActionList items={client.theirActionSteps} color="var(--accent)" />
          </div>

          {/* Our action steps */}
          <div>
            <PanelLabel color="var(--accent2)">OUR ACTION STEPS</PanelLabel>
            <ActionList items={client.ourActionSteps} color="var(--accent2)" />
          </div>

          {/* Tags row */}
          {client.tags?.length > 0 && (
            <div style={{ gridColumn:'1/-1', display:'flex', gap:6, flexWrap:'wrap', paddingTop:4 }}>
              {client.tags.map((tag, i) => (
                <span key={i} className="tag tag-purple" style={{ fontSize:10 }}>{tag}</span>
              ))}
            </div>
          )}

          {/* Last email */}
          {client.lastEmailSubject && (
            <div style={{ gridColumn:'1/-1' }}>
              <PanelLabel color="var(--green)">LAST EMAIL</PanelLabel>
              <div style={{ marginTop:6, fontSize:12, color:'var(--text)', display:'flex', gap:8, alignItems:'center' }}>
                <span style={{
                  fontSize:9, padding:'2px 6px', borderRadius:3,
                  background: client.lastEmailDirection === 'Sent' ? 'rgba(0,214,143,.15)' : 'rgba(0,200,255,.12)',
                  color: client.lastEmailDirection === 'Sent' ? 'var(--green)' : 'var(--accent)',
                  fontFamily:'DM Mono',
                }}>{client.lastEmailDirection}</span>
                {client.lastEmailSubject}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

function PanelLabel({ children, color }) {
  return (
    <div style={{ fontSize:9, fontFamily:'DM Mono', letterSpacing:'.1em', fontWeight:600, color, borderBottom:`1px solid ${color}33`, paddingBottom:4 }}>
      {children}
    </div>
  )
}

function ActionList({ items, color }) {
  if (!items?.length) return <p style={{ fontSize:12, color:'var(--muted)', fontStyle:'italic', marginTop:8 }}>None recorded</p>
  return (
    <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:6, marginTop:8 }}>
      {items.map((step, i) => (
        <li key={i} style={{ display:'flex', gap:8, fontSize:12, color:'var(--text)', lineHeight:1.4 }}>
          <span style={{ color, flexShrink:0, marginTop:1 }}>→</span>
          <span>{step}</span>
        </li>
      ))}
    </ul>
  )
}
