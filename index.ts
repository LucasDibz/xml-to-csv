import * as fs from 'fs';

import { Parser } from 'xml2js';
import { writeCsv } from './csvWriter';

const parser = new Parser();

function parseXml(filename: string) {
  const array = [];
  const data = fs.readFileSync(`${__dirname}/xml/${filename}`, 'latin1');

  parser.parseString(data, (err, result) => {
    const notaFiscal = result?.nfe?.NotaFiscal;

    if (notaFiscal) {
      notaFiscal.forEach((nota) => {
        let parsed;

        const dataEmissao = nota.NfeCabecario[0].dataEmissao[0];
        const numeroNota = nota.NfeCabecario[0].numeroNota[0];
        const prestador = nota.DadosPrestador[0].razaoSocial[0];
        const tomador = nota.TomadorServico[0].razaoSocial[0];
        const valorServico = nota.DetalhesServico[0].valorServico[0];
        const aliquota = nota.DetalhesServico[0].aliquota[0];
        const baseCalculo = nota.Totais[0].baseCalculo[0];
        const valorIss = nota.Totais[0].valorIss[0];
        const valorLiquidoNota = nota.Totais[0].valorLiquidoNota[0];
        const descricao = nota?.DetalhesServico[0]?.descricao
          ? nota?.DetalhesServico[0]?.descricao[0]
          : 'nao encontrado';

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
          descricao: descricao
            .replace(/,|;/g, '')
            .split('\n')
            .join(' ')
            .split('\r')
            .join(' '),
        };

        //console.log(parsed);
        array.push(parsed);
      });
    } else {
      console.log('Bad file: ', filename);
      fs.renameSync(
        `${__dirname}/xml/${filename}`,
        `${__dirname}/badfiles/${filename}`,
      );
    }
  });
  return array;
}

function main() {
  const array = [];
  const files = fs.readdirSync(`${__dirname}/xml`);

  files.forEach((file) => {
    const data = parseXml(file);

    data.forEach((item) => {
      array.push(item);
    });
  });

  writeCsv(array);
}

main();
