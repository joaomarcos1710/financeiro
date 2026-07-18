import { useState, useMemo } from 'react';
import { MONTHS_DATA, BUDGETS, ATIVOS, DIVIDAS, CREDIT_CARDS } from '../data';
import Header from '../components/Header';
import QuickInsights from '../components/QuickInsights';
import KPICards from '../components/KPICards';
import PreviousMonthComparison from '../components/PreviousMonthComparison';
import ChartsRow from '../components/ChartsRow';
import DailySpendingChart from '../components/DailySpendingChart';
import EmergencyReserve from '../components/EmergencyReserve';
import BudgetByCategory from '../components/BudgetByCategory';
import Debts from '../components/Debts';
import CreditCards from '../components/CreditCards';
import RecentTransactions from '../components/RecentTransactions';

export default function Dashboard({ theme, onThemeToggle }) {
  const monthsList = Object.keys(MONTHS_DATA).sort();
  const [month, setMonth] = useState(monthsList[monthsList.length - 1]);

  const currentMonthData = MONTHS_DATA[month];
  const monthIndex = monthsList.indexOf(month);
  const previousMonth = monthIndex > 0 ? monthsList[monthIndex - 1] : null;
  const previousMonthData = previousMonth ? MONTHS_DATA[previousMonth] : null;

  const currentMetrics = useMemo(() => {
    if (!currentMonthData) return null;

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
    if (!previousMonthData) return null;

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

  if (!currentMetrics) return null;

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
        <QuickInsights data={currentMonthData} metrics={currentMetrics} previousMetrics={previousMetrics} />
        <KPICards metrics={currentMetrics} previousMetrics={previousMetrics} previousMonthData={previousMonthData} />
        {previousMonthData && <PreviousMonthComparison metrics={currentMetrics} previousMetrics={previousMetrics} />}
        <ChartsRow data={currentMonthData} metrics={currentMetrics} />
        <DailySpendingChart data={currentMonthData} />
        <EmergencyReserve />
        <BudgetByCategory data={currentMonthData} budgets={BUDGETS} />
        <Debts dividas={DIVIDAS} ativos={ATIVOS} />
        <CreditCards cards={CREDIT_CARDS} />
        <RecentTransactions data={currentMonthData} />
      </main>
    </>
  );
}
