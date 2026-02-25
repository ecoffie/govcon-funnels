import { LayoutGrid, Users, Flame, SunMedium, Snowflake } from 'lucide-react'

export default function Sidebar({ view, setView, insights, loading }) {
  const nav = [
    { id: 'insights', icon: LayoutGrid, label: 'Insights' },
    { id: 'clients',  icon: Users, label: 'Clients', count: insights?.totalClients },
  ]

  return (
    <aside className="crm-sidebar" style={{
      width: 220, flexShrink: 0,
      background: 'var(--bg2)',
      borderRight: '1px solid var(--border2)',
      display: 'flex', flexDirection: 'column',
      padding: '0',
    }}>
      {/* Logo */}
      <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid var(--border2)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{
            width:34, height:34, borderRadius:9, flexShrink:0,
            background: 'linear-gradient(135deg, var(--navy), var(--accent))',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:16,
          }}>🏛️</div>
          <div>
            <div style={{ fontFamily:'Syne', fontWeight:800, fontSize:15, color:'var(--text)', lineHeight:1.1 }}>GovCon CRM</div>
            <div style={{ fontFamily:'DM Mono', fontSize:9, color:'var(--muted)', letterSpacing:'.12em', marginTop:1 }}>INTERNAL DASHBOARD</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding:'12px 10px', flex:1 }}>
        {nav.map(item => (
          <button key={item.id} onClick={() => setView(item.id)}
            style={{
              display:'flex', alignItems:'center', gap:10, width:'100%',
              padding:'10px 12px', borderRadius:8, border:'none', cursor:'pointer',
              marginBottom:2, textAlign:'left',
              background: view === item.id ? 'rgba(0,200,255,0.08)' : 'transparent',
              color: view === item.id ? 'var(--accent)' : 'var(--muted)',
              borderLeft: `2px solid ${view === item.id ? 'var(--accent)' : 'transparent'}`,
              fontFamily:'DM Sans', fontSize:14, fontWeight: view === item.id ? 600 : 400,
              transition: 'all .15s',
            }}>
            <item.icon size={16} />
            <span style={{flex:1}}>{item.label}</span>
            {item.count != null && (
              <span style={{
                background: view === item.id ? 'var(--accent)' : 'var(--bg4)',
                color: view === item.id ? '#000' : 'var(--muted)',
                borderRadius:99, padding:'1px 8px',
                fontSize:11, fontFamily:'DM Mono', fontWeight:600,
              }}>{item.count}</span>
            )}
          </button>
        ))}

        {/* Status pills */}
        {insights && (
          <div style={{ marginTop:16, padding:'0 4px' }}>
            <div style={{ fontSize:9, color:'var(--muted)', fontFamily:'DM Mono', letterSpacing:'.1em', marginBottom:8 }}>PIPELINE</div>
            {[
              { label:'Hot',  count: insights.hotLeads,  color:'var(--red)', icon: Flame },
              { label:'Warm', count: insights.warmLeads,  color:'var(--yellow)', icon: SunMedium },
              { label:'Cold', count: insights.coldLeads,  color:'var(--muted)', icon: Snowflake },
            ].map(p => (
              <div key={p.label} style={{ display:'flex', alignItems:'center', gap:8, padding:'5px 8px', marginBottom:1 }}>
                <p.icon size={12} color={p.color} />
                <span style={{ fontSize:12, color:'var(--muted)', flex:1 }}>{p.label}</span>
                <span style={{ fontSize:11, fontFamily:'DM Mono', color:p.color, fontWeight:600 }}>{p.count ?? 0}</span>
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div style={{ padding:'14px 18px', borderTop:'1px solid var(--border2)' }}>
        <div style={{ fontSize:10, color:'var(--muted)', fontFamily:'DM Mono', lineHeight:1.7 }}>
          Internal use only<br/>
          <span style={{ color:'var(--muted)' }}>Fireflies · Gmail</span>
        </div>
      </div>
    </aside>
  )
}
