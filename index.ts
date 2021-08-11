import * as fs from 'fs';

import { Parser } from 'xml2js';
import { writeCsv } from './csvWriter';

const parser = new Parser();

function parseXml(filename: string) {
  let parsed;
  const data = fs.readFileSync(`${__dirname}/xml/${filename}`, 'latin1');

  parser.parseString(data, (err, result) => {
    const dataEmissao = result.nfe.NotaFiscal[0].NfeCabecario[0].dataEmissao[0];
    const numeroNota = result.nfe.NotaFiscal[0].NfeCabecario[0].numeroNota[0];
    const prestador = result.nfe.NotaFiscal[0].DadosPrestador[0].razaoSocial[0];
    const tomador = result.nfe.NotaFiscal[0].TomadorServico[0].razaoSocial[0];
    const valorServico =
      result.nfe.NotaFiscal[0].DetalhesServico[0].valorServico[0];
    const aliquota = result.nfe.NotaFiscal[0].DetalhesServico[0].aliquota[0];
    const baseCalculo = result.nfe.NotaFiscal[0].Totais[0].baseCalculo[0];
    const valorIss = result.nfe.NotaFiscal[0].Totais[0].valorIss[0];
    const valorLiquidoNota =
      result.nfe.NotaFiscal[0].Totais[0].valorLiquidoNota[0];
    const descricao = result.nfe.NotaFiscal[0].DetalhesServico[0].descricao[0];

    parsed = {
      dataEmissao,
      numeroNota,
      prestador,
      tomador,
      valorServico,
      aliquota,
      baseCalculo,
      valorIss,
      valorLiquidoNota,
      descricao: descricao.replace(/,|;/g, ''),
    };
  });

  return parsed;
}

function main() {
  const array = [];
  const files = fs.readdirSync(`${__dirname}/xml`);

  files.forEach((file) => {
    const data = parseXml(file);

    array.push(data);
  });

  writeCsv(array);
}

main();
