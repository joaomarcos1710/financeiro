import { NavLink } from 'react-router-dom';

function navLinkStyle({ isActive }) {
  return {
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: 'pointer',
    backgroundColor: isActive ? 'var(--text)' : 'transparent',
    color: isActive ? 'var(--bg)' : 'var(--muted)',
    transition: 'background-color 0.2s, color 0.2s'
  };
}

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
        padding: '16px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{
            fontSize: '30px',
            fontFamily: 'League Gothic',
            letterSpacing: '0.02em',
            lineHeight: '1'
          }}>
            JM<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <div>
            <h1 style={{
              fontSize: '18px',
              fontFamily: 'League Gothic',
              fontWeight: '400',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: 0,
              lineHeight: '1.2'
            }}>
              CONTROLE FINANCEIRO
            </h1>
            <p style={{
              fontSize: '12px',
              color: 'var(--muted)',
              margin: 0
            }}>
              Acompanhamento mensal · João Marcos
            </p>
          </div>
        </div>

        <nav style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '2px',
          flexWrap: 'wrap'
        }}>
          <NavLink to="/" end style={navLinkStyle}>Dashboard</NavLink>
          <NavLink to="/contas-fixas" style={navLinkStyle}>Contas Fixas</NavLink>
        </nav>

        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {monthsList && (
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
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'Hanken Grotesk, sans-serif'
              }}
            >
              {monthsList.map(m => (
                <option key={m} value={m}>
                  {new Date(m + '-15').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                </option>
              ))}
            </select>
          )}

          <div style={{
            display: 'flex',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            overflow: 'hidden'
          }}>
            {[['light', 'CLARO'], ['dark', 'ESCURO']].map(([value, label]) => (
              <button
                key={value}
                onClick={() => theme !== value && onThemeToggle()}
                style={{
                  border: 'none',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '0.03em',
                  cursor: 'pointer',
                  backgroundColor: theme === value ? 'var(--text)' : 'transparent',
                  color: theme === value ? 'var(--bg)' : 'var(--muted)',
                  transition: 'background-color 0.2s, color 0.2s'
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
