import { useState, useMemo } from 'react';
import { MONTHS_DATA, BUDGETS, ATIVOS, DIVIDAS } from '../data';
import Header from '../components/Header';
import QuickInsights from '../components/QuickInsights';
import KPICards from '../components/KPICards';
import PreviousMonthComparison from '../components/PreviousMonthComparison';
import ChartsRow from '../components/ChartsRow';
import DailySpendingChart from '../components/DailySpendingChart';
import EmergencyReserve from '../components/EmergencyReserve';
import BudgetByCategory from '../components/BudgetByCategory';
import Debts from '../components/Debts';
import FaturaCartao from '../components/FaturaCartao';
import RecentTransactions from '../components/RecentTransactions';

export default function Dashboard({ theme, onThemeToggle }) {
  const monthsList = Object.keys(MONTHS_DATA).sort();
  // Abre no mês fechado mais recente (dashboard cheio); meses só com fatura
  // ficam a um clique de distância no seletor.
  const closedMonths = monthsList.filter((m) => MONTHS_DATA[m].fechado);
  const defaultMonth = closedMonths.length
    ? closedMonths[closedMonths.length - 1]
    : monthsList[monthsList.length - 1];
  const [month, setMonth] = useState(defaultMonth);

  const currentMonthData = MONTHS_DATA[month];
  const monthIndex = monthsList.indexOf(month);
  const previousMonth = monthIndex > 0 ? monthsList[monthIndex - 1] : null;
  const previousMonthData = previousMonth ? MONTHS_DATA[previousMonth] : null;

  const currentMetrics = useMemo(() => {
    if (!currentMonthData || !currentMonthData.fechado) return null;

    const totalReceitas = currentMonthData.receitas.reduce((sum, r) => sum + r.valor, 0);
    const totalDespesas = currentMonthData.despesas.reduce((sum, d) => sum + d.valor, 0);
    const saldo = totalReceitas - totalDespesas;
    const economia = totalReceitas > 0 ? (saldo / totalReceitas) * 100 : 0;

    return {
      totalReceitas,
      totalDespesas,
      saldo,
      economia,
      patrimonio: currentMonthData.patrimonio,
      dividas: currentMonthData.dividas_total,
      patrimonioLiquido: currentMonthData.patrimonio - currentMonthData.dividas_total
    };
  }, [currentMonthData]);

  const previousMetrics = useMemo(() => {
    if (!previousMonthData || !previousMonthData.fechado) return null;

    const totalReceitas = previousMonthData.receitas.reduce((sum, r) => sum + r.valor, 0);
    const totalDespesas = previousMonthData.despesas.reduce((sum, d) => sum + d.valor, 0);
    const saldo = totalReceitas - totalDespesas;
    const economia = totalReceitas > 0 ? (saldo / totalReceitas) * 100 : 0;

    return {
      totalReceitas,
      totalDespesas,
      saldo,
      economia,
      patrimonio: previousMonthData.patrimonio,
      dividas: previousMonthData.dividas_total,
      patrimonioLiquido: previousMonthData.patrimonio - previousMonthData.dividas_total
    };
  }, [previousMonthData]);

  if (!currentMonthData) return null;

  const fechado = currentMonthData.fechado;

  return (
    <>
      <Header
        month={month}
        onMonthChange={setMonth}
        monthsList={monthsList}
        theme={theme}
        onThemeToggle={onThemeToggle}
      />
      <main>
        {fechado ? (
          <>
            <QuickInsights data={currentMonthData} metrics={currentMetrics} previousMetrics={previousMetrics} />
            <KPICards metrics={currentMetrics} previousMetrics={previousMetrics} previousMonthData={previousMonthData} />
            {previousMetrics && <PreviousMonthComparison metrics={currentMetrics} previousMetrics={previousMetrics} />}
            <ChartsRow data={currentMonthData} metrics={currentMetrics} />
            <DailySpendingChart data={currentMonthData} />
            <EmergencyReserve />
            <BudgetByCategory data={currentMonthData} budgets={BUDGETS} />
            <Debts dividas={DIVIDAS} ativos={ATIVOS} />
          </>
        ) : (
          <div className="card-alt" style={{ textAlign: 'center', padding: '32px 20px' }}>
            <div style={{ fontFamily: 'League Gothic', fontSize: '22px', letterSpacing: '0.03em', marginBottom: '8px' }}>
              {currentMonthData.label.toUpperCase()} AINDA NÃO FOI FECHADO
            </div>
            <p className="text-muted" style={{ maxWidth: '520px', margin: '0 auto', fontSize: '14px' }}>
              Por enquanto só a fatura do cartão está disponível para este mês. Me mande o
              fechamento (receitas, despesas e posição patrimonial) para preencher os KPIs,
              gráficos e comparações.
            </p>
          </div>
        )}

        {currentMonthData.fatura && <FaturaCartao fatura={currentMonthData.fatura} />}

        {fechado && <RecentTransactions data={currentMonthData} />}
      </main>
    </>
  );
}
