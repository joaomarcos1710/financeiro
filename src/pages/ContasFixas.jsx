import { CARTAO_FIXO, CONTA_FIXO, TOTAL_CARTAO_FIXO, TOTAL_CONTA_FIXO, TOTAL_CONTAS_FIXAS } from '../data/generated/contasFixas';
import { DIVIDAS, TOTAL_DIVIDAS } from '../data';
import { FATURA, TOTAL_PARCELAS_MES } from '../data/fatura';
import Header from '../components/Header';

const sectionTitleStyle = {
  fontSize: '11px',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'var(--muted)',
  marginBottom: '16px'
};

function fmt(valor) {
  return `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

export default function ContasFixas({ theme, onThemeToggle }) {
  return (
    <>
      <Header theme={theme} onThemeToggle={onThemeToggle} />
      <main>
        <div className="card-alt" style={{ padding: '20px', marginBottom: '28px' }}>
          <h3 style={sectionTitleStyle}>RESUMO — COMPROMISSOS FIXOS</h3>
          <div className="grid-auto">
            <div>
              <p className="label-uppercase">Contas Fixas Mensais</p>
              <div style={{ fontFamily: 'League Gothic', fontSize: '28px', color: 'var(--alert)' }}>
                {fmt(TOTAL_CONTAS_FIXAS)}
              </div>
              <p className="text-muted text-sm">Cartão {fmt(TOTAL_CARTAO_FIXO)} + Conta {fmt(TOTAL_CONTA_FIXO)}</p>
            </div>
            <div>
              <p className="label-uppercase">Parcelas de Cartão Ativas</p>
              <div style={{ fontFamily: 'League Gothic', fontSize: '28px', color: 'var(--amber)' }}>
                {fmt(TOTAL_PARCELAS_MES)}
              </div>
              <p className="text-muted text-sm">{FATURA.parcelas.length} compras parceladas em andamento</p>
            </div>
            <div>
              <p className="label-uppercase">Saldo Devedor — Empréstimos e Financiamentos</p>
              <div style={{ fontFamily: 'League Gothic', fontSize: '28px', color: 'var(--alert)' }}>
                {fmt(TOTAL_DIVIDAS)}
              </div>
              <p className="text-muted text-sm">{DIVIDAS.length} dívidas ativas</p>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '28px' }}>
          <h3 style={sectionTitleStyle}>CONTAS FIXAS — CARTÃO DE CRÉDITO ({fmt(TOTAL_CARTAO_FIXO)})</h3>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Venc.</th>
                  <th>Descrição</th>
                  <th>Titular</th>
                  <th style={{ textAlign: 'right' }}>Valor</th>
                </tr>
              </thead>
              <tbody>
                {CARTAO_FIXO.map((item, i) => (
                  <tr key={i}>
                    <td>{item.vencimento}</td>
                    <td>
                      {item.descricao}
                      {item.ressarcido && <span className="badge" style={{ marginLeft: '8px', backgroundColor: 'var(--surfaceAlt)', color: 'var(--green)' }}>ressarcido</span>}
                    </td>
                    <td className="text-muted">{item.titular}</td>
                    <td style={{ textAlign: 'right' }}>{fmt(item.valor)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '28px' }}>
          <h3 style={sectionTitleStyle}>CONTAS FIXAS — CONTA CORRENTE ({fmt(TOTAL_CONTA_FIXO)})</h3>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Dia</th>
                  <th>Descrição</th>
                  <th>Obs.</th>
                  <th style={{ textAlign: 'right' }}>Valor</th>
                </tr>
              </thead>
              <tbody>
                {CONTA_FIXO.map((item, i) => (
                  <tr key={i}>
                    <td>{item.dia}</td>
                    <td>{item.descricao}</td>
                    <td className="text-muted" style={{ fontSize: '11px' }}>{item.obs}</td>
                    <td style={{ textAlign: 'right' }}>{fmt(item.valor)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '28px' }}>
          <h3 style={sectionTitleStyle}>
            PARCELAS DE CARTÃO ATIVAS — COMPRAS PARCELADAS ({fmt(TOTAL_PARCELAS_MES)}/MÊS)
          </h3>
          <p className="text-muted text-sm" style={{ marginBottom: '16px' }}>
            Da fatura de {new Date(FATURA.competencia + '-15').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} (vence {FATURA.vencimento}).
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Parcela</th>
                  <th style={{ textAlign: 'right' }}>Valor</th>
                </tr>
              </thead>
              <tbody>
                {FATURA.parcelas.map((p, i) => (
                  <tr key={i}>
                    <td>
                      {p.descricao}
                      {p.atual === p.de && <span className="badge" style={{ marginLeft: '8px', backgroundColor: 'var(--surfaceAlt)', color: 'var(--green)' }}>última</span>}
                    </td>
                    <td className="text-muted">{p.atual}/{p.de}</td>
                    <td style={{ textAlign: 'right' }}>{fmt(p.valor)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3 style={sectionTitleStyle}>PARCELAS DE EMPRÉSTIMOS E FINANCIAMENTOS ({fmt(TOTAL_DIVIDAS)})</h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {DIVIDAS.map((divida, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{divida.nome}</div>
                  {divida.parcelas > 0 && (
                    <div className="text-muted" style={{ fontSize: '11px' }}>{divida.parcelas} parcelas restantes</div>
                  )}
                </div>
                <span className="text-alert" style={{ fontSize: '13px', fontWeight: 600 }}>{fmt(divida.saldo)}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
