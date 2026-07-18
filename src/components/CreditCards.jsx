export default function CreditCards({ cards }) {
  return (
    <div className="card">
      <h3 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px' }}>
        CARTÕES DE CRÉDITO
      </h3>
      <div className="grid-auto">
        {cards.map((card, i) => (
          <div key={i} style={{
            backgroundColor: 'var(--surfaceAlt)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '600', margin: 0 }}>{card.nome}</h4>
              <span className="label-uppercase" style={{ fontSize: '10px' }}>Fecha: {card.fecha}</span>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                <span className="text-muted">Disponível</span>
                <span className="text-green">R$ {card.limiteDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span className="text-muted">Fatura Atual</span>
                <span className="text-alert">R$ {card.faturaAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
