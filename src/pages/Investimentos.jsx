import { NOTION_INVESTIMENTOS, NOTION_FETCHED_AT } from '../data';
import Header from '../components/Header';

const brl = (v) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
const sectionTitleStyle = {
  fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
  letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px'
};

export default function Investimentos({ theme, onThemeToggle }) {
  const total = NOTION_INVESTIMENTOS.reduce((s, i) => s + (i.valorTotal || 0), 0);
  const porTipo = {};
  for (const i of NOTION_INVESTIMENTOS) {
    porTipo[i.tipo || 'Outro'] = (porTipo[i.tipo || 'Outro'] || 0) + (i.valorTotal || 0);
  }

  return (
    <>
      <Header theme={theme} onThemeToggle={onThemeToggle} />
      <main>
        <div className="grid-auto" style={{ marginBottom: '28px' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p className="label-uppercase">Total Investido</p>
            <div style={{ fontFamily: 'League Gothic', fontSize: '32px', letterSpacing: '0.03em', color: 'var(--green)', lineHeight: 1.2 }}>{brl(total)}</div>
            <p className="text-sm text-muted">{NOTION_INVESTIMENTOS.length} posições</p>
          </div>
          {Object.entries(porTipo).map(([tipo, valor]) => (
            <div key={tipo} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p className="label-uppercase">{tipo}</p>
              <div style={{ fontFamily: 'League Gothic', fontSize: '32px', letterSpacing: '0.03em', color: 'var(--text)', lineHeight: 1.2 }}>{brl(valor)}</div>
              <p className="text-sm text-muted">{total > 0 ? `${((valor / total) * 100).toFixed(1)}% da carteira` : ''}</p>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginBottom: '28px' }}>
          <h3 style={sectionTitleStyle}>POSIÇÕES</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse', minWidth: '560px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                  <th style={{ padding: '8px 4px' }}>Ativo</th>
                  <th style={{ padding: '8px 4px', textAlign: 'right' }}>Qtd.</th>
                  <th style={{ padding: '8px 4px', textAlign: 'right' }}>Preço Ref.</th>
                  <th style={{ padding: '8px 4px', textAlign: 'right' }}>Valor</th>
                  <th style={{ padding: '8px 4px' }}>Data</th>
                </tr>
              </thead>
              <tbody>
                {[...NOTION_INVESTIMENTOS].sort((a, b) => (b.valorTotal || 0) - (a.valorTotal || 0)).map((i, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 4px' }}>
                      {i.ativo}
                      {i.obs && <div className="text-muted" style={{ fontSize: '11px', maxWidth: '420px' }}>{i.obs}</div>}
                    </td>
                    <td style={{ padding: '10px 4px', textAlign: 'right' }}>{i.quantidade ?? '—'}</td>
                    <td style={{ padding: '10px 4px', textAlign: 'right' }}>{i.precoUnitario != null ? brl(i.precoUnitario) : '—'}</td>
                    <td style={{ padding: '10px 4px', textAlign: 'right', fontWeight: 600, color: 'var(--green)' }}>{i.valorTotal != null ? brl(i.valorTotal) : '—'}</td>
                    <td style={{ padding: '10px 4px' }}>{i.data ? new Date(i.data + 'T12:00:00').toLocaleDateString('pt-BR') : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '3px solid var(--amber, #d97706)', marginBottom: '28px' }}>
          <p style={{ fontSize: '13px', margin: 0 }}>
            ⚠️ Posições em cripto usam preço de referência e podem ter liquidez limitada no Brasil.
            Este painel é informativo — não é recomendação de investimento.
          </p>
        </div>

        {NOTION_FETCHED_AT && (
          <p className="text-sm text-muted" style={{ textAlign: 'center' }}>
            Dados do Notion · atualizado em {new Date(NOTION_FETCHED_AT).toLocaleString('pt-BR')}
          </p>
        )}
      </main>
    </>
  );
}
