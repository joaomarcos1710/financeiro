// Dados REAIS do seu Obsidian

export const SALARIO_MENSAL = 7167.51;

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

function totalsFor(month) {
  const totalAtivos = month.ativos.reduce((sum, a) => sum + a.valor, 0);
  const totalDividas = month.dividas.reduce((sum, d) => sum + d.saldo, 0);
  return { ...month, patrimonio: totalAtivos, dividas_total: totalDividas };
}

// Julho 2026 ainda não foi fechado no Obsidian (arquivo de fechamento
// está com as tabelas vazias) — só entra aqui quando você preencher.
export const MONTHS_DATA = {
  '2026-06': totalsFor(junho2026)
};

// Orçamento mensal (do seu arquivo)
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

export const ATIVOS = junho2026.ativos;
export const TOTAL_ATIVOS = ATIVOS.reduce((sum, a) => sum + a.valor, 0);

export const DIVIDAS = junho2026.dividas;
export const TOTAL_DIVIDAS = DIVIDAS.reduce((sum, d) => sum + d.saldo, 0);

export const CREDIT_CARDS = [
  { nome: 'Cartão Visa', fecha: '15', limiteDisponivel: 5000, faturaAtual: 22246.38 }
];

export const RESERVA_LIQUIDA = ATIVOS
  .filter(a => ['Conta Corrente CAIXA', 'Mercado Pago'].includes(a.nome))
  .reduce((sum, a) => sum + a.valor, 0);

export const RESERVA_META = SALARIO_MENSAL * 6;
