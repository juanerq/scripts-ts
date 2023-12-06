import { json2csv } from 'json-2-csv';
import { writeFileSync } from "node:fs";

const options = {
  delimiter : {
    wrap  : '"',
    field : ';',
    eol   : '\n'
  }
}

export async function createCsv(mockData: any[], fileName: string) {
  try {
    const content = await json2csv(mockData, options)
    writeFileSync(`historicos/${fileName}.csv`, content)
    return true
  } catch (error) {
    console.error(error);
    return false
  }
}
