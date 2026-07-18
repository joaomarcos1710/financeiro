export default function RecentTransactions({ data }) {
  const transacoes = [
    ...data.receitas.map(r => ({
      dia: r.dia,
      descricao: r.descricao,
      categoria: 'Receitas',
      tipo: 'receita',
      valor: r.valor,
      formaPgto: 'Depósito'
    })),
    ...data.despesas.map(d => ({
      dia: d.dia,
      descricao: d.descricao,
      categoria: d.categoria,
      tipo: 'despesa',
      valor: d.valor,
      formaPgto: d.formaPgto
    }))
  ].sort((a, b) => b.dia - a.dia);

  return (
    <div className="card">
      <h3 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px' }}>
        TRANSAÇÕES RECENTES
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Tipo</th>
              <th>Forma Pgto</th>
              <th style={{ textAlign: 'right' }}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((t, i) => (
              <tr key={i}>
                <td>01/{new Date().getMonth() + 1}</td>
                <td>{t.descricao}</td>
                <td>{t.categoria}</td>
                <td>
                  <span style={{ color: t.tipo === 'receita' ? 'var(--green)' : 'var(--alert)' }}>
                    {t.tipo === 'receita' ? 'Receita' : 'Despesa'}
                  </span>
                </td>
                <td>{t.formaPgto}</td>
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
