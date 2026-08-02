import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PATRIMONIO_POR_MES, ATIVOS_POR_MES, DIVIDAS_POR_MES, ULTIMO_MES_PATRIMONIAL, NOTION_FETCHED_AT } from '../data';
import Header from '../components/Header';

const brl = (v) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
const sectionTitleStyle = {
  fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
  letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px'
};

export default function Patrimonio({ theme, onThemeToggle }) {
  const atual = PATRIMONIO_POR_MES[PATRIMONIO_POR_MES.length - 1];
  const anterior = PATRIMONIO_POR_MES[PATRIMONIO_POR_MES.length - 2];
  const deltaPL = anterior ? atual.pl - anterior.pl : null;
  const ativos = ATIVOS_POR_MES[ULTIMO_MES_PATRIMONIAL] || [];
  const dividas = DIVIDAS_POR_MES[ULTIMO_MES_PATRIMONIAL] || [];

  const kpis = [
    { label: 'Patrimônio Líquido', valor: brl(atual.pl), cor: atual.pl < 0 ? 'var(--red)' : 'var(--green)', sub: atual.label },
    { label: 'Variação vs mês anterior', valor: deltaPL != null ? `${deltaPL >= 0 ? '+' : ''}${brl(deltaPL)}` : '—', cor: deltaPL >= 0 ? 'var(--green)' : 'var(--red)', sub: anterior ? `contra ${anterior.label}` : 'sem mês anterior' },
    { label: 'Total de Ativos', valor: brl(atual.ativos), cor: 'var(--text)', sub: `${ativos.length} contas` },
    { label: 'Total de Dívidas', valor: brl(atual.dividas), cor: 'var(--red)', sub: `${dividas.length} dívidas ativas` },
  ];

  return (
    <>
      <Header theme={theme} onThemeToggle={onThemeToggle} />
      <main>
        <div className="grid-auto" style={{ marginBottom: '28px' }}>
          {kpis.map((k, i) => (
            <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p className="label-uppercase">{k.label}</p>
              <div style={{ fontFamily: 'League Gothic', fontSize: '32px', letterSpacing: '0.03em', color: k.cor, lineHeight: 1.2 }}>{k.valor}</div>
              <p className="text-sm text-muted">{k.sub}</p>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginBottom: '28px' }}>
          <h3 style={sectionTitleStyle}>EVOLUÇÃO DO PATRIMÔNIO LÍQUIDO</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={PATRIMONIO_POR_MES}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" stroke="var(--muted)" style={{ fontSize: '11px' }} />
              <YAxis stroke="var(--muted)" style={{ fontSize: '11px' }} />
              <Tooltip formatter={(v) => brl(v)} contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="ativos" fill="var(--green)" name="Ativos" isAnimationActive={false} />
              <Bar dataKey="dividas" fill="var(--red)" name="Dívidas" isAnimationActive={false} />
              <Line type="monotone" dataKey="pl" stroke="#3B82F6" strokeWidth={2} name="Patrimônio Líquido" isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '28px' }}>
          <div className="card">
            <h3 style={sectionTitleStyle}>ATIVOS — {ULTIMO_MES_PATRIMONIAL}</h3>
            <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
              <tbody>
                {[...ativos].sort((a, b) => b.valor - a.valor).map((a, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '8px 4px' }}>{a.nome}{a.tipo ? <span className="text-muted" style={{ fontSize: '11px' }}> · {a.tipo}</span> : null}</td>
                    <td style={{ padding: '8px 4px', textAlign: 'right', fontWeight: 600, color: 'var(--green)' }}>{brl(a.valor)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card">
            <h3 style={sectionTitleStyle}>DÍVIDAS — {ULTIMO_MES_PATRIMONIAL}</h3>
            <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
              <tbody>
                {[...dividas].sort((a, b) => b.saldo - a.saldo).map((d, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '8px 4px' }}>{d.nome}{d.parcelas ? <span className="text-muted" style={{ fontSize: '11px' }}> · {d.parcelas} parcelas</span> : null}</td>
                    <td style={{ padding: '8px 4px', textAlign: 'right', fontWeight: 600, color: 'var(--red)' }}>{brl(d.saldo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
