export default function RecentTransactions({ data }) {
  const linhas = [
    ...data.receitas.map(r => ({
      categoria: r.categoria,
      tipo: 'receita',
      valor: r.valor
    })),
    ...data.despesas.map(d => ({
      categoria: d.categoria,
      tipo: 'despesa',
      valor: d.valor
    }))
  ].sort((a, b) => b.valor - a.valor);

  return (
    <div className="card">
      <h3 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px' }}>
        RECEITAS E DESPESAS DO MÊS
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Tipo</th>
              <th style={{ textAlign: 'right' }}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map((t, i) => (
              <tr key={i}>
                <td>{t.categoria}</td>
                <td>
                  <span style={{ color: t.tipo === 'receita' ? 'var(--green)' : 'var(--alert)' }}>
                    {t.tipo === 'receita' ? 'Receita' : 'Despesa'}
                  </span>
                </td>
                <td style={{ textAlign: 'right', color: t.tipo === 'receita' ? 'var(--green)' : 'var(--alert)' }}>
                  {t.tipo === 'receita' ? '+' : '-'} R$ {t.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
