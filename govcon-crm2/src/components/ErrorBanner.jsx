export default function ErrorBanner({ error, onDismiss, onRetry }) {
  const isMissingKey = error === 'MISSING_KEY' || error?.includes('ANTHROPIC_API_KEY')

  return (
    <div className="crm-error-banner" style={{
      background:'rgba(255,77,109,.1)', borderBottom:'1px solid rgba(255,77,109,.3)',
      padding:'12px 28px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap',
    }}>
      <span style={{ fontSize:16 }}>⚠️</span>
      <div style={{ flex:1 }}>
        {isMissingKey ? (
          <span style={{ fontSize:13, color:'var(--red)' }}>
            <strong>Missing API key.</strong> Create a <code style={{ background:'var(--bg4)', padding:'1px 5px', borderRadius:3 }}>.env</code> file with{' '}
            <code style={{ background:'var(--bg4)', padding:'1px 5px', borderRadius:3 }}>VITE_ANTHROPIC_API_KEY=sk-ant-…</code>
          </span>
        ) : (
          <span style={{ fontSize:13, color:'var(--red)' }}>{error}</span>
        )}
      </div>
      <button onClick={onRetry}
        style={{ padding:'5px 14px', border:'1px solid var(--red)', borderRadius:6, background:'transparent',
          color:'var(--red)', fontSize:12, fontFamily:'DM Mono', cursor:'pointer' }}>
        Retry
      </button>
      <button onClick={onDismiss}
        style={{ background:'transparent', border:'none', color:'var(--muted)', cursor:'pointer', fontSize:16 }}>×</button>
    </div>
  )
}
