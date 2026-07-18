export default function Header({ month, onMonthChange, monthsList, theme, onThemeToggle }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      backgroundColor: 'var(--headerBg)',
      borderBottom: '1px solid var(--border)',
      zIndex: 100,
      transition: 'background-color 0.2s, color 0.2s'
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        padding: '20px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{
            fontSize: '30px',
            fontFamily: 'League Gothic',
            fontWeight: '400',
            letterSpacing: '0.05em',
            lineHeight: '1.2'
          }}>
            <span>JM.</span>
            <span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <h1 style={{
            fontSize: '18px',
            fontFamily: 'League Gothic',
            fontWeight: '400',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: '0',
            lineHeight: '1.2'
          }}>
            CONTROLE FINANCEIRO
          </h1>
          <p style={{
            fontSize: '12px',
            color: 'var(--muted)',
            margin: '4px 0 0',
            fontWeight: '400'
          }}>
            Dashboard de controle mensal
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center'
        }}>
          <select
            value={month}
            onChange={(e) => onMonthChange(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              color: 'var(--text)',
              fontSize: '12px',
              cursor: 'pointer',
              fontFamily: 'Hanken Grotesk, sans-serif'
            }}
          >
            {monthsList.map(m => (
              <option key={m} value={m}>
                {new Date(m + '-01').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </option>
            ))}
          </select>

          <button
            onClick={onThemeToggle}
            className="btn-pill"
            style={{
              backgroundColor: theme === 'light' ? 'var(--text)' : 'var(--surfaceAlt)',
              color: theme === 'light' ? 'var(--bg)' : 'var(--text)'
            }}
          >
            {theme === 'light' ? 'CLARO' : 'ESCURO'}
          </button>
        </div>
      </div>
    </header>
  );
}
