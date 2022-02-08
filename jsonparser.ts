import fetch from 'node-fetch';
const { parse } = require('json2csv');
import * as fs from 'fs';

export class JsonParser {
  fileName: string;
  optPath: string;
  resultArray: Array<>;
  
  constructor(fileName: string, optPath: string) {
    this.fileName = fileName.split('.').length > 0 ? fileName.split('.')[0] : fileName;

    const absolutePath = `${optPath}/${fileName}`;
    const data = JSON.parse(fs.readFileSync(absolutePath, 'utf-8'))

    const ruleMap = new Map<string, string>();

    for (const rule in data) {
      const and = data[rule].config.distribution[0].conditionalRules[0]?.config?.rescorerParams?.tags?.and;
      let valuesArray = [];
      for (const val in and) {
        valuesArray.push(and[val].name);
      }
      
      ruleMap.set(data[rule].name, valuesArray.toString()) 
    }
    this.resultArray = Array.from(ruleMap, ([name, value]) => ({ name, value }));
  }

  toCsv(outputName?:string) {
    outputName = typeof outputName === 'undefined' ? this.fileName : outputName;
    console.log('Writing to file :', outputName)
    try {
      const csv = parse(this.resultArray);
      fs.writeFileSync(`files/${outputName}.csv`,  csv, () => {
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export default JsonParser;

