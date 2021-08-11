import { createObjectCsvWriter } from 'csv-writer';

type NotaFiscal = {
  dataEmissao: string;
  numeroNota: string;
  prestador: string;
  tomador: string;
  valorServico: string;
  aliquota: string;
  baseCalculo: string;
  valorIss: string;
  valorLiquidoNota: string;
  descricao: string;
};

const csvWriter = createObjectCsvWriter({
  path: 'csv/notas_fiscais.csv',
  encoding: 'latin1',
  header: [
    { id: 'dataEmissao', title: 'Data' },
    { id: 'numeroNota', title: 'Nota Fiscal Nº' },
    { id: 'prestador', title: 'Prestador' },
    { id: 'tomador', title: 'Tomador' },
    { id: 'valorServico', title: 'Valor Servico' },
    { id: 'aliquota', title: 'Aliquota' },
    { id: 'baseCalculo', title: 'Base de Calculo' },
    { id: 'valorIss', title: 'Valor ISS' },
    { id: 'valorLiquidoNota', title: 'Valor Liquido' },
    { id: 'descricao', title: 'Descricao Servico' },
  ],
});

export async function writeCsv(data: NotaFiscal[]) {
  await csvWriter.writeRecords(data);
}
