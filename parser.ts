import { CSVParser } from './header_parser';

const parser = new CSVParser('./files/sample.csv', './files/schemaFile.json', ';');
parser.getXOSchema();