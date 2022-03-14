import * as fs from 'fs';
import axios from 'axios';

type IdentityType = Record<string, string>;

export class activitySender {
  trackerKey: string;
  action: string;
  request: string;
  payload: object;
  delimiter: string;
  identities: IdentityType[];
  sent: Number;

  constructor(file: string, action, trackerKey: string, delimiter) {
    this.trackerKey = trackerKey;
    this.action = action;
    this.request = `https://collect-eu.attraqt.io/${trackerKey}`;
    this.delimiter = delimiter;
    this.identities = this.#formatCSV(file);
    this.sent = 0;
  }
  
  #formatCSV(file: string):IdentityType[] {
    const csvData = fs.readFileSync(file, 'UTF-8');
    const rowIncludingHeader: Array<string> = [...csvData.split('\n')];
    const header: Array<string> = rowIncludingHeader[0].trim().split(this.delimiter);

    const rows: Array<Array<string>> = rowIncludingHeader.slice(1).map(rawRow => {
      return rawRow.trim().split(this.delimiter);
    });

    const formattedIdentities: Array<IdentityType> = rows.map(rowValue => {
      return Object.assign.apply({}, header.map((identityName, i) => ( {[identityName.toLowerCase()]: rowValue[i]} )));
    });

    return formattedIdentities;
  }

  async sendActivities() {
    for (let i = 0; i < this.identities.length; i++) {
    let identity = this.identities[i];
      const payload = {
        "action": this.action,
        "target": {},
        "sourceId":"",
        "metadata":{},
        "segments":[],
        "user":{
          "identities": identity,
          "segments":[],
          "traits":{}
        }
      }

      await axios.post(this.request, payload)
        .then(function (response) {
          console.log({ i,status: response.status });
          return { status: Number(response.status) };
        })
        .catch(function (error) {
          console.log( error, payload )
          console.log({ i, status: error.response });
          return { status: Number(error.response)};
      });
    }
  }
  
}

export default activitySender;