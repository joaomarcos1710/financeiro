import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { RENDA_MESES, LIQUIDO_MEDIO, BASELINE_LIQUIDO, COMPOSICAO_JUNHO, FGTS_DEPOSITO_MENSAL, MARGEM_CONSIGNAVEL, EVENTOS_FUTUROS } from '../data/renda';
import Header from '../components/Header';

const sectionTitleStyle = {
  fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
  letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px'
};

const brl = (v) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

export default function Renda({ theme, onThemeToggle }) {
  const margemLivre = MARGEM_CONSIGNAVEL.total35 - MARGEM_CONSIGNAVEL.usada;
  const totalProventos = COMPOSICAO_JUNHO.proventos.reduce((s, p) => s + p.valor, 0);
  const totalDescontos = COMPOSICAO_JUNHO.descontos.reduce((s, d) => s + d.valor, 0);

  const kpis = [
    { label: 'Líquido Médio (6 meses)', valor: brl(LIQUIDO_MEDIO), cor: 'var(--green)', sub: 'inclui 13º, PLR e APIP' },
    { label: 'Baseline Mensal', valor: brl(BASELINE_LIQUIDO), cor: 'var(--text)', sub: 'mês típico, sem eventos (Abr–Jun)' },
    { label: 'FGTS Depositado/Mês', valor: brl(FGTS_DEPOSITO_MENSAL), cor: 'var(--green)', sub: 'patrimônio compulsório, fora do caixa' },
    { label: 'Margem Consignável Livre', valor: brl(margemLivre), cor: 'var(--amber)', sub: `de ${brl(MARGEM_CONSIGNAVEL.total35)} (35%) · usada ${brl(MARGEM_CONSIGNAVEL.usada)}` },
  ];

  return (
    <>
      <Header theme={theme} onThemeToggle={onThemeToggle} />
      <main>
        <div className="grid-auto" style={{ marginBottom: '28px' }}>
          {kpis.map((k, i) => (
            <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p className="label-uppercase">{k.label}</p>
              <div style={{ fontFamily: 'League Gothic', fontSize: '32px', letterSpacing: '0.03em', color: k.cor, lineHeight: 1.2 }}>
                {k.valor}
              </div>
              <p className="text-sm text-muted">{k.sub}</p>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginBottom: '28px' }}>
          <h3 style={sectionTitleStyle}>BRUTO × LÍQUIDO POR MÊS (2026)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={RENDA_MESES}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" stroke="var(--muted)" style={{ fontSize: '12px' }} />
              <YAxis stroke="var(--muted)" style={{ fontSize: '11px' }} />
              <Tooltip
                formatter={(v) => brl(v)}
                contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)' }}
              />
              <Legend wrapperStyle={{ color: 'var(--text)', fontSize: '12px' }} />
              <ReferenceLine y={BASELINE_LIQUIDO} stroke="var(--muted)" strokeDasharray="4 4" label={{ value: 'baseline', fill: 'var(--muted)', fontSize: 10 }} />
              <Bar dataKey="bruto" name="Bruto" fill="var(--muted)" opacity={0.45} isAnimationActive={false} />
              <Bar dataKey="liquido" name="Líquido" fill="var(--red)" isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ marginBottom: '28px' }}>
          <h3 style={sectionTitleStyle}>MÊS A MÊS</h3>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Mês</th>
                  <th style={{ textAlign: 'right' }}>Bruto</th>
                  <th style={{ textAlign: 'right' }}>Descontos</th>
                  <th style={{ textAlign: 'right' }}>Líquido</th>
                  <th>Eventos</th>
                </tr>
              </thead>
              <tbody>
                {RENDA_MESES.map((m) => (
                  <tr key={m.mes}>
                    <td>{m.label}/26</td>
                    <td style={{ textAlign: 'right' }}>{brl(m.bruto)}</td>
                    <td style={{ textAlign: 'right' }} className="text-alert">{brl(m.descontos)}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }} className="text-green">{brl(m.liquido)}</td>
                    <td className="text-muted" style={{ fontSize: '11px' }}>{m.obs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid-2col" style={{ marginBottom: '28px' }}>
          <div className="card">
            <h3 style={sectionTitleStyle}>MÊS TÍPICO (JUNHO) — PROVENTOS {brl(totalProventos)}</h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              {COMPOSICAO_JUNHO.proventos.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span>{p.nome}</span>
                  <span className="text-green">{brl(p.valor)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 style={sectionTitleStyle}>MÊS TÍPICO (JUNHO) — DESCONTOS {brl(totalDescontos)}</h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              {COMPOSICAO_JUNHO.descontos.map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span>{d.nome}</span>
                  <span className="text-alert">{brl(d.valor)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card-alt" style={{ padding: '20px' }}>
          <h3 style={sectionTitleStyle}>PRÓXIMOS EVENTOS DE RENDA</h3>
          {EVENTOS_FUTUROS.map((e, i) => (
            <p key={i} style={{ fontSize: '14px', margin: '8px 0' }}>
              <span style={{ color: 'var(--accent)', marginRight: '8px' }}>·</span>
              <strong>{e.quando}</strong> — {e.o_que}
            </p>
          ))}
          <p className="text-sm text-muted" style={{ marginTop: '12px' }}>
            Picos de renda não comprometidos com o custo de vida — munição natural do plano de quitação de dívidas.
          </p>
        </div>
      </main>
    </>
  );
}
