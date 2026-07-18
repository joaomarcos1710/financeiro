export default function KPICards({ metrics, previousMetrics, previousMonthData }) {
  const kpiItems = [
    {
      label: 'Receita do Mês',
      value: metrics.totalReceitas,
      color: 'var(--green)',
      subtitle: previousMetrics ? `▲ R$ ${(metrics.totalReceitas - previousMetrics.totalReceitas).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : ''
    },
    {
      label: 'Despesas do Mês',
      value: metrics.totalDespesas,
      color: 'var(--alert)',
      subtitle: previousMetrics ? `▲ R$ ${(metrics.totalDespesas - previousMetrics.totalDespesas).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : ''
    },
    {
      label: 'Saldo do Mês',
      value: metrics.saldo,
      color: metrics.saldo >= 0 ? 'var(--green)' : 'var(--alert)',
      subtitle: previousMetrics ? `${metrics.saldo >= previousMetrics.saldo ? '▲ melhorou' : '▼ piorou'} R$ ${Math.abs(metrics.saldo - previousMetrics.saldo).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : ''
    },
    {
      label: 'Economia',
      value: `${metrics.economia.toFixed(1)}%`,
      color: metrics.saldo >= 0 ? 'var(--green)' : 'var(--muted)',
      isPercent: true,
      subtitle: 'da receita guardada'
    }
  ];

  return (
    <div className="grid-auto">
      {kpiItems.map((item, i) => (
        <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p className="label-uppercase">{item.label}</p>
          <div style={{
            fontFamily: 'League Gothic',
            fontSize: '36px',
            fontWeight: '400',
            letterSpacing: '0.05em',
            color: item.color,
            lineHeight: '1.2'
          }}>
            {item.isPercent ? item.value : `R$ ${item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          </div>
          {item.subtitle && (
            <p className="text-sm text-muted">{item.subtitle}</p>
          )}
        </div>
      ))}
    </div>
  );
}
