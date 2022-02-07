import fetch from 'node-fetch';
const { parse } = require('json2csv');
import * as fs from 'fs';

export class JsonParser {
  toCsv(fileName:string, optPath:string) {
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
    const resultArray = Array.from(ruleMap, ([name, value]) => ({ name, value }));
  
    //parse JSON TO CSV
    try {
      const csv = parse(resultArray);
      fs.writeFileSync(`files/${fileName}.csv`,  csv, () => {
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export default JsonParser;

