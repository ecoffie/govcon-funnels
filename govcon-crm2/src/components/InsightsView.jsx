import Skeleton from './Skeleton'

export default function InsightsView({ insights, clients, loading }) {
  if (loading) return <InsightsSkeleton />
  if (!insights) return <EmptyInsights />

  const {
    totalMeetings, totalClients, totalClientMeetings,
    hotLeads, warmLeads, coldLeads,
    meetingsByType, avgMeetingsPerClient,
    clientsNeedingFollowUp, topEngagedClients,
    recentActivitySummary, weeklyMeetingTrend,
  } = insights

  return (
    <div className="crm-section" style={{ display:'flex', flexDirection:'column', gap:24 }}>

      {/* Summary narrative */}
      {recentActivitySummary && (
        <div style={{
          background:'linear-gradient(135deg, #0a1f35, var(--bg2))',
          border:'1px solid rgba(0,200,255,.15)',
          borderRadius:12, padding:'18px 22px',
          display:'flex', gap:14, alignItems:'flex-start',
        }}>
          <span style={{ fontSize:24, flexShrink:0 }}>🧠</span>
          <div>
            <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:14, color:'var(--accent)', marginBottom:5 }}>
              AI PIPELINE SUMMARY
            </div>
            <p style={{ color:'var(--text)', fontSize:14, lineHeight:1.6, margin:0 }}>{recentActivitySummary}</p>
          </div>
        </div>
      )}

      {/* Top stat cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px,1fr))', gap:12 }}>
        <StatCard label="Total Meetings" value={totalMeetings} icon="📅" cls="stat-blue" color="var(--accent)" />
        <StatCard label="Client Meetings" value={totalClientMeetings} icon="🤝" cls="stat-green" color="var(--green)" />
        <StatCard label="Unique Clients" value={totalClients} icon="👤" cls="stat-purple" color="var(--purple)" />
        <StatCard label="Hot Leads" value={hotLeads} icon="🔥" cls="stat-red" color="var(--red)" />
        <StatCard label="Warm Leads" value={warmLeads} icon="♨️" cls="stat-yellow" color="var(--yellow)" />
        <StatCard label="Avg Meetings/Client" value={avgMeetingsPerClient?.toFixed(1)} icon="📈" cls="stat-orange" color="var(--accent2)" />
      </div>

      {/* Pipeline + Meeting types */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:16 }}>

        {/* Pipeline breakdown */}
        <div className="card" style={{ padding:'18px 20px' }}>
          <SectionTitle>Pipeline Breakdown</SectionTitle>
          <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:14 }}>
            <PipelineBar label="Hot" count={hotLeads} total={totalClients} color="var(--red)" />
            <PipelineBar label="Warm" count={warmLeads} total={totalClients} color="var(--yellow)" />
            <PipelineBar label="Cold" count={coldLeads} total={totalClients} color="var(--muted)" />
          </div>
        </div>

        {/* Meeting types */}
        <div className="card" style={{ padding:'18px 20px' }}>
          <SectionTitle>Meetings by Type</SectionTitle>
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:14 }}>
            {meetingsByType && Object.entries(meetingsByType).sort((a,b) => b[1]-a[1]).map(([type, count]) => (
              <div key={type} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:12, color:'var(--muted)', flex:'0 0 140px' }}>{type}</span>
                <div style={{ flex:1, height:6, background:'var(--bg4)', borderRadius:3, overflow:'hidden' }}>
                  <div style={{
                    height:'100%', borderRadius:3,
                    width: `${Math.round((count / totalClientMeetings) * 100)}%`,
                    background:'linear-gradient(90deg, var(--navy), var(--accent))',
                    transition:'width .5s ease',
                  }}/>
                </div>
                <span style={{ fontSize:12, fontFamily:'DM Mono', color:'var(--text)', flexShrink:0 }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly trend */}
      {weeklyMeetingTrend?.length > 0 && (
        <div className="card" style={{ padding:'18px 20px' }}>
          <SectionTitle>Weekly Activity Trend</SectionTitle>
          <div style={{ display:'flex', alignItems:'flex-end', gap:8, marginTop:16, height:96 }}>
            {weeklyMeetingTrend.map((w, i) => {
              const max = Math.max(...weeklyMeetingTrend.map(x => x.count))
              const pct = max > 0 ? (w.count / max) * 100 : 0
              return (
                <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                  <span style={{ fontSize:10, fontFamily:'DM Mono', color:'var(--accent)' }}>{w.count}</span>
                  <div style={{ width:'100%', height:`${pct}%`, minHeight:4, borderRadius:'4px 4px 0 0',
                    background:`linear-gradient(to top, var(--navy), var(--accent))`, transition:'height .4s ease' }} />
                  <span style={{ fontSize:9, color:'var(--muted)', textAlign:'center', lineHeight:1.2 }}>{w.week}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Action needed + Top clients */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:16 }}>

        {/* Needs follow-up */}
        <div className="card" style={{ padding:'18px 20px' }}>
          <SectionTitle icon="⚠️" color="var(--yellow)">Needs Follow-Up</SectionTitle>
          {clientsNeedingFollowUp?.length > 0 ? (
            <ul style={{ marginTop:12, listStyle:'none', display:'flex', flexDirection:'column', gap:6 }}>
              {clientsNeedingFollowUp.map((name, i) => (
                <li key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text)' }}>
                  <span style={{ color:'var(--yellow)', fontSize:12 }}>→</span>
                  {name}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color:'var(--muted)', fontSize:13, marginTop:10 }}>All clients are up to date 🎉</p>
          )}
        </div>

        {/* Top engaged */}
        <div className="card" style={{ padding:'18px 20px' }}>
          <SectionTitle icon="⭐" color="var(--green)">Most Engaged Clients</SectionTitle>
          {topEngagedClients?.length > 0 ? (
            <ol style={{ marginTop:12, paddingLeft:0, listStyle:'none', display:'flex', flexDirection:'column', gap:6 }}>
              {topEngagedClients.slice(0,5).map((name, i) => (
                <li key={i} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13 }}>
                  <span style={{
                    width:20, height:20, borderRadius:'50%', flexShrink:0,
                    background: i === 0 ? 'var(--yellow)' : i === 1 ? 'var(--muted)' : 'var(--bg4)',
                    color: i < 2 ? '#000' : 'var(--muted)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:10, fontFamily:'DM Mono', fontWeight:700,
                  }}>{i+1}</span>
                  <span style={{ color:'var(--text)' }}>{name}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p style={{ color:'var(--muted)', fontSize:13, marginTop:10 }}>No engagement data yet</p>
          )}
        </div>
      </div>

    </div>
  )
}

function StatCard({ label, value, icon, cls, color }) {
  return (
    <div className={`card ${cls}`} style={{ padding:'16px 18px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
        <span style={{ fontSize:10, fontFamily:'DM Mono', letterSpacing:'.08em', color:'var(--muted)' }}>
          {label.toUpperCase()}
        </span>
        <span style={{ fontSize:18 }}>{icon}</span>
      </div>
      <div style={{ fontFamily:'Syne', fontWeight:800, fontSize:28, color, lineHeight:1 }}>
        {value ?? '—'}
      </div>
    </div>
  )
}

function PipelineBar({ label, count, total, color }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
        <span style={{ fontSize:12, color:'var(--muted)' }}>{label}</span>
        <span style={{ fontSize:12, fontFamily:'DM Mono', color }}>{count} <span style={{ color:'var(--muted)' }}>({pct}%)</span></span>
      </div>
      <div style={{ height:8, background:'var(--bg4)', borderRadius:4, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, background:color, borderRadius:4, transition:'width .5s ease' }} />
      </div>
    </div>
  )
}

function SectionTitle({ children, icon, color }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
      {icon && <span style={{ fontSize:14 }}>{icon}</span>}
      <span style={{
        fontFamily:'DM Mono', fontSize:11, fontWeight:600, letterSpacing:'.08em',
        color: color || 'var(--muted)',
      }}>{children}</span>
    </div>
  )
}

function InsightsSkeleton() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <div className="skeleton" style={{ height:80, borderRadius:12 }} />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:12 }}>
        {Array(6).fill(0).map((_,i) => <div key={i} className="skeleton" style={{ height:90, borderRadius:12 }} />)}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <div className="skeleton" style={{ height:180, borderRadius:12 }} />
        <div className="skeleton" style={{ height:180, borderRadius:12 }} />
      </div>
    </div>
  )
}

function EmptyInsights() {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'60vh', gap:12, textAlign:'center' }}>
      <div style={{ fontSize:48 }}>📊</div>
      <h3 style={{ color:'var(--text)', fontFamily:'Syne', fontSize:20 }}>No data yet</h3>
      <p style={{ color:'var(--muted)', fontSize:14 }}>Hit Sync Now to pull your live meeting data</p>
    </div>
  )
}
