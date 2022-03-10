import * as fs from 'fs';
import { parse } from 'csv-parse';

export class CSVParser {
  inputFileName: string;
  outputFileName?: string;
  delimiter?: string;
  csvAttributes: Array<string>;
  ready: any;

  constructor(inputFileName:string, outputFileName?:string, delimiter?:string) {
    this.inputFileName = inputFileName;
    this.outputFileName = outputFileName || 'outputFile';
    this.delimiter = delimiter || ';'

    const data = fs.readFileSync(inputFileName, 'UTF-8');
    const dataRows: Array<string> = [...data.split('\n')];
    const header: Array<string> = [...dataRows[0].split(this.delimiter)];
    this.csvAttributes = header;
  }

  getXOSchema() {
    let schema:Array<object> = [];
    this.csvAttributes.forEach(attribute => {
      schema.push({
        "field": attribute,
        "name": attribute,
        "type": {
          "name": "string",
          "forced": false
        }
      })
    })
    console.log(this.csvAttributes)
    const jsonSchema = JSON.stringify(schema, null, '\t');
    fs.writeFileSync(this.outputFileName, jsonSchema);
  }
}
