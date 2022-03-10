import { CSVParser } from './header_parser';

const parser = new CSVParser('./files/attributs-galec.csv', './files/schemaFile.json', ',');
parser.getXOSchema();