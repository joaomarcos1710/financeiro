// Busca dados do Notion (fonte oficial) e grava src/data/notion.json
// Roda no prebuild. Sem NOTION_TOKEN ou com erro, mantém o json existente.
import { writeFileSync, existsSync } from 'fs';

const TOKEN = process.env.NOTION_TOKEN;
const OUT = new URL('../src/data/notion.json', import.meta.url).pathname;

const DBS = {
  fechamentos: 'af136d35ca9a40f6a0431a08d78ee956',
  ativos: 'eb16c6b79d364d3c85aa9a259e14a90c',
  dividas: '03ded164a5e24b3b86a80f6a0093997e',
  renda: 'd78b26ad17aa440ca7cf673446eebf88',
  investimentos: '7020265d26914d61be028ba7299bab2f',
};

const plain = (rich) => (rich || []).map((r) => r.plain_text).join('');
const prop = (page, name) => page.properties[name];
const num = (page, name) => prop(page, name)?.number ?? null;
const text = (page, name) => plain(prop(page, name)?.rich_text);
const title = (page, name) => plain(prop(page, name)?.title);
const select = (page, name) => prop(page, name)?.select?.name ?? null;
const date = (page, name) => prop(page, name)?.date?.start ?? null;

async function queryAll(dbId) {
  const results = [];
  let cursor = undefined;
  do {
    const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page_size: 100, start_cursor: cursor }),
    });
    if (!res.ok) throw new Error(`Notion ${dbId}: HTTP ${res.status} ${await res.text()}`);
    const json = await res.json();
    results.push(...json.results);
    cursor = json.has_more ? json.next_cursor : undefined;
  } while (cursor);
  return results;
}

async function main() {
  if (!TOKEN) {
    if (existsSync(OUT)) {
      console.log('fetch-notion: sem NOTION_TOKEN — mantendo notion.json existente.');
      return;
    }
    console.log('fetch-notion: sem NOTION_TOKEN e sem json — gravando vazio.');
    writeFileSync(OUT, JSON.stringify({ fetchedAt: null, fechamentos: [], ativos: [], dividas: [], renda: [], investimentos: [] }, null, 2));
    return;
  }
  try {
    const [fech, ativ, div, ren, inv] = await Promise.all([
      queryAll(DBS.fechamentos), queryAll(DBS.ativos), queryAll(DBS.dividas), queryAll(DBS.renda), queryAll(DBS.investimentos)
    ]);
    const data = {
      fetchedAt: new Date().toISOString(),
      fechamentos: fech.map((p) => ({
        mes: title(p, 'Mês'), receitas: num(p, 'Receitas'), despesas: num(p, 'Despesas'),
        status: select(p, 'Status'), obs: text(p, 'Observações'),
      })).filter((f) => f.mes).sort((a, b) => a.mes.localeCompare(b.mes)),
      ativos: ativ.map((p) => ({
        conta: title(p, 'Conta'), valor: num(p, 'Valor'), tipo: select(p, 'Tipo'), mes: text(p, 'Mês'),
      })).filter((a) => a.conta && a.valor != null),
      dividas: div.map((p) => ({
        divida: title(p, 'Dívida'), saldo: num(p, 'Saldo Devedor'),
        parcelas: num(p, 'Parcelas Restantes'), mes: text(p, 'Mês'),
      })).filter((d) => d.divida && d.saldo != null),
      renda: ren.map((p) => ({
        mes: title(p, 'Mês'), liquido: num(p, 'Líquido'), eventos: text(p, 'Eventos'),
      })).filter((r) => r.mes).sort((a, b) => a.mes.localeCompare(b.mes)),
      investimentos: inv.map((p) => ({
        ativo: title(p, 'Ativo'), quantidade: num(p, 'Quantidade'),
        precoUnitario: num(p, 'Preço Unitário (R$)'), valorTotal: num(p, 'Valor Total (R$)'),
        tipo: select(p, 'Tipo'), data: date(p, 'Data'), obs: text(p, 'Observações'),
      })).filter((i) => i.ativo),
    };
    writeFileSync(OUT, JSON.stringify(data, null, 2));
    console.log(`fetch-notion: ok — ${data.fechamentos.length} fechamentos, ${data.ativos.length} ativos, ${data.dividas.length} dívidas, ${data.renda.length} renda, ${data.investimentos.length} investimentos.`);
  } catch (err) {
    console.error('fetch-notion: erro —', err.message);
    if (existsSync(OUT)) {
      console.log('fetch-notion: mantendo notion.json existente (build segue).');
      return;
    }
    process.exit(1);
  }
}

main();
