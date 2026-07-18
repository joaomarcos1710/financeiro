export default function BudgetByCategory({ data, budgets }) {
  // Calculate spending by category
  const categorySpending = {};
  data.despesas.forEach(d => {
    categorySpending[d.categoria] = (categorySpending[d.categoria] || 0) + d.valor;
  });

  const items = Object.entries(budgets).map(([category, limit]) => {
    const spent = categorySpending[category] || 0;
    const percentual = (spent / limit) * 100;
    const isOver = spent > limit;

    return { category, limit, spent, percentual, isOver };
  });

  return (
    <div className="card-alt">
      <h3 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px' }}>
        ORÇAMENTO POR CATEGORIA
      </h3>
      <div style={{ display: 'grid', gap: '16px' }}>
        {items.map((item, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <span className="label-uppercase">{item.category}</span>
                {item.isOver && <span className="badge badge-alert">⚠ ACIMA</span>}
              </div>
              <span style={{ fontSize: '12px', color: item.isOver ? 'var(--alert)' : 'var(--text)' }}>
                R$ {item.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / R$ {item.limit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className={`progress-fill ${item.isOver ? 'alert' : item.percentual >= 80 ? 'amber' : 'green'}`}
                style={{ width: `${Math.min(item.percentual, 100)}%` }}
              ></div>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '4px' }}>
              {item.percentual.toFixed(0)}% utilizado
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
