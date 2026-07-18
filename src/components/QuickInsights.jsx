import { RESERVA_LIQUIDA, RESERVA_META } from '../data';

export default function QuickInsights({ data, metrics, previousMetrics }) {
  const insights = [];

  // Maior gasto (por categoria)
  const maiorGasto = data.despesas.reduce((max, d) => d.valor > max.valor ? d : max);
  insights.push(`Maior gasto: ${maiorGasto.categoria} (R$ ${maiorGasto.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})`);

  // Comparação com mês anterior
  if (previousMetrics) {
    const diff = metrics.totalDespesas - previousMetrics.totalDespesas;
    const diffPercent = previousMetrics.totalDespesas ? ((diff / previousMetrics.totalDespesas) * 100).toFixed(1) : '0.0';
    const direction = diff > 0 ? 'mais' : 'menos';
    insights.push(`Gastos: R$ ${Math.abs(diff).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ${direction} que no mês anterior (${diffPercent}%)`);
  }

  // Cobertura reserva de emergência
  const mesesCobertura = (RESERVA_LIQUIDA / metrics.totalDespesas).toFixed(1);
  const percentualMeta = ((RESERVA_LIQUIDA / RESERVA_META) * 100).toFixed(0);
  insights.push(`Reserva de emergência: ${mesesCobertura} meses de cobertura (${percentualMeta}% da meta)`);

  return (
    <div className="card-alt" style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px' }}>
        INSIGHTS RÁPIDOS
      </h3>
      {data.aviso && (
        <p style={{ fontSize: '13px', margin: '0 0 16px 0', lineHeight: '1.6', color: 'var(--alert)', fontWeight: 600 }}>
          ⚠ {data.aviso}
        </p>
      )}
      {insights.map((insight, i) => (
        <p key={i} style={{ fontSize: '14px', margin: '8px 0', lineHeight: '1.6' }}>
          <span style={{ color: 'var(--accent)', marginRight: '8px' }}>·</span>
          {insight}
        </p>
      ))}
    </div>
  );
}
