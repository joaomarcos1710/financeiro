// Fatura do cartão de crédito — Cartões CAIXA (Visa)
// Extraída do PDF da fatura; apenas valores agregados, sem dados pessoais.

export const FATURA = {
  competencia: '2026-07',
  vencimento: '28/07/2026',
  total: 13188.27,
  faturaAnterior: 18899.39,
  pagamentosRecebidos: 19273.80,
  creditosAjustes: 388.32,

  limiteTotal: 44500.00,
  utilizado: 27851.53,
  disponivel: 16648.47,

  // Parcelas futuras já comprometidas (aprovadas até 17/07)
  despesasAVencer: 14663.26,
  proximaFaturaPrevista: 3985.86,
  melhorDataCompra: '19/08/2026',

  cartoes: [
    { titular: 'João', final: '8541', compras: 3826.30, parceladas: 215.15, total: 4041.45 },
    { titular: 'João', final: '9380', compras: 1214.12, parceladas: 1644.81, total: 2858.93 },
    { titular: 'João', final: '7977', compras: 0, parceladas: 2787.67, total: 2787.67 },
    { titular: 'Mariane', final: '8025', compras: 3088.95, parceladas: 457.19, total: 3546.14 },
    { titular: 'Mariane', final: '1703', compras: 0, parceladas: 342.40, total: 342.40 },
  ],

  // Agrupamentos calculados a partir das 179 transações da fatura
  destaques: [
    { grupo: 'Restaurantes', valor: 2077.60, qtd: 17 },
    { grupo: 'Uber / 99 (corridas)', valor: 1073.46, qtd: 44 },
    { grupo: 'iFood / delivery', valor: 734.93, qtd: 8 },
    { grupo: 'Loterias online', valor: 657.96, qtd: 7, alerta: true },
    { grupo: 'Pets', valor: 480.52, qtd: 5 },
    { grupo: 'Farmácias', valor: 442.39, qtd: 6 },
    { grupo: 'Apple.com/bill (apps)', valor: 431.40, qtd: 6 },
    { grupo: 'Padarias / lanches', valor: 426.11, qtd: 17 },
  ],

  assinaturas: [
    { nome: 'Wellhub João', valor: 199.99 },
    { nome: 'Wellhub Sidney', valor: 199.99, ressarcido: true },
    { nome: 'Wellhub Júlia', valor: 199.99, ressarcido: true },
    { nome: 'Claude (Apple)', valor: 109.90 },
    { nome: 'Seguro Residencial CAIXA', valor: 108.74 },
    { nome: 'ChatGPT (Apple)', valor: 99.90 },
    { nome: 'Google One (2x)', valor: 99.98 },
    { nome: 'Apple One', valor: 66.90 },
    { nome: 'CapCut (Apple)', valor: 65.90 },
    { nome: 'Epidemic Sound', valor: 59.00 },
    { nome: 'Meta Verificado (Apple)', valor: 53.90 },
    { nome: 'Netflix', valor: 44.90 },
    { nome: 'Spotify', valor: 40.90 },
    { nome: 'Meli+', valor: 39.90 },
    { nome: 'Canva (Apple)', valor: 34.90 },
  ],

  // Compras parceladas em andamento (parcela desta fatura)
  parcelas: [
    { descricao: 'Garmin (Mercado Livre)', atual: 12, de: 12, valor: 401.08 },
    { descricao: '99Pay', atual: 4, de: 12, valor: 384.79 },
    { descricao: 'Mariane (parcelado)', atual: 4, de: 9, valor: 361.12 },
    { descricao: 'Smiles (milhas)', atual: 2, de: 2, valor: 350.00 },
    { descricao: 'iPhone (Claro Rio Sul)', atual: 19, de: 21, valor: 342.40 },
    { descricao: 'Nomad (dólar)', atual: 4, de: 12, valor: 341.51 },
    { descricao: 'ODP Outlet', atual: 2, de: 3, valor: 291.20 },
    { descricao: 'Light (energia)', atual: 2, de: 2, valor: 285.57 },
    { descricao: 'iPad + Pencil', atual: 12, de: 18, valor: 269.77 },
    { descricao: 'Centauro', atual: 4, de: 5, valor: 256.01 },
    { descricao: '99Pay', atual: 1, de: 3, valor: 230.66 },
    { descricao: 'Pet Love', atual: 2, de: 2, valor: 208.54 },
    { descricao: 'GoCase', atual: 2, de: 6, valor: 172.97 },
    { descricao: 'Drogaria Venancio', atual: 1, de: 3, valor: 170.39 },
    { descricao: 'Mercado Livre', atual: 1, de: 2, valor: 134.90 },
    { descricao: 'Centauro CE66', atual: 1, de: 3, valor: 121.83 },
    { descricao: 'Nomad (dólar)', atual: 4, de: 6, valor: 113.21 },
    { descricao: 'Pet Love', atual: 1, de: 3, valor: 110.28 },
    { descricao: 'Clube Giro', atual: 2, de: 2, valor: 108.24 },
    { descricao: 'Moveon Roupas', atual: 2, de: 2, valor: 107.93 },
    { descricao: 'Amazon', atual: 1, de: 2, valor: 98.99 },
    { descricao: 'Airbnb', atual: 2, de: 6, valor: 94.54 },
    { descricao: 'RD Saúde', atual: 1, de: 3, valor: 93.32 },
    { descricao: 'Shopee (parafusos)', atual: 1, de: 6, valor: 81.98 },
    { descricao: 'Decathlon', atual: 3, de: 6, valor: 81.66 },
    { descricao: 'Centauro', atual: 3, de: 8, valor: 78.78 },
    { descricao: 'Shopee', atual: 1, de: 2, valor: 85.86 },
    { descricao: 'KaBuM', atual: 1, de: 6, valor: 69.69 },
  ],
};

export const TOTAL_ASSINATURAS = FATURA.assinaturas.reduce((s, a) => s + a.valor, 0);
export const TOTAL_RESSARCIVEL = FATURA.assinaturas
  .filter(a => a.ressarcido)
  .reduce((s, a) => s + a.valor, 0);
export const TOTAL_PARCELAS_MES = FATURA.parcelas.reduce((s, p) => s + p.valor, 0);
