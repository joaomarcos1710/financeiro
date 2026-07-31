import { useMemo } from 'react';
import { DIVIDAS, ATIVOS } from '../data';

export default function FinancialHealth({ metrics, previousMetrics }) {
  if (!metrics) return null;

  const healthMetrics = useMemo(() => {
    // Patrimônio Líquido
    const patrimonioLiquido = metrics.patrimonioLiquido || 0;

    // Taxa de Endividamento = Dívidas / Ativos
    const ativosTotal = Object.values(ATIVOS).reduce((sum, val) => sum + val, 0);
    const dividasTotal = Object.values(DIVIDAS).reduce((sum, val) => sum + val, 0);
    const taxaEndividamento = ativosTotal > 0 ? (dividasTotal / ativosTotal) * 100 : 0;

    // Velocidade de endividamento (mês anterior vs atual)
    let velocidade = 0;
    if (previousMetrics) {
      const deltaPatrimonio = metrics.patrimonioLiquido - previousMetrics.patrimonioLiquido;
      velocidade = deltaPatrimonio;
    }

    // Tempo para zerar dívidas (em meses)
    let tempoParaZerar = null;
    if (metrics.saldo < 0 && dividasTotal > 0) {
      // Se está gastando mais que recebendo
      tempoParaZerar = Math.abs(dividasTotal / metrics.saldo);
    } else if (metrics.saldo > 0 && dividasTotal > 0) {
      // Se está economizando
      tempoParaZerar = Math.abs(dividasTotal / metrics.saldo);
    }

    // Determinar status (verde, amarelo, vermelho)
    let status = 'crítico';
    let statusColor = 'var(--alert)';
    let statusText = '🔴 Crítico';

    if (taxaEndividamento < 50) {
      status = 'bom';
      statusColor = 'var(--green)';
      statusText = '🟢 Bom';
    } else if (taxaEndividamento < 100) {
      status = 'atenção';
      statusColor = 'var(--warning)';
      statusText = '🟡 Atenção';
    } else if (taxaEndividamento >= 100 && taxaEndividamento < 150) {
      status = 'crítico';
      statusColor = 'var(--alert)';
      statusText = '🔴 Crítico';
    } else {
      status = 'crítico';
      statusColor = 'var(--alert)';
      statusText = '🔴 Muito Crítico';
    }

    return {
      patrimonioLiquido,
      taxaEndividamento,
      velocidade,
      tempoParaZerar,
      status,
      statusColor,
      statusText,
      ativosTotal,
      dividasTotal
    };
  }, [metrics, previousMetrics]);

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatMonths = (months) => {
    if (!months) return 'Indefinido';
    if (months < 0) return 'Está piorando';
    return `${months.toFixed(1)} meses`;
  };

  return (
    <section>
      <h2 className="section-title">SAÚDE FINANCEIRA GERAL</h2>

      <div className="grid-auto">
        {/* Status */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p className="label-uppercase">Status</p>
          <div style={{
            fontFamily: 'League Gothic',
            fontSize: '36px',
            fontWeight: '400',
            letterSpacing: '0.05em',
            color: healthMetrics.statusColor,
            lineHeight: '1.2'
          }}>
            {healthMetrics.statusText}
          </div>
          <p className="text-sm text-muted">Taxa de Endividamento: {healthMetrics.taxaEndividamento.toFixed(1)}%</p>
        </div>

        {/* Patrimônio Líquido */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p className="label-uppercase">Patrimônio Líquido</p>
          <div style={{
            fontFamily: 'League Gothic',
            fontSize: '36px',
            fontWeight: '400',
            letterSpacing: '0.05em',
            color: healthMetrics.patrimonioLiquido >= 0 ? 'var(--green)' : 'var(--alert)',
            lineHeight: '1.2'
          }}>
            {formatCurrency(healthMetrics.patrimonioLiquido)}
          </div>
          {healthMetrics.velocidade !== 0 && (
            <p className="text-sm text-muted">
              {healthMetrics.velocidade > 0 ? '▲ Melhorando' : '▼ Piorando'} {formatCurrency(Math.abs(healthMetrics.velocidade))}/mês
            </p>
          )}
        </div>

        {/* Tempo para Zerar Dívidas */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p className="label-uppercase">Tempo para Zerar Dívidas</p>
          <div style={{
            fontFamily: 'League Gothic',
            fontSize: '36px',
            fontWeight: '400',
            letterSpacing: '0.05em',
            color: healthMetrics.tempoParaZerar && healthMetrics.tempoParaZerar > 0 ? 'var(--warning)' : 'var(--alert)',
            lineHeight: '1.2'
          }}>
            {formatMonths(healthMetrics.tempoParaZerar)}
          </div>
          <p className="text-sm text-muted">
            Ao ritmo atual: {formatCurrency(Math.abs(metrics.saldo))}/mês
          </p>
        </div>

        {/* Detalhes */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p className="label-uppercase">Detalhes</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-sm">Ativos:</span>
              <span className="text-sm" style={{ color: 'var(--green)' }}>
                {formatCurrency(healthMetrics.ativosTotal)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-sm">Dívidas:</span>
              <span className="text-sm" style={{ color: 'var(--alert)' }}>
                {formatCurrency(healthMetrics.dividasTotal)}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '8px',
              borderTop: '1px solid var(--border)'
            }}>
              <span className="text-sm">Taxa Endividamento:</span>
              <span className="text-sm" style={{
                color: healthMetrics.taxaEndividamento > 100 ? 'var(--alert)' : 'var(--warning)',
                fontWeight: 'bold'
              }}>
                {healthMetrics.taxaEndividamento.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Alertas e Sugestões */}
      <div className="card-alt" style={{ marginTop: '24px', padding: '20px' }}>
        <h3 style={{
          fontFamily: 'League Gothic',
          fontSize: '18px',
          letterSpacing: '0.03em',
          marginBottom: '12px',
          marginTop: 0
        }}>
          ⚠️ ANÁLISE
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {healthMetrics.patrimonioLiquido < 0 && (
            <li className="text-sm">
              <strong>Patrimônio negativo:</strong> Você deve mais do que possui. Prioridade: aumentar renda ou reduzir despesas.
            </li>
          )}
          {healthMetrics.taxaEndividamento > 100 && (
            <li className="text-sm">
              <strong>Endividamento crítico:</strong> Dívidas excedem ativos em {(healthMetrics.taxaEndividamento - 100).toFixed(1)}%. Recomendado: renegociar dívidas.
            </li>
          )}
          {metrics.saldo < 0 && (
            <li className="text-sm">
              <strong>Déficit mensal:</strong> Gastando {formatCurrency(Math.abs(metrics.saldo))} a mais que recebe. Investigar categories com excesso orçamentário.
            </li>
          )}
          {healthMetrics.velocidade < -10000 && (
            <li className="text-sm">
              <strong>Piora acelerada:</strong> Patrimônio diminuindo {formatCurrency(Math.abs(healthMetrics.velocidade))}/mês. Agir urgentemente.
            </li>
          )}
          {healthMetrics.patrimonioLiquido > 0 && healthMetrics.taxaEndividamento < 100 && (
            <li className="text-sm">
              <strong>Caminho certo:</strong> Sua situação é positiva. Mantenha o ritmo e invista em diversificação.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
