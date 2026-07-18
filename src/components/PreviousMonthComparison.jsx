export default function PreviousMonthComparison({ metrics, previousMetrics }) {
  const items = [
    {
      label: 'Receitas',
      current: metrics.totalReceitas,
      previous: previousMetrics.totalReceitas
    },
    {
      label: 'Despesas',
      current: metrics.totalDespesas,
      previous: previousMetrics.totalDespesas
    },
    {
      label: 'Saldo',
      current: metrics.saldo,
      previous: previousMetrics.saldo
    }
  ];

  return (
    <div className="card" style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '20px' }}>
        MÊS PASSADO × MÊS ATUAL
      </h3>
      <div style={{ display: 'grid', gap: '16px' }}>
        {items.map((item, i) => {
          const delta = item.current - item.previous;
          const deltaPercent = ((delta / item.previous) * 100).toFixed(1);
          const isPositive = delta >= 0 && (item.label === 'Receitas' || item.label === 'Saldo') || (item.label === 'Despesas' && delta <= 0);

          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <span className="label-uppercase">{item.label}</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'League Gothic', fontSize: '22px', fontWeight: '400', letterSpacing: '0.05em', color: 'var(--text)' }}>
                  R$ {item.previous.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} → R$ {item.current.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: '12px', color: isPositive ? 'var(--green)' : 'var(--alert)', fontWeight: '600', marginTop: '4px' }}>
                  {isPositive ? '▲' : '▼'} R$ {Math.abs(delta).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ({deltaPercent}%)
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
