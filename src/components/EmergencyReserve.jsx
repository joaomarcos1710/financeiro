import { RESERVA_LIQUIDA, RESERVA_META, SALARIO_MENSAL } from '../data';

export default function EmergencyReserve() {
  const percentual = Math.min((RESERVA_LIQUIDA / RESERVA_META) * 100, 100);
  let progressClass = 'alert';
  if (percentual >= 100) progressClass = 'green';
  else if (percentual >= 40) progressClass = 'amber';

  return (
    <div className="card-alt">
      <h3 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px' }}>
        RESERVA DE EMERGÊNCIA
      </h3>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span className="label-uppercase">Atual</span>
          <span style={{ fontFamily: 'League Gothic', fontSize: '18px', fontWeight: '400', letterSpacing: '0.05em' }}>
            R$ {RESERVA_LIQUIDA.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: 'var(--muted)' }}>
          <span>Meta: R$ {RESERVA_META.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          <span>{percentual.toFixed(0)}%</span>
        </div>
        <div className="progress-bar">
          <div className={`progress-fill ${progressClass}`} style={{ width: `${percentual}%` }}></div>
        </div>
      </div>
      <p style={{ fontSize: '12px', color: 'var(--muted)' }}>
        {(RESERVA_LIQUIDA / SALARIO_MENSAL).toFixed(1)} meses de cobertura
      </p>
    </div>
  );
}
