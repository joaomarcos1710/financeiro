const brl = (v) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

const tituloSecao = {
  fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
  letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px'
};

export default function FaturaCartao({ fatura: FATURA }) {
  const TOTAL_ASSINATURAS = FATURA.assinaturas.reduce((s, a) => s + a.valor, 0);
  const TOTAL_RESSARCIVEL = FATURA.assinaturas.filter(a => a.ressarcido).reduce((s, a) => s + a.valor, 0);
  const TOTAL_PARCELAS_MES = FATURA.parcelas.reduce((s, p) => s + p.valor, 0);
  const pctLimite = (FATURA.utilizado / FATURA.limiteTotal) * 100;

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
        <h3 style={tituloSecao}>
          CARTÃO DE CRÉDITO — FATURA DE {new Date(FATURA.competencia + '-15').toLocaleDateString('pt-BR', { month: 'long' }).toUpperCase()}
        </h3>
        <span className="text-sm text-muted">vencimento {FATURA.vencimento}</span>
      </div>

      {/* Resumo principal */}
      <div className="grid-auto" style={{ marginBottom: '20px' }}>
        <div className="card-alt">
          <p className="label-uppercase">Total da Fatura</p>
          <div style={{ fontFamily: 'League Gothic', fontSize: '32px', letterSpacing: '0.03em', color: 'var(--alert)' }}>
            {brl(FATURA.total)}
          </div>
        </div>
        <div className="card-alt">
          <p className="label-uppercase">Próxima Fatura (prevista)</p>
          <div style={{ fontFamily: 'League Gothic', fontSize: '32px', letterSpacing: '0.03em' }}>
            {brl(FATURA.proximaFaturaPrevista)}
          </div>
          <p className="text-sm text-muted">queda de {(100 - (FATURA.proximaFaturaPrevista / FATURA.total) * 100).toFixed(0)}% se nada mudar</p>
        </div>
        <div className="card-alt">
          <p className="label-uppercase">Parcelas a Vencer</p>
          <div style={{ fontFamily: 'League Gothic', fontSize: '32px', letterSpacing: '0.03em', color: 'var(--amber)' }}>
            {brl(FATURA.despesasAVencer)}
          </div>
          <p className="text-sm text-muted">já comprometido em compras parceladas</p>
        </div>
        <div className="card-alt">
          <p className="label-uppercase">Limite Utilizado</p>
          <div style={{ fontFamily: 'League Gothic', fontSize: '32px', letterSpacing: '0.03em' }}>
            {pctLimite.toFixed(0)}%
          </div>
          <div className="progress-bar">
            <div
              className={`progress-fill ${pctLimite > 80 ? 'alert' : pctLimite > 50 ? 'amber' : 'green'}`}
              style={{ width: `${Math.min(pctLimite, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted">{brl(FATURA.utilizado)} de {brl(FATURA.limiteTotal)}</p>
        </div>
      </div>

      <div className="grid-2col">
        {/* Coluna esquerda: destaques + cartões */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h4 style={tituloSecao}>ONDE O DINHEIRO FOI</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {FATURA.destaques.map((d) => {
                const pct = (d.valor / FATURA.total) * 100;
                return (
                  <div key={d.grupo}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '2px' }}>
                      <span>
                        {d.grupo} <span className="text-muted">({d.qtd}x)</span>
                        {d.alerta && <span className="badge badge-alert" style={{ marginLeft: '6px' }}>atenção</span>}
                      </span>
                      <span style={{ fontWeight: 600 }}>{brl(d.valor)}</span>
                    </div>
                    <div className="progress-bar" style={{ height: '4px', margin: '2px 0' }}>
                      <div className="progress-fill" style={{ width: `${pct * 4}%`, backgroundColor: d.alerta ? 'var(--alert)' : 'var(--red)', opacity: d.alerta ? 1 : 0.75 }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 style={tituloSecao}>POR CARTÃO</h4>
            <table>
              <thead>
                <tr>
                  <th>Cartão</th>
                  <th style={{ textAlign: 'right' }}>Compras</th>
                  <th style={{ textAlign: 'right' }}>Parcelas</th>
                  <th style={{ textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {FATURA.cartoes.map((c) => (
                  <tr key={c.final}>
                    <td>{c.titular} · final {c.final}</td>
                    <td style={{ textAlign: 'right' }}>{c.compras ? brl(c.compras) : '—'}</td>
                    <td style={{ textAlign: 'right' }}>{c.parceladas ? brl(c.parceladas) : '—'}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>{brl(c.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h4 style={tituloSecao}>ASSINATURAS NA FATURA — {brl(TOTAL_ASSINATURAS)}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {FATURA.assinaturas.map((a) => (
                <div key={a.nome} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                  <span>
                    {a.nome}
                    {a.ressarcido && <span style={{ color: 'var(--green)', marginLeft: '6px', fontSize: '10px', fontWeight: 700 }}>✓ RESSARCIDO</span>}
                  </span>
                  <span>{brl(a.valor)}</span>
                </div>
              ))}
              <p className="text-sm text-muted" style={{ marginTop: '4px' }}>
                {brl(TOTAL_RESSARCIVEL)} voltam via ressarcimento (Sidney + Júlia) → custo real {brl(TOTAL_ASSINATURAS - TOTAL_RESSARCIVEL)}
              </p>
            </div>
          </div>
        </div>

        {/* Coluna direita: parcelas em andamento */}
        <div>
          <h4 style={tituloSecao}>PARCELAS EM ANDAMENTO — {brl(TOTAL_PARCELAS_MES)}/MÊS</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {FATURA.parcelas.map((p, i) => {
              const ultima = p.atual === p.de;
              const pct = (p.atual / p.de) * 100;
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '2px' }}>
                    <span>
                      {p.descricao}
                      {ultima && <span style={{ color: 'var(--green)', marginLeft: '6px', fontSize: '10px', fontWeight: 700 }}>ÚLTIMA!</span>}
                    </span>
                    <span className="text-muted">{p.atual}/{p.de} · <span style={{ color: 'var(--text)', fontWeight: 600 }}>{brl(p.valor)}</span></span>
                  </div>
                  <div className="progress-bar" style={{ height: '4px', margin: '2px 0' }}>
                    <div className={`progress-fill ${ultima ? 'green' : 'amber'}`} style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
