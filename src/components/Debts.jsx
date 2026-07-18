export default function Debts({ dividas, ativos }) {
  const totalAtivos = ativos.reduce((sum, a) => sum + a.valor, 0);
  const totalDividas = dividas.reduce((sum, d) => sum + d.saldo, 0);
  const patrimonioLiquido = totalAtivos - totalDividas;

  return (
    <div className="card">
      <h3 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '20px' }}>
        ATIVOS E DÍVIDAS
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h4 style={{ fontSize: '12px', fontWeight: '600', marginBottom: '12px', color: 'var(--text)' }}>Ativos</h4>
          <div style={{ display: 'grid', gap: '8px' }}>
            {ativos.map((ativo, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}>
                <span>{ativo.nome}</span>
                <span className="text-green">R$ {ativo.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginTop: '12px', paddingTop: '12px', borderTop: '2px solid var(--border)' }}>
            <span>Total Ativos</span>
            <span className="text-green">R$ {totalAtivos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '12px', fontWeight: '600', marginBottom: '12px', color: 'var(--text)' }}>Dívidas</h4>
          <div style={{ display: 'grid', gap: '12px' }}>
            {dividas.map((divida, i) => (
              <div key={i} style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span>{divida.nome}</span>
                  <span className="text-alert">R$ {divida.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                {divida.parcelas > 0 && (
                  <div style={{ fontSize: '10px', color: 'var(--muted)' }}>
                    {divida.parcelas} parcelas restantes
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginTop: '12px', paddingTop: '12px', borderTop: '2px solid var(--border)' }}>
            <span>Total Dívidas</span>
            <span className="text-alert">R$ {totalDividas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '12px', fontWeight: '600' }}>Patrimônio Líquido</span>
        <span style={{
          fontFamily: 'League Gothic',
          fontSize: '22px',
          fontWeight: '400',
          letterSpacing: '0.05em',
          color: patrimonioLiquido >= 0 ? 'var(--green)' : 'var(--alert)'
        }}>
          R$ {patrimonioLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
}
