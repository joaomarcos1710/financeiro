import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DailySpendingChart({ data }) {
  // Ranking de gastos por categoria (fechamento mensal não traz lançamento por dia)
  const chartData = [...data.despesas]
    .sort((a, b) => b.valor - a.valor)
    .map(d => ({ categoria: d.categoria, valor: d.valor }));

  return (
    <div className="card">
      <h3 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px' }}>
        RANKING DE GASTOS POR CATEGORIA
      </h3>
      <ResponsiveContainer width="100%" height={Math.max(300, chartData.length * 36)}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis type="number" stroke="var(--muted)" style={{ fontSize: '12px' }} />
          <YAxis type="category" dataKey="categoria" stroke="var(--muted)" style={{ fontSize: '11px' }} width={180} />
          <Tooltip
            formatter={(value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)' }}
          />
          <Bar dataKey="valor" fill="var(--red)" name="Gasto" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
