// Dados do dashboard
export const SALARIO_MENSAL = 7167.51;

export const MONTHS_DATA = {
  '2026-06': {
    label: 'Junho 2026',
    receitas: [
      { dia: 5, valor: 7167.51, descricao: 'Salário' }
    ],
    despesas: [
      { dia: 1, valor: 6600, categoria: 'Financiamento e Empréstimos', descricao: 'Financiamento Casa', formaPgto: 'Débito' },
      { dia: 2, valor: 250, categoria: 'Compras', descricao: 'Supermercado', formaPgto: 'Crédito' },
      { dia: 5, valor: 180, categoria: 'Alimentação', descricao: 'Restaurante', formaPgto: 'Débito' },
      { dia: 8, valor: 120, categoria: 'Transporte', descricao: 'Uber', formaPgto: 'Débito' },
      { dia: 10, valor: 890, categoria: 'Saúde', descricao: 'Plano Saúde', formaPgto: 'Débito' },
      { dia: 12, valor: 500, categoria: 'Assinaturas e Serviços', descricao: 'Streaming', formaPgto: 'Débito' },
      { dia: 15, valor: 350, categoria: 'Compras', descricao: 'Roupas', formaPgto: 'Crédito' },
      { dia: 18, valor: 90, categoria: 'Gastos Bancários/PIX parcelado', descricao: 'IOF', formaPgto: 'Débito' },
      { dia: 20, valor: 410, categoria: 'Alimentação', descricao: 'Supermercado', formaPgto: 'Crédito' },
      { dia: 22, valor: 75, categoria: 'Transporte', descricao: 'Táxi', formaPgto: 'Débito' },
      { dia: 25, valor: 200, categoria: 'Viagem', descricao: 'Hospedagem', formaPgto: 'Crédito' },
    ],
    patrimonio: 205000,
    dividas: 388000
  },
  '2026-07': {
    label: 'Julho 2026',
    receitas: [
      { dia: 5, valor: 7167.51, descricao: 'Salário' }
    ],
    despesas: [
      { dia: 1, valor: 6600, categoria: 'Financiamento e Empréstimos', descricao: 'Financiamento Casa', formaPgto: 'Débito' },
      { dia: 3, valor: 320, categoria: 'Compras', descricao: 'Supermercado', formaPgto: 'Crédito' },
      { dia: 6, valor: 200, categoria: 'Alimentação', descricao: 'Restaurante', formaPgto: 'Débito' },
      { dia: 9, valor: 140, categoria: 'Transporte', descricao: 'Uber', formaPgto: 'Débito' },
      { dia: 11, valor: 890, categoria: 'Saúde', descricao: 'Plano Saúde', formaPgto: 'Débito' },
      { dia: 13, valor: 500, categoria: 'Assinaturas e Serviços', descricao: 'Streaming', formaPgto: 'Débito' },
      { dia: 16, valor: 450, categoria: 'Compras', descricao: 'Eletrônicos', formaPgto: 'Crédito' },
      { dia: 19, valor: 110, categoria: 'Gastos Bancários/PIX parcelado', descricao: 'IOF', formaPgto: 'Débito' },
      { dia: 21, valor: 380, categoria: 'Alimentação', descricao: 'Supermercado', formaPgto: 'Crédito' },
      { dia: 24, valor: 85, categoria: 'Transporte', descricao: 'Táxi', formaPgto: 'Débito' },
    ],
    patrimonio: 208500,
    dividas: 387500
  }
};

export const BUDGETS = {
  'Financiamento e Empréstimos': 6600,
  'Compras': 1500,
  'Alimentação': 2000,
  'Saúde': 900,
  'Transporte': 800,
  'Gastos Bancários/PIX parcelado': 1000,
  'Viagem': 500,
  'Assinaturas e Serviços': 1300,
};

export const ATIVOS = [
  { nome: 'Conta Corrente CAIXA', valor: 66.59 },
  { nome: 'Mercado Pago', valor: 12.56 },
  { nome: 'FGTS', valor: 45000 },
  { nome: 'Previdência Privada', valor: 120000 },
  { nome: 'Ações/Investimentos', valor: 38982.85 }
];

export const TOTAL_ATIVOS = ATIVOS.reduce((sum, a) => sum + a.valor, 0);

export const DIVIDAS = [
  { nome: 'Financiamento Casa', saldo: 388000, parcelas: 240, parcelaAtual: 85 },
  { nome: 'Carro', saldo: 0, parcelas: 0, parcelaAtual: 0 }
];

export const TOTAL_DIVIDAS = DIVIDAS.reduce((sum, d) => sum + d.saldo, 0);

export const CREDIT_CARDS = [
  { nome: 'Nubank', fecha: '15', limiteDisponivel: 3500, faturaAtual: 1250 },
  { nome: 'Bradesco', fecha: '20', limiteDisponivel: 5000, faturaAtual: 2100 }
];

export const RESERVA_LIQUIDA = ATIVOS
  .filter(a => ['Conta Corrente CAIXA', 'Mercado Pago'].includes(a.nome))
  .reduce((sum, a) => sum + a.valor, 0);

export const RESERVA_META = SALARIO_MENSAL * 6;
