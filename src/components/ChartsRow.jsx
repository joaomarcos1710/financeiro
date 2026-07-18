import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MONTHS_DATA } from '../data';

export default function ChartsRow({ data, metrics }) {
  // Net worth evolution
  const netWorthData = Object.entries(MONTHS_DATA).map(([key, month]) => ({
    mes: key.split('-')[1],
    patrimonio: month.patrimonio - month.dividas_total,
    dividas: month.dividas_total
  }));

  // Spending by category
  const categorySpending = {};
  data.despesas.forEach(d => {
    categorySpending[d.categoria] = (categorySpending[d.categoria] || 0) + d.valor;
  });

  const pieData = Object.entries(categorySpending)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const COLORS = ['#E5341E', '#1F8A4C', '#E0A100', '#6B6B68', '#B3B3B0', '#8884d8', '#00C2A8', '#C2410C', '#0EA5E9', '#A855F7', '#D97706', '#22C55E', '#EC4899', '#64748B', '#84CC16', '#F43F5E', '#0E0E0E'];

  return (
    <div className="grid-2col">
      <div className="card">
        <h3 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px' }}>
          PATRIMÔNIO LÍQUIDO (EVOLUÇÃO)
        </h3>
        {netWorthData.length < 2 ? (
          <div style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px' }}>
            <p className="text-muted text-sm">
              Só temos {netWorthData.length === 1 ? 'um mês fechado' : 'nenhum mês fechado'} até agora.<br />
              O gráfico de evolução aparece a partir do 2º fechamento mensal.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={netWorthData}>
              <defs>
                <linearGradient id="gradNetWorth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--red)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--red)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="mes" stroke="var(--muted)" style={{ fontSize: '12px' }} />
              <YAxis stroke="var(--muted)" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)' }} />
              <Legend wrapperStyle={{ color: 'var(--text)' }} />
              <Area type="monotone" dataKey="patrimonio" stroke="var(--red)" fill="url(#gradNetWorth)" name="Patrimônio Líquido" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="card">
        <h3 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px' }}>
          GASTOS POR CATEGORIA
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={80}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginTop: '12px', justifyContent: 'center' }}>
          {pieData.map((entry, index) => (
            <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: COLORS[index % COLORS.length], flexShrink: 0 }}></span>
              <span className="text-muted">{entry.name}</span>
              <span>R$ {entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
