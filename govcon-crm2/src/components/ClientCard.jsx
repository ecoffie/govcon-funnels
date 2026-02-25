import { useState } from 'react'

const S = {
  Hot:  { bg:'rgba(255,77,109,.12)', border:'rgba(255,77,109,.3)',   text:'var(--red)',    dot:'var(--red)'    },
  Warm: { bg:'rgba(255,184,0,.1)',   border:'rgba(255,184,0,.3)',    text:'var(--yellow)', dot:'var(--yellow)' },
  Cold: { bg:'rgba(107,140,174,.1)', border:'rgba(107,140,174,.2)', text:'var(--muted)',  dot:'var(--muted)'  },
}

export default function ClientCard({ client, index }) {
  const [open, setOpen] = useState(false)
  const s = S[client.status] || S.Cold
  const initials = (client.name||'??').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()

  return (
    <div className="card fade-up" style={{ overflow:'hidden', animationDelay:`${index*25}ms`, animationFillMode:'both' }}>
      <div style={{ height:3, background:`linear-gradient(90deg, ${s.dot}, transparent)` }} />

      <div style={{ padding:'14px 16px 12px', display:'flex', gap:12, alignItems:'flex-start' }}>
        <div style={{
          width:38, height:38, borderRadius:9, flexShrink:0,
          background:'linear-gradient(135deg, var(--navy), var(--accent))',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:'Syne', fontWeight:800, fontSize:13, color:'#fff',
        }}>{initials}</div>

        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
            <span style={{ fontFamily:'Syne', fontWeight:700, fontSize:14, color:'var(--text)' }}>{client.name}</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:4, ...statusStyle(s), borderRadius:99, padding:'2px 8px', fontSize:10, fontFamily:'DM Mono', fontWeight:600 }}>
              <span className={client.status==='Hot'?'pulse':''} style={{ width:5, height:5, borderRadius:'50%', background:s.dot, display:'inline-block' }} />
              {client.status}
            </span>
          </div>
          <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'DM Mono', marginTop:1 }}>{client.email}</div>
          {client.company && <div style={{ fontSize:11, color:'var(--accent)', marginTop:1 }}>{client.company}</div>}
        </div>

        <div style={{ textAlign:'center', flexShrink:0 }}>
          <div style={{ fontFamily:'DM Mono', fontWeight:700, fontSize:22,
            color: client.daysSinceContact<=7?'var(--green)':client.daysSinceContact<=21?'var(--yellow)':'var(--red)', lineHeight:1 }}>
            {client.daysSinceContact??'—'}
          </div>
          <div style={{ fontSize:9, color:'var(--muted)', marginTop:1 }}>days ago</div>
        </div>
      </div>

      <div style={{ padding:'9px 16px', borderTop:'1px solid var(--border2)', display:'flex', gap:20, flexWrap:'wrap' }}>
        <Meta label="Last Meeting" value={client.lastMeetingDate} sub={client.lastMeetingTitle} />
        <Meta label="Meetings" value={`${client.meetingCount??1} total`} />
      </div>

      <button onClick={() => setOpen(!open)} style={{
        width:'100%', padding:'9px 16px', background: open?'var(--bg3)':'transparent',
        border:'none', borderTop:'1px solid var(--border2)', color:'var(--muted)',
        fontSize:11, fontFamily:'DM Mono', cursor:'pointer', textAlign:'left',
        display:'flex', justifyContent:'space-between', transition:'background .15s',
      }}>
        <span>ACTION STEPS</span>
        <span>{open?'▲':'▼'}</span>
      </button>

      {open && (
        <div style={{ padding:'12px 16px', borderTop:'1px solid var(--border2)', background:'var(--bg3)',
          display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          <ActionBlock label="THEIR STEPS" color="var(--accent)" items={client.theirActionSteps} />
          <ActionBlock label="OUR STEPS"   color="var(--accent2)" items={client.ourActionSteps} />
        </div>
      )}
    </div>
  )
}

function statusStyle(s) { return { background:s.bg, border:`1px solid ${s.border}`, color:s.text } }

function Meta({ label, value, sub }) {
  return (
    <div>
      <div style={{ fontSize:9, color:'var(--muted)', fontFamily:'DM Mono', letterSpacing:'.08em' }}>{label}</div>
      <div style={{ fontSize:12, fontFamily:'DM Mono', color:'var(--text)', fontWeight:500 }}>{value||'—'}</div>
      {sub && <div style={{ fontSize:10, color:'var(--muted)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:160 }}>{sub}</div>}
    </div>
  )
}

function ActionBlock({ label, color, items }) {
  return (
    <div>
      <div style={{ fontSize:9, color, fontFamily:'DM Mono', letterSpacing:'.1em', fontWeight:600, borderBottom:`1px solid ${color}33`, paddingBottom:3, marginBottom:6 }}>
        {label}
      </div>
      {!items?.length
        ? <p style={{ fontSize:11, color:'var(--muted)', fontStyle:'italic' }}>None</p>
        : <ul style={{ listStyle:'none' }}>
            {items.map((s,i) => (
              <li key={i} style={{ display:'flex', gap:7, fontSize:11, color:'var(--text)', lineHeight:1.4, marginBottom:4 }}>
                <span style={{ color, flexShrink:0 }}>→</span><span>{s}</span>
              </li>
            ))}
          </ul>
      }
    </div>
  )
}
