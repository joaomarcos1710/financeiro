#!/usr/bin/env node
// Gera src/data/generated/contasFixas.js a partir de src/data/raw/despesas-mensais.md.
// Roda automaticamente antes do build (hook "prebuild" no package.json).
// Para atualizar os valores: edite o .md de origem (cópia do arquivo do Obsidian)
// e rode `npm run build` de novo — não edite o arquivo gerado à mão.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { parseMarkdownSections, findSection, parseMoeda } from '../src/utils/parseMarkdown.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAW_PATH = join(__dirname, '../src/data/raw/despesas-mensais.md');
const OUT_DIR = join(__dirname, '../src/data/generated');
const OUT_PATH = join(OUT_DIR, 'contasFixas.js');

function main() {
  let cartaoFixo = [];
  let contaFixo = [];

  if (!existsSync(RAW_PATH)) {
    console.warn(`[build-fixed-accounts] ${RAW_PATH} não encontrado — gerando com listas vazias.`);
  } else {
    const md = readFileSync(RAW_PATH, 'utf-8');
    const sections = parseMarkdownSections(md);

    const cartaoSection = findSection(sections, 'cartão de crédito');
    const contaSection = findSection(sections, 'fixas mensais - conta');

    if (!cartaoSection) console.warn('[build-fixed-accounts] seção "Cartão de Crédito" não encontrada no .md');
    if (!contaSection) console.warn('[build-fixed-accounts] seção "Fixas Mensais - Conta" não encontrada no .md');

    cartaoFixo = ((cartaoSection?.tables[0]?.data) || [])
      .map(row => ({
        vencimento: row['Vencimento'] || '',
        descricao: row['Descrição'] || '',
        valor: parseMoeda(row['Valor']),
        titular: row['Titular'] || '',
        ressarcido: (row['Ressarcido'] || '').includes('Sim')
      }))
      .filter(item => item.descricao && item.valor > 0);

    contaFixo = ((contaSection?.tables[0]?.data) || [])
      .map(row => ({
        dia: row['Data'] || '',
        descricao: row['Descrição'] || '',
        valor: parseMoeda(row['Valor']),
        obs: row['Obs:'] || row['Obs'] || ''
      }))
      .filter(item => item.descricao && item.valor > 0);
  }

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const totalCartao = cartaoFixo.reduce((sum, i) => sum + i.valor, 0);
  const totalConta = contaFixo.reduce((sum, i) => sum + i.valor, 0);

  const content = `// GERADO AUTOMATICAMENTE por scripts/build-fixed-accounts.js
// a partir de src/data/raw/despesas-mensais.md — não edite este arquivo à mão.
// Para atualizar: edite o .md de origem e rode \`npm run build\` (ou só \`node scripts/build-fixed-accounts.js\`).

export const CARTAO_FIXO = ${JSON.stringify(cartaoFixo, null, 2)};

export const CONTA_FIXO = ${JSON.stringify(contaFixo, null, 2)};

export const TOTAL_CARTAO_FIXO = ${totalCartao};
export const TOTAL_CONTA_FIXO = ${totalConta};
export const TOTAL_CONTAS_FIXAS = ${totalCartao + totalConta};
`;

  writeFileSync(OUT_PATH, content, 'utf-8');
  console.log(`[build-fixed-accounts] gerado ${OUT_PATH} (${cartaoFixo.length} itens cartão, ${contaFixo.length} itens conta, total R$ ${(totalCartao + totalConta).toFixed(2)})`);
}

main();
