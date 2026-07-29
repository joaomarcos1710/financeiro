import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';

const fmtBRL = (value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

function DailyFlowChart({ diario }) {
  return (
    <div className="card">
      <h3 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px' }}>
        ENTRADAS E SAÍDAS POR DIA (CONTA CORRENTE)
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={diario} margin={{ left: 10, right: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="dia" stroke="var(--muted)" style={{ fontSize: '11px' }} />
          <YAxis stroke="var(--muted)" style={{ fontSize: '11px' }} />
          <Tooltip
            formatter={(value, name) => [fmtBRL(value), name]}
            labelFormatter={(dia) => `Dia ${dia}`}
            contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="entradas" fill="var(--green)" name="Entradas" isAnimationActive={false} />
          <Bar dataKey="saidas" fill="var(--red)" name="Saídas" isAnimationActive={false} />
          <Line type="monotone" dataKey="saldo" stroke="#3B82F6" strokeWidth={2} dot={false} name="Saldo" isAnimationActive={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function DailySpendingChart({ data }) {
  // Ranking de gastos por categoria (fechamento mensal não traz lançamento por dia)
  const chartData = [...data.despesas]
    .sort((a, b) => b.valor - a.valor)
    .map(d => ({ categoria: d.categoria, valor: d.valor }));

  return (
    <>
      {Array.isArray(data.diario) && data.diario.length > 0 && <DailyFlowChart diario={data.diario} />}
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
              formatter={(value) => fmtBRL(value)}
              contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)' }}
            />
            <Bar dataKey="valor" fill="var(--red)" name="Gasto" isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
