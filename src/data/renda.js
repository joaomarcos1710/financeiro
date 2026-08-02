// Renda CAIXA — extraída dos contracheques (demonstrativos de pagamento)
// Apenas valores agregados; sem matrícula, conta ou dados pessoais.
// Líquido/eventos são complementados pelo Notion (fonte oficial de novos meses).
import notionData from './notion.json';

export const RENDA_MESES = [
  { mes: '2026-01', label: 'Jan', bruto: 15709.96, descontos: 7291.50,  liquido: 8418.46,  obs: 'APIP convertido (R$ 1.587,66)' },
  { mes: '2026-02', label: 'Fev', bruto: 17746.77, descontos: 5337.75,  liquido: 12409.02, obs: 'Adiantamento 13º (R$ 5.866,00)' },
  { mes: '2026-03', label: 'Mar', bruto: 24326.11, descontos: 14003.36, liquido: 10322.75, obs: 'PLR R$ 12.376,30 (líquida ~R$ 3,2 mil após antecipação + IR)' },
  { mes: '2026-04', label: 'Abr', bruto: 12298.99, descontos: 4767.91,  liquido: 7531.08,  obs: '' },
  { mes: '2026-05', label: 'Mai', bruto: 12010.15, descontos: 4406.96,  liquido: 7603.19,  obs: '' },
  { mes: '2026-06', label: 'Jun', bruto: 11954.01, descontos: 4786.50,  liquido: 7167.51,  obs: 'Início do e-consignado em folha (R$ 468,34/mês)' },
];

// Meses vindos do Notion que ainda não estão no histórico local
const LABELS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
for (const n of (notionData.renda || [])) {
  if (!RENDA_MESES.some((m) => m.mes === n.mes) && n.liquido != null) {
    RENDA_MESES.push({
      mes: n.mes,
      label: LABELS[parseInt(n.mes.split('-')[1], 10) - 1],
      bruto: null, descontos: null,
      liquido: n.liquido,
      obs: n.eventos || '',
    });
  }
}
RENDA_MESES.sort((a, b) => a.mes.localeCompare(b.mes));

export const LIQUIDO_MEDIO = RENDA_MESES.reduce((s, m) => s + m.liquido, 0) / RENDA_MESES.length;

// Líquido típico sem eventos = média Abr–Jun
export const BASELINE_LIQUIDO = (7531.08 + 7603.19 + 7167.51) / 3;

// Composição de um mês "normal" (Junho/2026)
export const COMPOSICAO_JUNHO = {
  proventos: [
    { nome: 'Salário Padrão', valor: 7013.00 },
    { nome: 'Função Gratificada Efetiva', valor: 2669.00 },
    { nome: 'Quebra de Caixa Judicial s/ FUNCEF', valor: 2206.00 },
    { nome: 'Horas extras + médias', valor: 66.01 },
  ],
  descontos: [
    { nome: 'Imposto de Renda', valor: 1973.77 },
    { nome: 'INSS', valor: 988.07 },
    { nome: 'Saúde Caixa (mensalidade + participação)', valor: 872.22 },
    { nome: 'FUNCEF (previdência)', valor: 484.10 },
    { nome: 'Empréstimo e-consignado', valor: 468.34 },
  ],
};

export const FGTS_DEPOSITO_MENSAL = 965; // média Mai–Jun (960,81 / 983,91)

export const MARGEM_CONSIGNAVEL = {
  total35: 2194.81, // margem 35% empréstimos (Jun/26)
  usada: 468.34,    // e-consignado atual
};

// Eventos de renda previstos no 2º semestre (do arquivo Receitas Mensais)
export const EVENTOS_FUTUROS = [
  { quando: 'Set/2026', o_que: 'PLR' },
  { quando: 'Out/2026', o_que: 'Saque-aniversário FGTS' },
  { quando: 'Nov/2026', o_que: '13º salário (2ª parcela)' },
];
