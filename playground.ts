import JsonParser from './jsonparser';

const parser = new JsonParser('example.json', './files');
parser.toCsv('toto');