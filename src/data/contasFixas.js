// Contas fixas (recorrentes) — fonte: Notion (📌 Contas Fixas)
// Substitui o antigo pipeline que parseava src/data/raw/despesas-mensais.md.
// Itens com "Ativo" desmarcado no Notion (assinatura cancelada, etc.) somem daqui sozinhos.
import notionData from './notion.json';

const ITEMS = (notionData.contasFixas || []).filter((c) => c.ativo !== false);

export const CARTAO_FIXO = ITEMS
  .filter((c) => c.tipo === 'Cartão' && c.periodicidade === 'Mensal')
  .map((c) => ({
    vencimento: c.vencimento,
    descricao: c.descricao,
    valor: c.valor,
    titular: c.titular,
    ressarcido: c.ressarcido,
  }));

export const CONTA_FIXO = ITEMS
  .filter((c) => c.tipo === 'Conta' && c.periodicidade === 'Mensal')
  .map((c) => ({
    dia: c.vencimento,
    descricao: c.descricao,
    valor: c.valor,
    obs: c.notas || '',
  }));

export const ANUAIS = ITEMS
  .filter((c) => c.periodicidade === 'Anual')
  .map((c) => ({
    data: c.vencimento,
    descricao: c.descricao,
    valor: c.valor,
    valorMensal: c.valor / 12,
    obs: c.notas || '',
  }));

export const TOTAL_CARTAO_FIXO = CARTAO_FIXO.reduce((s, i) => s + i.valor, 0);
export const TOTAL_CONTA_FIXO = CONTA_FIXO.reduce((s, i) => s + i.valor, 0);
export const TOTAL_ANUAL = ANUAIS.reduce((s, i) => s + i.valor, 0);
export const TOTAL_ANUAL_MENSAL = TOTAL_ANUAL / 12;
export const TOTAL_CONTAS_FIXAS = TOTAL_CARTAO_FIXO + TOTAL_CONTA_FIXO;
