import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DailySpendingChart({ data }) {
  // Calculate daily spending
  const dailyData = {};
  let accumulated = 0;

  data.despesas.forEach(d => {
    if (!dailyData[d.dia]) {
      dailyData[d.dia] = { dia: d.dia, diario: 0, acumulado: 0 };
    }
    dailyData[d.dia].diario += d.valor;
  });

  const chartData = Object.values(dailyData)
    .sort((a, b) => a.dia - b.dia)
    .map(d => {
      accumulated += d.diario;
      return { ...d, acumulado: accumulated };
    });

  return (
    <div className="card">
      <h3 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px' }}>
        EVOLUÇÃO DE GASTOS
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="dia" stroke="var(--muted)" style={{ fontSize: '12px' }} />
          <YAxis stroke="var(--muted)" style={{ fontSize: '12px' }} />
          <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)' }} />
          <Legend wrapperStyle={{ color: 'var(--text)' }} />
          <Bar dataKey="diario" fill="var(--amber)" name="Gasto Diário" />
          <Bar dataKey="acumulado" fill="var(--red)" name="Acumulado" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
