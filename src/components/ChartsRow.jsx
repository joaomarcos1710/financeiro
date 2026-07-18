import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MONTHS_DATA } from '../data';

export default function ChartsRow({ data, metrics }) {
  // Net worth evolution
  const netWorthData = Object.entries(MONTHS_DATA).map(([key, month]) => ({
    mes: key.split('-')[1],
    patrimonio: month.patrimonio - month.dividas,
    dividas: month.dividas
  }));

  // Spending by category
  const categorySpending = {};
  data.despesas.forEach(d => {
    categorySpending[d.categoria] = (categorySpending[d.categoria] || 0) + d.valor;
  });

  const pieData = Object.entries(categorySpending).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#E5341E', '#1F8A4C', '#E0A100', '#6B6B68', '#B3B3B0', '#E4E4E2', '#0E0E0E', '#161616'];

  return (
    <div className="grid-2col">
      <div className="card">
        <h3 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px' }}>
          PATRIMÔNIO LÍQUIDO (EVOLUÇÃO)
        </h3>
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
              labelLine={false}
              label={({ name, value }) => `${name}: R$ ${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
