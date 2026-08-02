// Dados REAIS do seu Obsidian
import { FATURA } from './data/fatura';
import notion from './data/notion.json';

export const SALARIO_MENSAL = 7167.51;

// Dados de Maio 2026 (Relatório de Categorias + fatura do cartão — Organizze)
// Posição patrimonial (Ativos/Dívidas) de fim de Maio não foi fornecida —
// por isso este mês não entra no gráfico de evolução do Patrimônio Líquido.
const maio2026 = {
  label: 'Maio 2026',
  totalReceitas: 56341.97,
  totalDespesas: 34089.16,
  aviso: 'Receita de Maio inclui R$ 30.682,75 de empréstimo novo (Empréstimo/CredPlan Variável, parcela 1/120 — captação de dívida) e R$ 8.588,77 de restituição de IR (não recorrente). Juntos são ~70% do total de receitas do mês. Sem eles, a receita operacional real seria ≈ R$ 17.070,45 contra R$ 34.089,16 de despesas.',
  receitas: [
    { categoria: 'Empréstimos', valor: 30682.75 },
    { categoria: 'Receitas Variadas', valor: 9935.83 },
    { categoria: 'Salário Caixa', valor: 7603.19 },
    { categoria: 'Família', valor: 5826.00 },
    { categoria: 'Outras receitas', valor: 2190.83 },
    { categoria: 'Salário Mariane', valor: 66.31 },
    { categoria: 'Pix', valor: 30.00 },
    { categoria: 'Cashback', valor: 7.00 },
    { categoria: 'Rendimentos', valor: 0.06 },
  ],
  despesas: [
    { categoria: 'Financiamento e Empréstimos', valor: 5874.43 },
    { categoria: 'Alimentação', valor: 4884.45 },
    { categoria: 'Família', valor: 3699.00 },
    { categoria: 'Compras', valor: 3615.48 },
    { categoria: 'Mariane', valor: 2806.26 },
    { categoria: 'Saúde', valor: 2301.75 },
    { categoria: 'Gastos Bancários / PIX parcelado', valor: 2138.07 },
    { categoria: 'Transporte', valor: 1885.06 },
    { categoria: 'Casa', valor: 1764.02 },
    { categoria: 'Viagem', valor: 996.70 },
    { categoria: 'Assinaturas e Serviços', valor: 965.20 },
    { categoria: 'Mercado / Feira / Hortifruti', valor: 919.50 },
    { categoria: 'Pets', valor: 512.34 },
    { categoria: 'Investimentos (Dólar)', valor: 454.72 },
    { categoria: 'GYMPASS (Sidney + Júlia)', valor: 399.98 },
    { categoria: 'Outros (Loteria)', valor: 376.02 },
    { categoria: 'Lazer e Hobbies (Corrida)', valor: 339.79 },
    { categoria: 'Despesas Pessoais', valor: 149.89 },
    { categoria: 'Diversos', valor: 6.50 },
  ]
  // sem ativos/dividas: posição patrimonial de fim de Maio não informada
};

// Dados de Junho 2026 (do seu fechamento)
const junho2026 = {
  label: 'Junho 2026',
  totalReceitas: 11204.49,
  totalDespesas: 26397.03,
  receitas: [
    { categoria: 'Salário Caixa', valor: 7167.51 },
    { categoria: 'Família (Mãe)', valor: 2412.25 },
    { categoria: 'Outras receitas', valor: 865.32 },
    { categoria: 'Receitas Variadas', valor: 417.61 },
    { categoria: 'Cashback', valor: 148.01 },
    { categoria: 'Rendimentos', valor: 74.98 },
    { categoria: 'Salário Mariane', valor: 68.15 },
    { categoria: 'Pai (presente)', valor: 2.00 },
    { categoria: 'Dividendos + Royalties', valor: 0.45 },
  ],
  despesas: [
    { categoria: 'Financiamento e Empréstimos', valor: 6558.15 },
    { categoria: 'Compras', valor: 3500.45 },
    { categoria: 'Alimentação', valor: 3278.92 },
    { categoria: 'Saúde', valor: 2088.69 },
    { categoria: 'Transporte', valor: 1842.63 },
    { categoria: 'Gastos Bancários / PIX parcelado', valor: 1533.27 },
    { categoria: 'Viagem', valor: 1331.77 },
    { categoria: 'Assinaturas e Serviços', valor: 1272.80 },
    { categoria: 'Casa', valor: 1217.79 },
    { categoria: 'Mariane', valor: 1095.78 },
    { categoria: 'Investimentos (Dólar)', valor: 621.78 },
    { categoria: 'Pets', valor: 620.34 },
    { categoria: 'Mercado / Feira / Hortifruti', valor: 607.27 },
    { categoria: 'GYMPASS (Sidney + Júlia)', valor: 399.98 },
    { categoria: 'Lazer e Hobbies (Corrida)', valor: 261.02 },
    { categoria: 'Despesas Pessoais', valor: 156.39 },
    { categoria: 'Informática (Office 365)', valor: 69.69 },
  ],
  ativos: [
    { nome: 'Conta Corrente CAIXA', valor: 66.59 },
    { nome: 'Mercado Pago', valor: 12.56 },
    { nome: 'Previdência CAIXA', valor: 186193.86 },
    { nome: 'FGTS', valor: 17405.77 }
  ],
  dividas: [
    { nome: 'Financiamento Habitação', saldo: 159240.56, parcelas: 358 },
    { nome: 'CredPlan Variável', saldo: 147599.59, parcelas: 117 },
    { nome: 'Cartão Visa', saldo: 22246.38 },
    { nome: 'CredPlan Fixo', saldo: 33704.50, parcelas: 47 },
    { nome: 'Consignado', saldo: 25984.12, parcelas: 143 }
  ]
};

// Dados de Julho 2026 (Fechamento Julho — Obsidian)
const julho2026 = {
  label: 'Julho 2026',
  totalReceitas: 22240.52,
  totalDespesas: 20934.91,
  receitas: [
    { categoria: 'Salário Caixa', valor: 9137.51 },
    { categoria: 'Família', valor: 7500.00 },
    { categoria: 'Outras receitas', valor: 3500.00 },
    { categoria: 'Rendimentos', valor: 1000.00 },
    { categoria: 'Cashback', valor: 1103.01 },
  ],
  despesas: [
    { categoria: 'Financiamento e Empréstimos', valor: 6558.15 },
    { categoria: 'Alimentação', valor: 2077.33 },
    { categoria: 'Compras', valor: 1968.45 },
    { categoria: 'Transporte', valor: 1455.63 },
    { categoria: 'Saúde', valor: 1200.00 },
    { categoria: 'Viagem', valor: 1150.00 },
    { categoria: 'Assinaturas e Serviços', valor: 1210.80 },
    { categoria: 'Pets', valor: 920.34 },
    { categoria: 'Gastos Bancários / PIX parcelado', valor: 863.27 },
    { categoria: 'Casa', valor: 650.00 },
    { categoria: 'Mariane', valor: 520.00 },
    { categoria: 'Mercado / Feira / Hortifruti', valor: 420.00 },
    { categoria: 'Lazer e Hobbies (Corrida)', valor: 400.00 },
    { categoria: 'Investimentos (Dólar)', valor: 356.61 },
    { categoria: 'GYMPASS (Sidney + Júlia)', valor: 399.98 },
    { categoria: 'Outros (Loteria)', valor: 657.96 },
    { categoria: 'Despesas Pessoais', valor: 335.39 },
  ],
  // Entradas e saídas diárias — Relatório Organizze (todas as contas)
  diario: [
    { dia: '01', entradas: 1947.5, saidas: 165.0, saldo: 2213.21 },
    { dia: '02', entradas: 5.0, saidas: 100.0, saldo: 2118.21 },
    { dia: '03', entradas: 0.01, saidas: 66.5, saldo: 2051.72 },
    { dia: '04', entradas: 200.0, saidas: 140.5, saldo: 2111.22 },
    { dia: '05', entradas: 56.58, saidas: 0, saldo: 2167.8 },
    { dia: '06', entradas: 671.0, saidas: 1997.96, saldo: 840.84 },
    { dia: '07', entradas: 2.0, saidas: 324.2, saldo: 518.64 },
    { dia: '08', entradas: 146.68, saidas: 0, saldo: 665.32 },
    { dia: '09', entradas: 37.5, saidas: 134.82, saldo: 568.0 },
    { dia: '10', entradas: 300.0, saidas: 0, saldo: 868.0 },
    { dia: '11', entradas: 0, saidas: 250.0, saldo: 618.0 },
    { dia: '12', entradas: 73.8, saidas: 0, saldo: 691.8 },
    { dia: '13', entradas: 0, saidas: 73.8, saldo: 618.0 },
    { dia: '14', entradas: 10.0, saidas: 0, saldo: 628.0 },
    { dia: '15', entradas: 1740.67, saidas: 55.11, saldo: 2313.56 },
    { dia: '16', entradas: 0, saidas: 607.84, saldo: 1705.72 },
    { dia: '17', entradas: 200.0, saidas: 322.28, saldo: 1583.44 },
    { dia: '18', entradas: 0, saidas: 0, saldo: 1583.44 },
    { dia: '19', entradas: 7.0, saidas: 0, saldo: 1590.44 },
    { dia: '20', entradas: 8845.8, saidas: 10038.61, saldo: 397.63 },
    { dia: '21', entradas: 6494.45, saidas: 6288.27, saldo: 603.81 },
    { dia: '22', entradas: 327.51, saidas: 357.4, saldo: 573.92 },
    { dia: '23', entradas: 468.34, saidas: 0, saldo: 1042.26 },
    { dia: '24', entradas: 0, saidas: 0, saldo: 1042.26 },
    { dia: '25', entradas: 0, saidas: 103.82, saldo: 938.44 },
    { dia: '26', entradas: 0, saidas: 0, saldo: 938.44 },
    { dia: '27', entradas: 103.82, saidas: 0, saldo: 1042.26 },
    { dia: '28', entradas: 0, saidas: 10.0, saldo: 1032.26 },
    { dia: '29', entradas: 1.35, saidas: 0, saldo: 1033.61 },
    { dia: '30', entradas: 0, saidas: 0, saldo: 1033.61 },
    { dia: '31', entradas: 0, saidas: 0, saldo: 1033.61 }
  ],
  ativos: [
    { nome: 'Conta Corrente CAIXA', valor: 472.05 },
    { nome: 'Mercado Pago', valor: 6.54 },
    { nome: 'Nomad (Investimento USD)', valor: 356.61 },
    { nome: 'Dinheiro em Carteira', valor: 198.41 },
    { nome: 'Pi Network (538,92 PI)', valor: 220.96 },
    { nome: 'Previdência CAIXA', valor: 188086.34 },
    { nome: 'FGTS', valor: 18434.82 }
  ],
  dividas: [
    { nome: 'Financiamento Habitação', saldo: 158834.85, parcelas: 357 },
    { nome: 'CredPlan Variável', saldo: 147428.03, parcelas: 117 },
    { nome: 'Cartão Visa', saldo: 13188.27 },
    { nome: 'CredPlan Fixo', saldo: 33147.88, parcelas: 46 },
    { nome: 'Consignado', saldo: 25904.80, parcelas: 142 }
  ]
};

function totalsFor(month) {
  const fechado = Array.isArray(month.receitas) && month.receitas.length > 0;
  if (!month.ativos || !month.dividas || month.ativos.length === 0) {
    return { ...month, fechado, patrimonio: null, dividas_total: null };
  }
  const totalAtivos = month.ativos.reduce((sum, a) => sum + a.valor, 0);
  const totalDividas = month.dividas.reduce((sum, d) => sum + d.saldo, 0);
  return { ...month, fechado, patrimonio: totalAtivos, dividas_total: totalDividas };
}

// ── Camada Notion (fonte oficial) ─────────────────────────────────────────
// O Notion define QUAIS meses existem e seus totais/posição patrimonial.
// O detalhe por categoria (gráficos) vem do histórico local, quando existir.
const LEGACY_DETAILS = { '2026-05': maio2026, '2026-06': junho2026, '2026-07': julho2026 };
const LEGACY_FATURAS = { '2026-07': FATURA };

const notionAtivosByMes = {};
for (const a of notion.ativos || []) {
  (notionAtivosByMes[a.mes] = notionAtivosByMes[a.mes] || []).push({ nome: a.conta, valor: a.valor, tipo: a.tipo });
}
const notionDividasByMes = {};
for (const d of notion.dividas || []) {
  (notionDividasByMes[d.mes] = notionDividasByMes[d.mes] || []).push({ nome: d.divida, saldo: d.saldo, parcelas: d.parcelas ?? undefined });
}

const monthKeys = [...new Set([
  ...Object.keys(LEGACY_DETAILS),
  ...(notion.fechamentos || []).map((f) => f.mes),
])].sort();

const MESES_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const labelFor = (key) => {
  const [y, m] = key.split('-');
  return `${MESES_PT[parseInt(m, 10) - 1]} ${y}`;
};

export const MONTHS_DATA = {};
for (const key of monthKeys) {
  const legacy = LEGACY_DETAILS[key] || {};
  const nf = (notion.fechamentos || []).find((f) => f.mes === key);
  const ativos = notionAtivosByMes[key] || legacy.ativos || [];
  const dividas = notionDividasByMes[key] || legacy.dividas || [];
  const month = {
    label: legacy.label || labelFor(key),
    totalReceitas: nf?.receitas ?? legacy.totalReceitas ?? null,
    totalDespesas: nf?.despesas ?? legacy.totalDespesas ?? null,
    aviso: legacy.aviso,
    notionObs: nf?.obs || null,
    statusNotion: nf?.status || null,
    receitas: legacy.receitas || [],
    despesas: legacy.despesas || [],
    diario: legacy.diario,
    ativos,
    dividas,
  };
  // fechado: marcado no Notion OU com fluxo detalhado local
  const base = totalsFor(month);
  base.fechado = nf?.status === 'Fechado' || base.fechado;
  MONTHS_DATA[key] = { ...base, fatura: LEGACY_FATURAS[key] || null };
}

// Última posição patrimonial disponível (mês mais recente com ativos no Notion)
const mesesComAtivos = Object.keys(notionAtivosByMes).sort();
const ultimoMesPatrimonial = mesesComAtivos[mesesComAtivos.length - 1] || '2026-07';

export const BUDGETS = {
  'Financiamento e Empréstimos': 6600,
  'Compras': 1500,
  'Alimentação': 2000,
  'Saúde': 900,
  'Transporte': 800,
  'Gastos Bancários / PIX parcelado': 1000,
  'Viagem': 500,
  'Assinaturas e Serviços': 1300,
  'Casa': 1200,
  'Mariane': 1100
};

export const ATIVOS = notionAtivosByMes[ultimoMesPatrimonial] || julho2026.ativos;
export const TOTAL_ATIVOS = ATIVOS.reduce((sum, a) => sum + a.valor, 0);

export const DIVIDAS = notionDividasByMes[ultimoMesPatrimonial] || julho2026.dividas;
export const TOTAL_DIVIDAS = DIVIDAS.reduce((sum, d) => sum + d.saldo, 0);

export const RESERVA_LIQUIDA = ATIVOS
  .filter(a => a.tipo === 'Liquidez' || ['Conta Corrente CAIXA', 'Mercado Pago', 'Dinheiro em Carteira'].includes(a.nome))
  .reduce((sum, a) => sum + a.valor, 0);

export const RESERVA_META = SALARIO_MENSAL * 6;

// ── Exports Notion para as páginas novas ──────────────────────────────────
export const NOTION_RENDA = notion.renda || [];
export const NOTION_INVESTIMENTOS = notion.investimentos || [];
export const NOTION_FECHAMENTOS = notion.fechamentos || [];
export const PATRIMONIO_POR_MES = monthKeys
  .map((key) => {
    const m = MONTHS_DATA[key];
    return m.patrimonio != null ? { mes: key, label: m.label, ativos: m.patrimonio, dividas: m.dividas_total, pl: m.patrimonio - m.dividas_total } : null;
  })
  .filter(Boolean);
export const ATIVOS_POR_MES = notionAtivosByMes;
export const DIVIDAS_POR_MES = notionDividasByMes;
export const ULTIMO_MES_PATRIMONIAL = ultimoMesPatrimonial;
export const NOTION_FETCHED_AT = notion.fetchedAt;
