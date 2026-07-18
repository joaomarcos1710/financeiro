export function parseMarkdownTable(markdown) {
  const lines = markdown.split('\n');
  const tables = [];
  let currentTable = [];
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      if (inTable && currentTable.length > 0) {
        tables.push(parseTable(currentTable));
        currentTable = [];
        inTable = false;
      }
      continue;
    }

    if (line.startsWith('|')) {
      inTable = true;
      currentTable.push(line);
    } else if (inTable) {
      if (currentTable.length > 0) {
        tables.push(parseTable(currentTable));
      }
      currentTable = [];
      inTable = false;
    }
  }

  if (currentTable.length > 0) {
    tables.push(parseTable(currentTable));
  }

  return tables;
}

function parseTable(lines) {
  const rows = lines.map(line => {
    return line
      .split('|')
      .slice(1, -1)
      .map(cell => cell.trim());
  });

  if (rows.length < 2) return null;

  const headers = rows[0];
  const data = rows.slice(2);

  return {
    headers,
    data: data.map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i];
      });
      return obj;
    })
  };
}

export function parseClosureFile(content) {
  const tables = parseMarkdownTable(content);

  const result = {
    receitas: [],
    despesas: [],
    ativos: [],
    dividas: []
  };

  tables.forEach(table => {
    if (!table) return;

    const headers = table.headers.map(h => h.toLowerCase());

    // Detecta receitas
    if (headers.includes('categoria') && headers.includes('valor')) {
      const isReceita = content.includes('Receitas');
      if (isReceita) {
        result.receitas = table.data.map(row => ({
          categoria: row[table.headers[0]],
          valor: parseMoeda(row[table.headers[1]])
        }));
      }
    }

    // Detecta despesas
    if (headers.includes('categoria')) {
      const isDespesa = content.includes('Despesas');
      if (isDespesa && result.receitas.length === 0) {
        result.despesas = table.data.map(row => ({
          categoria: row[table.headers[0]],
          valor: parseMoeda(row[table.headers[1]])
        }));
      }
    }

    // Detecta ativos
    if (headers.includes('conta')) {
      result.ativos = table.data.map(row => ({
        nome: row[table.headers[0]],
        valor: parseMoeda(row[table.headers[1]])
      }));
    }

    // Detecta dívidas
    if (headers.includes('dívida') || headers.includes('saldo devedor')) {
      result.dividas = table.data.map(row => ({
        nome: row[table.headers[0]],
        saldo: parseMoeda(row[table.headers[1]])
      }));
    }
  });

  return result;
}

export function parseMoeda(valor) {
  if (!valor) return 0;
  return parseFloat(
    valor
      .replace('R$', '')
      .replace(/\./g, '')
      .replace(',', '.')
      .trim()
  );
}

export function formatMoeda(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}
